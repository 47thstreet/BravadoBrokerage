import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertySchema, insertAgentSchema, insertInquirySchema, insertMarketReportSchema, insertSubscriptionSchema } from "@shared/schema";
import { z } from "zod";
import { isAuthenticated, isAdmin, isAdminOrAgent, hashPassword, verifyPassword, generateSetupToken } from "./auth";

// Object storage is Replit-specific; gracefully handle missing deps
let ObjectStorageService: any = null;
let ObjectNotFoundError: any = null;
let ObjectPermission: any = null;
try {
  const objStorage = await import("./objectStorage");
  ObjectStorageService = objStorage.ObjectStorageService;
  ObjectNotFoundError = objStorage.ObjectNotFoundError;
  const objAcl = await import("./objectAcl");
  ObjectPermission = objAcl.ObjectPermission;
} catch {
  // Object storage not available in this environment
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check if user has set up password
      if (!user.password) {
        return res.status(401).json({ message: "Account not set up. Please use your setup link." });
      }

      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set session
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.session.userName = user.name;
      req.session.userRole = user.role;

      res.json({ 
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        agentId: user.agentId
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get('/api/auth/user', isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        agentId: user.agentId
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Verify password setup token
  app.get('/api/auth/setup/:token', async (req, res) => {
    try {
      const tokenData = await storage.getPasswordSetupToken(req.params.token);
      
      if (!tokenData) {
        return res.status(404).json({ message: "Invalid or expired setup link" });
      }
      
      if (tokenData.usedAt) {
        return res.status(400).json({ message: "This setup link has already been used" });
      }
      
      if (new Date() > tokenData.expiresAt) {
        return res.status(400).json({ message: "This setup link has expired" });
      }
      
      const user = await storage.getUser(tokenData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ 
        valid: true, 
        email: user.email,
        name: user.name 
      });
    } catch (error) {
      console.error("Error verifying setup token:", error);
      res.status(500).json({ message: "Failed to verify setup link" });
    }
  });

  // Set password using setup token
  app.post('/api/auth/setup/:token', async (req, res) => {
    try {
      const { password } = req.body;
      
      if (!password || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }
      
      const tokenData = await storage.getPasswordSetupToken(req.params.token);
      
      if (!tokenData) {
        return res.status(404).json({ message: "Invalid or expired setup link" });
      }
      
      if (tokenData.usedAt) {
        return res.status(400).json({ message: "This setup link has already been used" });
      }
      
      if (new Date() > tokenData.expiresAt) {
        return res.status(400).json({ message: "This setup link has expired" });
      }
      
      // Hash and set password
      const hashedPassword = await hashPassword(password);
      await storage.updateUserPassword(tokenData.userId, hashedPassword);
      
      // Mark token as used
      await storage.markPasswordSetupTokenUsed(req.params.token);
      
      // Get user for session
      const user = await storage.getUser(tokenData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Set session
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.session.userName = user.name;
      req.session.userRole = user.role;
      
      res.json({ 
        message: "Password set successfully",
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        agentId: user.agentId
      });
    } catch (error) {
      console.error("Error setting password:", error);
      res.status(500).json({ message: "Failed to set password" });
    }
  });

  // Admin: Send setup link to agent
  app.post('/api/admin/send-setup-link/:agentId', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const agent = await storage.getAgent(req.params.agentId);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Find or create user for this agent
      let user = await storage.getUserByEmail(agent.email);
      
      if (!user) {
        // Create user account for agent
        user = await storage.createUser({
          email: agent.email,
          name: agent.name,
          role: 'agent',
          agentId: agent.id,
          password: null
        });
      } else if (!user.agentId) {
        // Link existing user to agent
        await storage.updateUser(user.id, { agentId: agent.id, role: 'agent' });
        user = await storage.getUser(user.id);
      }
      
      // Generate setup token (valid for 7 days)
      const token = generateSetupToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      await storage.createPasswordSetupToken({
        token,
        userId: user!.id,
        expiresAt
      });
      
      // Return the setup link (in production, this would be emailed)
      const setupLink = `/setup-password/${token}`;
      
      res.json({ 
        message: "Setup link created",
        setupLink,
        email: agent.email
      });
    } catch (error) {
      console.error("Error creating setup link:", error);
      res.status(500).json({ message: "Failed to create setup link" });
    }
  });

  app.post('/api/auth/change-password', isAuthenticated, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await storage.getUser(req.session.userId!);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // If user has a password, verify current password
      if (user.password) {
        const isValid = await verifyPassword(currentPassword, user.password);
        if (!isValid) {
          return res.status(401).json({ message: "Current password is incorrect" });
        }
      }

      const hashedPassword = await hashPassword(newPassword);
      await storage.updateUserPassword(user.id, hashedPassword);

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });
  
  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const { 
        priceType, 
        propertyType, 
        borough, 
        minPrice, 
        maxPrice, 
        bedrooms, 
        bathrooms, 
        featured 
      } = req.query;

      const filters: any = {};
      if (priceType) filters.priceType = priceType;
      if (propertyType) filters.propertyType = propertyType;
      if (borough) filters.borough = borough;
      if (minPrice) filters.minPrice = parseInt(minPrice as string);
      if (maxPrice) filters.maxPrice = parseInt(maxPrice as string);
      if (bedrooms) filters.bedrooms = parseInt(bedrooms as string);
      if (bathrooms) filters.bathrooms = parseInt(bathrooms as string);
      if (featured !== undefined) filters.featured = featured === 'true';

      const properties = await storage.getProperties(filters);
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", isAuthenticated, isAdminOrAgent, async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      
      // If user is agent, automatically assign their agent ID
      if (req.session.userRole === 'agent') {
        const user = await storage.getUser(req.session.userId!);
        if (user?.agentId) {
          validatedData.agentId = user.agentId;
        } else {
          return res.status(403).json({ message: "No agent profile found for this user" });
        }
      }
      
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  app.put("/api/properties/:id", isAuthenticated, isAdminOrAgent, async (req, res) => {
    try {
      const validatedData = insertPropertySchema.partial().parse(req.body);
      
      // If user is agent, they can only edit their own properties
      if (req.session.userRole === 'agent') {
        const user = await storage.getUser(req.session.userId!);
        const property = await storage.getProperty(req.params.id);
        if (!property) {
          return res.status(404).json({ message: "Property not found" });
        }
        if (property.agentId !== user?.agentId) {
          return res.status(403).json({ message: "You can only edit your own listings" });
        }
      }
      
      const property = await storage.updateProperty(req.params.id, validatedData);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update property" });
    }
  });

  app.delete("/api/properties/:id", isAuthenticated, isAdminOrAgent, async (req, res) => {
    try {
      // If user is agent, they can only delete their own properties
      if (req.session.userRole === 'agent') {
        const user = await storage.getUser(req.session.userId!);
        const property = await storage.getProperty(req.params.id);
        if (!property) {
          return res.status(404).json({ message: "Property not found" });
        }
        if (property.agentId !== user?.agentId) {
          return res.status(403).json({ message: "You can only delete your own listings" });
        }
      }
      
      const success = await storage.deleteProperty(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete property" });
    }
  });

  // Agents routes
  app.get("/api/agents", async (req, res) => {
    try {
      const agents = await storage.getAgents();

      const agentsWithImageUrls = await Promise.all(
        agents.map(async (agent) => {
          if (agent.image && agent.image.startsWith('objects/') && ObjectStorageService) {
            try {
              const objectStorage = new ObjectStorageService();
              const imageUrl = await objectStorage.getSignedViewURL(agent.image);
              return { ...agent, imageUrl };
            } catch (err) {
              return { ...agent, imageUrl: null };
            }
          }
          return { ...agent, imageUrl: agent.image || null };
        })
      );

      res.json(agentsWithImageUrls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });

  app.get("/api/agents/:id", async (req, res) => {
    try {
      const agent = await storage.getAgent(req.params.id);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      let imageUrl = agent.image || null;

      if (agent.image && agent.image.startsWith('objects/') && ObjectStorageService) {
        try {
          const objectStorage = new ObjectStorageService();
          imageUrl = await objectStorage.getSignedViewURL(agent.image);
        } catch (err) {
          // Object storage not available
        }
      }

      res.json({ ...agent, imageUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent" });
    }
  });

  app.post("/api/agents", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertAgentSchema.parse(req.body);
      const agent = await storage.createAgent(validatedData);
      res.status(201).json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid agent data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create agent" });
    }
  });

  app.put("/api/agents/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertAgentSchema.partial().parse(req.body);
      const agent = await storage.updateAgent(req.params.id, validatedData);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid agent data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update agent" });
    }
  });

  app.delete("/api/agents/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      // First, update all properties associated with this agent to remove the agent reference
      const agentProperties = await storage.getPropertiesByAgent(req.params.id);
      for (const property of agentProperties) {
        await storage.updateProperty(property.id, { agentId: null });
      }
      
      // Now delete the agent
      const success = await storage.deleteAgent(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting agent:", error);
      res.status(500).json({ message: "Failed to delete agent" });
    }
  });

  // Inquiries routes
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  // Market Reports routes (mirroring the Flask API)
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getMarketReports();
      // Format to match the Flask API response
      const formattedReports = reports.map(report => ({
        id: report.id,
        source_name: report.sourceName,
        title: report.title,
        url: report.url,
        published: report.published,
        pdf_url: report.pdfUrl,
        downloaded_path: report.downloadedPath,
      }));
      res.json(formattedReports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market reports" });
    }
  });

  app.post("/api/run", async (req, res) => {
    // Simulate the scrape trigger endpoint
    // In production, this would trigger the Python scraper
    res.json({ status: "started", task_id: "simulated-task-id" });
  });

  app.get("/api/download/:rid", async (req, res) => {
    try {
      const report = await storage.getMarketReport(req.params.rid);
      if (!report || !report.downloadedPath) {
        return res.status(404).json({ message: "Report not found or not downloaded" });
      }
      // In a real implementation, this would serve the actual file
      res.json({ message: "Download endpoint - file would be served here", path: report.downloadedPath });
    } catch (error) {
      res.status(500).json({ message: "Failed to download report" });
    }
  });

  // Subscription routes
  app.get("/api/subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });

  app.get("/api/subscriptions/:id", async (req, res) => {
    try {
      const subscription = await storage.getSubscription(req.params.id);
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscription" });
    }
  });

  app.get("/api/subscriptions/email/:email", async (req, res) => {
    try {
      const subscription = await storage.getSubscriptionByEmail(req.params.email);
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscription by email" });
    }
  });

  app.post("/api/subscriptions", async (req, res) => {
    try {
      const validatedData = insertSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getSubscriptionByEmail(validatedData.email);
      if (existingSubscription) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      
      const subscription = await storage.createSubscription(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subscription data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });

  app.put("/api/subscriptions/:id", async (req, res) => {
    try {
      const validatedData = insertSubscriptionSchema.partial().parse(req.body);
      const subscription = await storage.updateSubscription(req.params.id, validatedData);
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      res.json(subscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subscription data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update subscription" });
    }
  });

  app.delete("/api/subscriptions/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSubscription(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      res.json({ message: "Subscription deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete subscription" });
    }
  });

  // Object Storage routes (require Replit object storage)
  app.post("/api/objects/upload", isAuthenticated, async (req, res) => {
    if (!ObjectStorageService) return res.status(501).json({ error: "Object storage not configured" });
    try {
      const objectStorageService = new ObjectStorageService();
      const { uploadURL, objectPath } = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL, objectPath });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  app.post("/api/objects/get-url", isAuthenticated, async (req, res) => {
    if (!ObjectStorageService) return res.status(501).json({ error: "Object storage not configured" });
    try {
      const { objectPath } = req.body;
      if (!objectPath) {
        return res.status(400).json({ error: "objectPath required" });
      }
      
      const objectStorageService = new ObjectStorageService();
      const viewURL = await objectStorageService.getSignedViewURL(objectPath);
      res.json({ viewURL });
    } catch (error) {
      console.error("Error getting view URL:", error);
      res.status(500).json({ error: "Failed to get view URL" });
    }
  });


  app.get("/objects/:objectPath(*)", isAuthenticated, async (req, res) => {
    if (!ObjectStorageService) return res.status(501).json({ error: "Object storage not configured" });
    const userId = req.session.userId;
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(
        req.path,
      );
      const canAccess = await objectStorageService.canAccessObjectEntity({
        objectFile,
        userId: userId,
        requestedPermission: ObjectPermission.READ,
      });
      if (!canAccess) {
        return res.sendStatus(401);
      }
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error checking object access:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  app.get("/public-objects/:filePath(*)", async (req, res) => {
    if (!ObjectStorageService) return res.status(501).json({ error: "Object storage not configured" });
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/agent-images", isAuthenticated, async (req, res) => {
    if (!ObjectStorageService) return res.status(501).json({ error: "Object storage not configured" });
    if (!req.body.imageURL || !req.body.agentId) {
      return res.status(400).json({ error: "imageURL and agentId are required" });
    }

    const userId = req.session.userId;

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        req.body.imageURL,
        {
          owner: userId!,
          visibility: "public",
        },
      );

      await storage.updateAgent(req.body.agentId, { image: objectPath });

      res.status(200).json({
        objectPath: objectPath,
      });
    } catch (error) {
      console.error("Error setting agent image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/property-images", isAuthenticated, async (req, res) => {
    if (!ObjectStorageService) return res.status(501).json({ error: "Object storage not configured" });
    if (!req.body.imageURLs || !req.body.propertyId) {
      return res.status(400).json({ error: "imageURLs and propertyId are required" });
    }

    const userId = req.session.userId;

    try {
      const objectStorageService = new ObjectStorageService();
      const imagePaths: string[] = [];

      for (const imageURL of req.body.imageURLs) {
        const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
          imageURL,
          {
            owner: userId!,
            visibility: "public",
          },
        );
        imagePaths.push(objectPath);
      }

      await storage.updateProperty(req.body.propertyId, { images: imagePaths });

      res.status(200).json({
        objectPaths: imagePaths,
      });
    } catch (error) {
      console.error("Error setting property images:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

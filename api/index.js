// src/api/index.ts
import express from "express";
import session from "express-session";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  address: text("address").notNull(),
  price: integer("price").notNull(),
  priceType: text("price_type").notNull(),
  // "sale" or "lease"
  propertyType: text("property_type").notNull(),
  // "residential" or "commercial"
  subType: text("sub_type").notNull(),
  // LoopNet types: "office", "retail", "industrial", "multifamily", "land", "condo", "co-op", "townhouse", etc.
  // Residential fields
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  // Size and space
  squareFootage: integer("square_footage").notNull(),
  spaceAvailable: integer("space_available"),
  // For lease listings - available space in sqft
  lotSize: integer("lot_size"),
  // Lot size in sqft (for land/houses)
  floor: text("floor"),
  // Building details
  yearBuilt: integer("year_built"),
  stories: integer("stories"),
  // Number of floors/stories
  units: integer("units"),
  // Number of units (for multifamily)
  parkingSpaces: integer("parking_spaces"),
  parkingType: text("parking_type"),
  // "surface", "garage", "covered", "street"
  zoning: text("zoning"),
  // Zoning classification
  propertyCondition: text("property_condition"),
  // "shell", "built-out", "turnkey", "needs-renovation"
  // Lease-specific fields
  leaseTerms: text("lease_terms"),
  // For lease listings - e.g., "NNN", "Modified Gross", "Full Service"
  leaseRate: integer("lease_rate"),
  // For lease listings - monthly or annual rate
  leaseDuration: text("lease_duration"),
  // For lease listings - e.g., "1 year", "3-5 years"
  leaseType: text("lease_type"),
  // "gross", "net", "nnn", "modified-gross"
  availabilityDate: text("availability_date"),
  // When property becomes available
  // Investment/financial fields (for sale)
  capRate: text("cap_rate"),
  // Capitalization rate as string (e.g., "5.5%")
  noi: integer("noi"),
  // Net Operating Income
  propertyTaxes: integer("property_taxes"),
  // Annual property taxes
  // Occupancy info
  occupancyRate: text("occupancy_rate"),
  // e.g., "95%"
  tenantInfo: text("tenant_info"),
  // Current tenant information
  // Content and media
  description: text("description").notNull(),
  features: text("features").array().default(sql`'{}'::text[]`),
  images: text("images").array().default(sql`'{}'::text[]`),
  floorPlans: text("floor_plans").array().default(sql`'{}'::text[]`),
  // Floor plan images/PDFs
  virtualTourUrl: text("virtual_tour_url"),
  // 3D tour/video URL
  // Location
  neighborhood: text("neighborhood").notNull(),
  borough: text("borough").notNull(),
  // Status and metadata
  status: text("status").notNull().default("available"),
  // "available", "pending", "sold", "leased"
  featured: boolean("featured").default(false),
  agentId: varchar("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var agents = pgTable("agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").default("Real Estate Agent"),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  bio: text("bio"),
  experience: text("experience"),
  specialties: text("specialties").array().default(sql`'{}'::text[]`),
  image: text("image"),
  linkedinUrl: text("linkedin_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  propertyId: varchar("property_id").references(() => properties.id),
  agentId: varchar("agent_id").references(() => agents.id),
  inquiryType: text("inquiry_type").notNull(),
  // "property", "general", "agent"
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var marketReports = pgTable("market_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sourceName: text("source_name").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  published: text("published"),
  pdfUrl: text("pdf_url"),
  downloadedPath: text("downloaded_path"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  monthlyReports: boolean("monthly_reports").default(false),
  newListings: boolean("new_listings").default(false),
  priceRange: text("price_range"),
  // "under-500k", "500k-1m", "1m-2m", "2m-5m", "5m+"
  propertyType: text("property_type"),
  // "residential", "commercial", "both"
  neighborhoods: text("neighborhoods").array().default(sql`'{}'::text[]`),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password"),
  // Nullable for agents who haven't set up yet
  name: text("name").notNull(),
  role: text("role").notNull().default("user"),
  // "admin", "agent", or "user"
  agentId: varchar("agent_id"),
  // Links to agent profile if role is "agent"
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var passwordSetupTokens = pgTable("password_setup_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  token: text("token").notNull().unique(),
  userId: varchar("user_id").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true
});
var insertMarketReportSchema = createInsertSchema(marketReports).omit({
  id: true,
  createdAt: true
});
var insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPasswordSetupTokenSchema = createInsertSchema(passwordSetupTokens).omit({
  id: true,
  createdAt: true
});

// server/storage.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and, gte, lte, desc } from "drizzle-orm";
var _db = null;
function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required but not set");
    }
    const queryClient = neon(process.env.DATABASE_URL);
    _db = drizzle(queryClient);
  }
  return _db;
}
var db = new Proxy({}, {
  get(_target, prop) {
    return getDb()[prop];
  }
});
var DbStorage = class {
  // Properties
  async getProperty(id) {
    const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
    return result[0];
  }
  async getProperties(filters) {
    const conditions = [];
    if (filters?.priceType) conditions.push(eq(properties.priceType, filters.priceType));
    if (filters?.propertyType) conditions.push(eq(properties.propertyType, filters.propertyType));
    if (filters?.borough) conditions.push(eq(properties.borough, filters.borough));
    if (filters?.minPrice) conditions.push(gte(properties.price, filters.minPrice));
    if (filters?.maxPrice) conditions.push(lte(properties.price, filters.maxPrice));
    if (filters?.bedrooms) conditions.push(eq(properties.bedrooms, filters.bedrooms));
    if (filters?.bathrooms) conditions.push(eq(properties.bathrooms, filters.bathrooms));
    if (filters?.featured !== void 0) conditions.push(eq(properties.featured, filters.featured));
    const query = conditions.length > 0 ? db.select().from(properties).where(and(...conditions)).orderBy(desc(properties.updatedAt)) : db.select().from(properties).orderBy(desc(properties.updatedAt));
    return await query;
  }
  async getPropertiesByAgent(agentId) {
    return await db.select().from(properties).where(eq(properties.agentId, agentId));
  }
  async createProperty(property) {
    const result = await db.insert(properties).values(property).returning();
    return result[0];
  }
  async updateProperty(id, updates) {
    const result = await db.update(properties).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(properties.id, id)).returning();
    return result[0];
  }
  async deleteProperty(id) {
    const result = await db.delete(properties).where(eq(properties.id, id)).returning();
    return result.length > 0;
  }
  // Agents
  async getAgent(id) {
    const result = await db.select().from(agents).where(eq(agents.id, id)).limit(1);
    return result[0];
  }
  async getAgents() {
    return await db.select().from(agents).orderBy(desc(agents.updatedAt));
  }
  async createAgent(agent) {
    const result = await db.insert(agents).values(agent).returning();
    return result[0];
  }
  async updateAgent(id, updates) {
    const result = await db.update(agents).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(agents.id, id)).returning();
    return result[0];
  }
  async deleteAgent(id) {
    const result = await db.delete(agents).where(eq(agents.id, id)).returning();
    return result.length > 0;
  }
  // Inquiries
  async getInquiry(id) {
    const result = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
    return result[0];
  }
  async getInquiries() {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }
  async createInquiry(inquiry) {
    const result = await db.insert(inquiries).values(inquiry).returning();
    return result[0];
  }
  // Market Reports
  async getMarketReport(id) {
    const result = await db.select().from(marketReports).where(eq(marketReports.id, id)).limit(1);
    return result[0];
  }
  async getMarketReports() {
    return await db.select().from(marketReports).orderBy(desc(marketReports.createdAt));
  }
  async createMarketReport(report) {
    const result = await db.insert(marketReports).values(report).returning();
    return result[0];
  }
  // Subscriptions
  async getSubscription(id) {
    const result = await db.select().from(subscriptions).where(eq(subscriptions.id, id)).limit(1);
    return result[0];
  }
  async getSubscriptionByEmail(email) {
    const result = await db.select().from(subscriptions).where(eq(subscriptions.email, email)).limit(1);
    return result[0];
  }
  async getSubscriptions() {
    return await db.select().from(subscriptions).orderBy(desc(subscriptions.updatedAt));
  }
  async createSubscription(subscription) {
    const result = await db.insert(subscriptions).values(subscription).returning();
    return result[0];
  }
  async updateSubscription(id, updates) {
    const result = await db.update(subscriptions).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(subscriptions.id, id)).returning();
    return result[0];
  }
  async deleteSubscription(id) {
    const result = await db.delete(subscriptions).where(eq(subscriptions.id, id)).returning();
    return result.length > 0;
  }
  // Users
  async getUser(id) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }
  async getUserByEmail(email) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }
  async getUsers() {
    return await db.select().from(users).orderBy(desc(users.updatedAt));
  }
  async createUser(user) {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
  async updateUser(id, updates) {
    const result = await db.update(users).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return result[0];
  }
  async updateUserPassword(id, newPassword) {
    const result = await db.update(users).set({ password: newPassword, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return result[0];
  }
  async deleteUser(id) {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }
  async getUsersByRole(role) {
    return await db.select().from(users).where(eq(users.role, role)).orderBy(desc(users.updatedAt));
  }
  // Password Setup Tokens
  async createPasswordSetupToken(token) {
    const result = await db.insert(passwordSetupTokens).values(token).returning();
    return result[0];
  }
  async getPasswordSetupToken(token) {
    const result = await db.select().from(passwordSetupTokens).where(eq(passwordSetupTokens.token, token)).limit(1);
    return result[0];
  }
  async markPasswordSetupTokenUsed(token) {
    const result = await db.update(passwordSetupTokens).set({ usedAt: /* @__PURE__ */ new Date() }).where(eq(passwordSetupTokens.token, token)).returning();
    return result.length > 0;
  }
  async getAgentByUserId(userId) {
    const user = await this.getUser(userId);
    if (!user?.agentId) return void 0;
    return await this.getAgent(user.agentId);
  }
};
var storage = new DbStorage();

// server/routes.ts
import { z } from "zod";

// server/auth.ts
import bcrypt from "bcryptjs";
var SALT_ROUNDS = 10;
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
function isAdmin(req, res, next) {
  if (req.session && req.session.userId && req.session.userRole === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Admin access required" });
  }
}
function isAdminOrAgent(req, res, next) {
  if (req.session && req.session.userId && (req.session.userRole === "admin" || req.session.userRole === "agent")) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Access required" });
  }
}
function generateSetupToken() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 48; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if (!user.password) {
        return res.status(401).json({ message: "Account not set up. Please use your setup link." });
      }
      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
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
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId);
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
  app2.get("/api/auth/setup/:token", async (req, res) => {
    try {
      const tokenData = await storage.getPasswordSetupToken(req.params.token);
      if (!tokenData) {
        return res.status(404).json({ message: "Invalid or expired setup link" });
      }
      if (tokenData.usedAt) {
        return res.status(400).json({ message: "This setup link has already been used" });
      }
      if (/* @__PURE__ */ new Date() > tokenData.expiresAt) {
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
  app2.post("/api/auth/setup/:token", async (req, res) => {
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
      if (/* @__PURE__ */ new Date() > tokenData.expiresAt) {
        return res.status(400).json({ message: "This setup link has expired" });
      }
      const hashedPassword = await hashPassword(password);
      await storage.updateUserPassword(tokenData.userId, hashedPassword);
      await storage.markPasswordSetupTokenUsed(req.params.token);
      const user = await storage.getUser(tokenData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
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
  app2.post("/api/admin/send-setup-link/:agentId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const agent = await storage.getAgent(req.params.agentId);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      let user = await storage.getUserByEmail(agent.email);
      if (!user) {
        user = await storage.createUser({
          email: agent.email,
          name: agent.name,
          role: "agent",
          agentId: agent.id,
          password: null
        });
      } else if (!user.agentId) {
        await storage.updateUser(user.id, { agentId: agent.id, role: "agent" });
        user = await storage.getUser(user.id);
      }
      const token = generateSetupToken();
      const expiresAt = /* @__PURE__ */ new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      await storage.createPasswordSetupToken({
        token,
        userId: user.id,
        expiresAt
      });
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
  app2.post("/api/auth/change-password", isAuthenticated, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
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
  app2.get("/api/properties", async (req, res) => {
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
      const filters = {};
      if (priceType) filters.priceType = priceType;
      if (propertyType) filters.propertyType = propertyType;
      if (borough) filters.borough = borough;
      if (minPrice) filters.minPrice = parseInt(minPrice);
      if (maxPrice) filters.maxPrice = parseInt(maxPrice);
      if (bedrooms) filters.bedrooms = parseInt(bedrooms);
      if (bathrooms) filters.bathrooms = parseInt(bathrooms);
      if (featured !== void 0) filters.featured = featured === "true";
      const properties2 = await storage.getProperties(filters);
      res.json(properties2);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });
  app2.get("/api/properties/:id", async (req, res) => {
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
  app2.post("/api/properties", isAuthenticated, isAdminOrAgent, async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      if (req.session.userRole === "agent") {
        const user = await storage.getUser(req.session.userId);
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
  app2.put("/api/properties/:id", isAuthenticated, isAdminOrAgent, async (req, res) => {
    try {
      const validatedData = insertPropertySchema.partial().parse(req.body);
      if (req.session.userRole === "agent") {
        const user = await storage.getUser(req.session.userId);
        const property2 = await storage.getProperty(req.params.id);
        if (!property2) {
          return res.status(404).json({ message: "Property not found" });
        }
        if (property2.agentId !== user?.agentId) {
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
  app2.delete("/api/properties/:id", isAuthenticated, isAdminOrAgent, async (req, res) => {
    try {
      if (req.session.userRole === "agent") {
        const user = await storage.getUser(req.session.userId);
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
  app2.get("/api/agents", async (req, res) => {
    try {
      const agents2 = await storage.getAgents();
      const agentsWithImageUrls = agents2.map((agent) => ({
        ...agent,
        imageUrl: agent.image || null
      }));
      res.json(agentsWithImageUrls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });
  app2.get("/api/agents/:id", async (req, res) => {
    try {
      const agent = await storage.getAgent(req.params.id);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json({ ...agent, imageUrl: agent.image || null });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent" });
    }
  });
  app2.post("/api/agents", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.put("/api/agents/:id", isAuthenticated, isAdmin, async (req, res) => {
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
  app2.delete("/api/agents/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const agentProperties = await storage.getPropertiesByAgent(req.params.id);
      for (const property of agentProperties) {
        await storage.updateProperty(property.id, { agentId: null });
      }
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
  app2.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries2 = await storage.getInquiries();
      res.json(inquiries2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });
  app2.post("/api/inquiries", async (req, res) => {
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
  app2.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getMarketReports();
      const formattedReports = reports.map((report) => ({
        id: report.id,
        source_name: report.sourceName,
        title: report.title,
        url: report.url,
        published: report.published,
        pdf_url: report.pdfUrl,
        downloaded_path: report.downloadedPath
      }));
      res.json(formattedReports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market reports" });
    }
  });
  app2.post("/api/run", async (req, res) => {
    res.json({ status: "started", task_id: "simulated-task-id" });
  });
  app2.get("/api/download/:rid", async (req, res) => {
    try {
      const report = await storage.getMarketReport(req.params.rid);
      if (!report || !report.downloadedPath) {
        return res.status(404).json({ message: "Report not found or not downloaded" });
      }
      res.json({ message: "Download endpoint - file would be served here", path: report.downloadedPath });
    } catch (error) {
      res.status(500).json({ message: "Failed to download report" });
    }
  });
  app2.get("/api/subscriptions", async (req, res) => {
    try {
      const subscriptions2 = await storage.getSubscriptions();
      res.json(subscriptions2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });
  app2.get("/api/subscriptions/:id", async (req, res) => {
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
  app2.get("/api/subscriptions/email/:email", async (req, res) => {
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
  app2.post("/api/subscriptions", async (req, res) => {
    try {
      const validatedData = insertSubscriptionSchema.parse(req.body);
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
  app2.put("/api/subscriptions/:id", async (req, res) => {
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
  app2.delete("/api/subscriptions/:id", async (req, res) => {
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
  const objectStorageStub = (_req, res) => res.status(501).json({ error: "Object storage not configured for this environment" });
  app2.post("/api/objects/upload", isAuthenticated, objectStorageStub);
  app2.post("/api/objects/get-url", isAuthenticated, objectStorageStub);
  app2.get("/objects/:objectPath(*)", isAuthenticated, objectStorageStub);
  app2.get("/public-objects/:filePath(*)", objectStorageStub);
  app2.put("/api/agent-images", isAuthenticated, objectStorageStub);
  app2.put("/api/property-images", isAuthenticated, objectStorageStub);
  const httpServer = createServer(app2);
  return httpServer;
}

// src/api/index.ts
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET || "bravado-real-estate-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1e3
  }
}));
var initialized = false;
var server;
async function ensureInitialized() {
  if (!initialized) {
    server = await registerRoutes(app);
    app.use((err, _req, res, _next) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    });
    initialized = true;
  }
}
async function handler(req, res) {
  await ensureInitialized();
  app(req, res);
}
export {
  handler as default
};

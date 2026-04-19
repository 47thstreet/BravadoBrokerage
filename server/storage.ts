import { type Property, type InsertProperty, type Agent, type InsertAgent, type Inquiry, type InsertInquiry, type MarketReport, type InsertMarketReport, type Subscription, type InsertSubscription, type User, type InsertUser, type PasswordSetupToken, type InsertPasswordSetupToken, properties, agents, inquiries, marketReports, subscriptions, users, passwordSetupTokens } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq, and, gte, lte, sql, desc } from "drizzle-orm";
import { Pool, neonConfig } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required but not set");
}

// Configure WebSocket - use native fetch for serverless, ws for Node.js
if (typeof globalThis.WebSocket === 'undefined') {
  try {
    const ws = await import("ws");
    neonConfig.webSocketConstructor = ws.default;
  } catch {
    // In serverless environments without ws, Neon uses fetch fallback
  }
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export interface IStorage {
  // Properties
  getProperty(id: string): Promise<Property | undefined>;
  getProperties(filters?: {
    priceType?: string;
    propertyType?: string;
    borough?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    featured?: boolean;
  }): Promise<Property[]>;
  getPropertiesByAgent(agentId: string): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;

  // Agents
  getAgent(id: string): Promise<Agent | undefined>;
  getAgents(): Promise<Agent[]>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: string, agent: Partial<InsertAgent>): Promise<Agent | undefined>;
  deleteAgent(id: string): Promise<boolean>;

  // Inquiries
  getInquiry(id: string): Promise<Inquiry | undefined>;
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;

  // Market Reports
  getMarketReport(id: string): Promise<MarketReport | undefined>;
  getMarketReports(): Promise<MarketReport[]>;
  createMarketReport(report: InsertMarketReport): Promise<MarketReport>;

  // Subscriptions
  getSubscription(id: string): Promise<Subscription | undefined>;
  getSubscriptionByEmail(email: string): Promise<Subscription | undefined>;
  getSubscriptions(): Promise<Subscription[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: string, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined>;
  deleteSubscription(id: string): Promise<boolean>;

  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  getUsersByRole(role: string): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  updateUserPassword(id: string, newPassword: string): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;

  // Password Setup Tokens
  createPasswordSetupToken(token: InsertPasswordSetupToken): Promise<PasswordSetupToken>;
  getPasswordSetupToken(token: string): Promise<PasswordSetupToken | undefined>;
  markPasswordSetupTokenUsed(token: string): Promise<boolean>;
  getAgentByUserId(userId: string): Promise<Agent | undefined>;
}

export class DbStorage implements IStorage {
  // Properties
  async getProperty(id: string): Promise<Property | undefined> {
    const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
    return result[0];
  }

  async getProperties(filters?: {
    priceType?: string;
    propertyType?: string;
    borough?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    featured?: boolean;
  }): Promise<Property[]> {
    const conditions = [];
    
    if (filters?.priceType) conditions.push(eq(properties.priceType, filters.priceType));
    if (filters?.propertyType) conditions.push(eq(properties.propertyType, filters.propertyType));
    if (filters?.borough) conditions.push(eq(properties.borough, filters.borough));
    if (filters?.minPrice) conditions.push(gte(properties.price, filters.minPrice));
    if (filters?.maxPrice) conditions.push(lte(properties.price, filters.maxPrice));
    if (filters?.bedrooms) conditions.push(eq(properties.bedrooms, filters.bedrooms));
    if (filters?.bathrooms) conditions.push(eq(properties.bathrooms, filters.bathrooms));
    if (filters?.featured !== undefined) conditions.push(eq(properties.featured, filters.featured));

    const query = conditions.length > 0 
      ? db.select().from(properties).where(and(...conditions)).orderBy(desc(properties.updatedAt))
      : db.select().from(properties).orderBy(desc(properties.updatedAt));

    return await query;
  }

  async getPropertiesByAgent(agentId: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.agentId, agentId));
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const result = await db.insert(properties).values(property).returning();
    return result[0];
  }

  async updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const result = await db.update(properties)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    return result[0];
  }

  async deleteProperty(id: string): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id)).returning();
    return result.length > 0;
  }

  // Agents
  async getAgent(id: string): Promise<Agent | undefined> {
    const result = await db.select().from(agents).where(eq(agents.id, id)).limit(1);
    return result[0];
  }

  async getAgents(): Promise<Agent[]> {
    return await db.select().from(agents).orderBy(desc(agents.updatedAt));
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const result = await db.insert(agents).values(agent).returning();
    return result[0];
  }

  async updateAgent(id: string, updates: Partial<InsertAgent>): Promise<Agent | undefined> {
    const result = await db.update(agents)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(agents.id, id))
      .returning();
    return result[0];
  }

  async deleteAgent(id: string): Promise<boolean> {
    const result = await db.delete(agents).where(eq(agents.id, id)).returning();
    return result.length > 0;
  }

  // Inquiries
  async getInquiry(id: string): Promise<Inquiry | undefined> {
    const result = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
    return result[0];
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const result = await db.insert(inquiries).values(inquiry).returning();
    return result[0];
  }

  // Market Reports
  async getMarketReport(id: string): Promise<MarketReport | undefined> {
    const result = await db.select().from(marketReports).where(eq(marketReports.id, id)).limit(1);
    return result[0];
  }

  async getMarketReports(): Promise<MarketReport[]> {
    return await db.select().from(marketReports).orderBy(desc(marketReports.createdAt));
  }

  async createMarketReport(report: InsertMarketReport): Promise<MarketReport> {
    const result = await db.insert(marketReports).values(report).returning();
    return result[0];
  }

  // Subscriptions
  async getSubscription(id: string): Promise<Subscription | undefined> {
    const result = await db.select().from(subscriptions).where(eq(subscriptions.id, id)).limit(1);
    return result[0];
  }

  async getSubscriptionByEmail(email: string): Promise<Subscription | undefined> {
    const result = await db.select().from(subscriptions).where(eq(subscriptions.email, email)).limit(1);
    return result[0];
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return await db.select().from(subscriptions).orderBy(desc(subscriptions.updatedAt));
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const result = await db.insert(subscriptions).values(subscription).returning();
    return result[0];
  }

  async updateSubscription(id: string, updates: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const result = await db.update(subscriptions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(subscriptions.id, id))
      .returning();
    return result[0];
  }

  async deleteSubscription(id: string): Promise<boolean> {
    const result = await db.delete(subscriptions).where(eq(subscriptions.id, id)).returning();
    return result.length > 0;
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async getUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.updatedAt));
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async updateUserPassword(id: string, newPassword: string): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ password: newPassword, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.role, role)).orderBy(desc(users.updatedAt));
  }

  // Password Setup Tokens
  async createPasswordSetupToken(token: InsertPasswordSetupToken): Promise<PasswordSetupToken> {
    const result = await db.insert(passwordSetupTokens).values(token).returning();
    return result[0];
  }

  async getPasswordSetupToken(token: string): Promise<PasswordSetupToken | undefined> {
    const result = await db.select().from(passwordSetupTokens).where(eq(passwordSetupTokens.token, token)).limit(1);
    return result[0];
  }

  async markPasswordSetupTokenUsed(token: string): Promise<boolean> {
    const result = await db.update(passwordSetupTokens)
      .set({ usedAt: new Date() })
      .where(eq(passwordSetupTokens.token, token))
      .returning();
    return result.length > 0;
  }

  async getAgentByUserId(userId: string): Promise<Agent | undefined> {
    const user = await this.getUser(userId);
    if (!user?.agentId) return undefined;
    return await this.getAgent(user.agentId);
  }
}

export const storage = new DbStorage();

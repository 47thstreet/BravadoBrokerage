import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  address: text("address").notNull(),
  price: integer("price").notNull(),
  priceType: text("price_type").notNull(), // "sale" or "lease"
  propertyType: text("property_type").notNull(), // "residential" or "commercial"
  subType: text("sub_type").notNull(), // LoopNet types: "office", "retail", "industrial", "multifamily", "land", "condo", "co-op", "townhouse", etc.
  
  // Residential fields
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  
  // Size and space
  squareFootage: integer("square_footage").notNull(),
  spaceAvailable: integer("space_available"), // For lease listings - available space in sqft
  lotSize: integer("lot_size"), // Lot size in sqft (for land/houses)
  floor: text("floor"),
  
  // Building details
  yearBuilt: integer("year_built"),
  stories: integer("stories"), // Number of floors/stories
  units: integer("units"), // Number of units (for multifamily)
  parkingSpaces: integer("parking_spaces"),
  parkingType: text("parking_type"), // "surface", "garage", "covered", "street"
  zoning: text("zoning"), // Zoning classification
  propertyCondition: text("property_condition"), // "shell", "built-out", "turnkey", "needs-renovation"
  
  // Lease-specific fields
  leaseTerms: text("lease_terms"), // For lease listings - e.g., "NNN", "Modified Gross", "Full Service"
  leaseRate: integer("lease_rate"), // For lease listings - monthly or annual rate
  leaseDuration: text("lease_duration"), // For lease listings - e.g., "1 year", "3-5 years"
  leaseType: text("lease_type"), // "gross", "net", "nnn", "modified-gross"
  availabilityDate: text("availability_date"), // When property becomes available
  
  // Investment/financial fields (for sale)
  capRate: text("cap_rate"), // Capitalization rate as string (e.g., "5.5%")
  noi: integer("noi"), // Net Operating Income
  propertyTaxes: integer("property_taxes"), // Annual property taxes
  
  // Occupancy info
  occupancyRate: text("occupancy_rate"), // e.g., "95%"
  tenantInfo: text("tenant_info"), // Current tenant information
  
  // Content and media
  description: text("description").notNull(),
  features: text("features").array().default(sql`'{}'::text[]`),
  images: text("images").array().default(sql`'{}'::text[]`),
  floorPlans: text("floor_plans").array().default(sql`'{}'::text[]`), // Floor plan images/PDFs
  virtualTourUrl: text("virtual_tour_url"), // 3D tour/video URL
  
  // Location
  neighborhood: text("neighborhood").notNull(),
  borough: text("borough").notNull(),
  
  // Status and metadata
  status: text("status").notNull().default("available"), // "available", "pending", "sold", "leased"
  featured: boolean("featured").default(false),
  agentId: varchar("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const agents = pgTable("agents", {
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
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  propertyId: varchar("property_id").references(() => properties.id),
  agentId: varchar("agent_id").references(() => agents.id),
  inquiryType: text("inquiry_type").notNull(), // "property", "general", "agent"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const marketReports = pgTable("market_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sourceName: text("source_name").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  published: text("published"),
  pdfUrl: text("pdf_url"),
  downloadedPath: text("downloaded_path"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  monthlyReports: boolean("monthly_reports").default(false),
  newListings: boolean("new_listings").default(false),
  priceRange: text("price_range"), // "under-500k", "500k-1m", "1m-2m", "2m-5m", "5m+"
  propertyType: text("property_type"), // "residential", "commercial", "both"
  neighborhoods: text("neighborhoods").array().default(sql`'{}'::text[]`),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password"), // Nullable for agents who haven't set up yet
  name: text("name").notNull(),
  role: text("role").notNull().default("user"), // "admin", "agent", or "user"
  agentId: varchar("agent_id"), // Links to agent profile if role is "agent"
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Password setup tokens for agent account creation
export const passwordSetupTokens = pgTable("password_setup_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  token: text("token").notNull().unique(),
  userId: varchar("user_id").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertMarketReportSchema = createInsertSchema(marketReports).omit({
  id: true,
  createdAt: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPasswordSetupTokenSchema = createInsertSchema(passwordSetupTokens).omit({
  id: true,
  createdAt: true,
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type MarketReport = typeof marketReports.$inferSelect;
export type InsertMarketReport = z.infer<typeof insertMarketReportSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type PasswordSetupToken = typeof passwordSetupTokens.$inferSelect;
export type InsertPasswordSetupToken = z.infer<typeof insertPasswordSetupTokenSchema>;

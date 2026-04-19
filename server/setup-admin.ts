import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { users } from "@shared/schema";
import { hashPassword, generateRandomPassword } from "./auth";
import ws from "ws";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required but not set");
}

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function setupAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@bravadorealestate.com";
  const adminPassword = generateRandomPassword(16);
  const hashedPassword = await hashPassword(adminPassword);

  try {
    const result = await db.insert(users).values({
      email: adminEmail,
      password: hashedPassword,
      name: "Administrator",
      role: "admin"
    }).returning();

    console.log("\n=== ADMIN CREDENTIALS ===");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log("=========================");
    console.log("\nIMPORTANT: Save these credentials securely!");
    console.log("You can change the password after logging in.\n");

    return result[0];
  } catch (error: any) {
    if (error.code === '23505') {
      console.log("\nAdmin user already exists. If you forgot the password, please reset it manually in the database.\n");
    } else {
      throw error;
    }
  } finally {
    await pool.end();
  }
}

setupAdmin();

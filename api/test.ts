import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    const { properties } = await import("../shared/schema");

    const queryClient = neon(process.env.DATABASE_URL!);
    const db = drizzle(queryClient);

    const result = await db.select().from(properties).limit(2);
    res.status(200).json({ count: result.length, first: result[0]?.title });
  } catch (e: any) {
    res.status(500).json({ error: e.message, stack: e.stack?.split('\n').slice(0, 5) });
  }
}

import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import { registerRoutes } from "../../server/routes";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'bravado-real-estate-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

let initialized = false;
let server: ReturnType<typeof createServer>;

async function ensureInitialized() {
  if (!initialized) {
    server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    });

    initialized = true;
  }
}

export default async function handler(req: any, res: any) {
  await ensureInitialized();
  app(req, res);
}

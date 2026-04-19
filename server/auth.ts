import bcrypt from "bcryptjs";
import { type Request, type Response, type NextFunction } from "express";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateRandomPassword(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Middleware to check if user is authenticated
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// Middleware to check if user is admin
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userId && req.session.userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Admin access required" });
  }
}

// Middleware to check if user is admin or agent
export function isAdminOrAgent(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userId && (req.session.userRole === 'admin' || req.session.userRole === 'agent')) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Access required" });
  }
}

// Generate a secure random token for password setup
export function generateSetupToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 48; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Extend session type
declare module 'express-session' {
  interface SessionData {
    userId: string;
    userEmail: string;
    userName: string;
    userRole: string;
  }
}

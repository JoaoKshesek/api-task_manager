import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido no arquivo .env");
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }

    req.user = user as User;
    next();
  });
};

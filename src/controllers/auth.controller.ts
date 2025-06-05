import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido no arquivo .env");
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.signUp({ name, email, password });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "6h" });

    res.status(201).json({ message: "Usuário criado com sucesso e logado", token });

  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const signin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await authService.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: "Usuário ou senha inválidos" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Usuário ou senha inválidos" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "6h" });

  res.json({ message: "Login bem-sucedido", token });
};

export const signout = (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout bem-sucedido" });
};

import { Request, Response } from "express";
import * as accountService from "../services/account.service";

export const details = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const user = await accountService.getUserById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
};

export const update = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  try {
    const updated = await accountService.updateUser(userId, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar sua conta" });
  }
};

export const remove = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  await accountService.deleteUser(userId);
  res.status(204).send();
};

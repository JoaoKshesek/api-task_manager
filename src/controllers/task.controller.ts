import { Request, Response } from "express";
import * as taskService from "../services/task.service";

export const createTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    const taskData = { ...req.body, user_id: userId };

    const task = await taskService.createTask(taskData);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar tarefa", details: error });
  }
};

export const getAllTasks = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;

    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.per_page as string) || 10;
    const search = (req.query.q as string) || "";
    const ordination = (req.query.ordination as string) || "id,asc";

    const tasks = await taskService.getAllTasks({
      userId: Number(userId),
      page,
      perPage,
      search,
      ordination,
    });

    return res.json(tasks);
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao buscar tarefas",
      details: error instanceof Error ? error.message : error,
    });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    const task = await taskService.getTaskById(Number(req.params.id), Number(userId));
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });

    return res.json({
      ...task,
      start_date_original: task.start_date,
      start_date_formatted: task.start_date,
      due_date_original: task.due_date,
      due_date_formatted: task.due_date,
    });

  } catch (error) {
    return res.status(400).json({ error: "Erro ao buscar tarefa", details: error });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    const updated = await taskService.updateTask(Number(req.params.id), Number(userId), req.body);
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao atualizar tarefa", details: error });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    const deleted = await taskService.deleteTask(Number(req.params.id), Number(userId));
    return res.json(deleted);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao deletar tarefa", details: error });
  }
};

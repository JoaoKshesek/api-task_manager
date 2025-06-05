import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

export const getStats = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;

    const stats = await dashboardService.getTaskStatsByStatus(Number(userId));

    return res.json(stats);
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao buscar estatísticas de tarefas",
      details: error instanceof Error ? error.message : error,
    });
  }
};

export const getUpcomingTasks = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;

    const tasks = await dashboardService.getUpcomingTasks(Number(userId));

    return res.json(tasks);
  } catch (error) {
    return res.status(400).json({
      error: "Erro ao buscar tarefas próximas do vencimento",
      details: error instanceof Error ? error.message : error,
    });
  }
};

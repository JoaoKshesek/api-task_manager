import express from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/upcoming-task-list", authMiddleware, dashboardController.getUpcomingTasks);
router.get("/stats", authMiddleware, dashboardController.getStats);

export default router;

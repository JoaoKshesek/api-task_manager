import express from "express";
import * as taskController from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getAllTasks);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.put("/:id", authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

export default router;

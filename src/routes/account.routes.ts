import { Router } from "express";
import * as accountController from "../controllers/account.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/details", authMiddleware, accountController.details);
router.put("/update", authMiddleware, accountController.update);
router.delete("/remove", authMiddleware, accountController.remove);

export default router;

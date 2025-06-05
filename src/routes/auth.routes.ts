import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", authController.signup);
router.post("/sign-in", authController.signin);
router.post("/sign-out", authController.signout);

export default router;

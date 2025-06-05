import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';

import accountRoutes from "./routes/account.routes";
import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use("/account", accountRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/tasks", taskRoutes);

app.get('/', async (req, res) => {
  try {
 
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    res.status(500).json({ error: error });
  }
});

export default app;

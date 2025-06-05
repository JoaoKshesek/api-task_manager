import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import accountRoutes from "./routes/account.routes";
import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://web-task-manager-git-main-joaoksheseks-projects.vercel.app",
  "https://web-task-manager-git-main-joaoksheseks-projects.vercel.app/",
  "https://web-task-manager-ashy.vercel.app",
  "https://web-task-manager-ashy.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/account", accountRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/tasks", taskRoutes);

app.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
    res.status(500).json({ error: error });
  }
});

export default app;

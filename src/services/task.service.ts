import db from "../database/connection";
interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string;
  due_date: string;
  status: "not_started" | "in_progress" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

type TaskListParams = {
  userId: number;
  page?: number;
  perPage?: number;
  search?: string;
  ordination?: string;
};

type CreateTaskDTO = Omit<Task, "id" | "created_at" | "updated_at">;
type UpdateTaskDTO = Partial<Omit<Task, "id" | "user_id" | "created_at">>;

export const createTask = async (task: CreateTaskDTO) => {
  const [newTask] = await db("tasks").insert(task).returning("*");
  return newTask;
};

export const getTaskById = async (id: number, userId: number) => {
  return await db("tasks").where({ id, user_id: userId }).first();
};

export const getAllTasks = async ({
  userId,
  page = 1,
  perPage = 10,
  search = "",
  ordination = "id,asc",
}: TaskListParams) => {
  const [orderField, orderDirection] = ordination.split(",");

  const offset = (page - 1) * perPage;

  const baseQuery = db("tasks").where("user_id", userId);

  if (search) {
    baseQuery.andWhere("title", "ilike", `%${search}%`);
  }

  const [{ count }] = await baseQuery.clone().count("* as count");
  const total = Number(count);

  const data = await baseQuery
    .clone()
    .orderBy(orderField, orderDirection === "desc" ? "desc" : "asc")
    .limit(perPage)
    .offset(offset);

  return {
    total,
    per_page: perPage,
    current_page: page,
    last_page: Math.ceil(total / perPage),
    data,
  };
};

export const updateTask = async (id: number, userId: number, task: UpdateTaskDTO) => {
  return await db("tasks")
    .where({ id, user_id: userId })
    .update({ ...task, updated_at: db.fn.now() })
    .returning("*");
};

export const deleteTask = async (id: number, userId: number) => {
  return await db("tasks").where({ id, user_id: userId }).del().returning("*");
};

import db from "../database/connection";

export const getUpcomingTasks = async (userId: number) => {
  const now = new Date();

  const [{ count }] = await db("tasks").where("user_id", userId).andWhere("due_date", ">=", now).count("* as count");

  const total = Number(count);

  const data = await db("tasks")
    .where("user_id", userId)
    .andWhere("due_date", ">=", now)
    .orderBy("due_date", "asc")
    .limit(10);

  return {
    total,
    data,
  };
};

export const getTaskStatsByStatus = async (userId: number) => {
  const stats = await db("tasks").select("status").count("* as total").where("user_id", userId).groupBy("status");

  return {
    stats,
  };
};

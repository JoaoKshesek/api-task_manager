export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string;
  due_date: string;
  status: "not_started" | "in_progress" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

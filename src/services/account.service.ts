import bcrypt from "bcryptjs";
import db from "../database/connection";
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

const SALT_ROUNDS = 12;

export const getUserById = async (id: number) => {
  return await db("users").select("id", "name", "email", "created_at", "updated_at").where({ id }).first();
};

export const updateUser = async (id: number, user: Partial<User>) => {
  if (typeof user.password === "string" && user.password.trim() !== "") {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  } else {
    delete user.password;
  }

  return await db("users")
    .where({ id })
    .update({ ...user, updated_at: db.fn.now() })
    .returning("*");
};

export const deleteUser = async (id: number) => {
  return await db("users").where({ id }).del().returning("*");
};

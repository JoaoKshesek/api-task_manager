import bcrypt from "bcryptjs";
import db from "../database/connection";
import { User } from "../types/models/user";

const SALT_ROUNDS = 12;

export const signUp = async (user: Omit<User, "id" | "created_at" | "updated_at">) => {
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  const userWithHashedPassword = { ...user, password: hashedPassword };

  const [newUser] = await db("users").insert(userWithHashedPassword).returning("*");
  return newUser;
};

export const getUserByEmail = async (email: string) => {
  return await db("users").select("id", "email", "password").where({ email }).first();
};

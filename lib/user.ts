import db from "./db";
import type { User } from "@/types/user";

export function createUser(email: string, password: string): number {
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);

  return result.lastInsertRowid as number;
}

export function getUserByEmail(email: string): User | undefined {
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!row) {
    return undefined
  };

  return {
    id: row.id as number,
    email: row.email as string,
    password: row.password as string,
  };
}

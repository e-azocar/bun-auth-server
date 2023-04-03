import { db } from "../db";

export const insertUser = db.prepare(
  "INSERT INTO users (email, password, name) VALUES (?, ?, ?)"
);

export const selectUserByEmail = db.query(
  "SELECT * FROM users WHERE email = ?"
);

export const selectUserById = db.query("SELECT * FROM users WHERE id = ?");

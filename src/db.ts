import { Database } from "bun:sqlite";

export const db = new Database("mydb.sqlite", { create: true });

export const initDb = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL
    )
  `);
};

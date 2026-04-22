import { db } from "./client";

export async function initDatabase() {
  await db.run(`
    PRAGMA foreign_keys = ON;
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS ufs (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      sigla TEXT NOT NULL
    );
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS cidades (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      uf_id TEXT NOT NULL,
      FOREIGN KEY (uf_id) REFERENCES ufs(id)
    );
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS regioes (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      cidade_id TEXT NOT NULL,
      FOREIGN KEY (cidade_id) REFERENCES cidades(id)
    );
  `);
}

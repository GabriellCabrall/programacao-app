import Database from "better-sqlite3";

export function initDatabase() {
  const sqlite = new Database("database.db");

  sqlite.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS ufs (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      sigla TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cidades (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      uf_id TEXT NOT NULL,
      FOREIGN KEY (uf_id) REFERENCES ufs(id)
    );

    CREATE TABLE IF NOT EXISTS regioes (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      cidade_id TEXT NOT NULL,
      FOREIGN KEY (cidade_id) REFERENCES cidades(id)
    );
  `);

  sqlite.close();
}

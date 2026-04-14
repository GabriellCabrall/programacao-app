import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ufs = sqliteTable("ufs", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  sigla: text("sigla").notNull(),
});

export const cidades = sqliteTable("cidades", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  sigla: text("sigla").notNull(),
});

export const regioes = sqliteTable("regioes", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  cidadeId: text("cidade_id")
    .notNull()
    .references(() => cidades.id),
});

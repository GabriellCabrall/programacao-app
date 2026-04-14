import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/connection";
import { cidades } from "../db/schema";

export function criarCidade(nome: string, ufId: string) {
  db.insert(cidades)
    .values({
      id: uuidv4(),
      nome,
      ufId,
    })
    .run();
}

export function listarCidades() {
  return db.select().from(cidades).all();
}

export function buscarCidadePorId(id: string) {
  return db.select().from(cidades).where(eq(cidades.id, id)).get();
}

export function atualizarCidade(id: string, nome: string, ufId: string) {
  db.update(cidades).set({ nome, ufId }).where(eq(cidades.id, id)).run();
}

export function excluirCidade(id: string) {
  db.delete(cidades).where(eq(cidades.id, id)).run();
}

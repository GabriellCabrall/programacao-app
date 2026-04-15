import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/connection";
import { cidades, ufs } from "../db/schema";

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
  return db
    .select({
      id: cidades.id,
      nome: cidades.nome,
      ufNome: ufs.nome,
      ufSigla: ufs.sigla,
    })
    .from(cidades)
    .leftJoin(ufs, eq(cidades.ufId, ufs.id))
    .all();
}

export function buscarCidadePorId(id: string) {
  return db.select().from(cidades).where(eq(cidades.id, id)).get();
}

export function atualizarCidade(id: string, nome: string, ufId: string) {
  return db.update(cidades).set({ nome, ufId }).where(eq(cidades.id, id)).run();
}

export function excluirCidade(id: string) {
  return db.delete(cidades).where(eq(cidades.id, id)).run();
}

import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/connection";
import { regioes, cidades } from "../db/schema";

export function criarRegiao(nome: string, cidadeId: string) {
  db.insert(regioes)
    .values({
      id: uuidv4(),
      nome,
      cidadeId,
    })
    .run();
}

export function listarRegioes() {
  return db
    .select({
      id: regioes.id,
      nome: regioes.nome,
      cidadeNome: cidades.nome,
    })
    .from(regioes)
    .leftJoin(cidades, eq(regioes.cidadeId, cidades.id))
    .all();
}

export function buscarRegiaoPorId(id: string) {
  return db.select().from(regioes).where(eq(regioes.id, id)).get();
}

export function atualizarRegiao(id: string, nome: string, cidadeId: string) {
  db.update(regioes).set({ nome, cidadeId }).where(eq(regioes.id, id)).run();
}

export function excluirRegiao(id: string) {
  db.delete(regioes).where(eq(regioes.id, id)).run();
}

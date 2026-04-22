import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "./client";
import { cidades, regioes, ufs } from "./schema";

export type RegiaoFormData = {
  nome: string;
  cidadeId: string;
};

export async function listarRegioes() {
  return await db
    .select({
      id: regioes.id,
      nome: regioes.nome,
      cidadeId: regioes.cidadeId,
      cidadeNome: cidades.nome,
      ufSigla: ufs.sigla,
    })
    .from(regioes)
    .leftJoin(cidades, eq(regioes.cidadeId, cidades.id))
    .leftJoin(ufs, eq(cidades.ufId, ufs.id));
}

export async function listarCidadesSimples() {
  return await db.select().from(cidades);
}

export async function criarRegiao(data: RegiaoFormData) {
  if (!data.nome.trim() || !data.cidadeId) {
    throw new Error("Nome e cidade são obrigatórios.");
  }

  await db.insert(regioes).values({
    id: uuidv4(),
    nome: data.nome.trim(),
    cidadeId: data.cidadeId,
  });
}

export async function atualizarRegiao(id: string, data: RegiaoFormData) {
  if (!data.nome.trim() || !data.cidadeId) {
    throw new Error("Nome e cidade são obrigatórios.");
  }

  await db
    .update(regioes)
    .set({
      nome: data.nome.trim(),
      cidadeId: data.cidadeId,
    })
    .where(eq(regioes.id, id));
}

export async function deletarRegiao(id: string) {
  await db.delete(regioes).where(eq(regioes.id, id));
}

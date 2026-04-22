import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "./client";
import { cidades, ufs } from "./schema";

export type CidadeFormData = {
  nome: string;
  ufId: string;
};

export async function listarCidades() {
  return await db
    .select({
      id: cidades.id,
      nome: cidades.nome,
      ufId: cidades.ufId,
      ufNome: ufs.nome,
      ufSigla: ufs.sigla,
    })
    .from(cidades)
    .leftJoin(ufs, eq(cidades.ufId, ufs.id));
}

export async function listarUfsSimples() {
  return await db.select().from(ufs);
}

export async function criarCidade(data: CidadeFormData) {
  if (!data.nome.trim() || !data.ufId) {
    throw new Error("Nome e UF são obrigatórios.");
  }

  await db.insert(cidades).values({
    id: uuidv4(),
    nome: data.nome.trim(),
    ufId: data.ufId,
  });
}

export async function atualizarCidade(id: string, data: CidadeFormData) {
  if (!data.nome.trim() || !data.ufId) {
    throw new Error("Nome e UF são obrigatórios.");
  }

  await db
    .update(cidades)
    .set({
      nome: data.nome.trim(),
      ufId: data.ufId,
    })
    .where(eq(cidades.id, id));
}

export async function deletarCidade(id: string) {
  await db.delete(cidades).where(eq(cidades.id, id));
}

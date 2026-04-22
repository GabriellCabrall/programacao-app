import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "./client";
import { ufs } from "./schema";

export type UfFormData = {
  nome: string;
  sigla: string;
};

export async function listarUfs() {
  return await db.select().from(ufs);
}

export async function criarUf(data: UfFormData) {
  const nome = data.nome.trim();
  const sigla = data.sigla.trim().toUpperCase();

  if (!nome || !sigla) {
    throw new Error("Nome e sigla são obrigatórios.");
  }

  await db.insert(ufs).values({
    id: uuidv4(),
    nome,
    sigla,
  });
}

export async function atualizarUf(id: string, data: UfFormData) {
  const nome = data.nome.trim();
  const sigla = data.sigla.trim().toUpperCase();

  if (!nome || !sigla) {
    throw new Error("Nome e sigla são obrigatórios.");
  }

  await db
    .update(ufs)
    .set({
      nome,
      sigla,
    })
    .where(eq(ufs.id, id));
}

export async function deletarUf(id: string) {
  await db.delete(ufs).where(eq(ufs.id, id));
}

import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/connection";
import { ufs } from "../db/schema";

export function criarUf(nome: string, sigla: string) {
  db.insert(ufs)
    .values({
      id: uuidv4(),
      nome,
      sigla,
    })
    .run();
}

export function listarUfs() {
  return db.select().from(ufs).all();
}

export function buscarUfPorId(id: string) {
  return db.select().from(ufs).where(eq(ufs.id, id)).get();
}

export function atualizarUf(id: string, nome: string, sigla: string) {
  db.update(ufs).set({ nome, sigla }).where(eq(ufs.id, id)).run();
}

export function excluirUf(id: string) {
  db.delete(ufs).where(eq(ufs.id, id)).run();
}

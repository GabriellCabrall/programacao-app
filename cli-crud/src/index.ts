import promptSync from "prompt-sync";
import { initDatabase } from "./db/init";
import {
  criarUf,
  listarUfs,
  buscarUfPorId,
  atualizarUf,
  excluirUf,
} from "./services/ufService";

const prompt = promptSync();

function menuUf() {
  let opcao = "";

  while (opcao !== "0") {
    console.log("\n=== CRUD DE UF ===");
    console.log("1. Cadastrar UF");
    console.log("2. Listar UFs");
    console.log("3. Buscar UF por ID");
    console.log("4. Atualizar UF");
    console.log("5. Excluir UF");
    console.log("0. Sair");

    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1": {
        const nome = prompt("Nome da UF: ").trim();
        const sigla = prompt("Sigla da UF: ").trim().toUpperCase();

        if (!nome || !sigla) {
          console.log("Nome e sigla são obrigatórios.");
          break;
        }

        criarUf(nome, sigla);
        console.log("UF cadastrada com sucesso.");
        break;
      }

      case "2": {
        const lista = listarUfs();

        if (lista.length === 0) {
          console.log("Nenhuma UF cadastrada.");
          break;
        }

        console.log("\nLista de UFs:");
        for (const uf of lista) {
          console.log(`${uf.id} | ${uf.sigla} | ${uf.nome}`);
        }
        break;
      }

      case "3": {
        const id = prompt("ID da UF: ").trim();
        const uf = buscarUfPorId(id);

        if (!uf) {
          console.log("UF não encontrada.");
          break;
        }

        console.log(`${uf.id} | ${uf.sigla} | ${uf.nome}`);
        break;
      }

      case "4": {
        const id = prompt("ID da UF que deseja atualizar: ").trim();
        const uf = buscarUfPorId(id);

        if (!uf) {
          console.log("UF não encontrada.");
          break;
        }

        const nome = prompt(`Novo nome (${uf.nome}): `).trim() || uf.nome;
        const sigla =
          prompt(`Nova sigla (${uf.sigla}): `).trim().toUpperCase() || uf.sigla;

        atualizarUf(id, nome, sigla);
        console.log("UF atualizada com sucesso.");
        break;
      }

      case "5": {
        const id = prompt("ID da UF que deseja excluir: ").trim();
        const uf = buscarUfPorId(id);

        if (!uf) {
          console.log("UF não encontrada.");
          break;
        }

        excluirUf(id);
        console.log("UF excluída com sucesso.");
        break;
      }

      case "0":
        console.log("Encerrando...");
        break;

      default:
        console.log("Opção inválida.");
    }
  }
}

function main() {
  initDatabase();
  menuUf();
}

main();

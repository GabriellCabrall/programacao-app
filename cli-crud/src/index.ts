import promptSync from "prompt-sync";
import { initDatabase } from "./db/init";
import {
  criarUf,
  listarUfs,
  buscarUfPorId,
  atualizarUf,
  excluirUf,
} from "./services/ufService";
import {
  criarCidade,
  listarCidades,
  buscarCidadePorId,
  atualizarCidade,
  excluirCidade,
} from "./services/cidadeService";

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
    console.log("0. Voltar");

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
        break;

      default:
        console.log("Opção inválida.");
    }
  }
}

function menuCidade() {
  let opcao = "";

  while (opcao !== "0") {
    console.log("\n=== CRUD DE CIDADE ===");
    console.log("1. Cadastrar cidade");
    console.log("2. Listar cidades");
    console.log("3. Buscar cidade por ID");
    console.log("4. Atualizar cidade");
    console.log("5. Excluir cidade");
    console.log("0. Voltar");

    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1": {
        const nome = prompt("Nome da cidade: ").trim();

        const ufs = listarUfs();
        if (ufs.length === 0) {
          console.log("Cadastre uma UF antes de cadastrar cidades.");
          break;
        }

        console.log("\nUFs disponíveis:");
        for (const uf of ufs) {
          console.log(`${uf.id} | ${uf.sigla} | ${uf.nome}`);
        }

        const ufId = prompt("Digite o ID da UF da cidade: ").trim();

        const uf = buscarUfPorId(ufId);
        if (!uf) {
          console.log("UF não encontrada.");
          break;
        }

        if (!nome) {
          console.log("Nome da cidade é obrigatório.");
          break;
        }

        criarCidade(nome, ufId);
        console.log("Cidade cadastrada com sucesso.");
        break;
      }

      case "2": {
        const lista = listarCidades();

        if (lista.length === 0) {
          console.log("Nenhuma cidade cadastrada.");
          break;
        }

        console.log("\nLista de cidades:");
        for (const cidade of lista) {
          console.log(
            `${cidade.id} | ${cidade.nome} | ${cidade.ufSigla} - ${cidade.ufNome}`,
          );
        }
        break;
      }

      case "3": {
        const id = prompt("ID da cidade: ").trim();
        const cidade = buscarCidadePorId(id);

        if (!cidade) {
          console.log("Cidade não encontrada.");
          break;
        }

        console.log(`${cidade.id} | ${cidade.nome} | UF ID: ${cidade.ufId}`);
        break;
      }

      case "4": {
        const id = prompt("ID da cidade que deseja atualizar: ").trim();
        const cidade = buscarCidadePorId(id);

        if (!cidade) {
          console.log("Cidade não encontrada.");
          break;
        }

        const nome =
          prompt(`Novo nome (${cidade.nome}): `).trim() || cidade.nome;

        const ufs = listarUfs();
        console.log("\nUFs disponíveis:");
        for (const uf of ufs) {
          console.log(`${uf.id} | ${uf.sigla} | ${uf.nome}`);
        }

        const ufId =
          prompt(`Novo UF ID (${cidade.ufId}): `).trim() || cidade.ufId;

        const uf = buscarUfPorId(ufId);
        if (!uf) {
          console.log("UF não encontrada.");
          break;
        }

        atualizarCidade(id, nome, ufId);
        console.log("Cidade atualizada com sucesso.");
        break;
      }

      case "5": {
        const id = prompt("ID da cidade que deseja excluir: ").trim();
        const cidade = buscarCidadePorId(id);

        if (!cidade) {
          console.log("Cidade não encontrada.");
          break;
        }

        excluirCidade(id);
        console.log("Cidade excluída com sucesso.");
        break;
      }

      case "0":
        break;

      default:
        console.log("Opção inválida.");
    }
  }
}

function menuPrincipal() {
  let opcao = "";

  while (opcao !== "0") {
    console.log("\n=== MENU PRINCIPAL ===");
    console.log("1. CRUD de UF");
    console.log("2. CRUD de cidade");
    console.log("0. Sair");

    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        menuUf();
        break;
      case "2":
        menuCidade();
        break;
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
  menuPrincipal();
}

main();

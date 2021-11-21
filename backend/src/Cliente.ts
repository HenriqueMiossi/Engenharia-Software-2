import Postgres from "./Postgres";

interface endereco {
  rua: string;
  cidade: string;
  numero: number;
  cep: string;
  uf: string;
}

export default class Cliente {
  criaCliente(nome: string, telefone: string, cpf: string, endereco: endereco) {
    const database = new Postgres();
    database.criarCliente(nome, telefone, cpf, endereco);
  }

  async consultaCliente(idCliente: string) {
    const database = new Postgres();
    return await database.consultarCliente(idCliente);
  }

  async listarTodosClientes() {
    const database = new Postgres();
    return await database.listarTodosClientes();
  }

  async removeCliente(idCliente: string) {
    const database = new Postgres();
    return database.removeCliente(idCliente);
  }

  editarCliente(
    idCliente: string,
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco
  ) {
    const database = new Postgres();
    database.editarCliente(idCliente, nome, telefone, cpf, endereco);
  }
}

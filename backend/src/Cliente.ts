import PostgresCliente from "./PostgresCliente";

interface endereco {
  rua: string;
  cidade: string;
  numero: number;
  cep: string;
  uf: string;
}

export default class Cliente {
  criaCliente(nome: string, telefone: string, cpf: string, endereco: endereco) {
    const database = new PostgresCliente();
    database.criarCliente(nome, telefone, cpf, endereco);
  }

  async consultaCliente(idCliente: string) {
    const database = new PostgresCliente();
    return await database.consultarCliente(idCliente);
  }

  async listarTodosClientes() {
    const database = new PostgresCliente();
    return await database.listarTodosClientes();
  }

  async removeCliente(idCliente: string) {
    const database = new PostgresCliente();
    return database.removeCliente(idCliente);
  }

  editarCliente(
    idCliente: string,
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco
  ) {
    const database = new PostgresCliente();
    database.editarCliente(idCliente, nome, telefone, cpf, endereco);
  }
}

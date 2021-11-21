import Postgres from "./Postgres";

interface endereco {
  rua: string;
  cidade: string;
  numero: number;
  cep: string;
  uf: string;
}

export default class Funcionario {
  criaFuncionario(nome: string, telefone: string, cpf: string, endereco: endereco, matricula: string, salario: number) {
    const database = new Postgres();
    database.criarFuncionario(nome, telefone, cpf, endereco, matricula, salario);
  }

  async consultaFuncionario(idFuncionario: string) {
    const database = new Postgres();
    return await database.consultarFuncionario(idFuncionario);
  }

  async listarTodosFuncionarios() {
    const database = new Postgres();
    return await database.listarTodosFuncionarios();
  }

  async removeFuncionario(idFuncionario: string) {
    const database = new Postgres();
    return database.removeFuncionario(idFuncionario);
  }

  editarFuncionario(
    idCliente: string,
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco,
    matricula: string,
    salario: number
  ) {
    const database = new Postgres();
    database.editarFuncionario(idCliente, nome, telefone, cpf, endereco, matricula, salario);
  }
}

import PostgresFuncionario from "./PostgresFuncionario";

interface endereco {
  rua: string;
  cidade: string;
  numero: number;
  cep: string;
  uf: string;
}

export default class Funcionario {
  criaFuncionario(nome: string, telefone: string, cpf: string, endereco: endereco, matricula: string, salario: number) {
    const database = new PostgresFuncionario();
    database.criarFuncionario(nome, telefone, cpf, endereco, matricula, salario);
  }

  async consultaFuncionario(idFuncionario: string) {
    const database = new PostgresFuncionario();
    return await database.consultarFuncionario(idFuncionario);
  }

  async listarTodosFuncionarios() {
    const database = new PostgresFuncionario();
    return await database.listarTodosFuncionarios();
  }

  async removeFuncionario(idFuncionario: string) {
    const database = new PostgresFuncionario();
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
    const database = new PostgresFuncionario();
    database.editarFuncionario(idCliente, nome, telefone, cpf, endereco, matricula, salario);
  }

  async consultaSalario(idFuncionario: string) {
    const database = new PostgresFuncionario();
    const salario = await database.consultaSalario(idFuncionario);

    if (salario.Vendas <= 1000) {
      const comissao = salario.Vendas / 100 * 3;
      
      return comissao + salario.Salariobase;
    }
    else {
      const comissao = salario.Vendas / 100 * 5;

      return comissao + salario.Salariobase;
    }
  }
}

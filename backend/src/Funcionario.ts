import Pessoa from "./Pessoa";

export default class Funcionario extends Pessoa {
  matricula: string;
  salario_base: number;

  constructor(
    nome: string,
    telefone: string,
    cpf: string,
    matricula: string,
    salario_base: number
  ) {
    super(nome, telefone, cpf);

    this.matricula = matricula;
    this.salario_base = salario_base;
  }
}

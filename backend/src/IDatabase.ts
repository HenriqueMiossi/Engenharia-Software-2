export interface endereco {
  rua: string;
  cidade: string;
  numero: number;
  cep: string;
  uf: string;
}

export abstract class IDatabase {
  criarCliente(
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco
  ) {}

  removerCliente(id: string) {}

  editarCliente(
    id: string,
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco
  ) {}

  consultarCliente(id: string) {}

  listarTodosClientes() {}

  criarFuncionario(
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco,
    matricula: string,
    salario: number
  ) {}

  removerFuncionario(id: string) {}

  editarFuncionario(
    id: string,
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco,
    matricula: string,
    salario: number
  ) {}

  consultarFuncionario(id: string) {}

  listarTodosFuncionarios() {}
}

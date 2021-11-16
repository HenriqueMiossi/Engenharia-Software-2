export interface endereco {
    rua: string,
    cidade: string,
    numero: number,
    cep: string,
    uf: string
}

export abstract class IDatabase {
    criarCliente(nome: string, telefone: string, cpf: string, endereco: endereco) {}

    removerCliente(id: string) {}

    editarCliente(id: string, nome: string, telefone: string, cpf: string, endereco: endereco) {}

    consultarCliente(id: string) {}

    listarTodosClientes() {}
}

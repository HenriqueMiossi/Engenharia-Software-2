export default abstract class IDatabase {
    criarCliente(nome: string, telefone: string, cpf: string) {}

    removerCliente() {}

    editarCliente(id: string, nome: string, telefone: string, cpf: string) {}

    consultarCliente(id: string) {}

    listarTodosClientes() {}
}

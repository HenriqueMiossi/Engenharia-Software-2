import PostgresProduto from "./PostgresProduto";

export default class Produto {
  criaProduto(
    codigo: string,
    descricao: string,
    valor: number,
    quantidade_estoque: number,
    estoque_minimo: number,
    validade: string
  ) {
    const database = new PostgresProduto();
    database.criarProduto(
      codigo,
      descricao,
      valor,
      quantidade_estoque,
      estoque_minimo,
      validade
    );
  }

  async listarTodosProdutos() {
    const database = new PostgresProduto();
    return await database.listarTodosProdutos();
  }

  async removeProduto(idProduto: string) {
    const database = new PostgresProduto();
    return database.removeProduto(idProduto);
  }
}

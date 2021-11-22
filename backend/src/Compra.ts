import PostgresProduto from "./PostgresProduto";

interface produto {
  idProduto: number;
  quantidade: number;
}

export default class Compra {
  criaCompra(
    idCliente: number,
    idFuncionario: number,
    formaPagamento: string,
    produtos: Array<produto>
  ) {
    const database = new PostgresProduto();
    
    database.criaCompra(
      idCliente,
      idFuncionario,
      formaPagamento,
      produtos
    );
  }
}

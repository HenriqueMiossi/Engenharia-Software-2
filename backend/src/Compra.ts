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

  async consultaPreco(idCompra: string, parcelas: number) {
    const database = new PostgresProduto();

    const res = await database.consultaCompra(idCompra);
    const listaProdutos = res.rows;

    let valorTotal = 0;  

    for (const item of listaProdutos) {
      const res = await database.consultaPreco(item.produto_id);
      const preco = res.rows[0].valor;
      
      valorTotal += preco * item.quantidade;
    }

    const pagamento = await database.consultaFormaPagamento(idCompra);
    const formaPagamento = pagamento.rows[0].forma_pagamento;

    if(formaPagamento == 'debito' && valorTotal <= 1000) {
      valorTotal = valorTotal / 100 * 97 / parcelas;

      return [valorTotal, parcelas];
    }
    else if(formaPagamento == 'debito' && valorTotal > 1000) {
      valorTotal = valorTotal / 100 * 95 / parcelas;

      return [valorTotal, parcelas];
    }
    else if(formaPagamento == 'dinheiro') {
      return [valorTotal, 0];
    }
    else {
      return [valorTotal / parcelas, parcelas];
    }
  }
}

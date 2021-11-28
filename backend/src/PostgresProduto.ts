import { IDatabase } from "./IDatabase";
import { Pool } from "pg";

interface produto {
  idProduto: number;
  quantidade: number;
}

interface listaCompras {
  itens: Array<produto>;
}

export default class PostgresProduto extends IDatabase {
  private pool: Pool;

  constructor() {
    super();
    this.pool = new Pool({
      port: 5432,
      user: "postgres",
      password: "docker",
      database: "engsoft2",
    });
  }

  private conectar() {
    this.pool.connect((err) => {
      if (err) {
        console.error("connection error", err.stack);
      } else {
        console.log("connected");
      }
    });
  }

  async criarProduto(
    codigo: string,
    descricao: string,
    valor: number,
    quantidade_estoque: number,
    estoque_minimo: number,
    validade: string
  ) {
    this.conectar();

    const query =
      "INSERT INTO produto(codigo, descricao, valor, quantidade_estoque, estoque_minimo, validade) VALUES(" +
      `'${codigo}', ` +
      `'${descricao}', ` +
      `'${valor}', ` +
      `'${quantidade_estoque}', ` +
      `'${estoque_minimo}', ` +
      `'${validade}'` +
      ");";

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async removeProduto(id: string) {
    this.conectar();

    const verifyQuery = `SELECT id FROM item WHERE produto_id = ${id}`;

    const verifyRes = await this.pool.query(verifyQuery);
    if (verifyRes.rows.length == 0) {
      const query = `DELETE FROM produto WHERE id = ${id};`;

      const res = await this.pool.query(query);

      return res;
    }

    this.pool.end;

    return verifyRes;
  }

  async listarTodosProdutos() {
    this.conectar();

    const query = "SELECT * FROM produto ORDER BY id ASC";

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async consultaCompra(id: string) {
    this.conectar();

    const query = `SELECT * FROM item WHERE compra_id = '${id}';`;

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async consultaPreco(id: string) {
    this.conectar();

    const query = `SELECT valor FROM produto WHERE id = '${id}'`;

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async consultaFormaPagamento(id: string) {
    this.conectar();

    const query = `SELECT forma_pagamento FROM compra WHERE id = '${id}'`;

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async criaCompra(
    idCliente: number,
    idFuncionario: number,
    formaPagamento: string,
    itens: produto[]
  ) {
    this.conectar();

    const query =
      "INSERT INTO compra(cliente_id, funcionario_id, forma_pagamento, data_criacao) VALUES(" +
      `'${idCliente}', ` +
      `'${idFuncionario}', ` +
      `'${formaPagamento}', ` +
      `to_timestamp(${Date.now()} / 1000.0)` +
      ");";

    const res = await this.pool.query(query);

    const compra_id = await this.pool.query(
      `SELECT currval(pg_get_serial_sequence('compra', 'id'))`
    );

    itens.forEach(async (produto) => {
      const quantidade = await this.pool.query(
        `SELECT quantidade_estoque FROM produto WHERE id = ${produto.idProduto};`
      );
      const item =
        "INSERT INTO item(compra_id, produto_id, quantidade) VALUES(" +
        `${compra_id.rows[0].currval}, ` +
        `'${produto.idProduto}', ` +
        `'${produto.quantidade}');` +
        "UPDATE produto " +
        `SET quantidade_estoque = ${quantidade.rows[0].quantidade_estoque - produto.quantidade} WHERE id = ${produto.idProduto}` +
        ";";

      await this.pool.query(item);
    });
    this.pool.end;

    return res;
  }
}

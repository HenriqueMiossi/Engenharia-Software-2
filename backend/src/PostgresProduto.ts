import { IDatabase } from './IDatabase';
import { Pool } from 'pg';

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
      user: 'postgres',
      password: 'docker',
      database: 'engsoft2',
    });
  }

  private conectar() {
    this.pool.connect((err) => {
      if (err) {
        console.error('connection error', err.stack);
      } else {
        console.log('connected');
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
      'INSERT INTO produto(codigo, descricao, valor, quantidade_estoque, estoque_minimo, validade) VALUES(' +
      `'${codigo}', ` +
      `'${descricao}', ` +
      `'${valor}', ` +
      `'${quantidade_estoque}', ` +
      `'${estoque_minimo}', ` +
      `'${validade}'` +
      ');';

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async removeProduto(id: string) {
    this.conectar();
    const query =
      `DELETE FROM produto WHERE id = ${id};`;

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async listarTodosProdutos() {
    this.conectar();

    const query = 'SELECT * FROM produto ORDER BY id ASC';

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
      'INSERT INTO compra(cliente_id, funcionario_id, forma_pagamento) VALUES(' +
      `'${idCliente}', ` +
      `'${idFuncionario}', ` +
      `'${formaPagamento}'` +
      ');';

    const res = await this.pool.query(query);

    const compra_id = await this.pool.query(
      `SELECT currval(pg_get_serial_sequence('compra', 'id'))`
    );

    itens.forEach(async produto => {
      const item = 
        'INSERT INTO item(compra_id, produto_id, quantidade) VALUES(' +
        `${compra_id.rows[0].currval}, ` +
        `'${produto.idProduto}', ` +
        `'${produto.quantidade}'` +
        ');'

      await this.pool.query(item);
    });
    this.pool.end;

    return res;
  }
}

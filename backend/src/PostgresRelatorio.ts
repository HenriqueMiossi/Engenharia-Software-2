import { IDatabase } from './IDatabase';
import { Pool } from 'pg';
import Funcionario from './Funcionario';

export default class PostgresRelatorio extends IDatabase {
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

  async getClientesComCompras() {
    this.conectar();

    const query = 'SELECT cliente.id, cliente.nome FROM cliente WHERE EXISTS' +
        '(SELECT compra.cliente_id FROM compra WHERE compra.cliente_id = cliente.id)';

    const res = await this.pool.query(query);
    this.pool.end;

    return res.rows;
  }

  async getProdutosAbaixoEstoqueMinimo() {
    this.conectar();

    const query = 'SELECT produto.id, descricao FROM produto WHERE quantidade_estoque < estoque_minimo';

    const res = await this.pool.query(query);
    this.pool.end;

    return res.rows;
  }

  async getFolhaPagamento() {
    this.conectar();

    const query = 'SELECT id FROM funcionario';
    const res = await this.pool.query(query);

    const funcionario = new Funcionario();
    let salarios = [];

    for (const func of res.rows) {
      const salario = {
        id: `${func.id}`,
        salario: await funcionario.consultaSalario(func.id)
      }
      salarios.push(salario);
    }

    this.pool.end;

    return salarios;
  }

  async getComprasPorPeriodo(de: string, ate: string) {
    this.conectar();

    const query = 'SELECT id FROM compra ' +
      `WHERE data_criacao >= '${de}' AND data_criacao < '${ate}'`;

    const res = await this.pool.query(query);

    this.pool.end;

    return res.rows;
  }
}

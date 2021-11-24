import { IDatabase, endereco } from './IDatabase';
import { Pool } from 'pg';
import Compra from './Compra';

export default class PostgresFuncionario extends IDatabase {
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
    this.pool.connect((err, client, done) => {
      if (err) {
        console.error('connection error', err.stack);
      } else {
        console.log('connected');
      }
    });
  }

  async criarFuncionario(
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco,
    matricula: string,
    salario: number,
  ) {
    this.conectar();

    const query =
      'INSERT INTO endereco(rua, cidade, numero, cep, uf) VALUES(' +
      `'${endereco.rua}', ` +
      `'${endereco.cidade}', ` +
      `'${endereco.numero}', ` +
      `'${endereco.cep}', ` +
      `'${endereco.uf}'` +
      ');\n' +
      'INSERT INTO funcionario(matricula, nome, telefone, cpf, salario_base, endereco_id) VALUES(' +
      `'${matricula}', ` +
      `'${nome}', ` +
      `'${telefone}', ` +
      `'${cpf}', ` +
      `'${salario}', ` +
      `(SELECT currval(pg_get_serial_sequence('endereco', 'id')))` +
      ');';

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async removeFuncionario(id: string) {
    this.conectar();

    const endereco_id = await this.pool.query(
      `SELECT endereco_id FROM funcionario WHERE id = ${id}`
    );

    const query =
      `DELETE FROM funcionario WHERE id = ${id};` +
      `DELETE FROM endereco WHERE id = ${endereco_id.rows[0].endereco_id};`
      ;

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async editarFuncionario(
    id: string,
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco,
    matricula: string, 
    salario: number
  ) {
    this.conectar();

    const endereco_id = await this.pool.query(
      `SELECT endereco_id FROM funcionario WHERE id = ${id}`
    );
    
    const query =
      'UPDATE funcionario ' +

      `SET matricula = '${matricula}'` +
      `, nome = '${nome}' ` +
      `, telefone = '${telefone}'` +
      `, cpf = '${cpf}' ` +
      `, salario_base = '${salario}' ` +
      `WHERE id = ${id};\n` +
      
      'UPDATE endereco ' +
      
      `SET rua = '${endereco.rua}'` +
      `, cidade = '${endereco.cidade}'` +
      `, numero = '${endereco.numero}'` +
      `, cep = '${endereco.cep}'` +
      `, uf = '${endereco.uf}' ` +
      `WHERE id = ${endereco_id.rows[0].endereco_id};`;

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async consultarFuncionario(id: string) {
    this.conectar();

    const query =
      'SELECT * FROM funcionario ' +
      'INNER JOIN endereco ON funcionario.endereco_id = endereco.id ' +
      `WHERE funcionario.id = ${id}`;

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async listarTodosFuncionarios() {
    this.conectar();

    const query = 'SELECT * FROM funcionario ORDER BY id ASC';

    const res = await this.pool.query(query);
    this.pool.end;

    return res;
  }

  async consultaSalario(idFuncionario: string) {
    this.conectar();
    const compra = new Compra();

    const queryCompras = `SELECT id FROM compra WHERE funcionario_id = ${idFuncionario}`;
    const comprasExecutadas = await this.pool.query(queryCompras);
    
    let vendasTotais = 0;
    
    for (const item of comprasExecutadas.rows) {
      const id = item.id;
      const precoAtual = await compra.consultaPreco(id, 1);
      vendasTotais += precoAtual[0];
    }
    const salarioBase = await this.pool.query(
      `SELECT salario_base FROM funcionario WHERE id = ${idFuncionario}`
    );

    this.pool.end;

    return {
      "Vendas": vendasTotais,
      "Salariobase": salarioBase.rows[0].salario_base
    };
  }
}

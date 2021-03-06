import { IDatabase, endereco } from './IDatabase';
import { Client } from 'pg';

export default class PostgresCliente extends IDatabase {
  private client: Client;

  constructor() {
    super();
    this.client = new Client({
      port: 5432,
      user: 'postgres',
      password: 'docker',
      database: 'engsoft2',
    });
  }

  private conectar() {
    this.client.connect((err) => {
      if (err) {
        console.error('connection error', err.stack);
      } else {
        console.log('connected');
      }
    });
  }

  async criarCliente(
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco
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
      'INSERT INTO cliente(nome, telefone, cpf, endereco_id) VALUES(' +
      `'${nome}', ` +
      `'${telefone}', ` +
      `'${cpf}', ` +
      `(SELECT currval(pg_get_serial_sequence('endereco', 'id')))` +
      ');';

    const res = await this.client.query(query);
    this.client.end;

    return res;
  }

  async removeCliente(id: string) {
    this.conectar();

    const endereco_id = await this.client.query(
      `SELECT endereco_id FROM cliente WHERE id = ${id}`
    );

    console.log(endereco_id.rows[0].endereco_id);
    
    const query =
      `DELETE FROM cliente WHERE id = ${id};` +
      `DELETE FROM endereco WHERE id = ${endereco_id.rows[0].endereco_id};`
      ;

    const res = await this.client.query(query);
    this.client.end;

    return res;
  }

  async editarCliente(
    id: string,
    nome: string,
    telefone: string,
    cpf: string,
    endereco: endereco
  ) {
    this.conectar();

    const endereco_id = await this.client.query(
      `SELECT id FROM cliente WHERE endereco_id = ${id}`
    );

    const query =
      'UPDATE cliente ' +

      `SET nome = '${nome}'` +
      `, telefone = '${telefone}'` +
      `, cpf = '${cpf}' ` +
      `WHERE id = ${id};\n` +
      
      'UPDATE endereco ' +
      
      `SET rua = '${endereco.rua}'` +
      `, cidade = '${endereco.cidade}'` +
      `, numero = '${endereco.numero}'` +
      `, cep = '${endereco.cep}'` +
      `, uf = '${endereco.uf}' ` +
      `WHERE id = ${endereco_id.rows[0].id};`;

    const res = await this.client.query(query);
    this.client.end;

    return res;
  }

  async consultarCliente(id: string) {
    this.conectar();

    const query =
      'SELECT * FROM cliente ' +
      'INNER JOIN endereco ON cliente.endereco_id = endereco.id ' +
      `WHERE cliente.id = ${id}`;

    const res = await this.client.query(query);
    this.client.end;

    return res;
  }

  async listarTodosClientes() {
    this.conectar();

    const query = 'SELECT * FROM cliente ORDER BY id ASC';

    const res = await this.client.query(query);
    this.client.end;

    return res;
  }
}

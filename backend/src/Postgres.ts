import IDatabase from "./IDatabase";
import { Pool } from "pg";

export default class Postgres extends IDatabase {
    private pool: Pool;

    constructor() {
        super();
        this.pool = new Pool({
            port: 5432,
            user: 'postgres',
            password: 'docker',
            database: 'engsoft2'
        });
    }

    private conectar() {
        this.pool.connect(err => {
            if (err) {
              console.error('connection error', err.stack)
            } else {
              console.log('connected')
            }
        });
    }

    async criarCliente(nome: string, telefone: string, cpf: string) {
        this.conectar();

        const query = 'INSERT INTO cliente(nome, telefone, cpf) VALUES('
        + `'${nome}', `
        + `'${telefone}', `
        + `'${cpf}'`
        + ');'

        const res = await this.pool.query(query);
        this.pool.end;

        return res;
    }

    removerCliente() {
        console.log("Remover Cliente");
    }
    
    async editarCliente(id: string, nome: string, telefone: string, cpf: string) {
        this.conectar();

        const query = 'UPDATE cliente ' 
        + `SET nome = '${nome}'`
        + `, telefone = '${telefone}'`
        + `, cpf = '${cpf}' `
        + `WHERE id = ${id};`

        const res = await this.pool.query(query);
        this.pool.end;

        return res;
    }

    async consultarCliente(id: string) {
        this.conectar();

        const query = `SELECT * FROM cliente WHERE id = ${id}`;

        const res = await this.pool.query(query);
        this.pool.end;

        return res;
    }

    async listarTodosClientes() {
        this.conectar();

        const query = 'SELECT * FROM cliente ORDER BY id ASC';

        const res = await this.pool.query(query);
        this.pool.end;

        return res;
    }
}

import express from 'express';
import cors from 'cors';
import Postgres from './Postgres';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/clientes', async (request, response) => {
    const database = new Postgres();
    const res = await database.listarTodosClientes();

    return response.json({ clientes: res.rows });
});

app.get('/cliente/:id', async (request, response) => {
    const database = new Postgres();
    const idCliente = request.params.id;
    const res = await database.consultarCliente(idCliente);

    return response.json({ cliente: res.rows });
});

app.post('/cliente', async (request, response) => {
    const database = new Postgres();
    const { nome, telefone, cpf, endereco } = request.body;
    const res = await database.criarCliente(nome, telefone, cpf, endereco);

    return response.status(201).send();
});

app.put('/cliente/:id', async (request, response) => {
    const database = new Postgres();
    const { nome, telefone, cpf, endereco } = request.body;
    const idCliente = request.params.id;
    const res = await database.editarCliente(idCliente, nome, telefone, cpf, endereco);

    return response.status(204).send();
});

app.delete('/cliente/:id', async (request, response) => {
    const database = new Postgres();
    const idCliente = request.params.id;
    const res = await database.removerCliente(idCliente);

    return response.status(204).send();
});

app.listen(3333);

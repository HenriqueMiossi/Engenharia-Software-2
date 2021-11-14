import express from 'express';
import Postgres from './Postgres';

const app = express();
app.use(express.json());

app.get('/clientes', async (request, response) => {
    const database = new Postgres();
    const res = await database.listarTodosClientes();

    return response.json({ clientes: res.rows }).send();
});

app.get('/cliente/:id', async (request, response) => {
    const database = new Postgres();
    const idCliente = request.params.id;
    const res = await database.consultarCliente(idCliente);

    return response.json({ clientes: res.rows }).send();
});

app.post('/cliente', async (request, response) => {
    const database = new Postgres();
    const { nome, telefone, cpf } = request.body;
    const res = await database.criarCliente(nome, telefone, cpf);

    return response.status(201).send();
});

app.put('/cliente/:id', async (request, response) => {
    const database = new Postgres();
    const { nome, telefone, cpf } = request.body;
    const idCliente = request.params.id;
    const res = await database.editarCliente(idCliente, nome, telefone, cpf);

    return response.status(200).send();
});

app.listen(3333);

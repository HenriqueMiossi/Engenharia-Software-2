import express from "express";
import cors from "cors";
import Cliente from "./Cliente";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/clientes", async (request, response) => {
  const cliente = new Cliente();
  const res = await cliente.listarTodosClientes();

  return response.json({ clientes: res.rows });
});

app.get("/cliente/:id", async (request, response) => {
  const idCliente = request.params.id;
  const cliente = new Cliente();
  const res = await cliente.consultaCliente(idCliente);

  return response.json({ cliente: res.rows });
});

app.post("/cliente", (request, response) => {
  const { nome, telefone, cpf, endereco } = request.body;
  const cliente = new Cliente();
  cliente.criaCliente(nome, telefone, cpf, endereco);

  return response.status(201).send();
});

app.put("/cliente/:id", async (request, response) => {
  const cliente = new Cliente();
  const { nome, telefone, cpf, endereco } = request.body;
  const idCliente = request.params.id;
  const res = await cliente.editarCliente(
    idCliente,
    nome,
    telefone,
    cpf,
    endereco
  );

  return response.status(204).send();
});

app.delete("/cliente/:id", async (request, response) => {
  const cliente = new Cliente();
  const idCliente = request.params.id;
  const res = await cliente.removeCliente(idCliente);

  return response.status(204).send();
});

app.listen(3333);

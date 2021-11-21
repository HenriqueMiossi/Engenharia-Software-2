import express from "express";
import cors from "cors";

import Cliente from "./Cliente";
import Funcionario from "./Funcionario";

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






app.get("/funcionarios", async (request, response) => {
  const funcionario = new Funcionario();
  const res = await funcionario.listarTodosFuncionarios();

  return response.json({ funcionarios: res.rows });
});

app.get("/funcionario/:id", async (request, response) => {
  const idFuncionario = request.params.id;
  const funcionario = new Funcionario();
  const res = await funcionario.consultaFuncionario(idFuncionario);

  return response.json({ funcionario: res.rows });
});

app.post("/funcionario", (request, response) => {
  const { nome, telefone, cpf, endereco, matricula, salario } = request.body;
  const funcionario = new Funcionario();
  funcionario.criaFuncionario(nome, telefone, cpf, endereco, matricula, salario);

  return response.status(201).send();
});

app.put("/funcionario/:id", async (request, response) => {
  const funcionario = new Funcionario();
  const { nome, telefone, cpf, endereco, matricula, salario } = request.body;
  const idFuncionario = request.params.id;
  const res = await funcionario.editarFuncionario(
    idFuncionario,
    nome,
    telefone,
    cpf,
    endereco,
    matricula,
    salario
  );

  return response.status(204).send();
});

app.delete("/funcionario/:id", async (request, response) => {
  const funcionario = new Funcionario();
  const idFuncionario = request.params.id;
  const res = await funcionario.removeFuncionario(idFuncionario);

  return response.status(204).send();
});

app.listen(3333);

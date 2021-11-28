import express from "express";
import cors from "cors";

import Cliente from "./Cliente";
import Funcionario from "./Funcionario";
import Produto from "./Produto";
import Compra from "./Compra";
import Relatorios from "./Relatorios";

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




app.get("/produtos", async (request, response) => {
  const produto = new Produto();
  const res = await produto.listarTodosProdutos();

  return response.json({ produtos: res.rows });
});

app.post("/produto", (request, response) => {
  const { codigo, descricao, valor, quantidade_estoque, estoque_minimo, validade } = request.body;
  const produto = new Produto();
  produto.criaProduto(codigo, descricao, valor, quantidade_estoque, estoque_minimo, validade);

  return response.status(201).send();
});

app.delete("/produto/:id", async (request, response) => {
  const produto = new Produto();
  const idProduto = request.params.id;
  const res = await produto.removeProduto(idProduto);
  if (res.command == 'DELETE') {
    return response.json({
      "Response": "Produto deletado com sucesso"
    }).send();
  }
  else {
    return response.json({
      "Response": "Nao foi possivel deletar produto solicitado pois ele contem uma compra associada"
    }).send();
  }
});

app.post("/compra", (request, response) => {
  const { idCliente, idFuncionario, formaPagamento, itens } = request.body;
  const compra = new Compra();
  compra.criaCompra(idCliente, idFuncionario, formaPagamento, itens);

  return response.status(201).send();
});

app.get("/compra/:id", async (request, response) => {
  const compra = new Compra();
  const { parcelas } = request.body;
  const res = await compra.consultaPreco(request.params.id, parcelas);

  if(res[1] == 0) {
    return response.json({
      "Valor da compra": res[0]
    });
  }
  return response.json({
    "Quantidade de parcelas": res[1],
    "Valor da parcela": parseFloat(res[0].toFixed(2))
  });
});

app.get("/funcionario/:id/salario", async (request, response) => {
  const idFuncionario = request.params.id;
  const funcionario = new Funcionario();
  const res = await funcionario.consultaSalario(idFuncionario); 

  return response.json(res);
});

app.get("/relatorios/:de/:ate", async (request, response) => {
  const relatorios = new Relatorios();
  const clientes = await relatorios.getClientesComCompras();
  const produtos = await relatorios.getProdutosAbaixoEstoqueMinimo();
  const pagamento = await relatorios.getFolhaPagamento();
  const vendas = await relatorios.getComprasPorPeriodo(request.params.de, request.params.ate);

  return response.json({
    "Clientes com compras": clientes,
    "Compras no periodo": vendas,
    "Produtos abaixo do estoque minimo": produtos,
    "Folha de pagamento": pagamento
  });
});

app.listen(3333);

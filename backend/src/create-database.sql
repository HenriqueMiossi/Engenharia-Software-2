/* Referenciada por cliente e funcionario */
CREATE TABLE IF NOT EXISTS endereco (
	id serial PRIMARY KEY,
  	rua VARCHAR ( 50 ) NOT NULL,
  	cidade VARCHAR ( 50 ) NOT NULL,
  	numero INTEGER NOT NULL,
  	cep VARCHAR ( 10 ) NOT NULL,
  	uf VARCHAR ( 2 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS cliente (
	id serial PRIMARY KEY,
  	nome VARCHAR ( 50 ) NOT NULL,
  	telefone VARCHAR ( 15 ) NOT NULL,
  	cpf VARCHAR ( 14 ) UNIQUE NOT NULL,
	endereco_id INTEGER REFERENCES endereco ( id )
);

CREATE TABLE IF NOT EXISTS funcionario (
	id serial PRIMARY KEY,
  	matricula VARCHAR ( 10 ) UNIQUE NOT NULL,
  	nome VARCHAR ( 50 ) NOT NULL,
  	telefone VARCHAR ( 15 ) NOT NULL,
  	cpf VARCHAR ( 14 ) UNIQUE NOT NULL,
  	salario_base REAL NOT NULL,
	endereco_id INTEGER REFERENCES endereco ( id )
);

CREATE TABLE IF NOT EXISTS produto (
	id serial PRIMARY KEY,
  	codigo VARCHAR ( 10 ) NOT NULL,
  	descricao VARCHAR ( 255 ) NOT NULL,
  	valor REAL NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    estoque_minimo INTEGER NOT NULL,
    validade DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS compra (
	id serial PRIMARY KEY,
  	cliente_id INTEGER REFERENCES cliente ( id ),
  	funcionario_id INTEGER REFERENCES funcionario ( id ),
  	forma_pagamento VARCHAR ( 8 ) NOT NULL
);

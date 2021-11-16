CREATE TABLE IF NOT EXISTS cliente (
	id serial PRIMARY KEY,
  	nome VARCHAR ( 50 ) NOT NULL,
  	telefone VARCHAR ( 15 ) NOT NULL,
  	cpf VARCHAR ( 14 ) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS endereco (
	id serial PRIMARY KEY,
  	rua VARCHAR ( 50 ) NOT NULL,
  	cidade VARCHAR ( 50 ) NOT NULL,
  	numero INTEGER NOT NULL,
  	cep VARCHAR ( 10 ) NOT NULL,
  	uf VARCHAR ( 2 ) NOT NULL,
  	cliente_id INTEGER REFERENCES cliente ( id )
);

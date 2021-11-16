# Trabalho do 2o Bimestre - Engenharia de Software II

## Integrantes do Grupo

* Gabriel Melo
* Henrique Miossi
* Matheus Ferreira

## Tecnologias

* Linguagem: Typescript;
* SGBD: PostgreSQL;
* Plataforma: web;

## Rotas

* Consultar cliente:
```json
GET /cliente/:id
```

* Listar todos os clientes:
```json
GET /clientes
```

* Cadastrar cliente:
```json
POST /cliente

{
	"nome": "Joel",
	"telefone": "202-555-0135",
	"cpf": "906.186.997-83",
	"endereco": {
		"rua": "Rua Silva Castro",
		"cidade": "Belém",
		"numero": 472,
		"cep": "66073-400",
		"uf": "PA"
	}
}
```

* Editar cliente:
```json
PUT /cliente/:id

{
	"nome": "Joel",
	"telefone": "202-555-0135",
	"cpf": "906.186.997-83",
	"endereco": {
		"rua": "Rua Silva Castro",
		"cidade": "Belém",
		"numero": 472,
		"cep": "66073-400",
		"uf": "PA"
	}
}
```

* Remover cliente:
```json
DELETE /cliente/:id
```

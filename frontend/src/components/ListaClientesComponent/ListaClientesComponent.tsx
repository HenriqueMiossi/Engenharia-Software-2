import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListaClientesComponent.css';

import BotaoAtualizarComponent from '../BotaoAtualizarComponent/BotaoComponent';

function ListaClientesComponent() {
  interface cliente {
    id: number,
    nome: string,
    telefone: string,
    cpf: string
  }

  const [listaClientes, setListaClientes] = useState<cliente[]>([]);

  useEffect(() => {
    async function fetchClientes() {
      const response = await axios.get('http://localhost:3333/clientes');
      setListaClientes(response.data.clientes);
    }

    fetchClientes();
  }, []);

  console.log(listaClientes);

  return (
    <div className="clientsListContainer">
      <ul className="clientsList">
        { listaClientes.map(cliente => 
          <li key={cliente.id} className="clientsListItem">
            <p>Id: {cliente.id}</p>
            <p>Nome: {cliente.nome}</p>
            <p>Telefone: {cliente.telefone}</p>
            <p>CPF: {cliente.cpf}</p>
          </li>  
        ) }
      </ul>
    </div>
  );
}

export default ListaClientesComponent;

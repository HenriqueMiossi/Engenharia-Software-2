import React from 'react';
import './ListarClientes.css';

import ListaClientesComponent from '../../components/ListaClientesComponent/ListaClientesComponent';

function ListarClientes() {
  return (
    <div>
      <h1 className="centerText">Lista de Clientes</h1>
      <ListaClientesComponent />
    </div>
  );
}

export default ListarClientes;

import React from 'react';
import './ConsultarCliente.css';

import ListaClientesComponent from '../../components/ListaClientesComponent/ListaClientesComponent';

function ConsultarCliente() {
  return (
    <div>
      <h1 className="centerText">Consulta do Cliente</h1>
      <ListaClientesComponent />
    </div>
  );
}

export default ConsultarCliente;

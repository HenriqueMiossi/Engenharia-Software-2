import React from 'react';
import './BotaoAtualizarComponent.css';

function BotaoAtualizarComponent() {
  return (
    <div className="botaoAtualizar" onClick={ () => console.log('aa') }>
      Atualizar
    </div>
  );
}

export default BotaoAtualizarComponent;

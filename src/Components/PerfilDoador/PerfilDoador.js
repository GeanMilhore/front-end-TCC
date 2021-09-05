import React from 'react'
import PerfilHeader from './PerfilHeader';
import Conteudo from './Conteudo/Conteudo';
import style from './PerfilDoador.module.css'

const PerfilDoador = () => {
    return (
        <div className={style.containerConta}>
          <PerfilHeader />
          <Conteudo />
        </div>
      );
}

export default PerfilDoador

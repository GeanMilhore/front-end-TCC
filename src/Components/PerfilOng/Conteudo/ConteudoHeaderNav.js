import React from "react";
import { NavLink } from "react-router-dom";
import style from './ConteudoHeaderNav.module.css'

const ConteudoHeaderNav = () => {
  return (
    <header className={style.headerNav}>
      <NavLink to="">Feed</NavLink>
      <NavLink to="doacoesCadastradas">Doações Cadastradas</NavLink>
      <NavLink to="doacoesRecebidas">Doações Recebidas</NavLink>
      <NavLink to="propostasRecebidas">Propostas Recebidas</NavLink>
    </header>
  );
};

export default ConteudoHeaderNav;

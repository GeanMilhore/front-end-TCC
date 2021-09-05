import React from "react";
import { NavLink } from "react-router-dom";
import style from './ConteudoHeaderNav.module.css'
import { Navigate } from "react-router";

const ConteudoHeaderNav = () => {
  return (
    <header className={style.headerNav}>
      <NavLink to="doacoesRealizadas">Doações Realizadas</NavLink>
      <NavLink to="PropostasEnviadas">Propostas Feitas</NavLink>
    </header>
  );
};

export default ConteudoHeaderNav;

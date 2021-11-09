import React from "react";
import style from "./CardPerfil.module.css";
import { NavLink } from "react-router-dom";

const CardPerfil = ({ nome, estado, cidade, telefone, id }) => {
  return (
    <NavLink to={`/ong/${id}`} className={style.cardConta}>
      <span>{nome}</span>
      <span>{telefone}</span>
      <span>
        {estado} , {cidade}
      </span>
    </NavLink>
  );
};

export default CardPerfil;

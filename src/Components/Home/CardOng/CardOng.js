import React from "react";
import style from "./CardOng.module.css";
import { NavLink } from "react-router-dom";

const CardOng = ({ nomeFantasia, estado, cidade, telefone, id }) => {
  return (
    <NavLink to={`/ong/${id}`} className={style.cardConta}>
      <span>{nomeFantasia}</span>
      <span>{telefone}</span>
      <span>
        {estado} , {cidade}
      </span>
    </NavLink>
  );
};

export default CardOng;

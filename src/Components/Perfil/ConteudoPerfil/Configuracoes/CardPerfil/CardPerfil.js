import React from "react";
import style from "./CardPerfil.module.css";

const CardPerfil = ({ titulo, icone, conteudo }) => {
  return (
    <div className={style.card}>
      <img src={icone} alt="icone" />
      <div>
        <span>{titulo}</span>
        <span>{conteudo}</span>
      </div>
    </div>
  );
};

export default CardPerfil;

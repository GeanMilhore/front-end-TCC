import React from "react";
import style from "./CardPerfil.module.css";
import { NavLink } from "react-router-dom";
import imagempadrao from "../../../resources/images/ongprofile.png"

const CardPerfil = ({ nome, imagemOng, estado, cidade, telefone, id }) => {
  return (
    <NavLink to={`/ong/${id}`} className={style.cardConta}>
      <div
        className={style.cardImagem}
        style={{ backgroundImage: `url(${imagemOng ? imagemOng : imagempadrao})` }}
      >
        .
      </div>
      <div className={style.infoCard}>
        <span>{nome}</span>
        <span>
          {estado} , {cidade}
        </span>
      </div>
    </NavLink>
  );
};

export default CardPerfil;

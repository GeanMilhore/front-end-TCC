import React from "react";
import style from "./InfoPerfil.module.css";

const InfoPerfil = ({ icone, titulo, informacao }) => {
  return (
    <>
      <div className={style.infoPerfil}>
        <span>
          <div>
            <img src={icone} alt="icone" />
            <h4>{titulo}</h4>
          </div>
        </span>
        <span className={style.informacao}>{informacao}</span>
      </div>
    </>
  );
};

export default InfoPerfil;

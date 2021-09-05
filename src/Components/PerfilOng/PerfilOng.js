import React from "react";
import style from "./PerfilOng.module.css";
import PerfilHeader from "./PerfilHeader";
import Conteudo from "./Conteudo/Conteudo";

const PerfilOng = () => {
  return (
    <div className={style.containerConta}>
      <PerfilHeader />
      <Conteudo />
    </div>
  );
};

export default PerfilOng;

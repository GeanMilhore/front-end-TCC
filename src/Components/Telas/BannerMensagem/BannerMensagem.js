import React from "react";
import style from "./BannerMensagem.module.css";

const BannerMensagem = ({ img, mensagem, submensagem }) => {
  return (
    <>
      <div className={style.banner}>
        <img src={img} alt="banner" />
        <div />
        <div>
          <h3>{mensagem}</h3>
          <h4>{submensagem}</h4>
        </div>
      </div>
    </>
  );
};

export default BannerMensagem;

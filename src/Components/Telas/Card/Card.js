import React from "react";
import style from "./Card.module.css";

const Card = ({ foto, nomeItem, nomeOng, status, labels }) => {
  return (
    <div className={style.card}>
      <div
        className={style.cardImg}
        style={{ backgroundImage: `url('${foto}')` }}
      ></div>
      <div>
        <span>{labels.label1}</span>
        <p>{nomeItem}</p>
        <span>{labels.label2}</span>
        <p>{nomeOng}</p>
        <span>{labels.label3}</span>
        <p style={{color: `${status == 'PENDENTE' ? 'orange' : status === 'ACEITO' ? 'green' : 'red'}`}}>{status}</p>
      </div>
    </div>
  );
};

export default Card;

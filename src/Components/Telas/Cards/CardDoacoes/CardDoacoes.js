import React from "react";
import style from "./CardDoacoes.module.css";
import Modal from '../../../Smart-components/Modal/Modal'

const Card = ({ foto, nomeItem, nomeOng, quantidade, labels, ...props }) => {

  return (
    <>
    <div className={style.card} {...props} >
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
        <p >{quantidade}</p>
      </div>
    </div>
    </>
  );
};

export default Card;

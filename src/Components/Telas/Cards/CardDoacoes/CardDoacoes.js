import React from "react";
import style from "./CardDoacoes.module.css";
import Modal from '../../../Smart-components/Modal/Modal'

const Card = ({ foto, nomeItem, nomeOng, dataEntrega, labels, ...props }) => {

  const [verModal, setVerModal] = React.useState(false)

  return (
    <>
    <div className={style.card} {...props} onClick={() => setVerModal(true)}>
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
        <p >{dataEntrega}</p>
      </div>
    </div>
    {verModal ? <Modal onClose={setVerModal}>{nomeItem}</Modal> : null}
    </>
  );
};

export default Card;
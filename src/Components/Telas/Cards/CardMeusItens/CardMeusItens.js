import React from "react";
import style from "./CardMeusItens.module.css";
import Modal from '../../../Smart-components/Modal/Modal'
import Button from '../../../Smart-components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'


const Card = ({ foto, nomeItem, descricao, status, labels, ...props }) => {

  const [verModalEdit, setVerModalEdit] = React.useState(false)
  const [verModalExclude, setVerModalExclude] = React.useState(false)

  return (
    <>
      <div className={style.card} {...props}>
        <div
          className={style.cardImg}
          style={{ backgroundImage: `url('${foto}')` }}
        ></div>
        <div>
          <span>{labels.label1}</span>
          <p>{nomeItem}</p>
          <span>{labels.label2}</span>
          <p>{descricao}</p>
          <span>{labels.label3}</span>
          <p style={{ color: `${status == 'DISPONIVEL' ? 'green' : status === 'SOLICITADO' ? 'oragne' : 'red'}` }}>{status}</p>
        </div>
        <div className={style.cardBotoes}>
          <Button onClick={() => setVerModalEdit(true)}><FontAwesomeIcon icon={faEdit} /></Button>
          <Button onClick={() => setVerModalExclude(true)}><FontAwesomeIcon icon={faWindowClose} /></Button>
        </div>
      </div>
      {verModalEdit ?
        <Modal onClose={setVerModalEdit}>
          <div className={style.modalEdita}>
            <span>Editar</span>
          </div>
        </Modal> : null}
      {verModalExclude ?
        <Modal onClose={setVerModalExclude}>
          <div className={style.modalExclui}>
            <span>Excluir</span>
          </div>
        </Modal> : null}
    </>
  );
};

export default Card;

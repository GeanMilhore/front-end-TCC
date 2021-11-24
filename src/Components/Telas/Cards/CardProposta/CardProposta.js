import React from "react";
import style from "./CardProposta.module.css";
import Modal from '../../../Smart-components/Modal/Modal'
import Button from '../../../Smart-components/Button/Button'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWindowClose} from '@fortawesome/free-solid-svg-icons'

const Card = ({ foto, nomeItem, nomeOng, status, labels, ...props }) => {

  const [verModal, setVerModal] = React.useState(false)

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
          <p>{nomeOng}</p>
          <span>{labels.label3}</span>
          <p style={{ color: `${status == 'PENDENTE' ? 'orange' : status === 'ACEITO' ? 'green' : 'red'}` }}>{status}</p>
          <Button onClick={() => setVerModal(true)}>Cancelar<FontAwesomeIcon icon={faWindowClose} /></Button>
        </div>
      </div>
      {verModal ?
        <Modal onClose={setVerModal}
        >
          <div className={style.modalContainer}>
            <span>
            Você tem certeza que quer cancelar a proposta do item <strong>{nomeItem}</strong> ?
            </span>
            <div>
              <Button>Sim</Button>
              <Button onClick={() => document.getElementById('modal').click()}>Não</Button>
            </div>
          </div>
        </Modal> : null}
    </>
  );
};

export default Card;

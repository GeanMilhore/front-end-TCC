import React from "react";
import style from "./CardDoacao.module.css";
import Modal from '../../../../Smart-components/Modal/Modal'
import Button from '../../../../Smart-components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from "../../../../../Custom-Hooks/UseFetch";
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { EXCLUIR_CAMPANHA } from "../../../../../api";
import CriarCampanha from "../../../../CriarCampanha/CriarCampanha";

const CardDoacao = ({ foto, nomeItem, descricao, quantidade, labels, ...props }) => {

  const [verModal, setVerModal] = React.useState(false)
  const [modalEditar, setModalEditar] = React.useState(false)
  const { error, dados, request, loading } = useFetch()



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
          <p >{quantidade}</p>
          <div className={style.buttonsCard}>
          </div>
        </div>
      </div>
      {verModal ?
        <Modal onClose={setVerModal}
          estilo={{
            position: 'fixed',
            backgroundColor: 'transparent',
            top: '-32vh',
            left: 'calc(50% - 50vw)',
          }}

          estiloContainer={{
            boxShadow: '0 0 100px black'
          }}
        >
          <div className={style.modalContainer}>
            <span>
              Você tem certeza que quer excluir a campanha <strong>{nomeItem}</strong> ?
            </span>
            <div>
            </div>
          </div>
        </Modal> : null}
    </>
  );
};

export default CardDoacao;

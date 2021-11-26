import React from "react";
import style from "./CardVerCampanha.module.css";
import Modal from '../../../Smart-components/Modal/Modal'
import Button from '../../../Smart-components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from "../../../../Custom-Hooks/UseFetch";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { EXCLUIR_CAMPANHA } from "../../../../api";
import CriarCampanha from "../../../CriarCampanha/CriarCampanha";

const CardVerCampanha = ({ setDadosEdicao, abrirEdicao, idCampanha, foto, nomeItem, descricao, quantidade, labels, atualizar, ...props }) => {

  const [verModal, setVerModal] = React.useState(false)
  const [modalEditar, setModalEditar] = React.useState(false)
  const { error, dados, request, loading } = useFetch()

  async function excluirCampanha({ target }) {
    const token = window.localStorage.getItem('token')

    const { url, options } = EXCLUIR_CAMPANHA(token, target.id)

    const { response, json } = await request(url, options)

    if (response.ok) {
      window.alert('Campanha deletada com Sucesso')
      atualizar()
    }
  }

  function ambienteEdicao() {
    setDadosEdicao(
      {
        id: idCampanha,
        nome: nomeItem,
        descricao: descricao,
        quantidade: quantidade,
        image: foto
      })
    abrirEdicao(true)
  }

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
            <Button onClick={() => setVerModal(true)}>Informações<FontAwesomeIcon icon={faInfoCircle} /></Button>
            <Button style={{ marginTop: '2rem' }} onClick={() => null}>Doar<FontAwesomeIcon icon={faHeart} /></Button>
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
            // height: 'auto',
            // widht: 'auto',
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
              <Button id={idCampanha} onClick={(event) => excluirCampanha(event)}>Sim</Button>
              <Button onClick={() => setVerModal(false)}>Não</Button>
            </div>
          </div>
        </Modal> : null}
    </>
  );
};

export default CardVerCampanha;

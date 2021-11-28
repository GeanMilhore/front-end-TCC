import React from "react";
import style from "./CardProposta.module.css";
import Modal from '../../../Smart-components/Modal/Modal'
import Button from '../../../Smart-components/Button/Button'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWindowClose} from '@fortawesome/free-solid-svg-icons'
import { CANCELAR_PROPOSTA } from "../../../../api"
import useFetch from "../../../../Custom-Hooks/UseFetch";

const Card = ({ idProposta, atualizar, foto, nomeItem, nomeOng, status, labels, ...props }) => {

  const [verModal, setVerModal] = React.useState(false)
  const {request, loading ,error ,dados} = useFetch()

  async function cancelarProposta(){
    const token = window.localStorage.getItem('token')

    const {url, options} = CANCELAR_PROPOSTA(token, idProposta)

    const {response, json } = await request(url, options)

    if(response.ok){
      window.alert('Proposta Cancelada')
      document.getElementById('modal').click()
      console.log(json)
      atualizar()
    } else {
      window.alert('oops')
    }
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
          <p>{nomeOng}</p>
          <span>{labels.label3}</span>
          <p style={{ color: `${status == 'PENDENTE' ? 'orange' : status === 'ACEITO' ? 'green' : 'red'}` }}>{status}</p>
          <Button disabled={status === 'PENDENTE' ? false : true } onClick={() => setVerModal(true)}>Cancelar<FontAwesomeIcon icon={faWindowClose} /></Button>
        </div>
      </div>
      {verModal ?
        <Modal onClose={setVerModal}
          estilo={{
            backgroundColor: 'transparent',
            top: '-32vh',
            left: '-20vw',
            // height: 'auto',
            // widht: 'auto',
          }}

          estiloContainer={{
            boxShadow: '0 0 100px black'
          }}
        >
          <div className={style.modalContainer}>
            <span>
            Você tem certeza que quer cancelar a proposta do item <strong>{nomeItem}</strong> ?
            </span>
            <div>
              <Button onClick={() => cancelarProposta()}>Sim</Button>
              <Button onClick={() => document.getElementById('modal').click()}>Não</Button>
            </div>
          </div>
        </Modal> : null}
    </>
  );
};

export default Card;

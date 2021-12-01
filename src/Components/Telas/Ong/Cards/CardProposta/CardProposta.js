import React from "react";
import style from "./CardProposta.module.css";
import Button from '../../../../Smart-components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from "../../../../../Custom-Hooks/UseFetch";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { DECIDIR_PROPOSTA } from "../../../../../api";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Modal from "../../../../Smart-components/Modal/Modal"

toast.configure()

const CardProposta = ({
  idProposta,
  foto,
  nomeItem,
  descricao,
  quantidade,
  labels,
  nomeDoador,
  atualizar,
  ...props
}) => {

  const { error, dados, request, loading } = useFetch()
  const [confirm, setConfirm] = React.useState(null)
  const [escolha, setEscolha] = React.useState(null)

  async function aceitarProposta() {
    const token = Number(window.localStorage.getItem('token')) - 1
    const { url, options } = DECIDIR_PROPOSTA(token, idProposta, 'aceitar')
    try {
      const { response, json } = await request(url, options)
      if (response.ok) {
        console.log(json)
        toast.success('Proposta Aceita!')
        atualizar()
      }
    } catch (error) {
      toast.error('Ops! Algo deu errado...')
      console.log(error)
    }
  }

  async function recusarProposta() {
    const token = Number(window.localStorage.getItem('token')) - 1
    const { url, options } = DECIDIR_PROPOSTA(token, idProposta, 'recusado')

    try {
      const { response, json } = await request(url, options)
      if (response.ok) {
        toast.success('Proposta Recusada!')
        console.log(json)
        atualizar()
      }
    } catch (error) {
      toast.error('Ops! Algo deu errado...')
      console.log(error)
    }
  }

  async function decidirProposta(opcao) {
    if (opcao === 'ACEITAR') {
      aceitarProposta()
    } else {
      recusarProposta()
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
          <p>{descricao}</p>
          <span>{labels.label3}</span>
          <p >{nomeDoador}</p>
          <div className={style.buttonsCard}>
            <Button onClick={() => { setEscolha('ACEITAR'); setConfirm(true) }}>Aceitar<FontAwesomeIcon icon={faCheckCircle} /></Button>
            <Button style={{ marginTop: '2rem' }} onClick={() => { setEscolha('RECUSAR'); setConfirm(true) }}>Recusar<FontAwesomeIcon icon={faWindowClose} /></Button>
          </div>
        </div>
        {confirm && (
          <Modal
            onClose={setConfirm}
            estilo={{ backgroundColor: 'transparent', marginTop: '-15vw', padding: '0', marginLeft: '-20vw', paddingLeft: '20vw' }}
            estiloContainer={{boxShadow: '2px 2px 30px black'}}
          >
            <div className={style.containerModal}>
              Você tem certeza que deseja <span style={{color: `${escolha === 'ACEITAR' ? 'green' : 'red'}`}}>{escolha}</span> <strong>{nomeItem}</strong>?
              <div className={style.buttons}>
                <Button onClick={() => decidirProposta(escolha)}>Sim</Button>
                <Button onClick={() => setConfirm(false)}>Não</Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default CardProposta;

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

  async function aceitarProposta(){
    const token = Number(window.localStorage.getItem('token')) - 1
    const { url, options} = DECIDIR_PROPOSTA(token, idProposta, 'aceitar')
    try{
      const {response, json} = await request(url, options)
      if(response.ok){
        console.log(json)
        toast.success('Proposta Aceita')
        atualizar()
      } 
    } catch(error){
      toast.error('Ops! Algo deu errado...')
      console.log(error)
    }
  }

  async function recusarProposta(){
    const token = Number(window.localStorage.getItem('token')) - 1
    const { url, options} = DECIDIR_PROPOSTA(token, idProposta, 'recusado')

    try{
      const {response, json} = await request(url, options)
      if(response.ok){
        toast.success('Proposta Recusada')
        console.log(json)
        atualizar()
      } 
    } catch(error){
      toast.error('Ops! Algo deu errado...')
      console.log(error)
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
            <Button onClick={() => aceitarProposta()}>Aceitar<FontAwesomeIcon icon={faCheckCircle} /></Button>
            <Button style={{ marginTop: '2rem' }} onClick={() => recusarProposta()}>Recusar<FontAwesomeIcon icon={faWindowClose} /></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProposta;
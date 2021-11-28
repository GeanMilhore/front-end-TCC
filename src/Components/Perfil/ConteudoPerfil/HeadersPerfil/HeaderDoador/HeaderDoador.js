import React from "react";
import CardPerfil from "../../Configuracoes/CardPerfil/CardPerfil";
import style from "./HeaderDoador.module.css";
import propostaicon from '../../../../../resources/images/propostaicon.png'
import dataicon from "../../../../../resources/images/calendar.png";
import razaoicon from "../../../../../resources/images/razaoSocial.png";
import { PEGAR_PROPOSTAS_DOADOR, PEGAR_PROPOSTAS_ACEITAS_DOADOR } from "../../../../../api"
import qtddoacoesicon from '../../../../../resources/images/donationdoadoricon.png'
import Button from "../../../../Smart-components/Button/Button";
import { NavLink } from "react-router-dom";
import editaricon from "../../../../../resources/images/editar.png";
import UseFetch from "../../../../../Custom-Hooks/UseFetch"

const HeaderDoador = ({ nome, email, dtNasc, qtdDoacoes, qtdPropostas, isMine }) => {

  const {request, dados, loading, error } = UseFetch()
  const [propostasFeitas, setPropostasFeitas] = React.useState(null)
  const [propostasAceitas, setPropostasAceitas] = React.useState(null)

  React.useEffect(() => {

    async function pegaPropostas(){
      const token = window.localStorage.getItem('token')
      const {url, options} = PEGAR_PROPOSTAS_DOADOR(token)

      const {response, json } = await request(url, options)

      if(response.ok){
        setPropostasFeitas(json.totalElements)
      } else {
        window.alert('oops')
      }
    }

    async function pegaPropostasAceitas(){
      const token = window.localStorage.getItem('token')

      const { url, options } = PEGAR_PROPOSTAS_ACEITAS_DOADOR(token)

      const {response, json } = await request(url, options)

      if(response.ok){
        setPropostasAceitas(json.totalElements)
      } else {
        window.alert('opps')
      }
    }

    pegaPropostasAceitas()
    pegaPropostas()
  }, [])

  return (
    <>
      <header className={style.header}>
        <div>
          <img src={""} alt="Imagem de Perfil" />
          <span>{nome}</span>
          <span>{email}</span>
        </div>
        {isMine && <NavLink to="editar">
          <Button>
            <img src={editaricon} alt="icone" />
            Editar
          </Button>
        </NavLink>}
      </header>
      <div className={style.cards}>
        <CardPerfil
          titulo={"Quantidade de Doações"}
          icone={qtddoacoesicon}
          conteudo={propostasAceitas}
        />
        <CardPerfil
          titulo={"Quantidade de Propostas"}
          icone={propostaicon}
          conteudo={propostasFeitas}
        />
        <CardPerfil
          titulo={"Data de Nascimento"}
          icone={dataicon}
          conteudo={dtNasc}
        />
      </div>
    </>
  );
};

export default HeaderDoador;

// nome,
// email,
// dtNasc,
// qtdDoacoes,
// qtdPropostas

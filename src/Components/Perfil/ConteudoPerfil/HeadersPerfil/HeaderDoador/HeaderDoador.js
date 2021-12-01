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
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import imagemTeste from "../../../../../resources/images/perfilphotoadmin.png"
import Modal from "../../../../Smart-components/Modal/Modal"
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCamera} from '@fortawesome/free-solid-svg-icons'


toast.configure()

const HeaderDoador = ({ nome, email, dtNasc, qtdDoacoes, qtdPropostas, isMine }) => {

  const {request, dados, loading, error } = UseFetch()
  const [propostasFeitas, setPropostasFeitas] = React.useState(null)
  const [propostasAceitas, setPropostasAceitas] = React.useState(null)
  const [editImage, setEditImage] = React.useState(false)

  React.useEffect(() => {

    async function pegaPropostas(){
      const token = window.localStorage.getItem('token')
      const {url, options} = PEGAR_PROPOSTAS_DOADOR(token)

      const {response, json } = await request(url, options)

      if(response.ok){
        setPropostasFeitas(json.totalElements)
      } 
    }

    async function pegaPropostasAceitas(){
      const token = window.localStorage.getItem('token')

      const { url, options } = PEGAR_PROPOSTAS_ACEITAS_DOADOR(token)

      const {response, json } = await request(url, options)

      if(response.ok){
        setPropostasAceitas(json.totalElements)
      } 
    }

    pegaPropostasAceitas()
    pegaPropostas()
  }, [])

  return (
    <>
      <header className={style.header}>
      <div>
          <div className={style.imagemPerfil}
            style={{ backgroundImage: `url('${imagemTeste}')`,
                     backgroundSize: 'contain',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center center'
            }}
          >
            {" "}
          </div>
          {/* <img src={imagemTeste} alt="Imagem de Perfil" /> */}
          <div>
            <span>{nome}</span>
            <span>{email}</span>
          </div>
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
        <Button>Ooi</Button>
      </div>
      {editImage && (
        <Modal>
          OI
        </Modal>
      )}
    </>
  );
};

export default HeaderDoador;

// nome,
// email,
// dtNasc,
// qtdDoacoes,
// qtdPropostas

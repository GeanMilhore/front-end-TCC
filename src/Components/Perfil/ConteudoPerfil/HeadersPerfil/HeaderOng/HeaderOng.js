import React from "react";
import CardPerfil from "../../Configuracoes/CardPerfil/CardPerfil";
import style from "./HeaderOng.module.css";
import categoriaicon from "../../../../../resources/images/categorias.png";
import dataicon from "../../../../../resources/images/calendar.png";
import razaoicon from "../../../../../resources/images/razaoSocial.png";
import Button from '../../../../Smart-components/Button/Button'
import { NavLink } from "react-router-dom";
import editaricon from '../../../../../resources/images/editar.png'
import { PEGA_DADOS_ONG } from "../../../../../api";
import UseFetch from '../../../../../Custom-Hooks/UseFetch'
import imagemTeste from "../../../../../resources/images/perfilphotoadmin.png"

const HeaderOng = ({
  nomeFantasia,
  email,
  razaoSocial,
  focoInstitucional,
  dtFundacao,
  isMine
}) => {

  const [img, setImg] = React.useState(null)
  const {request, loading ,error, dados} = UseFetch()

  React.useEffect(() => {

    async function pegaImagemONG(){
      const token = window.localStorage.getItem('token')
  
      const {url, options} = PEGA_DADOS_ONG(token, Number(token) - 1)

      const {response, json} = await request(url, options)

      if(response.ok){
        console.log(json)
        setImg(json.image)
      } else {
        console.log('ops')
      }
    }
    pegaImagemONG()
  }, [])

  return (
    <>
      <header className={style.header} >
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
            <span>{nomeFantasia}</span>
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
          titulo={"Foco Institucional"}
          icone={categoriaicon}
          conteudo={focoInstitucional}
        />
        <CardPerfil
          titulo={"Razão Social"}
          icone={razaoicon}
          conteudo={razaoSocial}
        />
        <CardPerfil
          titulo={"Data de Fundação"}
          icone={dataicon}
          conteudo={dtFundacao}
        />
      </div>
    </>
  );
};

export default HeaderOng;

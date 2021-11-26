import React from "react";
import CardPerfil from "../../Configuracoes/CardPerfil/CardPerfil";
import style from "./HeaderOng.module.css";
import categoriaicon from "../../../../../resources/images/categorias.png";
import dataicon from "../../../../../resources/images/calendar.png";
import razaoicon from "../../../../../resources/images/razaoSocial.png";
import Button from '../../../../Smart-components/Button/Button'
import { NavLink } from "react-router-dom";
import editaricon from '../../../../../resources/images/editar.png'

const HeaderOng = ({
  nomeFantasia,
  email,
  razaoSocial,
  focoInstitucional,
  dtFundacao,
  isMine
}) => {
  return (
    <>
      <header className={style.header} >
        <div>
          <img src={""} alt="Imagem de Perfil" />
          <span>{nomeFantasia}</span>
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

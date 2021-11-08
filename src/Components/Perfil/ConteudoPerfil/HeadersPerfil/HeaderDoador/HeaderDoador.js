import React from "react";
import CardPerfil from "../../Configuracoes/CardPerfil/CardPerfil";
import style from "./HeaderDoador.module.css";
import propostaicon from '../../../../../resources/images/propostaicon.png'
import dataicon from "../../../../../resources/images/calendar.png";
import razaoicon from "../../../../../resources/images/razaoSocial.png";
import qtddoacoesicon from '../../../../../resources/images/donationdoadoricon.png'
import Button from "../../../../Smart-components/Button/Button";
import { NavLink } from "react-router-dom";
import editaricon from "../../../../../resources/images/editar.png";

const HeaderDoador = ({ nome, email, dtNasc, qtdDoacoes, qtdPropostas, isMine }) => {
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
          conteudo={qtdDoacoes}
        />
        <CardPerfil
          titulo={"Quantidade de Propostas"}
          icone={propostaicon}
          conteudo={qtdPropostas}
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

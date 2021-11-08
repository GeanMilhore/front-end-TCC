import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import style from "./PaginaInicial.module.css";
import fundo from "../../resources/images/fundo-home.png";
import Button from "../Smart-components/Button/Button";
import semsair from "../../resources/images/semsair.png";
import localiza from "../../resources/images/localize.png";
import doacao from "../../resources/images/suadoacao.png";
import pergunta from "../../resources/images/pergunta.png";
import doador from "../../resources/images/soudoador.png";
import ong from "../../resources/images/souOng.png";
import { UserContext } from "../../UserContext";

const Home = () => {

  const {logado} = React.useContext(UserContext)

  if(logado) return <Navigate to="/conta/home"/>
  return (
    <>
      <div className={"animeLeft " + style.comeco}>
        <div className={style.bemvindo}>
          <span style={{
            fontSize: '70px',
            color: 'black'
          }}>DOE+</span>
          <span style={{
            fontSize: '35px'
          }}>Doar é um gesto de amor, faça sua primeira doação ainda hoje!</span>
          <LinkScroll to="sobre" duration={1000}>
            <Button>Conheça</Button>
          </LinkScroll>
        </div>
        <div
          className={style.fundo}
          style={{ backgroundImage: `url(${fundo})` }}
        ></div>
        <div className={style.gradient}></div>
      </div>
      <div className={style.sobre} id="sobre">
        <h1>Faça parte deste Projeto</h1>
        <div className={style.motivos}>
          <div className={style.card}>
            <div
              className={style.cardImg}
              style={{ backgroundImage: `url(${semsair})` }}
            ></div>
            <h3>Fazer o bem sem sair de casa</h3>
            <p>
              Faça doações para instituições sem sair do conforto da sua casa.
            </p>
          </div>
          <div className={style.card}>
            <div
              className={style.cardImg}
              style={{ backgroundImage: `url(${localiza})` }}
            ></div>
            <h3>Localize a instituição mais próxima de você</h3>
            <p>
              Fique por dentro de quais instituições estão no mais facil
              alcance.
            </p>
          </div>
          <div className={style.card}>
            <div
              className={style.cardImg}
              style={{ backgroundImage: `url(${doacao})` }}
            ></div>
            <h3>Ajude muitas pessoas com suas doações</h3>
            <p>
              Uma Rede que conecta diversas instituições com as mais
              diversificadas causas.
            </p>
          </div>
        </div>
        <LinkScroll to="inscrever" duration={1000}>
          <Button>Quero Fazer Parte</Button>
        </LinkScroll>
      </div>
      <div className={style.cadastrar} id="inscrever">
        <h1>Inscreva-se </h1>
        <div className={style.escolha}>
          <div className={style.pergunta}>
            <h2>Qual o seu perfil?</h2>
            <div
              className={style.fotoPergunta}
              style={{ backgroundImage: `url(${pergunta})` }}
            ></div>
          </div>
          <div className={style.opcoes}>
            <Link to='login/criaDoador'>
            <div className={style.opcao}>
              <div className={style.cardPergunta} style={{backgroundImage: `url(${doador})`}}/>
              <h3>Sou um Doador.</h3>
            </div>
            </Link>
            <Link to='login/criaOng'>
            <div className={style.opcao}>
              <div className={style.cardPergunta} style={{backgroundImage: `url(${ong})`}}/>
              <h3>Sou uma ONG.</h3>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

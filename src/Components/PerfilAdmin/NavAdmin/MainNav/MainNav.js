import React from "react";
import { NavLink } from "react-router-dom";
import style from "./MainNav.module.css";
import iconegrafico from '../../../../resources/images/charticon.png'
import iconelista from '../../../../resources/images/listicon.png'
import iconeongs from '../../../../resources/images/ngoicon.png'
import iconedoadores from '../../../../resources/images/doadoricon.png'
import iconedoacao from '../../../../resources/images/donateicon.png'

const MainNav = () => {
  const [visualizaLista, setVisualizaLista] = React.useState(false);

  return (
    <main className={style.main}>
      <section>
          <img src={iconegrafico} alt="icone" />
        <NavLink to={"graficos"}>Dashboard</NavLink>
      </section>
      <div
        onMouseOver={() => {
          setVisualizaLista(true);
        }}
        onMouseLeave={() => {
          setVisualizaLista(false);
        }}
      >
        <span className={style.main}> <img src={iconelista} alt="icone" /> Lista</span>
        <ul hidden={!visualizaLista}>
          <NavLink to="relatorio/instituicoes"> <img src={iconeongs} alt="icone" /> Instituições</NavLink>
          <NavLink to="relatorio/doadores"> <img src={iconedoadores} alt="icone" /> Doadores</NavLink>
          <NavLink to="relatorio/doacoes"> <img src={iconedoacao} alt="icone" /> Doações</NavLink>
        </ul>
      </div>
    </main>
  );
};

export default MainNav;

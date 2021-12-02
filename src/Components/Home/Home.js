import React from "react";
import { Routes, Route } from "react-router-dom";
import ListaContas from "./ListaContas/ListaContas";
import ListaInteresses from "./ListaInteresses/ListaInteresses";
import NavHome from "./NavHome/NavHome";
import style from './Home.module.css'

const Home = ({ links, endPoints, label, imgs, mensagens }) => {
  React.useEffect(() => {
  }, []);
  return (
    <>
      <div className={style.home}>
        <Routes>
          <Route path={links[0]} element={<ListaContas endPoint={endPoints[0]} />} />
          <Route path={links[1]} element={<ListaInteresses endPoint={endPoints[1]} />} />
        </Routes>
      </div>
    </>
  );
};

export default Home;

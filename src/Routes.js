import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";

import PaginaInicial from "./Components/PaginaInicial/PaginaInicial";
import Login from "./Components/Login/Login";
import { UserContext } from "./UserContext";
import PerfilAdmin from "./Components/PerfilAdmin/PerfilAdmin";
import Perfil from "./Components/Perfil/Perfil";
import RoutesOng from "./Components/Perfil/ConteudoPerfil/Routes/RoutesOng";
import RoutesDoador from "./Components/Perfil/ConteudoPerfil/Routes/RoutesDoador";
import Modal from './Components/Smart-components/Modal/Modal'
import ParaTeste from "./Components/Smart-components/ParaTeste/ParaTeste";

export function CustomRoute({ isPrivate, ...rest }) {
  const { logado, loading, fazerLogout } = React.useContext(UserContext);
  const navigate = useNavigate();

  if (loading) {
    return <div className="loader"></div>;
  }
  if (isPrivate && !logado && !window.localStorage.getItem("token")) {
    fazerLogout();
  }

  return <Route {...rest} />;
}

export default function Router() {
  const { loading, dadosUsuario, logado } = React.useContext(UserContext);

  if (loading) return <div className="loader"></div>;
  return (
    <Routes>
      {console.log(dadosUsuario)}
      <CustomRoute path="/" element={<PaginaInicial />} />
      {logado && dadosUsuario && dadosUsuario.tipo === "INSTITUICAO" && (
        <CustomRoute
          path="/conta/*"
          isPrivate
          element={
            <Perfil tipo={dadosUsuario.tipo} nome={dadosUsuario.nomeFantasia}>
              <RoutesOng dadosUsuario={dadosUsuario} />
            </Perfil>
          }
        />
      )}
      {logado && dadosUsuario && dadosUsuario.tipo === "DOADOR" && (
        <CustomRoute
          path="/conta/*"
          element={
            <Perfil tipo={dadosUsuario.tipo} nome={dadosUsuario.nome}>
              <RoutesDoador dadosUsuario={dadosUsuario} />
            </Perfil>
          }
        />
      )}
      <CustomRoute path="/login/*" element={<Login />} />
      {logado && dadosUsuario && dadosUsuario.tipo === "ADMIN" && (
        <CustomRoute
          isPrivate
          path="/conta/*"
          element={<PerfilAdmin dadosPefil={dadosUsuario} />}
        />
      )}
      {logado && dadosUsuario && dadosUsuario.tipo === "ADMIN" && (
        <CustomRoute
          isPrivate
          path="/conta/home"
          element={<Navigate to={'/conta/graficos'} />}
        />
      )}

      <CustomRoute path="/testando" element={<ParaTeste />} />
    </Routes>
  );
}

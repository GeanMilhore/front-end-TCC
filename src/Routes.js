import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login"
import { UserContext } from "./UserContext";
import PerfilOng from './Components/PerfilOng/PerfilOng'
import PerfilDoador from './Components/PerfilDoador/PerfilDoador'
import EditarOng from "./Components/Login/EditarOng/EditarOng";
import EditarDoador from './Components/Login/EditarDoador/EditarDoador'
import TesteComponente from './TesteComponente'

export function CustomRoute({ isPrivate, ...rest }) {
  const { logado, loading } = React.useContext(UserContext);

  if(loading){
    return <h1>Loading...</h1>
  }

  if(isPrivate && !logado){
    window.location = '/login'
    return null
  }

  return <Route {...rest} />
}

export default function Router() {

  const { dadosUsuario, loading } = React.useContext(UserContext)

  if(loading) return <p>Loading...</p>
  return (
    <Routes>
      <CustomRoute path="/" element={<Home />} />
      <CustomRoute path="/login/*" element={<Login />} />
      {dadosUsuario &&  dadosUsuario.tipo === 'instituicao' && <CustomRoute isPrivate path="/conta/*" element={<PerfilOng />} />}
      {dadosUsuario && dadosUsuario.tipo === 'instituicao' && <CustomRoute isPrivate path="/conta/editar" element={<EditarOng />} />}
      {dadosUsuario &&  dadosUsuario.tipo === 'doador' && <CustomRoute isPrivate path="/conta/*" element={<PerfilDoador />} />}
      {dadosUsuario &&  dadosUsuario.tipo === 'doador' && <CustomRoute isPrivate path="/conta/editar" element={<EditarDoador />} />}
      <CustomRoute path="/testeComponente" element={<TesteComponente />} />
    </Routes>
  );
}

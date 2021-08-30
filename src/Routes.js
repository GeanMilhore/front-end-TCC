import React from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "./Context/AuthContext.js";

import CadastrarItem from "./Routes/Cadastros/CadastroItemUsuario/CadastrarItem.js";
import Doar from "./Routes/Doar/Doar";
import Home from "./Routes/Home/Home";
import Login from "./Routes/Logar/Login";
import CadastrarUsuario from "./Routes/Cadastros/CadastrarUsuario/CadastrarUsuario";
import MinhaConta from "./Routes/Privado/MinhaConta";

function CustomRoute({ isPrivate, ...rest }) {
  const { authenticated, loading } = React.useContext(Context);

  if(loading){
    return <h1>Loading...</h1>
  }

  if(isPrivate && !authenticated){
    window.location = '/entrar'
    return null
  }

  return <Route {...rest} />
}

export default function Router() {
  return (
    <Routes>
      <CustomRoute path="/" element={<Home />} />
      <CustomRoute path="/doar" element={<Doar />} />
      <CustomRoute isPrivate path="/cadastrarItem" element={<CadastrarItem />} />
      <CustomRoute path="/cadastro/usuario" element={<CadastrarUsuario tipo={'doador'}/>} />
      <CustomRoute path="/cadastro/Instituicao" element={<CadastrarUsuario tipo={'instituicao'} />} />
      <CustomRoute path="/entrar" element={<Login />} />
      <CustomRoute isPrivate path="/MinhaConta" element={<MinhaConta />} />
    </Routes>
  );
}

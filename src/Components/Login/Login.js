import React from "react";
import { Route, Routes, Navigate } from "react-router";
import LoginForm from './LoginForm/LoginForm'
import CadastrarOng from "../Criar/CriarOng/CadastrarOng";
import CadastrarDoador from '../Criar/CriarDoador/CadastrarDoador'
import { UserContext } from "../../UserContext";

const Login = () => {
  const { logado } = React.useContext(UserContext)

  if(logado) return <Navigate to="/conta/home" />

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/criaOng" element={<CadastrarOng />} />
        <Route path="/criaDoador" element={<CadastrarDoador />} />
      </Routes>
    </>
  );
};

export default Login;

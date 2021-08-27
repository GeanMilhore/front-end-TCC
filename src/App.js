import React from "react";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastrarItem from "./Routes/Cadastros/CadastroItemUsuario/CadastrarItem.js";
import Doar from "./Routes/Doar/Doar";
import Header from "./Components/Header/Header";
import Home from "./Routes/Home/Home";
import Login from "./Routes/Logar/Login";
import CadastrarUsuario from "./Routes/Cadastros/CadastrarUsuario/CadastrarUsuario";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doar" element={<Doar />} />
        <Route path="/cadastrarItem" element={<CadastrarItem />} />
        <Route path="/cadastro/usuario" element={<CadastrarUsuario />} />
        <Route path="/entrar" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;

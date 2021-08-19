import React from "react";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastrarItem from "./Routes/Cadastros/CadastrarItem";
import Doar from "./Routes/Doar/Doar";
import Header from "./Components/Header/Header";
import Home from "./Routes/Home/Home";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doar" element={<Doar />} />
        <Route path="/cadastrarItem" element={<CadastrarItem />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;

import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import DoacoesRecebidas from "./DoacoesRecebidas/DoacoesRecebidas";
import FeedConta from "./FeedConta/FeedConta";
import PropostasRecebidas from "./PropostasOng/Propostas";
import Proposta from "./PropostaOng/Proposta";
import DoacaoRecebida from "./DoacaoRecebida/DoacaoRecebida";
import DoacaoCadastro from "./DoacaoDinheiro/DoacaoCadastro";
import DoacoesCadastradas from "./DoacoesCadastradas/DoacoesCadastradas";
import ConteudoHeaderNav from "./ConteudoHeaderNav";
import CadastrarDoacao from './CadastrarDoacao/CadastrarDoacao'
import style from './Conteudo.module.css'
import EditarDoacao from "./EditarDoacao/EditarDoacao";

const Conteudo = () => {
  return (
    <div className={style.contentContainer}>
      <ConteudoHeaderNav />
      <Routes>
        <Route path="/" element={<FeedConta />} />
        <Route path="/doacoesRecebidas" element={<DoacoesRecebidas />} />
        <Route path="/propostasRecebidas" element={<PropostasRecebidas />} />
        <Route path="/propostasRecebidas/item/:id" element={<Proposta />} />
        <Route path="/cadastrarDoacao" element={<CadastrarDoacao />} />
        <Route path="/doacoesRecebidas/item/:id" element={<DoacaoRecebida />} />
        <Route path="/doacoesCadastradas" element={<DoacoesCadastradas />} />
        <Route path="/doacoesCadastradas/item/:id" element={<DoacaoCadastro />} />
        <Route path="/doacoesCadastradas/item/:id/editar" element={<EditarDoacao />} />
      </Routes>
    </div>
  );
};

export default Conteudo;

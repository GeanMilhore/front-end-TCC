import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HeaderDoador from "../HeadersPerfil/HeaderDoador/HeaderDoador";
import EditarDoador from "../../../Editar/EditarDoador/EditarDoador";
import Configuracoes from "../Configuracoes/Configuracoes";
import MainPerfil from "../MainPerfil/MainPerfil";
import Home from "../../../Home/Home";
import campanhasicon from "../../../../resources/images/campanhashome.png";
import ongsicon from "../../../../resources/images/ongshome.png";
import { LISTAR_ONGS } from "../../../../api";
import ContaOng from "../../../Visualizar/ContaOng/ContaOng";
import BannerMensagem from "../../../Telas/BannerMensagem/BannerMensagem";
import propostasicon from "../../../../resources/images/telapropostasdoador.png";
import TelaPropostas from "../../../Telas/Doador/TelaPropostas/TelaPropostas";
import TelaDoacoes from "../../../Telas/Doador/TelaDoacoes/TelaDoacoes";
import minhasdoacoes from "../../../../resources/images/teladoacoes.png";

const RoutesDoador = ({ dadosUsuario }) => {
  if (!dadosUsuario) return null;
  return (
    <Routes>
      <Route
        path="configuracoes"
        element={
          <Configuracoes>
            <HeaderDoador
              nome={dadosUsuario.nome}
              email={dadosUsuario.email}
              dtNasc={dadosUsuario.dtNasc}
              qtdDoacoes={"0"}
              qtdPropostas={"0"}
              isMine
            />
            <MainPerfil
              rua={dadosUsuario.rua}
              numero={dadosUsuario.numero}
              complemento={dadosUsuario.complemento}
              cidade={dadosUsuario.cidade}
              estado={dadosUsuario.estado}
              cep={dadosUsuario.cep}
              telefone={dadosUsuario.telefone}
            />
          </Configuracoes>
        }
      />
      <Route
        path="configuracoes/editar"
        element={<EditarDoador dadosUsuario={dadosUsuario} />}
      />
      <Route
        path="home/*"
        element={
          <>
          <BannerMensagem 
            img={ongsicon}
            mensagem={"Pesquisar Instituições"}
            submensagem={"aqui você pode pesquisar e visualizar o perfil das instituições."}
          />
          <Home
            links={["ongs", "campanhas"]}
            label={{
              opcaoUm: "Procurar em Ongs",
              opcaoDois: "Procurar em Campanhas",
            }}
            imgs={[campanhasicon, ongsicon]}
            endPoints={[LISTAR_ONGS, LISTAR_ONGS]}
          />
          </>
        }
      />
      <Route path="home/ong/:id" element={<ContaOng />} />
      <Route
        path="/propostas"
        element={
          <>
            <BannerMensagem
              img={propostasicon}
              mensagem={"Propostas Enviadas"}
              submensagem={"aqui você pode ver todas as propostas que realizou."}
            />
            <TelaPropostas />
          </>
        }
      />
      <Route
        path="/doacoes"
        element={
          <>
            <BannerMensagem
              img={minhasdoacoes}
              mensagem={"Minhas Doações"}
              submensagem={"aqui você pode ver todas as doações que você realizou."}
            />
            <TelaDoacoes />
          </>
        }
      />
      <Route 
        path="home"
        element={<Navigate to="/home/ongs" />}
      />
    </Routes>
  );
};

export default RoutesDoador;

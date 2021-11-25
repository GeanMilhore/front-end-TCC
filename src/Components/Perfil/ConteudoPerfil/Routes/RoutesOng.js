import React from "react";
import Configuracoes from "../Configuracoes/Configuracoes";
import HeaderOng from "../HeadersPerfil/HeaderOng/HeaderOng";
import EditarOng from "../../../Editar/EditarOng/EditarOng";
import { Routes, Route } from "react-router";
import MainPerfil from "../MainPerfil/MainPerfil";
import BannerMensagem from "../../../Telas/BannerMensagem/BannerMensagem";
import campanhaicon from '../../../../resources/images/campanhashome.png'
import propostasrecebidas from '../../../../resources/images/propostasrecebidas.png'
import teladoacoesong from '../../../../resources/images/teladoacoesong.png'

const RoutesOng = ({ dadosUsuario }) => {
  {
    if (!dadosUsuario) return null;
  }
  return (
    <Routes>
      <Route
        path="configuracoes"
        element={
          <Configuracoes>
            <HeaderOng
              nomeFantasia={dadosUsuario.nomeFantasia}
              email={dadosUsuario.email}
              razaoSocial={dadosUsuario.razaoSocial}
              focoInstitucional={dadosUsuario.focoInstitucional}
              dtFundacao={dadosUsuario.dtFundacao}
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
        element={<EditarOng dadosUsuario={dadosUsuario} />}
      />
      <Route
        path="/campanhas"
        element={
          <BannerMensagem
            img={campanhaicon}
            mensagem={"Campanhas Publicadas"}
            submensagem={"aqui você pode ver todas as campanhas que você publicou."}
          />
        }
      />
      <Route
        path="/propostas"
        element={
          <BannerMensagem
            img={propostasrecebidas}
            mensagem={"Propostas Recebidas"}
            submensagem={"aqui você pode ver todas as propostas que você recebeu."}
          />
        }
      />
      <Route
        path="/doacoes"
        element={
          <BannerMensagem
            img={teladoacoesong}
            mensagem={"Doações Confirmadas"}
            submensagem={"aqui você pode ver todas as doações aceitas que chegaram até a ONG."}
          />
        }
      />
    </Routes>
  );
};

export default RoutesOng;

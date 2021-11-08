import React from "react";
import Configuracoes from "../Configuracoes/Configuracoes";
import HeaderOng from "../HeadersPerfil/HeaderOng/HeaderOng";
import EditarOng from '../../../Editar/EditarOng/EditarOng'
import { Routes, Route } from "react-router";
import MainPerfil from "../MainPerfil/MainPerfil";

const RoutesOng = ({ dadosUsuario }) => {

  {if (!dadosUsuario) return null}
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
      <Route path="configuracoes/editar" element={<EditarOng dadosUsuario={dadosUsuario} />} />
    </Routes>
  );
};

export default RoutesOng;

import React from "react";
import { UserContext } from "../../UserContext";
import ConteudoPerfil from "./ConteudoPerfil/ConteudoPerfil";
import NavPerfil from "./NavPerfil/NavPerfil";

import donateicon from "../../resources/images/donateicon.png";
import campanhaicon from "../../resources/images/campanhaicon.png";
import homeiconv2 from "../../resources/images/homeiconv2.png";
import handshakeicon from "../../resources/images/handshakeicon.png";
import donationdoador from '../../resources/images/donationdoadoricon.png'

const Perfil = ({ children, tipo, nome }) => {
  const perfil = {
    ong: {
      label: {
        linha: null,
        linhaDois: "Campanhas",
        linhaTres: "Propostas",
        linhaQuatro: "Doações",
      },
      links: [null, "campanhas", "propostas", "doacoes"],
      imgs: [homeiconv2, campanhaicon, handshakeicon, donateicon]
    },
    doador: {
      label: {
        linha: "Home",
        linhaDois: "Doações",
        linhaTres: "Propostas Enviadas",
        linhaQuatro: null,
      },
      links: ["home/ongs", "doacoes", "propostas", null],
      imgs: [homeiconv2, donationdoador, handshakeicon, donateicon]
    },
  };

  return (
    <div>
      <NavPerfil
        label={tipo == "INSTITUICAO" ? perfil.ong.label : perfil.doador.label}
        links={tipo == "INSTITUICAO" ? perfil.ong.links : perfil.doador.links}
        imgs={tipo == 'INSTITUICAO' ? perfil.ong.imgs : perfil.doador.imgs}
        nome={nome}
      />
      <ConteudoPerfil routes={children} />
    </div>
  );
};

export default Perfil;

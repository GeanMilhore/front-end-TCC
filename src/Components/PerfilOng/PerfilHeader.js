import React from "react";
import { NavLink } from "react-router-dom";
import style from "./PerfilHeader.module.css";
import { useNavigate } from "react-router";
import { UserContext } from "../../UserContext";

const PerfilHeader = () => {
  const navigate = useNavigate();
  const { fazerLogout } = React.useContext(UserContext);
  const { dadosUsuario } = React.useContext(UserContext);

  return (
    <header>
      <div className={style.bannerConta}>
        <NavLink to="cadastrarDoacao">
          <div className={style.cadastrarItem}>
            <p>Imagem</p>
            Cadastrar Doação
          </div>
        </NavLink>
      </div>
      <div className={style.containerInfo}>
        <div className={style.fotoConta}>{"."}</div>
        <p>{dadosUsuario.nome}</p>
        <p>{dadosUsuario.email}</p>
        <p>{dadosUsuario.telefone}</p>
        <div className={style.ButtonsHeader}>
          <button
            onClick={() => {
              navigate("editar");
            }}
          >
            Editar Perfil
          </button>
          <button onClick={fazerLogout}>Sair</button>
        </div>
      </div>
    </header>
  );
};

export default PerfilHeader;
import React from "react";
import style from "./Configuracoes.module.css";
import imgadmin from "../../../../resources/images/perfilphotoadmin.png";
import Button from "../../../Smart-components/Button/Button";
import EditarPefil from "./EditarPerfil/EditarPefil";

const Configuracoes = ({ dadosConta }) => {

    const [visualizarEdicao, setVisualizarEdicao] = React.useState(false)

  return (
    <div className={style.configuracoes}>
      <header>
        <img src={imgadmin} alt="Imagem de perfil Admin" />
        <div>
          <h1>Junior Admin</h1>
          <h3>admin@gmail.com</h3>
        </div>
        <Button
            onClick={() => setVisualizarEdicao(true)}
            disabled={visualizarEdicao}
        >Editar</Button>
      </header>
      <EditarPefil visualizar={visualizarEdicao} setVisualizar={setVisualizarEdicao} />
    </div>
  );
};

export default Configuracoes;

import React from "react";
import style from "./Dashboard.module.css";
import CardInfo from "./CardInfo/CardInfo";
import Grafico from "./Grafico/Grafico";
import ongicon from "../../../../resources/images/ongicon.png";
import doadoresicon from '../../../../resources/images/doadoresicon.png';
import usuariosicon from "../../../../resources/images/usuarioicon.png";
import doacaoicon from "../../../../resources/images/doacaoicon.png";


const Dashboard = () => {
  return (
    <>
      <div className={style.containerDados}>
        <h4 className={style.titulos}>Dados Importantes</h4>
        <div className={style.apresentaDados}>
          <CardInfo
            titulo={"Ongs Cadastradas"}
            quantidade={50}
            caminhoImagem={ongicon}
          />
          <CardInfo
            titulo={"Doadores Cadastrados"}
            quantidade={50}
            caminhoImagem={doadoresicon}
          />
          <CardInfo
            titulo={"Doações Feitas"}
            quantidade={50}
            caminhoImagem={doacaoicon}
          />
          <CardInfo
            titulo={"Usuários Cadastrados"}
            quantidade={50}
            caminhoImagem={usuariosicon}
          />
        </div>
      </div>
      <div className={style.containerGrafico}>
        <h4 className={style.titulos}>Acompanhe o Crescimento</h4>
        <main className={style.grafico}>
          <Grafico
            titulo={"Ações de Cadastro"}
            subtitulo={"Por Mês"}
            estiloTitulo={{
              fontSize: "25px",
            }}
            tipo={"donut"}
            valores={[35, 50, 15]}
            labels={["Doadores", "Instituições", "Doações"]}
            simbolo={"%"}
          />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
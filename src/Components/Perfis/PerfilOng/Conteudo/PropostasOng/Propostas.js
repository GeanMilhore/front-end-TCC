import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from "./Propostas.module.css";

const itensPropostas = [
  {
    id: 10,
    foto: "foto bonita",
    nomeItem: "nome da doação",
    dataDoacao: "25/05/2013",
  },
  {
    id: 20,
    foto: "foto linda",
    nomeItem: "não temos mais Plasma",
    dataDoacao: "25/05/2012",
  },
  {
    id: 30,
    foto: "):<{",
    nomeItem: "TOURO triste",
    dataDoacao: "04/02/2000",
  },
];

const PropostasRecebidas = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    // alguma coisa
  }, []);

  if (loading) return <p>Loading...</p>;
  if (itensPropostas) {
    return (
      <div className={style.bgContainerItens}>
        <h2>Propostas Recebidas</h2>
        <div className={style.containerItens}>
          {itensPropostas.map((item, index) => (
            <Link to={`item/${item.id}`} className={style.itemLista} key={index}>
              <h2>{item.foto}</h2>
              <h3>{item.nomeItem}</h3>
              <p>data da doação: {item.dataDoacao}</p>
              <div className={style.footerItemLista}>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default PropostasRecebidas;

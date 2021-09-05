import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from './DoacoesRealizadas.module.css'

const doacoesEnviadas = [
  {
    id: 5,
    foto: "/o/",
    nomeItem: "AH NAO Lã",
    dataRecebido: "25/06/2013",
  },
  {
    id: 11,
    foto: ":C",
    nomeItem: "NEM USO REGEX Plasma",
    dataRecebido: "25/11/2012",
  },
  {
    id: 9,
    foto: "|:<{",
    nomeItem: "SÓ TOURO feliz",
    dataRecebido: "02/04/0044",
  },
];

const DoacoesEnviadas = () => {
  const { request, data, loading, error } = useFetch();

  React.useEffect(() => {
      // get itens de doação cadastrados
  }, []);

  // if(error) return <p>{error}</p>
  if (loading) return <p>Loading...</p>;
  if (doacoesEnviadas) {
    return (
      <div className={style.bgContainerItens}>
        <h2>Doações Enviadas</h2>
        <div className={style.containerItens}>
          {doacoesEnviadas.map((item, index) => (
            <Link to={`item/${item.id}`} className={style.itemLista} key={index}>
              <h2>{item.foto}</h2>
              <h3>{item.nomeItem}</h3>
              <p>data da doação: {item.dataRecebido}</p>
              <div className={style.footerItemLista}>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default DoacoesEnviadas;
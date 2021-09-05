import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from './PropostasEnviadas.module.css'

const propostasEnviadas = [
  {
    id: 5,
    foto: "o/",
    nomeItem: "Cobertor Lã",
    dataRecebido: "25/05/2013",
  },
  {
    id: 11,
    foto: ":C",
    nomeItem: "Televisão Plasma",
    dataRecebido: "25/05/2012",
  },
  {
    id: 9,
    foto: "(:<{",
    nomeItem: "TOURO feliz",
    dataRecebido: "04/02/2011",
  },
];

const PropostasEnviadas = () => {
  const { request, data, loading, error } = useFetch();

  React.useEffect(() => {
      // get itens de doação cadastrados
  }, []);

  // if(error) return <p>{error}</p>
  if (loading) return <p>Loading...</p>;
  if (propostasEnviadas) {
    return (
      <div className={style.bgContainerItens}>
        <h2>Propostas Enviadas</h2>
        <div className={style.containerItens}>
          {propostasEnviadas.map((item, index) => (
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

export default PropostasEnviadas;
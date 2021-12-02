import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from './DoacoesRecebidas.module.css'

const itensRecebidos = [
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

const DoacoesRecebidas = () => {
  const { request, data, loading, error } = useFetch();

  React.useEffect(() => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    request("/api/getDoacoesRealizadas", config);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (itensRecebidos) {
    return (
      <div className={style.bgContainerItens}>
        <h2>Doações Recebidas</h2>
        <div className={style.containerItens}>
          {itensRecebidos.map((item, index) => (
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

export default DoacoesRecebidas;

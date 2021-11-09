import React from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from './Proposta.module.css'

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

const Proposta = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = React.useState();
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    
  }, []);

  function handleAceitar(){
    // aceitar a proposta
  }

  function handleRecusar(){
    // recusar proposta
  }


  if(loading) return <p>Loading...</p>;
  if(itensPropostas){
    return (
        <div>
            {itensPropostas.map((item) => {
                if(item.id == id){
                    return (
                        <div className={style.containerItem}>
                          <h2>{item.nomeItem}</h2>
                          <h3>{item.foto}</h3>
                          <p>{item.dataDoacao}</p>
                          <div className={style.footerItem}>
                            <>
                              <button onClick={handleAceitar}>Aceitar</button>
                              <button onClick={handleRecusar}>Recusar</button>
                            </>
                          </div>
                        </div>
                    )
                }
            })}
        </div>
      );
  }
};

export default Proposta;

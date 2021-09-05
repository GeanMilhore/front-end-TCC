import React from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from './PropostaEnviada.module.css'

const itensEnviados = [
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


const PropostaEnviada = () => {
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
  if(itensEnviados){
    return (
        <div>
            {itensEnviados.map((item) => {
                if(item.id == id){
                    return (
                        <div className={style.containerItem}>
                          <h2>{item.nomeItem}</h2>
                          <h3>{item.foto}</h3>
                          <p>{item.dataDoacao}</p>
                          <div className={style.footerItem}>
                            <>
                              <button onClick={handleRecusar}>Cancelar</button>
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

export default PropostaEnviada;

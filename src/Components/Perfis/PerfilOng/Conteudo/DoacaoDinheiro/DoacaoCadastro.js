import React from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from './DoacaoCadastro.module.css'

const itensRecebidos = [
  {
    id: 5,
    foto: "o/",
    nomeItem: "Cobertor Lã",
    dataCadastrado: "25/05/2013",
  },
  {
    id: 11,
    foto: ":C",
    nomeItem: "Televisão Plasma",
    dataCadastrado: "25/05/2012",
  },
  {
    id: 9,
    foto: "(:<{",
    nomeItem: "TOURO feliz",
    dataCadastrado: "04/02/2011",
  },
];
const DoacaoCadastro = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [item, setItem] = React.useState()
  const { data, error, loading, request } = useFetch();


  React.useEffect(() => {
    // get das doações cadastradas
  }, []);

  function excluirItem(){
    // lógica de exclusão de item
    navigate('/')
  }
  
  if(loading) return <p>Loading...</p>;
  if(itensRecebidos){
    return (
        <div>
            {itensRecebidos.map((item) => {
                if(item.id == id){
                    return (
                        <div className={style.containerItem}>
                          <h2>{item.nomeItem}</h2>
                          <h3>{item.foto}</h3>
                          <p>{item.dataCadastrado}</p>
                          <div className={style.footerItem}>
                            <button onClick={
                              () => navigate('editar')
                            }>Editar</button>
                            <button onClick={() => excluirItem()}>Excluir</button>
                          </div>
                        </div>
                    )
                }
            })}
        </div>
      );
  }
};

export default DoacaoCadastro;

import React from 'react'
import { useNavigate, useParams } from 'react-router';
import useFetch from '../../../../Custom-Hooks/UseFetch';
import style from './DoacaoRealizada.module.css'

const doacaoRealizada = [
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

const DoacaoRealizada = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [item, setItem] = React.useState()
    const { data, error, loading, request } = useFetch();
  
  
    React.useEffect(() => {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
  
      const {json} = request(`api/itemRecebido/${id}`, config)
      setItem(json)
    }, []);
  
    function excluirItem(){
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
  
      const {json} = request(`api/excluirItemRecebido/${id}`, config)
      navigate('/doacoesRecebidas')
    }
   
  if(loading) return <p>Loading...</p>;
  if(doacaoRealizada){
    return (
        <div>
            {doacaoRealizada.map((item) => {
                if(item.id == id){
                    return (
                        <div className={style.containerItem}>
                          <h2>{item.nomeItem}</h2>
                          <h3>{item.foto}</h3>
                          <p>{item.dataRecebido}</p>
                          <div className={style.footerItem}>
                            <button onClick={() => excluirItem()}>Excluir</button>
                          </div>
                        </div>
                    )
                }
            })}
        </div>
      );
  }
}

export default DoacaoRealizada

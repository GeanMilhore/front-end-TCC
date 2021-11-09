import React from 'react'
import { useNavigate, useParams } from 'react-router';
import useFetch from '../../../../Custom-Hooks/UseFetch';
import style from './ItemRecebido.module.css'

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

const ItemRecebido = () => {
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
  if(itensRecebidos){
    return (
        <div>
            {itensRecebidos.map((item) => {
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

export default ItemRecebido

import React from 'react'
import CardVerCampanha from '../../Telas/Cards/CardVerCampanha/CardVerCampanha'
import { PEGAR_CAMPANHAS } from '../../../api'
import useFetch from '../../../Custom-Hooks/UseFetch'
import style from "./ListCampanhas.module.css"
import Paginacao from "../../Smart-components/Paginacao/Paginacao" 

const ListCampanhas = ({ id, setDadosCampanha, setDados, setVerModal, abrirDoar }) => {

  const {request, loading, error, dados } = useFetch()
  const [campanhas, setCampanhas] = React.useState()
  const [page, setPage] = React.useState(0)
  const [size, setSize] = React.useState(2)

    
  const pegaCampanhas = async function () {

    const {url, options} = PEGAR_CAMPANHAS(Number(id) + 1, page, size)

    const {response, json} =  await request(url, options);

    if(response.ok){
      setCampanhas(json)
      console.log(json)
    } else {
      window.alert('puts')
    }

  }

  React.useEffect(() => {
    pegaCampanhas()
  }, [])


  if(!campanhas) return null
    return (
      <>
        <div className={style.lista}>
            {campanhas && campanhas.content.map((card) => {
                console.log(card);
                return (
                  <>
                    <CardVerCampanha
                      labels={{
                        label1: 'Campanha',
                        label2: 'Descricao',
                        label3: 'Para Arrecadar'
                      }}
                      idCampanha={card.id}
                      foto={card.image}
                      descricao={card.descricao}
                      nomeItem={card.nome}
                      quantidade={card.quantidade}
                      usuario={card.usuario}
                      atualizar={pegaCampanhas}
                      abrirVisualizacao={setVerModal}
                      abrirDoar={abrirDoar}
                      setDadosVer={setDados}
                      setDadosCampanha={setDadosCampanha}
                    />
                  </>
                );
              })}
          </div>
          <Paginacao 
            page={page}
            size={size}
            totalPaginas={campanhas.totalPages}
            reqItens={PEGAR_CAMPANHAS}
            setItens={setCampanhas}
            setPagina={setPage}
            isPrivate={true}
            token={Number(id) + 1}
          />
          </>
    )
}

export default ListCampanhas

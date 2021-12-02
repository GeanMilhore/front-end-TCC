import React from "react";
import style from "./TelaCampanhas.module.css"
import Modal from "../../../Smart-components/Modal/Modal"
import CriarCampanha from "../../../CriarCampanha/CriarCampanha"
import EditarCampanha from '../../../EditarCampanha/EditarCampanha'
import imgcampanha from "../../../../resources/images/criarcampanha.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from "../../../Smart-components/Button/Button"
import CardCampanha from "../Cards/CardCampanha/CardCampanha";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import { PEGAR_CAMPANHAS } from "../../../../api";
import Paginacao from '../../../Smart-components/Paginacao/Paginacao'
import NadaParaVer from "../../../NadaParaVer/NadaParaVer";

const TelaCampanhas = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [verModalEdit, setVerModalEdit] = React.useState(false)
  const [dadosEdicao, setDadosEdicao] = React.useState(null)
  const [campanhas, setCampanhas] = React.useState(null)
  const { request, dados, error, loading } = useFetch()
  const [page, setPage] = React.useState(0)
  const [size, setSize] = React.useState(3)

  const pegaCampanhas = async function () {
    const token = window.localStorage.getItem('token')

    const { url, options } = PEGAR_CAMPANHAS(token, page, size)

    const { response, json } = await request(url, options);

    if (response.ok) {
      setCampanhas(json)
      console.log(json)
    } 

  }

  React.useEffect(() => {
    pegaCampanhas()
  }, [])

  if(loading) return <div className={'arrumaLoad loader'} />
  if(!campanhas) return null
  return (
    <div className={style.mainButton}>
      <div className={style.containerButton}>
        <Button onClick={() => setIsModalVisible(true)}>Nova Campanha{" "}<FontAwesomeIcon icon={faPlus} /> </Button>
      </div>
      {isModalVisible ? (
        <Modal onClose={setIsModalVisible}>
          <div>
            <CriarCampanha
              titulo={"Criar Uma Campanha"}
              imgsrc={imgcampanha}
              labelUm={"Nome da Campanha:"}
              labelDois={"Descrição da Campanha:"}
              labelTres={"Quantidade para Arrecadar:"}
              btnUm={"Limpar"}
              btnDois={"Salvar"}
              modalAberto={setIsModalVisible}
              atualizar={pegaCampanhas}
            />
          </div>
        </Modal>
      ) : null}
      {verModalEdit ? (
        <Modal onClose={setVerModalEdit}>
          <div>
            <EditarCampanha
              titulo={"Editar a Campanha"}
              imgsrc={imgcampanha}
              labelUm={"Nome da Campanha:"}
              labelDois={"Descrição da Campanha:"}
              labelTres={"Quantidade para Arrecadar:"}
              btnUm={"Limpar"}
              btnDois={"Salvar"}
              modalAberto={setVerModalEdit}
              atualizar={pegaCampanhas}
              dadosEditar={dadosEdicao}
            />
          </div>
        </Modal>
      ) : null}


      {campanhas && (
        <>
          <div className={style.lista}>
            {campanhas.content.map((card) => {
              console.log(card);
              return (
                <>
                  <CardCampanha
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
                    atualizar={pegaCampanhas}
                    abrirEdicao={setVerModalEdit}
                    setDadosEdicao={setDadosEdicao}
                  />
                </>
              );
            })}
          </div>
        </>
      )}
      
      {campanhas && campanhas.totalElements !== 0 ? (
        <Paginacao
          page={page}
          size={size}
          setItens={setCampanhas}
          setPagina={setPage}
          reqItens={PEGAR_CAMPANHAS}
          isPrivate={true}
          paginar={campanhas}
        />
      ) : (
        <NadaParaVer />
      ) }
    </div>
  );
};

export default TelaCampanhas;

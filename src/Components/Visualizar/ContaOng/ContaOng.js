import React from "react";
import { useParams } from "react-router";
import { PEGA_DADOS_ONG } from "../../../api";
import UseFetch from "../../../Custom-Hooks/UseFetch";
import HeaderOng from "../../Perfil/ConteudoPerfil/HeadersPerfil/HeaderOng/HeaderOng";
import MainPerfil from "../../Perfil/ConteudoPerfil/MainPerfil/MainPerfil";
import Button from "../../Smart-components/Button/Button";
import style from "./ContaOng.module.css";
import CadastroTeste from "../../CadastroTeste/CadastroTeste";
import { PEGAR_CAMPANHAS } from "../../../api";
import doaricon from '../../../resources/images/giftratas.gif'
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import CardVerCampanha from "../../Telas/Cards/CardVerCampanha/CardVerCampanha";
import ListCampanhas from "../ListCampanhas/ListCampanhas";
import Modal from "../../Smart-components/Modal/Modal"
import ModalCampanha from "../../VerCampanha/VerCampanha"
import imgcampanha from '../../../resources/images/visuCampanha.png'
import CriarDoacao from "../../CriarDoacao/CriarDoacao";



const ContaOng = () => {
  const [dadosOng, setDadosOng] = React.useState();
  const [info, setInfo] = React.useState(true);
  const [infoCampanha, setInfoCampanha] = React.useState(null)
  const [verCampanha, setVerCampanhas] = React.useState(false);
  const [verModal, setVerModal] = React.useState(false)
  const [verDoar, setVerDoar] = React.useState(false)
  const [campanhas, setCampanhas] = React.useState(null)
  const [doar, setDoar] = React.useState(false);
  const [dadosCampanha, setDadosCampanha] = React.useState(null)
  const { request, loading, error, dados } = UseFetch();
  const { id } = useParams();
  const tokenId = id




  React.useEffect(() => {
    async function montaPerfilOng() {
      const token = window.localStorage.getItem("token");
      const { url, options } = PEGA_DADOS_ONG(token, tokenId);

      const { response, json } = await request(url, options);

      if (response.ok) {
        console.log(json);
        setDadosOng(json);
      } else {
        console.log(error);
      }
    }

    async function pegaCampanhas() {

      const { url, options } = PEGAR_CAMPANHAS(Number(id) + 1)
      console.log(url)
      console.log(options)

      try {
        const { response, json } = await request(url, options);
        if (response.ok) {
          setCampanhas(json)
          console.log(json)
        }
      } catch (error) {
        console.log(error)
      }
    }

    
    montaPerfilOng();
    pegaCampanhas()
  }, []);

  if (loading) return <div className={"loader"} />;
  if (!dadosOng) return null;
  return (
    <>
      <div className={style.conta}>
        <HeaderOng
          nomeFantasia={dadosOng.nomeFantasia}
          email={dadosOng.usuario.email}
          razaoSocial={dadosOng.razaoSocial}
          focoInstitucional={dadosOng.focoInstitucional}
          dtFundacao={dadosOng.dtFundacao}
          idToken={dadosOng.id}
          style={{marginLeft: '50vw'}}
        />
        <div className={style.buttons}>
          <Button
            onClick={() => {
              setInfo(true);
              setVerCampanhas(false);
              setDoar(false);
            }}
          >
            Informações
          </Button>
          <Button
            onClick={() => {
              setInfo(false);
              setVerCampanhas(true);
              setDoar(false);
            }}
          >
            Campanhas
          </Button>
        </div>
        {info && (
          <MainPerfil
            rua={dadosOng.rua}
            numero={dadosOng.numero}
            complemento={dadosOng.complemento}
            cidade={dadosOng.cidade}
            estado={dadosOng.estado}
            cep={dadosOng.cep}
            telefone={dadosOng.telefone}
          />
        )}
        {doar &&
          <div className={style.cadastrar}>
            <CadastroTeste
              titulo={'Doar um Item para ' + dadosOng.nomeFantasia}
              labelImg={'Imagem do Item'}
              labelUm={'Nome do Item:'}
              labelDois={'Descrição:'}
              btnUm={'Limpar'}
              btnDois={'Realizar Doação'}
              cancelTo={'/'}
              imgsrc={doaricon}
            />
          </div>
        }
        {verCampanha && (
            <ListCampanhas 
              id={id}
              setDados={setInfoCampanha}
              setVerModal={setVerModal}
              abrirDoar={setVerDoar}
              setDadosCampanha={setDadosCampanha}
            />
          )
        }
        {verModal && (
          <Modal onClose={setVerModal}>
            <ModalCampanha
              titulo={`${infoCampanha.nome}`}
              imgsrc={imgcampanha}
              labelUm={"Nome da Campanha:"}
              labelDois={"Descrição da Campanha:"}
              labelTres={"Arrecadamento Esperado:"}
              btnUm={"Limpar"}
              btnDois={"Salvar"}
              modalAberto={setVerModal}
              dadosVisualizar={infoCampanha}
            />
        </Modal>
        )}
        {verDoar && (
          <Modal onClose={setVerDoar}>
            <CriarDoacao 
                titulo={"Propor Doação"}
                imgsrc={imgcampanha}
                labelUm={"Nome do item:"}
                labelDois={"Descrição do item:"}
                labelTres={"Quantidade:"}
                btnUm={"Limpar"}
                btnDois={"Salvar"}
                modalAberto={setVerDoar}
                nomeCampanha={dadosCampanha.nome}
                idInstituicao={dadosCampanha.usuario.id}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default ContaOng;

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
// import doaricon from '../../../resources/images/doaricon.png'
import doaricon from '../../../resources/images/giftratas.gif'
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import CardVerCampanha from "../../Telas/Cards/CardVerCampanha/CardVerCampanha";
import ListCampanhas from "../ListCampanhas/ListCampanhas";

const ContaOng = () => {
  const [dadosOng, setDadosOng] = React.useState();
  const [info, setInfo] = React.useState(true);
  const [verCampanha, setVerCampanhas] = React.useState(false);
  const [campanhas, setCampanhas] = React.useState(null)
  const [doar, setDoar] = React.useState(false);
  const { request, loading, error, dados } = UseFetch();
  const { id } = useParams();



  React.useEffect(() => {
    async function montaPerfilOng() {
      const token = window.localStorage.getItem("token");
      const { url, options } = PEGA_DADOS_ONG(token, id);

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
        window.alert(id)
        console.log(error)
      }
    }

    pegaCampanhas()
    montaPerfilOng();
  }, []);

  if (loading) return <div className={"loader"} />;
  if (!dadosOng) return null;
  return (
    <>
      <div className={style.conta}>
        <HeaderOng
          nomeFantasia={dadosOng.nomeFantasia}
          email={dadosOng.email}
          razaoSocial={dadosOng.razaoSocial}
          focoInstitucional={dadosOng.focoInstitucional}
          dtFundacao={dadosOng.dtFundacao}
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
          <Button
            onClick={() => {
              setInfo(false);
              setVerCampanhas(false);
              setDoar(true);
            }}
          >
            Doar
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
            />
          // <div className={style.lista}>
          //   {campanhas.map((card) => (
          //     <CardVerCampanha 
          //     labels={{
          //       label1: 'Campanha',
          //       label2: 'Descricao',
          //       label3: 'Para Arrecadar'
          //     }}
          //     idCampanha={card.id}
          //     foto={card.image}
          //     descricao={card.descricao}
          //     nomeItem={card.nome}
          //     quantidade={card.quantidade}
          //     // atualizar={pegaCampanhas}
          //     // abrirEdicao={setVerModalEdit}
          //     // setDadosEdicao={setDadosEdicao}
          //     />
          //   ))}
          // </div>
          )
        }
      </div>
    </>
  );
};

export default ContaOng;

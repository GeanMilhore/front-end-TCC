import React from "react";
import { useParams } from "react-router";
import { PEGA_DADOS_ONG } from "../../../api";
import UseFetch from "../../../Custom-Hooks/UseFetch";
import HeaderOng from "../../Perfil/ConteudoPerfil/HeadersPerfil/HeaderOng/HeaderOng";
import MainPerfil from "../../Perfil/ConteudoPerfil/MainPerfil/MainPerfil";
import Button from "../../Smart-components/Button/Button";
import style from "./ContaOng.module.css";
import CadastroTeste from "../../CadastroTeste/CadastroTeste";
import doaricon from '../../../resources/images/doaricon.png'

const ContaOng = () => {
  const [dadosOng, setDadosOng] = React.useState();
  const [info, setInfo] = React.useState(true);
  const [campanhas, setCampanhas] = React.useState(false);
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
        />
        <div className={style.buttons}>
          <Button
            onClick={() => {
              setInfo(true);
              setCampanhas(false);
              setDoar(false);
            }}
          >
            Informações
          </Button>
          <Button
            onClick={() => {
              setInfo(false);
              setCampanhas(true);
              setDoar(false);
            }}
          >
            Campanhas
          </Button>
          <Button
            onClick={() => {
              setInfo(false);
              setCampanhas(false);
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
                titulo={'Fazer Uma Proposta'}
                cancelTo={'/'}
                imgsrc={doaricon}
            />
        </div>
        }
      </div>
    </>
  );
};

export default ContaOng;

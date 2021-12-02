import React from "react";
import { PEGAR_PROPOSTAS_DOADOR } from "../../../../api";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from "./TelaPropostas.module.css";
import CardProposta from "../../Cards/CardProposta/CardProposta";
import CardPerfil from "../../../Home/CardPerfil/CardPerfil";
import Paginacao from "../../../Smart-components/Paginacao/Paginacao";
import NadaParaVer from "../../../NadaParaVer/NadaParaVer";

const TelaPropostas = () => {
  const [propostas, setPropostas] = React.useState(null);
  const { loading, error, dados, request } = useFetch();
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(4);

  const pegaPropostas = async function() {
    const token = window.localStorage.getItem("token");
    const { url, options } = PEGAR_PROPOSTAS_DOADOR(token, page, size);

    const { response, json } = await request(url, options);

    if (response.ok) {
      console.log(json);
      setPropostas(json);
    } else {
      console.log(error);
    }
  }

  React.useEffect(() => {
    pegaPropostas();
  }, []);

  if (loading) return <div className={"arrumaLoad loader"} />;
  if (!propostas) return null;
  return (
    <>
      <div className={style.lista}>
        {propostas &&
          propostas.content.map((proposta) => {
            return (
              <>
                <CardProposta
                  labels={{
                    label1: 'Nome do Item',
                    label2: 'Ong de Destino',
                    label3: 'Status'
                  }}
                  idProposta={proposta.id}
                  foto={proposta.item.image}
                  nomeOng={proposta.instituicao.nomeFantasia}
                  idOng={proposta.instituicao.id}
                  nomeItem={proposta.item.nome}
                  status={proposta.status}
                  atualizar={pegaPropostas}
                />
              </>
            );
          })}
      </div>
      {propostas.totalElements !== 0 ? (
      <Paginacao
        size={size}
        page={page}
        setItens={setPropostas}
        setPagina={setPage}
        reqItens={PEGAR_PROPOSTAS_DOADOR}
        isPrivate={true}
        paginar={propostas}
      />
      ) : (
        <NadaParaVer />
      )}
    </>
  );
};

export default TelaPropostas;

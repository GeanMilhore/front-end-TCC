import React from "react";
import { PEGAR_PROPOSTAS_DOADOR } from "../../../../api";
import { LISTAR_ONGS } from "../../../../api";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from "./TelaPropostas.module.css";
import CardProposta from "../../Cards/CardProposta/CardProposta";
import CardPerfil from "../../../Home/CardPerfil/CardPerfil";
import Paginacao from "../../../Smart-components/Paginacao/Paginacao";

const TelaPropostas = () => {
  const [itens, setItens] = React.useState(null);
  const { loading, error, dados, request } = useFetch();
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(4);

  React.useEffect(() => {
    async function pegaItens() {
      const token = window.localStorage.getItem("token");
      const { url, options } = LISTAR_ONGS(page, size);

      const { response, json } = await request(url, options);

      if (response.ok) {
        console.log(json);
        setItens(json);
      } else {
        console.log(error);
      }
    }

    pegaItens();
  }, []);

  if (loading) return <div className={" loader"} />;
  if (!itens) return null;
  return (
    <>
      <div className={style.lista}>
        {itens.content &&
          itens.content.map((card) => {
            console.log(card);
            return (
              <>
                {/* <CardPerfil
                  nome={card.nome}
                  estado={card.estado}
                  cidade={card.cidade}
                  telefone={card.telefone}
                  id={card.id}
                />
                <CardPerfil
                  nome={card.nome}
                  estado={card.estado}
                  cidade={card.cidade}
                  telefone={card.telefone}
                  id={card.id}
                />
                <CardPerfil
                  nome={card.nome}
                  estado={card.estado}
                  cidade={card.cidade}
                  telefone={card.telefone}
                  id={card.id}
                />
                <CardPerfil
                  nome={card.nome}
                  estado={card.estado}
                  cidade={card.cidade}
                  telefone={card.telefone}
                  id={card.id}
                /> */}
                <CardProposta
                  labels={{
                    label1: 'Nome do Item',
                    label2: 'Ong de Destino',
                    label3: 'Status'
                  }}
                  foto={""}
                  nomeOng={card.nome}
                  nomeItem={"Item de teste"}
                  status={"PENDENTE"}
                />
              </>
            );
          })}
      </div>
      <Paginacao
        size={size}
        page={page}
        setItens={setItens}
        setPagina={setPage}
        totalPaginas={itens.totalPages}
        reqItens={LISTAR_ONGS}
      />
    </>
  );
};

export default TelaPropostas;

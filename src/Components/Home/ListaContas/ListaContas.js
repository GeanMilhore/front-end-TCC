import React from "react";
import useFetch from "../../../Custom-Hooks/UseFetch";
import CardOng from "../CardPerfil/CardPerfil";
import style from './ListaContas.module.css'
import Paginacao from '../../Smart-components/Paginacao/Paginacao'
import NadaParaVer from "../../NadaParaVer/NadaParaVer";

const ListaContas = ({ endPoint }) => {
  const [contas, setContas] = React.useState(null);
  const { request, error, loading, dados } = useFetch();
  const [page, setPage] = React.useState(0)
  const [size, setSize] = React.useState(4)

  React.useEffect(() => {
    async function pegaContas() {
      const token = window.localStorage.getItem("token");

      const { url, options } = endPoint(page, size);

      const { response, json } = await request(url, options);

      if (response.ok) {
        console.log(json);
        setContas(json);
      } else {
        console.log(error);
      }
    }
    pegaContas();
  }, []);

  if (loading) return <div className={"arrumaLoadHome loader"} />;
  return (
    <>
      <div className={style.listagem}>
        {contas && contas.content.map((conta) => {
          return (
            <CardOng
              id={conta.id}
              imagemOng={conta.image}
              nome={conta.nomeFantasia ? conta.nomeFantasia : conta.nome}
              telefone={conta.telefone}
              estado={conta.estado}
              cidade={conta.cidade}
            />
          );
        })}
      </div>
      {contas && contas.totalElements !== 0 ?
        <Paginacao 
          size={size}
          page={page}
          setItens={setContas}
          setPagina={setPage}
          reqItens={endPoint}
          paginar={contas}
        /> : <NadaParaVer />
      }
    </>

  );
};

export default ListaContas;

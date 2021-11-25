import React from "react";
import style from "./Paginacao.module.css";
import useFetch from "../../../Custom-Hooks/UseFetch"

const Paginacao = ({ page, size, setItens, setPagina, totalPaginas, reqItens }) => {
  const { request, loading, error, dados } = useFetch();
  const [ podeProxima, setPodeProxima ] = React.useState()
  const [ podeAnterior, setPodeAnterior ] = React.useState()

  React.useEffect(() => {
    setPodeAnterior(true)
    setPodeProxima(true)
    if(page == 0){
        setPodeAnterior(false)
    }
    if(page == totalPaginas - 1 || totalPaginas == 0){
        setPodeProxima(false)
    }
  }, [page])

  const proxima = async function proximaPagina() {
    const token = window.localStorage.getItem("token");

    const { url, options } = reqItens( page + 1, size);
    setPagina(page + 1);

    const { response, json } = await request(url, options);

    if (response.ok) {
      setItens(json);
      console.log(json);
    } else {
      console.log(error);
    }
  };

  const anterior = async function voltarPagina() {
    const token = window.localStorage.getItem("token");
    const { url, options } = reqItens(page - 1, size);
    setPagina(page - 1);
    const { response, json } = await request(url, options);

    if (response.ok) {
      setItens(json);
      console.log(json);
    } else {
      console.log(error);
    }
  };

  return (
    <nav className={style.paginacao}>
      <span>Página - {page + 1} de {totalPaginas}</span>
      <div>
        <button disabled={!podeAnterior} onClick={() => anterior()}>&lt;</button>
        <button disabled={!podeProxima} onClick={() => proxima()}>&gt;</button>
      </div>
    </nav>
  );
};

// -- Tem nos parametros

// size={size}
//           page={pagina}
//           setCadastros={setCadastros}
//           setPagina={setPagina}
//           totalPaginas={cadastros.totalPages}
//           listarItem={LISTAR_ONGS}

// ------------------------------

// -- tem no componente

// const [pagina, setPagina] = React.useState(0);
// const [size, setSize] = React.useState(5);

export default Paginacao;

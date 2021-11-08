import React from "react";
import { LISTAR_ONGS } from "../../../../../api";
import style from "./NavFooter.module.css";
import useFetch from "../../../../../Custom-Hooks/UseFetch";

const NavFooter = ({ page, size, setCadastros, setPagina, totalPaginas, listarItem }) => {
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

    const { url, options } = listarItem(token, page + 1, size);
    setPagina(page + 1);

    const { response, json } = await request(url, options);

    if (response.ok) {
      setCadastros(json);
      console.log(json);
    } else {
      console.log(error);
    }
  };

  const anterior = async function voltarPagina() {
    const token = window.localStorage.getItem("token");
    const { url, options } = listarItem(token, page - 1, size);
    setPagina(page - 1);
    const { response, json } = await request(url, options);

    if (response.ok) {
      setCadastros(json);
      console.log(json);
    } else {
      console.log(error);
    }
  };

  return (
    <nav className={style.navFooter}>
      <span>Página - {page + 1}</span>
      <div>
        <button disabled={!podeAnterior} onClick={() => anterior()}>&lt;</button>
        <button disabled={!podeProxima} onClick={() => proxima()}>&gt;</button>
      </div>
    </nav>
  );
};

export default NavFooter;

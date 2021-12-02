import React from "react";
import style from "./Paginacao.module.css";
import useFetch from "../../../Custom-Hooks/UseFetch"
import Button from "../Button/Button"

const Paginacao = ({ page, size, setItens, setPagina, reqItens, paginar, isPrivate = false, token = window.localStorage.getItem('token') }) => {
  const { request, loading, error, dados } = useFetch();
  const [ podeProxima, setPodeProxima ] = React.useState()
  const [ podeAnterior, setPodeAnterior ] = React.useState()

  React.useEffect(() => {
    setPodeAnterior(true)
    setPodeProxima(true)
    if(page == 0){
        setPodeAnterior(false)
    }
    if(page == paginar.totalPages - 1 || paginar.totalPages == 0){
        setPodeProxima(false)
    }
    
  }, [page, paginar.totalPages])

  React.useEffect(() => {
    if(!paginar.first && paginar.last && paginar.numberOfElements == 0){
      anterior()
    }
  }, [paginar.totalPages])

  const proxima = async function proximaPagina() {

    if(isPrivate){
      const { url, options } = reqItens(token, page + 1, size);
      setPagina(page + 1);
      const { response, json } = await request(url, options);
      if (response.ok) {
        setItens(json);
        console.log(json);
      } else {
        console.log(error);
      }
    } else {
      const { url, options } = reqItens(page + 1, size);
      setPagina(page + 1);
      const { response, json } = await request(url, options);
      if (response.ok) {
        setItens(json);
        console.log(json);
      } else {
        console.log(error);
      }
    }

  };

  const anterior = async function voltarPagina() {
    
    if(isPrivate){
      const { url, options } = reqItens(token, page - 1, size);
      setPagina(page - 1);
      const { response, json } = await request(url, options);
      if (response.ok) {
        setItens(json);
        console.log(json);
      } else {
        console.log(error);
      }
    } else {
      const { url, options } = reqItens(page - 1, size);
      setPagina(page - 1);
      const { response, json } = await request(url, options);
      if (response.ok) {
        setItens(json);
        console.log(json);
      } else {
        console.log(error);
      }
    }

  };

  return (
    <nav className={style.paginacao}>
      <p><span>Página</span> - {page + 1} de {paginar.totalPages}</p>
      <div>
        <Button disabled={!podeAnterior} onClick={() => anterior()}>&lt;</Button>
        <Button disabled={!podeProxima} onClick={() => proxima()}>&gt;</Button>
      </div>
    </nav>
  );
};
export default Paginacao;

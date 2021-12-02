import React from "react";
import ListaCadastros from "../../ListaCadastros/ListaCadastros";
import useFetch from "../../../../../Custom-Hooks/UseFetch";
import { LISTAR_DOADORES, RELATORIO_DOADORES } from "../../../../../api";
import style from "./ListaDoadores.module.css";
import NavFooter from "../NavFooter/NavFooter";

const ListaDoadores = ({ labels }) => {
  const [cadastros, setCadastros] = React.useState();
  const { request, loading, error, dados } = useFetch();
  const [pagina, setPagina] = React.useState(0);
  const [size, setSize] = React.useState(5);

  React.useEffect(() => {
    async function pegaDados() {
      const token = window.localStorage.getItem("token");

      const { url, options } = LISTAR_DOADORES(token, pagina, size);
      const { response, json } = await request(url, options);
      if (response.ok) {
        setCadastros(json);
        console.log(json);
      } else {
        console.log(error);
      }
    }

    pegaDados();
  }, []);
  
  if(loading) return <div className={"arrumaLoadAdmin loader"} />
  if (!cadastros) return null 
  return (
    <>
      <div className={style.listaDoadores}>
        <ListaCadastros cadastros={cadastros} labels={labels} urlPdf={RELATORIO_DOADORES} />
        <NavFooter
          size={size}
          page={pagina}
          setCadastros={setCadastros}
          setPagina={setPagina}
          totalPaginas={cadastros.totalPages}
          listarItem={LISTAR_DOADORES}
        />
      </div>
    </>
  );
};

export default ListaDoadores;

import React from "react";
import ListaCadastros from "../../ListaCadastros/ListaCadastros";
import useFetch from "../../../../../Custom-Hooks/UseFetch";
import { LISTAR_ONGS, RELATORIO_ONGS } from "../../../../../api";
import style from "./ListaInstituicoes.module.css";
import NavFooter from "../NavFooter/NavFooter";

const ListaInstituicoes = ({ labels }) => {
  const [cadastros, setCadastros] = React.useState();
  const { request, loading, error, dados } = useFetch();
  const [pagina, setPagina] = React.useState(0);
  const [size, setSize] = React.useState(5);

  React.useEffect(() => {
    async function pegaDados() {
      const token = window.localStorage.getItem("token");

      const { url, options } = LISTAR_ONGS(token, pagina, size);
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
      <div className={style.listasInstituicoes}>
        <ListaCadastros cadastros={cadastros} labels={labels} urlPdf={RELATORIO_ONGS} />
        <NavFooter
          size={size}
          page={pagina}
          setCadastros={setCadastros}
          setPagina={setPagina}
          totalPaginas={cadastros.totalPages}
          listarItem={LISTAR_ONGS}
        />
      </div>
    </>
  );
};

export default ListaInstituicoes;

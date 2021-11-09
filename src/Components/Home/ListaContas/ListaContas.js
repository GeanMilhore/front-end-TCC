import React from "react";
import useFetch from "../../../Custom-Hooks/UseFetch";
import CardOng from "../CardPerfil/CardPerfil";
import style from './ListaContas.module.css'

const ListaContas = ({ endPoint }) => {
  const [contas, setContas] = React.useState(null);
  const { request, error, loading, dados } = useFetch();

  React.useEffect(() => {
    async function pegaContas() {
      const token = window.localStorage.getItem("token");

      const { url, options } = endPoint();

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

  if (loading) return <div className={"loader"} />;
  if (!contas) return null;
  return (
    <>
      <div className={style.listagem}>
        {contas.content.map((conta) => {
          return (
            <CardOng
              id={conta.id}
              nome={conta.nomeFantasia ? conta.nomeFantasia : conta.nome}
              telefone={conta.telefone}
              estado={conta.estado}
              cidade={conta.cidade}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListaContas;

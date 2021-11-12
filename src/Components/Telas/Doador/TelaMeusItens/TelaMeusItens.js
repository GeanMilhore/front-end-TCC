import React from "react";
import { PEGAR_PROPOSTAS_DOADOR } from "../../../../api";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import ListaMeusItens from '../../ListaCards/ListaMeusItens/ListaMeusItens'

const TelaMeusItens = () => {
  const [itens, setItens] = React.useState(null);
  const { loading, error, dados, request } = useFetch();

  React.useEffect(() => {
    async function pegaItens() {
      const token = window.localStorage.getItem("token");
      const { url, options } = PEGAR_PROPOSTAS_DOADOR(token);

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
      <ListaMeusItens
        lista={itens}
        label1={"Nome do Item:"}
        label2={"descrição: "}
        label3={'Status'}
      />
    </>
  );
};

export default TelaMeusItens;

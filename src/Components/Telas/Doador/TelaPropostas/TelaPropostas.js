import React from "react";
import { PEGAR_PROPOSTAS_DOADOR } from "../../../../api";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import ListaPropostas from "../../ListaCards/ListaPropostas/ListaPropostas";
import Modal from "../../../Smart-components/Modal/Modal";

const TelaPropostas = () => {
  const [propostas, setPropostas] = React.useState(null);
  const { loading, error, dados, request } = useFetch();

  React.useEffect(() => {
    async function pegaPropostas() {
      const token = window.localStorage.getItem("token");
      const { url, options } = PEGAR_PROPOSTAS_DOADOR(token);

      const { response, json } = await request(url, options);

      if (response.ok) {
        console.log(json);
        setPropostas(json);
      } else {
        console.log(error);
      }
    }

    pegaPropostas();
  }, []);

  if (loading) return <div className={" loader"} />;
  if (!propostas) return null;
  return (
    <>
      <ListaPropostas
        lista={propostas}
        label1={"Nome do Item:"}
        label2={"ONG destino"}
        label3={'Status'}
      />
    </>
  );
};

export default TelaPropostas;

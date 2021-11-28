import React from "react";
import { PEGAR_PROPOSTAS_DOADOR } from "../../../../api";
import useFetch from "../../../../Custom-Hooks/UseFetch";
import style from './TelaMeusItens.module.css'
import CardMeusItens from '../../Cards/CardMeusItens/CardMeusItens'

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
      <div className={style.lista}>
        {itens.content.map((card) => {
          console.log(card);

          return (
            <>
            <CardMeusItens
            labels={{
                label1: 'Nome do Item',
                label2: 'Descrição do Item',
                label3: 'Status'
            }}
              foto={card.item.image}
              descricao={card.item.descricao}
              nomeItem={card.item.nome}
              status={card.status}
            />
            </>
          );
        })}
      </div>
    </>
  );
};

export default TelaMeusItens;

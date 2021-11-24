import React from 'react'
import style from './TelaDoacoes.module.css'
import CardDoacoes from '../../Cards/CardDoacoes/CardDoacoes'


const TelaDoacoes = () => {
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
        {itens.map((card) => {
          console.log(card);

          return (
            <>
            <CardDoacoes
            labels={{
                label1: 'Nome do Item',
                label2: 'Ong de Destino',
                label3: 'Data Entrega'
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

export default TelaDoacoes

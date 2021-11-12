import React from "react";
import CardProposta from "../../Cards/CardProposta/CardProposta";
import style from './ListaPropostas.module.css'

const ListaCards = ({ lista, label1, label2, label3 }) => {
  return (
    <>
      <div className={style.lista}>
        {lista.map((card) => {
          console.log(card);

          return (
            <>
            <CardProposta
            labels={{
                label1: label1,
                label2: label2,
                label3: label3
            }}
              foto={card.item.image}
              nomeOng={card.instituicao.nomeFantasia}
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

export default ListaCards;

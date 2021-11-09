import React from "react";
import Card from "../Card/Card";
import style from './ListaCard.module.css'

const ListaCards = ({ lista }) => {
  return (
    <>
      <div className={style.lista}>
        {lista.map((card) => {
          console.log(card);

          return (
            <Card
            labels={{
                label1: 'Nome do Item:',
                label2: 'ONG destino',
                label3: 'Status'
            }}
              foto={card.item.image}
              nomeOng={card.instituicao.nomeFantasia}
              nomeItem={card.item.nome}
              status={card.status}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListaCards;

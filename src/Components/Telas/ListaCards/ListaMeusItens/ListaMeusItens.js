import React from "react";
import style from './ListaMeusItens.module.css'
import CardMeusItens from '../../Cards/CardMeusItens/CardMeusItens'

const ListaMeusItens = ({ lista, label1, label2, label3 }) => {
  return (
    <>
      <div className={style.lista}>
        {lista.map((card) => {
          console.log(card);

          return (
            <>
            <CardMeusItens
            labels={{
                label1: label1,
                label2: label2,
                label3: label3
            }}
              foto={card.item.image}
              nomeOng={card.item.descricao}
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

export default ListaMeusItens;

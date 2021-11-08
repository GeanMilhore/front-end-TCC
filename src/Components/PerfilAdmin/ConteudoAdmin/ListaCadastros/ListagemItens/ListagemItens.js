import React from "react";
import ItemLista from "../ItemLista/ItemLista";

const ListagemItens = ( {cadastros} ) => {
  return (
    <>
    <div>
      {cadastros.map((cadastro) => {
        return <ItemLista key={cadastro.id} item={cadastro} />
      })}
    </div>
    </>
  )
};

export default ListagemItens;

import React from "react";
import style from './ItemLista.module.css'
import Button from '../../../../Smart-components/Button/Button'

const ItemLista = ({ item }) => {

  React.useEffect(() => {
    console.log(item)
  }, [])

  var itemLista = {
    nome: null,
    colunaDois: null,
    colunaTres: null,
  };

  if (item.nomeFantasia) {
    itemLista.nome = item.nomeFantasia;
    itemLista.colunaDois = item.razaoSocial;
    itemLista.colunaTres = item.focoInstitucional;
  } else if (item.cpf) {
    itemLista.nome = item.nome;
    itemLista.colunaDois = item.cpf;
    itemLista.colunaTres = item.dtNasc;
  } else if (item.quantidade) {
    itemLista.nome = item.nome;
    itemLista.colunaDois = item.dataCriacao;
    itemLista.colunaTres = item.quantidade;
  }

  return (
    <div className={style.itemLista}>
      <span>{itemLista.nome}</span>
      <span>{itemLista.colunaDois}</span>
      <span>{itemLista.colunaTres}</span>
      <span className={style.adminButtons}>
        <Button>Editar</Button>
        <Button>Excluir</Button>
      </span>
    </div>
  );
};

export default ItemLista;

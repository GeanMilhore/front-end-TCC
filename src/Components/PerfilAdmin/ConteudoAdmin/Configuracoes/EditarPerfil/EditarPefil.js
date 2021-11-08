import React from "react";
import Input from "../../../../Smart-components/Input/Input";
import Button from "../../../../Smart-components/Button/Button";
import style from './EditarPerfil.module.css'

const EditarPefil = ({ visualizar, dados, setVisualizar }) => {
  return (
    <div hidden={!visualizar} className={style.editarPerfil}>
      <main>
        <label>
          Nome:
          <Input />
        </label>
      </main>
      <footer>
        <Button onClick={() => setVisualizar(!visualizar)}>Cancelar</Button>
        <Button>Salvar</Button>
      </footer>
    </div>
  );
};

export default EditarPefil;

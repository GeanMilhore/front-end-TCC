import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./CadastrarItem.module.css";
import Input from "../../Components/Smart-components/Input/Input.js";
import Switch from "../../Components/Smart-components/Switch/Switch";
import imageItem from "../../resources/images/add-item-image.png";

const CadastrarItem = () => {
  const [nome, setNome] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [qtd, setQtd] = React.useState(1);
  const [desc, setDesc] = React.useState("");

  React.useEffect(() => {
    if (checked) {
      setQtd(1);
    }
  }, [checked]);

  return (
    <div className="container-middle">
      <Modal.Dialog className={style.dialog}>
        <Modal.Header>
          <Modal.Title>Cadastrar Item</Modal.Title>
          <button
            style={{
              border: "none",
              fontSize: "15pt",
              backgroundColor: "transparent",
            }}
          >
            X
          </button>
        </Modal.Header>

        <Modal.Body>
          <div className={style.cadastroItem}>
            <form className={style.form}>
              <Input
                id="nome"
                label="Nome do Item:"
                type="text"
                value={nome}
                setValue={setNome}
              />
              <Switch
                id="unico"
                label="Item único:"
                setValue={setChecked}
                buttonclass={style.switchButton}
                labelclass={style.labelClass}
              />
              <Input
                id="qtd"
                label="Quantidade:"
                type="number"
                value={qtd}
                setValue={setQtd}
                disabled={checked}
                min={1}
              />
              <Input
                id="desc"
                label="Descrição:"
                type="textarea"
                value={desc}
                setValue={setDesc}
              />
            </form>
            <div className={style.imgItem}>
              <img src={imageItem} alt="símbolo de galeria" />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className={style.modalFooter}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "45%",
            }}
          >
            <Button variant="secondary">Limpar</Button>
            <Button variant="primary">Cadastrar</Button>
          </div>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default CadastrarItem;

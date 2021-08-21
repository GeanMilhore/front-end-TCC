import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./CadastrarItem.module.css";
import Input from "../../Components/Smart-components/Input/Input.js";
import Switch from "../../Components/Smart-components/Switch/Switch";
import imageItem from "../../resources/images/add-item-image.png";
import axios from "axios";

const CadastrarItem = () => {
  const [nome, setNome] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [qtd, setQtd] = React.useState(1);
  const [desc, setDesc] = React.useState("");
  const [img, setImg] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const inputFile = React.useRef();

  React.useEffect(() => {
    if (checked) {
      setQtd(1);
    }
  }, [checked]);

  function fileSelectedHandler(event) {
    setImg(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      var file = new FileReader();
      file.onload = function (e) {
        setPreview(e.target.result);
      };
      file.readAsDataURL(event.target.files[0]);
    }
  }

  function submitForm() {
    const fd = new FormData();
    fd.append("image", img, img.name);
    axios.post("--url api");
  }

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
              <div className={style.divUnicQtd}>
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
                  className={style.divUnicQtd}
                />
              </div>

              <Input
                id="desc"
                label="Descrição:"
                type="textarea"
                value={desc}
                setValue={setDesc}
              />
            </form>
            <div className={style.imgItem} onClick={() => inputFile.current.click()}>
              <div className={style.imgAlterar}>{img ? 'Alterar Imagem' : 'Adicionar Imagem'}</div>
              <input
                type="file"
                onChange={fileSelectedHandler}
                style={{ display: "none" }}
                ref={inputFile}
              />
              <img
                src={preview ? preview : imageItem}
                alt="símbolo de galeria"
              />
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

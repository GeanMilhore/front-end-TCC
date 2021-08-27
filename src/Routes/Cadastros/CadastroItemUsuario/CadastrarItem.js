import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./CadastrarItem.module.css";
import Input from "../../../Components/Smart-components/Input/Input.js";
import Switch from "../../../Components/Smart-components/Switch/Switch";
import imageItem from "../../../resources/images/add-item-image.png";
import axios from "axios";
import useForm from "../../../Custom-Hooks/UseForm";

const CadastrarItem = () => {
  const nome = useForm();
  const desc = useForm();
  const qtd = useForm();
  const [checked, setChecked] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [errorImg, setErrorImg] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const inputFile = React.useRef();

  React.useEffect(() => {
    if (checked) {
      qtd.setValue(1);
    } else if (qtd.value < 2) {
      qtd.setValue(2);
    }
  }, [checked, qtd]);

  React.useEffect(() => {
    if (errorImg) {
      validaImagem(img);
    }
  }, [img, errorImg]);

  function fileSelectedHandler(event) {

    if (event.target.files && event.target.files[0]) {
      var file = new FileReader();
      file.onload = function (e) {
        setPreview(e.target.result);
        setImg(e.target.result)
      };
      file.readAsDataURL(event.target.files[0]);
    }
  }

  function validaImagem(img) {
    if (!img) {
      setErrorImg("! Adicione uma foto !");
      return false;
    } else {
      setErrorImg(null);
      return true;
    }
  }

  function handleFormSubmit() {
    let formData = new FormData(); //formdata object

    if (
      nome.validate() &&
      qtd.validate() &&
      desc.validate() &&
      validaImagem(img)
    ) {
      formData.append("nome", nome.value); //append the values with key, value pair
      formData.append("quantidade", qtd.value);
      formData.append("descricao", desc.value);
      formData.append("imagem", img);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      axios
        .post('http://192.168.1.103:8000/url/api/CadastroItens', formData, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Formulário com Campos Incorretos");
    }
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
            <form
              className={style.form}
              onSubmit={(event) => event.preventDefault()}
            >
              <Input id="nome" label="Nome do Item:" type="text" {...nome} />
              <div className={style.divUnicQtd}>
                <Switch
                  id="unico"
                  label="Item único:"
                  value={checked}
                  setValue={setChecked}
                  buttonclass={style.switchButton}
                  labelclass={style.labelClass}
                />
                <Input
                  id="qtd"
                  label="Quantidade:"
                  type="number"
                  min={1}
                  value={qtd.value}
                  onChange={qtd.onChange}
                  disabled={checked}
                  className={style.divUnicQtd}
                />
              </div>

              <Input id="desc" label="Descrição:" type="textarea" {...desc} />
            </form>
            <div
              className={style.imgItem}
              onClick={() => inputFile.current.click()}
            >
              <div className={style.imgAlterar}>
                {img ? "Alterar Imagem" : "Adicionar Imagem"}
              </div>
              <input
                type="file"
                onChange={fileSelectedHandler}
                style={{ display: "none" }}
                ref={inputFile}
                onBlur={() => validaImagem(img)}
              />
              <img
                src={preview ? preview : imageItem}
                alt="símbolo de galeria"
              />
            </div>
            {errorImg ? <p style={{ color: "red" }}>{errorImg}</p> : ""}
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
            <Button
              variant="secondary"
              onClick={() => {
                nome.setValue("");
                qtd.setValue(2);
                setChecked(null);
                desc.setValue("");
                setImg(null);
                setPreview(false);
                if (checked) document.querySelector(".react-switch-bg").click();
              }}
            >
              Limpar
            </Button>
            <Button variant="primary" onClick={() => handleFormSubmit()}>
              Cadastrar
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default CadastrarItem;

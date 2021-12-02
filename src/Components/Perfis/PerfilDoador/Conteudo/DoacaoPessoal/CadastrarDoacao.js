import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./CadastrarDoacao.module.css";
import Input from '../../../Smart-components/Input/Input'
import imageItem from "../../../../resources/images/add-item-image.png";
import useForm from "../../../../Custom-Hooks/UseForm"

const CadastrarItem = () => {
  const nome = useForm();
  const desc = useForm();
  const valor = useForm();
  const [checked, setChecked] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [errorImg, setErrorImg] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const inputFile = React.useRef();

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
        setImg(e.target.result);
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
      valor.validate() &&
      desc.validate() &&
      validaImagem(img)
    ) {
      formData.append("nome", nome.value); //append the values with key, value pair
      formData.append("valor", valor.value);
      formData.append("descricao", desc.value);
      formData.append("imagem", img);

      // joga em uma url de criação de doação monetária
    }
  }

  return (
    <div className="container-middle">
      <Modal.Dialog className={style.dialog}>
        <Modal.Header>
          <Modal.Title>Cadastrar Doação</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={style.cadastroItem}>
            <form
              className={style.form}
              onSubmit={(event) => event.preventDefault()}
            >
              <Input id="nome" label="Nome do Item:" type="text" {...nome} />
              
              <Input id="valor" label="Valor:" type="number" {...valor} />

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
                desc.setValue("");
                valor.setValue('')
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

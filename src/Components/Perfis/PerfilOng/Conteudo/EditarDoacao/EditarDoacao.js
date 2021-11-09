import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./EditarDoacao.module.css";
import Input from "../../../Smart-components/Input/Input";
import imageItem from "../../../../resources/images/add-item-image.png";
import useForm from "../../../../Custom-Hooks/UseForm";
import { useParams } from "react-router";

const dadosItem = {
  id: 1,
  foto: "foto bonita",
  nomeItem: "Cobertor Lã",
  desc: "Cobertor muito bom",
  valor: 50,
};

const EditarDoacao = () => {
  const { id } = useParams();

  const nome = useForm();
  const desc = useForm();
  const qtd = useForm();
  const valor = useForm();
  const [checked, setChecked] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [errorImg, setErrorImg] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const inputFile = React.useRef();
  const [preenchido, setPreenchido] = React.useState(false);

  React.useEffect(() => {
    if (!preenchido) {
      preencheFormulario();
    }
  }, [preenchido]);

  React.useEffect(() => {
    // get item dados do item pelo id
  }, []);

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
    let formData = new FormData();

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

      // lógica e url de cadastro aqui
    }
  }

  function preencheFormulario() {
    nome.setValue(dadosItem.nomeItem);
    desc.setValue(dadosItem.desc);
    valor.setValue(dadosItem.valor);
  }

  return (
    <div className="container-middle">
      <Modal.Dialog className={style.dialog}>
        <Modal.Header>
          <Modal.Title>Editar Doação</Modal.Title>
          {/* <button
            style={{
              border: "none",
              fontSize: "15pt",
              backgroundColor: "transparent",
            }}
          >
            X
          </button> */}
        </Modal.Header>

        <Modal.Body>
          <div className={style.cadastroItem}>
            <form
              className={style.form}
              onSubmit={(event) => event.preventDefault()}
            >
              <Input id="nome" label="Nome do Item:" type="text" {...nome} />
              {/* {tipo === "doador" && (
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
              )} */}

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
                valor.setValue("");
                // qtd.setValue(2);
                setChecked(null);
                desc.setValue("");
                setImg(null);
                setPreview(false);
                // if (checked) document.querySelector(".react-switch-bg").click();
              }}
            >
              Limpar
            </Button>
            <Button variant="primary" onClick={() => handleFormSubmit()}>
              Editar
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default EditarDoacao;

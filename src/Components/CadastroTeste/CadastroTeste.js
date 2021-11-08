import React from "react";
import Button from "../Smart-components/Button/Button";
import style from "./CadastroTeste.module.css";
import Input from "../Smart-components/Input/Input";
import imageItem from "../../resources/images/add-item-image.png";
import useForm from "../../Custom-Hooks/UseForm";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Custom-Hooks/UseFetch";
import { CADASTRA_ITEM } from "../../api";

const CadastrarItem = ({ titulo, labels, imgsrc, message, submessage }) => {
  const { request, error, loading } = useFetch();
  const navigate = useNavigate();

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

  function validaImagem(preview) {
    console.log(preview);
    if (!preview) {
      setErrorImg("! Adicione uma foto !");
      return false;
    } else {
      setErrorImg(null);
      return true;
    }
  }

  async function handleFormSubmit() {
    nome.validate();
    valor.validate();
    desc.validate();
    validaImagem(preview);
    console.log(preview);

    if (
      nome.validate() &&
      desc.validate() &&
      valor.validate() &&
      validaImagem(preview)
    ) {
      const token = window.localStorage.getItem("token");
      const { url, options } = CADASTRA_ITEM(
        {
          nome: nome.value,
          image: preview,
          valor: valor.value,
          descricao: desc.value,
        },
        token
      );

      const { response } = await request(url, options);

      if (response.ok) {
        window.alert("Item Cadastrado com sucesso");
        navigate("/doacoesCadastradas");
      }
    }
  }

  return (
    <div className={style.containerItem}>
      <div className={style.header}>
        <img src={imgsrc} alt="fundo" />
        <span>{message}</span>
        <span>{submessage}</span>
        <div className={style.img} onClick={() => inputFile.current.click()}>
          <div className={style.imgHover}>
            {preview ? "Alterar Imagem" : "Adicionar Imagem"}
          </div>
          <input
            type="file"
            onChange={fileSelectedHandler}
            style={{ display: "none" }}
            ref={inputFile}
            onBlur={() => validaImagem(preview)}
          />
          <img src={preview ? preview : imageItem} alt="símbolo de galeria" />
        </div>
        {errorImg ? <p style={{ color: "red" }}>{errorImg}</p> : ""}
      </div>
      <div className={style.main}>
        <Input id="nome" label="Nome do Item:" type="text" {...nome} />

        <Input id="valor" label="Valor:" type="number" {...valor} />

        <Input id="desc" label="Descrição:" type="textarea" {...desc} />
      </div>
      <div className={style.buttons}>
        <Button
          variant="secondary"
          onClick={() => {
            nome.setValue("");
            desc.setValue("");
            valor.setValue("");
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
    </div>
  );
};

export default CadastrarItem;

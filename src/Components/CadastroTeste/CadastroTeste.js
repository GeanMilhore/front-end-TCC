import React from "react";
import Button from "../Smart-components/Button/Button";
import style from "./CadastroTeste.module.css";
import Input from "../Smart-components/Input/Input";
import imageItem from "../../resources/images/add-item-image.png";
import useForm from "../../Custom-Hooks/UseForm";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Custom-Hooks/UseFetch";
import { CADASTRA_ITEM } from "../../api";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const CadastrarItem = ({
  titulo,
  labelImg,
  labelUm,
  labelDois,
  btnUm,
  btnDois,
  imgsrc,
}) => {
  const { request, error, loading } = useFetch();
  const navigate = useNavigate();

  const nome = useForm();
  const desc = useForm();
  const valor = useForm();
  const [checked, setChecked] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [errorImg, setErrorImg] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [show, setShow] = React.useState(false);
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
        toast.success("Item Cadastrado com sucesso");
        navigate("/doacoesCadastradas");
      }
    }
  }

  return (
    <div className={style.containerItem}>
      <h2>{titulo}</h2>
      <div className={style.header}>
        <div className={style.fundoDoacao}>
          <img src={imgsrc} alt="fundo" />
        </div>
        <div className={style.img}>
          <div className={style.hover} style={{ display: `${show}` }}>
            {preview ? "Alterar Imagem" : "Adicionar Imagem"}
          </div>
          <input
            type="file"
            onChange={fileSelectedHandler}
            style={{ display: "none" }}
            ref={inputFile}
            onBlur={() => validaImagem(preview)}
          />
          <span style={{fontSize: '22px', marginBottom: '-23rem'}}>{labelImg}</span>
          <div className={style.imgContainer} onClick={() => inputFile.current.click()}>
            <img
              src={preview ? preview : imageItem}
              alt="símbolo de galeria"
              onMouseEnter={() => {
                setShow("block");
              }}
              onMouseLeave={() => {
                setShow("none");
              }}
            />
          </div>
          {errorImg ? <p style={{ color: "red" }}>{errorImg}</p> : ""}
        </div>
      </div>
      <div className={style.main}>
        <Input id="nome" label={labelUm} type="text" {...nome} />

        <Input id="desc" label={labelDois} type="textarea" {...desc} />
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
          }}
        >
          {btnUm}
        </Button>
        <Button variant="primary" onClick={() => handleFormSubmit()}>
          {btnDois}
        </Button>
      </div>
    </div>
  );
};

export default CadastrarItem;

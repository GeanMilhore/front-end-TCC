import React from "react";
import Button from "../Smart-components/Button/Button";
import style from "./CriarCampanha.module.css";
import Input from "../Smart-components/Input/Input";
import imageItem from "../../resources/images/add-item-image.png";
import useForm from "../../Custom-Hooks/UseForm";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Custom-Hooks/UseFetch";
import { CADASTRA_ITEM } from "../../api";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBullhorn} from '@fortawesome/free-solid-svg-icons'

const CriarCampanha = ({
  titulo,
  labelImg,
  labelUm,
  labelDois,
  labelTres,
  btnUm,
  btnDois,
  imgsrc,
}) => {
  const { request, error, loading } = useFetch();
  const navigate = useNavigate();

  const nome = useForm();
  const desc = useForm();
  const number = useForm();
  const minLength = 1;
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

  function onChangeNumber({ target }) {
    if (error) number.validate(target.value);
    number.setValue(target.value);

    if(target.value < minLength ){
      number.setValue(minLength)
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
    <>
      <div className={style.containerCampanha}>
        <h2>{titulo}{"  "}<FontAwesomeIcon icon={faBullhorn} /></h2>
        <div className={style.main}>
          <div className={style.left}>
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
              <span style={{ fontSize: "22px" }}>
                {labelImg}
              </span>
              <div
                className={style.imgContainer}
                onClick={() => inputFile.current.click()}
              >
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
            <div className={style.inputs}>
              <Input id="nome" label={labelUm} type="text" {...nome} />
              <Input id="desc" label={labelDois} type="textarea" {...desc} />
              <Input id="qtd" label={labelTres} type="number" {...number} onChange={(event) => onChangeNumber(event)} min={minLength}/>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${imgsrc})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
            className={style.right}

          >
            .
          </div>
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

      {/* <div className={style.containerItem}>
        <h2>{titulo}</h2>
        <div className={style.conteudo}>
          <div className={style.leftSide}>
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
              <span style={{ fontSize: "22px", marginBottom: "-23rem" }}>
                {labelImg}
              </span>
              <div
                className={style.imgContainer}
                onClick={() => inputFile.current.click()}
              >
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
            <div className={style.main}>
              <Input id="nome" label={labelUm} type="text" {...nome} />

              <Input id="desc" label={labelDois} type="textarea" {...desc} />
            </div>
          </div>
          <div className={style.header}>
            <div className={style.fundoDoacao}>
              <img src={imgsrc} alt="fundo" />
            </div>
          </div>
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
      </div> */}
    </>
  );
};

export default CriarCampanha;

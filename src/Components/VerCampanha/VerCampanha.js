import React from "react";
import Button from "../Smart-components/Button/Button";
import style from "./VerCampanha.module.css";
import Input from "../Smart-components/Input/Input";
import imageItem from "../../resources/images/add-item-image.png";
import useForm from "../../Custom-Hooks/UseForm";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Custom-Hooks/UseFetch";
import { EDITAR_CAMPANHA } from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const VerCampanha = ({
  titulo,
  labelImg,
  labelUm,
  labelDois,
  labelTres,
  imgsrc,
  modalAberto,
  atualizar,
  dadosVisualizar
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
  const [first, setFirst] = React.useState(true)

  React.useEffect(() => {
    if (errorImg) {
      validaImagem(img);
    }

    async function preencheCampos() {
      nome.setValue(dadosVisualizar.nome)
      number.setValue(dadosVisualizar.quantidade)
      desc.setValue(dadosVisualizar.descricao)
      setPreview(dadosVisualizar.image)
      setFirst(false)
    }

    if (first) {
      preencheCampos()
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

    if (target.value < minLength) {
      number.setValue(minLength)
    }
  }

  async function handleFormSubmit() {
    nome.validate();
    number.validate();
    desc.validate();
    validaImagem(preview);
    console.log(preview);

    if (
      nome.validate() &&
      desc.validate() &&
      number.validate() &&
      validaImagem(preview)
    ) {
      const token = window.localStorage.getItem("token");
      const { url, options } = EDITAR_CAMPANHA(
        {
          nome: nome.value,
          image: preview,
          quantidade: number.value,
          descricao: desc.value,
        },
        dadosVisualizar.id
        ,
        token
      );

      const { response } = await request(url, options);

      if (response.ok) {
        toast.success("Item Editado com sucesso");
        modalAberto(false)
        atualizar()
      } else {
        toast.error("Ops! Algo deu errado...")
      }
    }
  }

  return (
    <>
      <div className={style.containerCampanha}>
        <h2><span>Campanha</span> {titulo}{"  "}<FontAwesomeIcon icon={faInfoCircle} /></h2>
        <div className={style.main}>
          <div
            style={{
              backgroundImage: `url(${dadosVisualizar.image})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className={style.right}
          >
          </div>
          <div className={style.left}>
            <div className={style.infos}>
              <h4><span>{labelUm}</span> {dadosVisualizar.nome}</h4><br />
              <h5><span>{labelDois}</span> {dadosVisualizar.descricao}</h5><br />
              <h6><span>{labelTres}</span> {dadosVisualizar.quantidade}</h6>
            </div>
          </div>
        </div>
        {/* <div className={style.buttons}>
          <Button
            variant="secondary"
            onClick={() => {
              nome.setValue("");
              desc.setValue("");
              number.setValue("");
              number.setError(null)
              nome.setError(null)
              desc.setError(null)
              setErrorImg(false)
              setImg(null);
              setPreview(false);
            }}
          >
            {btnUm}
          </Button>
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            {btnDois}
          </Button>
        </div> */}
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

export default VerCampanha;

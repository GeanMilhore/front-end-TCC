import React from "react";
import Button from "../Smart-components/Button/Button";
import style from "./EditarCampanha.module.css";
import Input from "../Smart-components/Input/Input";
import imageItem from "../../resources/images/add-item-image.png";
import useForm from "../../Custom-Hooks/UseForm";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Custom-Hooks/UseFetch";
import { EDITAR_CAMPANHA } from "../../api";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBullhorn} from '@fortawesome/free-solid-svg-icons'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const EditarCampanha = ({
  titulo,
  labelImg,
  labelUm,
  labelDois,
  labelTres,
  btnUm,
  btnDois,
  imgsrc,
  modalAberto,
  atualizar,
  dadosEditar
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

    async function preencheCampos(){
      nome.setValue(dadosEditar.nome)
      number.setValue(dadosEditar.quantidade)
      desc.setValue(dadosEditar.descricao)
      setPreview(dadosEditar.image)
      setFirst(false)
    }

    if(first){
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

    if(target.value < minLength ){
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
        dadosEditar.id
        ,
        token
      );

      const { response } = await request(url, options);

      if (response.ok) {
        toast.success("Campanha editada com sucesso");
        modalAberto(false)
        atualizar()
      } else {
        toast.error('Ops! Algo deu errado')
        modalAberto(false)
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
        </div>
      </div>
      </>
  );
};

export default EditarCampanha;

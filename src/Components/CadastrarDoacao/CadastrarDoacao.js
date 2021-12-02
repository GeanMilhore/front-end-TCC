import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./CadastrarDoacao.module.css";
import Input from '../Smart-components/Input/Input'
import imageItem from "../../resources/images/add-item-image.png";
import useForm from "../../Custom-Hooks/UseForm"
import { useNavigate } from "react-router-dom";
import useFetch from '../../Custom-Hooks/UseFetch'
import { CADASTRA_ITEM } from "../../api";

import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const CadastrarItem = ({ titulo, labels, cancelTo}) => {

  const {request, error, loading} = useFetch()
  const navigate = useNavigate()

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
    console.log(preview)
    if (!preview) {
      setErrorImg("! Adicione uma foto !");
      return false;
    } else {
      setErrorImg(null);
      return true;
    }
  }

  async function handleFormSubmit() {
    nome.validate()
    valor.validate()
    desc.validate()
    validaImagem(preview)
    console.log(preview)

    if(
      nome.validate() &&
      desc.validate() &&
      valor.validate() &&
      validaImagem(preview)
    ){
      const token = window.localStorage.getItem('token')
      const {url, options} = CADASTRA_ITEM({
        nome: nome.value,
        image: preview,
        valor: valor.value,
        descricao: desc.value
      }, token)

      const {response} = await request(url, options)

      if(response.ok){
        toast.success('Proposta Enviada com Sucesso!')
        navigate('/doacoesCadastradas')
      } else {
        toast.error('Ops! Algo Deu Errado')
      }
    }
  }

  return (
    <div className="container-middle">
      <Modal.Dialog className={style.dialog}>
        <Modal.Header>
          <Modal.Title>{titulo}</Modal.Title>
          <button style={{border: 'none', backgroundColor: 'transparent'}} onClick={() =>navigate({cancelTo})}>X</button>
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
                {preview ? "Alterar Imagem" : "Adicionar Imagem"}
              </div>
              <input
                type="file"
                onChange={fileSelectedHandler}
                style={{ display: "none" }}
                ref={inputFile}
                onBlur={() => validaImagem(preview)}
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

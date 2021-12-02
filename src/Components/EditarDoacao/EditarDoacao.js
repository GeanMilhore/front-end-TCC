import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from "./EditarDoacao.module.css";
import Input from "../Smart-components/Input/Input";
import imageItem from "../../../../resources/images/add-item-image.png";
import useForm from "../../Custom-Hooks/UseForm";
import { useParams, useNavigate } from "react-router";
import { DOACAO_CADASTRADA, EDITA_DOACAO } from "../../api";
import useFetch from "../../Custom-Hooks/UseFetch";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const EditarDoacao = () => {
  const { loading, request } = useFetch();

  const navigate = useNavigate();
  const { id } = useParams();

  const nome = useForm();
  const desc = useForm();
  const valor = useForm();
  const [checked, setChecked] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [errorImg, setErrorImg] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const inputFile = React.useRef();
  const [preenchido, setPreenchido] = React.useState(false);

  React.useEffect(() => {
    async function pegaDados() {
      const token = window.localStorage.getItem("token");

      if (token) {
        const { url, options } = DOACAO_CADASTRADA(token, id);

        const { response, json } = await request(url, options);

        if (response.ok) {
          nome.setValue(json.nome);
          desc.setValue(json.descricao);
          valor.setValue(json.valor);
          setPreview(json.image);
        }
      }
    }
    pegaDados();
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

  function validaImagem(preview) {
    if (!preview) {
      setErrorImg("! Adicione uma foto !");
      return false;
    } else {
      setErrorImg(null);
      return true;
    }
  }

  async function handleFormSubmit() {
    const token = window.localStorage.getItem("token");

    if (
      token &&
      nome.validate() &&
      valor.validate() &&
      desc.validate() &&
      validaImagem(preview)
    ) {
      const { url, options } = EDITA_DOACAO(
        {
          nome: nome.value,
          valor: valor.value,
          descricao: desc.value,
          image: preview,
        },
        token,
        id
      );

      const { response } = await request(url, options);

      if(response.ok){
        toast.success('item modificado com sucesso!')
        navigate('/doacoesCadastradas')
      } else {
        toast.error('Ops! algo deu errado...')
      }
    }
  }

  if (loading) return <div className="loader" />;
  return (
    <div className="container-middle">
      <Modal.Dialog className={style.dialog + " animeTop"}>
        <Modal.Header>
          <Modal.Title>Editar Doação</Modal.Title>
          <button
            style={{
              border: "none",
              fontSize: "15pt",
              backgroundColor: "transparent",
            }}
            onClick={() => navigate("/doacoesCadastradas")}
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
                setChecked(null);
                desc.setValue("");
                setImg(null);
                setPreview(false);
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

import React from "react";
import CardPerfil from "../../Configuracoes/CardPerfil/CardPerfil";
import style from "./HeaderOng.module.css";
import categoriaicon from "../../../../../resources/images/categorias.png";
import dataicon from "../../../../../resources/images/calendar.png";
import razaoicon from "../../../../../resources/images/razaoSocial.png";
import Button from "../../../../Smart-components/Button/Button";
import { NavLink } from "react-router-dom";
import editaricon from "../../../../../resources/images/editar.png";
import { EDITAR_ONG, PEGA_DADOS_ONG } from "../../../../../api";
import UseFetch from "../../../../../Custom-Hooks/UseFetch";
import imagempadrao from "../../../../../resources/images/ongprofile.png";
import Modal from "../../../../Smart-components/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { UserContext } from "../../../../../UserContext";

const HeaderOng = ({
  idToken = Number(window.localStorage.getItem('token')) - 1,
  nomeFantasia,
  email,
  razaoSocial,
  focoInstitucional,
  dtFundacao,
  isMine,
}) => {
  const { request, loading, error, dados } = UseFetch();
  const [editImage, setEditImage] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [dadosPerfil, setDadosPerfil] = React.useState(null)
  const [errorImg, setErrorImg] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const inputFile = React.useRef();
  const [show, setShow] = React.useState(false);
  const { refreshUser } = React.useContext(UserContext)

  const pegaDadosPerfil = async function(){
    const token = window.localStorage.getItem("token");

    const { url, options } = PEGA_DADOS_ONG(token, idToken );

    const { response, json } = await request(url, options);

    if (response.ok) {
      console.log(json);
      setDadosPerfil(json);
      setPreview(json.image)
    } else {
      console.log("ops");
    }
  }

  React.useEffect(() => {
    pegaDadosPerfil();
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
    console.log(preview);
    if (!preview) {
      setErrorImg("! Adicione uma foto !");
      return false;
    } else {
      setErrorImg(null);
      return true;
    }
  }

  function limpar() {
    setErrorImg(false);
    setImg(null);
    setPreview(false);
  }

  async function atualizaImagem() {
    if (validaImagem(preview) || preview === null) {
      const token = window.localStorage.getItem('token')
      const { url, options } = EDITAR_ONG(
        {
          nomeFantasia: dadosPerfil.nomeFantasia,
          razaoSocial: dadosPerfil.razaoSocial,
          focoInstitucional: dadosPerfil.focoInstitucional,
          cnpj: dadosPerfil.cnpj,
          dtFundacao: dadosPerfil.dtFundacao,
          telefone: dadosPerfil.telefone,
          rua: dadosPerfil.rua,
          numero: dadosPerfil.numero,
          complemento: dadosPerfil.complemento,
          cidade: dadosPerfil.cidade,
          estado: dadosPerfil.estado,
          cep: dadosPerfil.cep,
          image: preview,
          email: dadosPerfil.usuario.email,
          senha: dadosPerfil.usuario.senha,
        },
        token, dadosPerfil.id)
      const { response, json } = await request(url, options)

      if(response.ok){
        toast.success('Imagem Editada com Sucesso!')
        pegaDadosPerfil()
        refreshUser()
        document.getElementById('modal').click()
      } else {
        toast.error('Ops! Algo correu errado...')
        document.getElementById('modal').click()
      }
    }
  }

  { if (!dadosPerfil) return null }
  return (
    <>
      <header className={style.header}>
        <div>
          <div
            className={style.imagemPerfil}
            style={{
              backgroundImage: `url('${dadosPerfil.image ? dadosPerfil.image : imagempadrao}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
          >
            {" "}
          </div>
          <div>
            <span>{nomeFantasia}</span>
            <span>{email}</span>
          </div>
        </div>
        {isMine && (
          <NavLink to="editar">
            <Button>
              <img src={editaricon} alt="icone" />
              Editar
            </Button>
          </NavLink>
        )}
        {isMine && (
          <div className={style.btnFoto}>
            <Button onClick={() => setEditImage(true)}>
              <FontAwesomeIcon icon={faCamera} />
            </Button>
          </div>
        )}
      </header>
      <div className={style.cards}>
        <CardPerfil
          titulo={"Foco Institucional"}
          icone={categoriaicon}
          conteudo={focoInstitucional}
        />
        <CardPerfil
          titulo={"Razão Social"}
          icone={razaoicon}
          conteudo={razaoSocial}
        />
        <CardPerfil
          titulo={"Data de Fundação"}
          icone={dataicon}
          conteudo={dtFundacao}
        />
      </div>
      {editImage && (
        <Modal onClose={setEditImage}>
          <div className={style.containerImage}>
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
              <span style={{ fontSize: "22px" }}>Alterar Imagem</span>
              <div
                className={style.imgContainer}
                onClick={() => inputFile.current.click()}
              >
                <img
                  src={preview ? preview : imagempadrao}
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
            <div className={style.buttons}>
              <Button onClick={() => limpar()}>Limpar</Button>
              <Button onClick={() => atualizaImagem()}>Salvar</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default HeaderOng;

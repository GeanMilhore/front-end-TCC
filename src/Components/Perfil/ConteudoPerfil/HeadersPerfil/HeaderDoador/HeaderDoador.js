import React from "react";
import CardPerfil from "../../Configuracoes/CardPerfil/CardPerfil";
import style from "./HeaderDoador.module.css";
import propostaicon from '../../../../../resources/images/propostaicon.png'
import dataicon from "../../../../../resources/images/calendar.png";
import razaoicon from "../../../../../resources/images/razaoSocial.png";
import { PEGAR_PROPOSTAS_DOADOR, PEGAR_PROPOSTAS_ACEITAS_DOADOR, PEGA_DADOS_DOADOR, EDITAR_DOADOR } from "../../../../../api"
import qtddoacoesicon from '../../../../../resources/images/donationdoadoricon.png'
import Button from "../../../../Smart-components/Button/Button";
import { NavLink } from "react-router-dom";
import editaricon from "../../../../../resources/images/editar.png";
import UseFetch from "../../../../../Custom-Hooks/UseFetch"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import imagemTeste from "../../../../../resources/images/perfilphotoadmin.png"
import Modal from "../../../../Smart-components/Modal/Modal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from "../../../../../UserContext";
import imagempadrao from "../../../../../resources/images/doadorprofile.png"


toast.configure()

const HeaderDoador = ({ nome, email, dtNasc, qtdDoacoes, qtdPropostas, isMine }) => {

  const { request, dados, loading, error } = UseFetch()
  const [propostasFeitas, setPropostasFeitas] = React.useState(null)
  const [propostasAceitas, setPropostasAceitas] = React.useState(null)
  const [editImage, setEditImage] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [dadosPerfil, setDadosPerfil] = React.useState(null)
  const [errorImg, setErrorImg] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const inputFile = React.useRef();
  const [show, setShow] = React.useState(false);
  const { refreshUser } = React.useContext(UserContext)


  const pegaDadosPerfil = async function () {
    const token = window.localStorage.getItem("token");

    const { url, options } = PEGA_DADOS_DOADOR(token, Number(token) - 1);

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
      const { url, options } = EDITAR_DOADOR(
        {
          nome: dadosPerfil.nome,
          cpf: dadosPerfil.cpf,
          dtNasc: dadosPerfil.dtNasc,
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

      if (response.ok) {
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



  React.useEffect(() => {

    async function pegaPropostas() {
      const token = window.localStorage.getItem('token')
      const { url, options } = PEGAR_PROPOSTAS_DOADOR(token)

      const { response, json } = await request(url, options)

      if (response.ok) {
        setPropostasFeitas(json.totalElements)
      }
    }



    async function pegaPropostasAceitas() {
      const token = window.localStorage.getItem('token')

      const { url, options } = PEGAR_PROPOSTAS_ACEITAS_DOADOR(token)

      const { response, json } = await request(url, options)

      if (response.ok) {
        setPropostasAceitas(json.totalElements)
      }
    }

    pegaDadosPerfil()
    pegaPropostasAceitas()
    pegaPropostas()
  }, [])

  if(!dadosPerfil) return null
  return (
    <>
      <header className={style.header}>
        <div>
          <div className={style.imagemPerfil}
            style={{
              backgroundImage: `url('${dadosPerfil.image ? dadosPerfil.image : imagempadrao}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center'
            }}
          >
            {" "}
          </div>
          <div>
            <span>{nome}</span>
            <span>{email}</span>
          </div>
        </div>
        {isMine && <NavLink to="editar">
          <Button>
            <img src={editaricon} alt="icone" />
            Editar
          </Button>
        </NavLink>}
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
          titulo={"Quantidade de Doações"}
          icone={qtddoacoesicon}
          conteudo={propostasAceitas}
        />
        <CardPerfil
          titulo={"Quantidade de Propostas"}
          icone={propostaicon}
          conteudo={propostasFeitas}
        />
        <CardPerfil
          titulo={"Data de Nascimento"}
          icone={dataicon}
          conteudo={dtNasc}
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

export default HeaderDoador;

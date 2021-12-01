import React from "react";
import { Modal, Button } from "react-bootstrap";
import Input from "../../Smart-components/Input/Input";
import useForm from "../../../Custom-Hooks/UseForm";
import style from "./EditarOng.module.css";
import DefaultImage from "../../../resources/images/cadastrar-usuario.png";
import DefaultImage2 from "../../../resources/images/cadastrar-usuario-pt2.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import useFetch from "../../../Custom-Hooks/UseFetch";
import { EDITAR_ONG, EXCLUIR_ONG } from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const EditarOng = ({ dadosUsuario }) => {
  const navigate = useNavigate();

  const [completo, setCompleto] = React.useState();
  const { refreshUser, fazerLogout, pegaImagemPerfil, imagem } =
    React.useContext(UserContext);

  const { error, request, loading } = useFetch();

  const nome = useForm();
  const documento = useForm("cnpj");
  const date = useForm();
  const telefone = useForm("telefone");
  const email = useForm("email");
  const senha = useForm();
  const senha2 = useForm();
  const [disabled, setDisabled] = React.useState(true);
  const [partOne, setPartOne] = React.useState(true);
  const cep = useForm("cep");
  const rua = useForm();
  const numero = useForm();
  const complemento = useForm(false);
  const estado = useForm();
  const cidade = useForm();
  const [endereco, setEndereco] = React.useState();
  const razaoSocial = useForm();
  const focoInst = useForm();

  React.useEffect(() => {
    setDisabled(senha.value.length < 8);
  }, [senha]);

  React.useEffect(() => {
    if (!completo) {
      preencheFormulario();
    }
    pegaImagemPerfil();
  }, []);

  async function preencheFormulario() {
    nome.setValue(dadosUsuario.nomeFantasia);
    email.setValue(dadosUsuario.email);
    date.setValue(dadosUsuario.dtFundacao);
    documento.setValue(dadosUsuario.cnpj);
    razaoSocial.setValue(dadosUsuario.razaoSocial);
    focoInst.setValue(dadosUsuario.focoInstitucional);
    telefone.setValue(dadosUsuario.telefone);
    cep.setValue(dadosUsuario.cep);
    rua.setValue(dadosUsuario.rua);
    numero.setValue(dadosUsuario.numero);
    complemento.setValue(dadosUsuario.complemento);
    cidade.setValue(dadosUsuario.cidade);
    estado.setValue(dadosUsuario.estado);
    setCompleto(true);
  }

  function validaSenhas() {
    if (senha.value !== senha2.value) {
      senha2.setError("Senhas não compativeis");
      return false;
    }
    return true;
  }

  function validaParteUm() {
    nome.validate();
    documento.validate();
    date.validate();
    focoInst.validate();
    razaoSocial.validate();
    telefone.validate();
    email.validate();
    if (
      nome.validate() &&
      documento.validate() &&
      date.validate() &&
      focoInst.validate() &&
      razaoSocial.validate() &&
      telefone.validate() &&
      email.validate()
    ) {
      return true;
    } else {
      return false;
    }
  }

  function validaParteDois() {
    cep.validate();
    rua.validate();
    numero.validate();
    complemento.validate();
    cidade.validate();
    estado.validate();
    if (
      cep.validate() &&
      rua.validate() &&
      numero.validate() &&
      complemento.validate() &&
      cidade.validate() &&
      estado.validate()
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleClickProximo() {
    if (validaParteUm()) {
      setPartOne(!partOne);
    }
  }

  const handleChangeCep = () => {
    buscarCep();
  };

  function buscarCep() {
    if (cep.value.length < 8) {
      setEndereco(null);
      return;
    } else {
      cep.validate();
      fetch(`http://viacep.com.br/ws/${cep.value}/json/`, { mode: "cors" })
        .then((res) => res.json())
        .then((data) => {
          if (data.hasOwnProperty("erro")) {
            alert("Cep não existente");
            setEndereco(null);
            cep.setValue("");
            rua.setValue("");
            cidade.setValue("");
            estado.setValue("");
            cep.setError("Cep Ínexistente");
          } else {
            console.log(data);
            rua.setValue(data.logradouro);
            cidade.setValue(data.localidade);
            estado.setValue(data.uf);
            setEndereco(data);
            rua.setError(null);
            cidade.setError(null);
            estado.setError(null);
          }
        })
        .catch((err) => {
          setEndereco(null);
          return null;
        });
    }
  }

  async function handleSubmit() {
    if (validaParteUm() && validaParteDois()) {
      const token = window.localStorage.getItem("token");
      const { entityId } = await refreshUser();

      if (token && dadosUsuario) {
        const { url, options } = EDITAR_ONG(
          {
            nomeFantasia: nome.value,
            razaoSocial: razaoSocial.value,
            focoInstitucional: focoInst.value,
            cnpj: documento.value,
            dtFundacao: date.value,
            telefone: telefone.value,
            rua: rua.value,
            numero: numero.value,
            complemento: complemento.value,
            cidade: cidade.value,
            estado: estado.value,
            cep: cep.value,
            email: email.value,
            senha: senha.value,
            image: imagem,
          },
          token,
          entityId
        );

        const { response, json } = await request(url, options);

        if (!response.ok) {
          toast.warning({ error });
        } else {
          await refreshUser();
          navigate("/configuracoes");
          toast.success("Dados editados com sucesso!");
        }
      } else {
        navigate("/login");
      }
    }
  }

  async function handleExcluirPerfil() {
    if (window.confirm("Deletar Perfil?")) {
      const token = window.localStorage.getItem("token");
      const { entityId } = await refreshUser();

      const { url, options } = EXCLUIR_ONG(token, entityId);

      const { response } = await request(url, options);

      if (response.ok) {
        toast.warning("Perfil Excluido com Sucesso!");
        fazerLogout();
      } else {
        toast.error("Ops! Algo correu errado...");
        toast.warning(
          "Você não pode excluir um perfil que possui vínculos tanto com doações como com propostas."
        );
      }
    }
  }

  return (
    <>
      <Modal.Dialog className={style.ContainerModal + " animeSmooth"}>
        <Modal.Header>
          <Modal.Title>Editar Minha Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={style.content + " animeLeft"}
            style={{ display: partOne ? "flex" : "none" }}
          >
            <form action="" className={style.camposUsuario}>
              <Input
                id="nome"
                label="Nome Fantasia: "
                type="text"
                {...nome}
                className={style.input100}
              />
              <div className={style.conjuntoInput}>
                <Input
                  id="documento"
                  label="CNPJ: "
                  type="text"
                  mask="99.999.999/9999-99"
                  {...documento}
                />
                <Input
                  id="date"
                  label="Data de Criação:"
                  type="date"
                  {...date}
                />
              </div>
              <Input
                id="razaoSocial"
                label="Razão Social:"
                type="text"
                {...razaoSocial}
              />
              <Input
                id="focoInstitucional"
                label="Foco Institucional:"
                type="text"
                {...focoInst}
              />
              <Input
                id="telefone"
                label="Telefone:"
                type="text"
                mask="+99 (99) 99999-9999"
                {...telefone}
              />
              <Input
                id="email"
                label="E-mail:"
                type="e-mail"
                disabled
                {...email}
              />
              <div className={style.conjuntoInput}></div>
            </form>
            <div className={style.containerImg}>
              <div
                className="userImage"
                style={{
                  backgroundImage: `url(${DefaultImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "contain",
                }}
              ></div>
            </div>
          </div>
          <div
            className={style.content + " animeRight"}
            style={{ display: !partOne ? "flex" : "none" }}
          >
            <div className={style.containerImg}>
              <div
                className="userImage"
                style={{
                  backgroundImage: `url(${DefaultImage2})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "100%",
                  maxWidth: "450px",
                  backgroundSize: "contain",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
            <form action="" className={style.camposUsuario}>
              <Input
                id="cep"
                label="CEP:"
                type="text"
                mask="99999-999"
                className={style.input100}
                {...cep}
                onBlur={handleChangeCep}
              />
              <Input
                id="rua"
                label="Rua:"
                type="text"
                {...rua}
                disabled={true}
              />
              <div className={style.conjuntoInput}>
                <Input id="numero" label="Número:" type="number" {...numero} />
                <Input
                  id="complemento"
                  label="Complemento:"
                  type="text"
                  {...complemento}
                />
              </div>
              <Input
                id="cidade"
                label="Cidade:"
                type="text"
                {...cidade}
                disabled={true}
              />
              <Input
                id="estado"
                label="Estado:"
                type="text"
                {...estado}
                disabled={true}
              />
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ display: partOne ? "flex" : "none" }}
          >
            <Link to="/configuracoes" className={style.link}>
              Cancelar
            </Link>
          </Button>
          <Button
            variant={partOne ? "primary" : "secondary"}
            onClick={() => handleClickProximo()}
          >
            {partOne ? "Próximo" : "Voltar"}
          </Button>
          {loading ? (
            <Button
              variant="primary"
              style={{ display: !partOne ? "flex" : "none" }}
              onClick={() => handleSubmit()}
              disabled
            >
              Editando...
            </Button>
          ) : (
            <Button
              variant="primary"
              style={{ display: !partOne ? "flex" : "none" }}
              onClick={() => handleSubmit()}
            >
              Salvar
            </Button>
          )}
          <Button
            variant="danger"
            style={{ display: !partOne ? "flex" : "none" }}
            onClick={() => handleExcluirPerfil()}
          >
            Excluir Perfil
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

export default EditarOng;

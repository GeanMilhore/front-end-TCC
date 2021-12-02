import React from "react";
import { Modal, Button } from "react-bootstrap";
import Input from "../../Smart-components/Input/Input";
import useForm from "../../../Custom-Hooks/UseForm";
import style from "./EditarDoador.module.css";
import DefaultImage from "../../../resources/images/cadastrar-usuario.png";
import DefaultImage2 from "../../../resources/images/cadastrar-usuario-pt2.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import { EDITAR_DOADOR, EXCLUIR_DOADOR } from "../../../api";
import useFetch from "../../../Custom-Hooks/UseFetch";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const EditarDoador = ({ dadosUsuario }) => {
  const { refreshUser, fazerLogout, pegaImagemPerfil, imagem } = React.useContext(UserContext)
  const { error, loading, request } = useFetch();

  const navigate = useNavigate();

  const nome = useForm();
  const documento = useForm("cpf");
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
  const [completo, setCompleto] = React.useState(false);

  React.useEffect(() => {
    setDisabled(senha.value.length < 8);
  }, [senha]);

  React.useEffect(() => {
    if (!completo) {
      preencheFormulario();
    }
    pegaImagemPerfil()
  }, []);

  function preencheFormulario() {
    nome.setValue(dadosUsuario.nome);
    email.setValue(dadosUsuario.email);
    date.setValue(dadosUsuario.dtNasc);
    documento.setValue(dadosUsuario.cpf);
    telefone.setValue(dadosUsuario.telefone);
    cep.setValue(dadosUsuario.cep);
    rua.setValue(dadosUsuario.rua);
    numero.setValue(dadosUsuario.numero);
    complemento.setValue(dadosUsuario.complemento);
    cidade.setValue(dadosUsuario.cidade);
    estado.setValue(dadosUsuario.estado);
    setCompleto(true);

    console.log(dadosUsuario.dtNasc);
    console.log(dadosUsuario.telefone);
  }

  function validaSenhas() {
    if (senha.value !== senha2.value) {
      senha2.setError("Senhas não compativeis");
      return false;
    }
    return true;
  }

  
  function validaParteUm(){
    nome.validate()
    documento.validate()
    date.validate()
    telefone.validate()
    email.validate()
    senha.validate()
    senha2.validate() 
    validaSenhas()

    if( nome.validate() &&
    documento.validate() &&
    date.validate() &&
    telefone.validate() &&
    email.validate() 
    ){
    return true
  } else {
    return false
  }
  }

  function validaParteDois(){
    cep.validate() 
      rua.validate() 
      numero.validate() 
      complemento.validate() 
      cidade.validate() 
      estado.validate()

      if(
        cep.validate() &&
      rua.validate() &&
      numero.validate() &&
      complemento.validate() &&
      cidade.validate() &&
      estado.validate()
      ){
        return true
      } else {
        return false
      }
  }


  function handleClickProximo() {
    if(
      validaParteUm()
      ){
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
            rua.setError(null)
            cidade.setError(null)
            estado.setError(null)
          }
        })
        .catch((err) => {
          setEndereco(null);
          return null;
        });
    }
  }

  async function handleSubmit() {
    if (
      validaParteUm() &&
      validaParteDois()
    ) {
      const token = window.localStorage.getItem("token");
      const { entityId } = await refreshUser();

      if (token && dadosUsuario) {
        const { url, options } = EDITAR_DOADOR(
          {
            nome: nome.value,
            cpf: documento.value,
            dtNasc: date.value,
            telefone: telefone.value,
            rua: rua.value,
            numero: numero.value,
            complemento: complemento.value,
            cidade: cidade.value,
            estado: estado.value,
            cep: cep.value,
            image: imagem
          },
          token,
          entityId
        );

        const { response, json } = await request(url, options);

        if (!response.ok) {
          toast.error({ error });
        } else {
          await refreshUser();
          toast.success('Usuário editado com sucesso!')
          navigate("/configuracoes");
        }
      } else {
        navigate("/login");
      }

      // url de post usuário Doador
    }
  }

  async function handleExcluirPerfil() {
    if (window.confirm("Deletar Perfil?")) {
      const token = window.localStorage.getItem("token");
      const { entityId } = await refreshUser();

      const { url, options } = EXCLUIR_DOADOR(token, entityId);

      const { response } = await request(url, options);

      if (response.ok) {
        toast.warning("Perfil Excluido com Sucesso!");
        fazerLogout();
      } else {
        toast.error("Ops! Algo correu errado...")
        toast.warning("Você não pode excluir um perfil que possui vínculos tanto com doações como com propostas.")
      }
    }
  }

  return (
    <>
      <Modal.Dialog className={style.ContainerModal}>
        <Modal.Header>
          <Modal.Title>Editar Minha Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={style.content + ` animeSmooth`}
            style={{ display: partOne ? "flex" : "none" }}
          >
            <form action="" className={style.camposUsuario + " animeLeft"}>
              <Input
                id="nome"
                label="Nome: "
                type="text"
                {...nome}
                className={style.input100}
              />
              <div className={style.conjuntoInput}>
                <Input
                  id="documento"
                  label="CPF: "
                  type="text"
                  mask="999.999.999-99"
                  {...documento}
                />
                <Input
                  id="date"
                  label="Data de Nascimento:"
                  type="date"
                  {...date}
                />
              </div>
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
            </form>
            <div className={style.containerImg}>
              <div
                className="userImage"
                style={{
                  backgroundImage: `url(${DefaultImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "100%",
                  maxWidth: "450px",
                  backgroundSize: "cover",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </div>
          <div
            className={style.content + ' animeRight'}
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
          {error && <p>{error}</p>}
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

export default EditarDoador;

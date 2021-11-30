import React from "react";
import { Modal, Button } from "react-bootstrap";
import Input from "../../Smart-components/Input/Input";
import useForm from "../../../Custom-Hooks/UseForm";
import style from "./CadastrarDoador.module.css";
import DefaultImage from "../../../resources/images/cadastrar-usuario.png";
import DefaultImage2 from "../../../resources/images/cadastrar-usuario-pt2.png";
import { Link, useNavigate } from "react-router-dom";
import { CADASTRAR_DOADOR } from "../../../api";
import useFetch from "../../../Custom-Hooks/UseFetch";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const CadastrarOng = () => {
  const { request, error, loading } = useFetch();
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
  const razaoSocial = useForm();
  const focoInst = useForm();

  React.useEffect(() => {
    setDisabled(senha.value.length < 8);
  }, [senha]);

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
    telefone.validate();
    email.validate();
    senha.validate();
    senha2.validate();
    validaSenhas();

    if (
      nome.validate() &&
      documento.validate() &&
      date.validate() &&
      telefone.validate() &&
      email.validate() &&
      senha.validate() &&
      senha2.validate() &&
      validaSenhas()
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
      const { url, options } = CADASTRAR_DOADOR({
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
        email: email.value,
        senha: senha.value,
      });

      const { response } = await request(url, options);

      if (response.ok) {
        toast.success("Usuário Cadastado com Sucesso!");
        navigate("/");
      } else {
        toast.error('Ops! Algo Deu Errado')
      }
    }
  }

  return (
    <>
      <div className={style.containerFormulario}>
        <div
          className={style.content}
          style={{ display: partOne ? "flex" : "none" }}
        >
          <form action="" className={style.camposUsuario + " animeLeft"}>
            <p>Preencha seus dados para criar um perfil de doador.</p>
            <Input id="nome" label="Nome: " type="text" {...nome} />
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
            <Input id="email" label="E-mail:" type="e-mail" {...email} />
            <div className={style.conjuntoInput}>
              <Input id="senha" label="Senha:" type="password" {...senha} placeholder={'minímo 8 caracteres'} />
              <Input
                id="senha2"
                label="Confirmar Senha:"
                type="password"
                {...senha2}
                disabled={disabled}
                onBlur={validaSenhas}
              />
            </div>
          </form>
          <div className={style.containerImg}>
            <ul className={style.informacaoFoto}>
              <li>Faça doações para instituições online.</li>
              <li>Visualize instituições das mais diversas causas.</li>
              <li>
                Crie um perfil e faça a sua primeira doação imediatamente.
              </li>
            </ul>
            <div
              className={"userImage " + style.img}
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
              <h5 style={{marginTop: '1rem'}}>Falta Pouco...</h5>
              <span>Estamos concluindo seu cadastro neste momento.</span>
            <div
              className="userImage"
              style={{
                backgroundImage: `url(${DefaultImage2})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                backgroundSize: "contain",
              }}
            ></div>
          </div>
          <form action="" className={style.camposUsuario}>
            <p>Mais sobre o seu endereço.</p>
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
              disabled={endereco}
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
              disabled={endereco}
            />
            <Input
              id="estado"
              label="Estado:"
              type="text"
              {...estado}
              disabled={endereco}
            />
          </form>
        </div>
        <div className={style.botoes}>
          <Button
            variant="secondary"
            style={{ display: partOne ? "flex" : "none" }}
          >
            <Link to="/" className={style.link}>
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
              Cadastrando...
            </Button>
          ) : (
            <Button
              variant="primary"
              style={{ display: !partOne ? "flex" : "none" }}
              onClick={() => handleSubmit()}
            >
              Cadastrar
            </Button>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default CadastrarOng;

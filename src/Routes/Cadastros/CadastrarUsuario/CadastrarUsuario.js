import React from "react";
import { Modal, Button } from "react-bootstrap";
import Input from "../../../Components/Smart-components/Input/Input";
import useForm from "../../../Custom-Hooks/UseForm";
import style from "./CadastrarUsuario.module.css";
import DefaultImage from "../../../resources/images/cadastrar-usuario.png";
import DefaultImage2 from "../../../resources/images/cadastrar-usuario-pt2.png";
import { Link } from "react-router-dom";
import axios from 'axios'

const usuario = {
  doador: {
    titulo: 'Usuário',
    labelNome: 'Nome: ',
    labelDocumento: 'CPF:',
    documento: 'cpf',
    labelData: 'Data de Nascimento:',
    docMask: "999.999.999-99"
  },
  instituicao: {
    titulo: 'Instituição',
    labelNome: 'Nome Fantasia: ',
    labelDocumento: 'CNPJ:',
    documento: 'cnpj',
    labelData: 'Data de Criação:',
    docMask: "99.999.999/9999-99"
  }
}

const CadastrarUsuario = ({ tipo }) => {
  const nome = useForm();
  const documento = useForm(usuario[tipo].documento);
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

  React.useEffect(() => {
    setDisabled(senha.value.length < 8);
  }, [senha]);

  function validaSenhas() {
    if (senha.value !== senha2.value) {
      senha2.setError("Senhas não compativeis");
      return false
    } 
    return true
  }

  function handleClickProximo() {
    setPartOne(!partOne);
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
          } else {
            console.log(data);
            rua.setValue(data.logradouro);
            cidade.setValue(data.localidade);
            estado.setValue(data.uf);
            setEndereco(data);
          }
        })
        .catch((err) => {
          setEndereco(null);
          return null;
        });
    }
  }

  function handleSubmit(){
    let formData = new FormData()

    if(
      nome.validate() &&
      documento.validate() &&
      date.validate() &&
      telefone.validate() && 
      email.validate() &&
      senha.validate() &&
      senha2.validate() && 
      validaSenhas() &&
      cep.validate() && 
      rua.validate() &&
      numero.validate() &&
      complemento.validate() &&
      cidade.validate() &&
      estado.validate()
    ){
      formData.append("nome",nome.value)
      formData.append(usuario[tipo].documento,documento.value)
      formData.append("date",date.value)
      formData.append("telefone",telefone.value)
      formData.append("email",email.value)
      formData.append("senha",senha.value)
      formData.append("senha2",senha2.value)
      formData.append("cep",cep.value)
      formData.append("rua",rua.value)
      formData.append("numero",numero.value)
      formData.append("complemento",complemento.value)
      formData.append("cidade",cidade.value)
      formData.append("estado",estado.value)

      const config = {
        headers: { "content-type": "multipart/form-data" },
      }

      const url = `https://127.0.0.1.103:3000/api/Cadastrar${tipo}`

      axios.post(url, formData, config)
      .then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    } else {
      console.log('Formulário com Erro')
    }
  }

  return (
    <>
      <Modal.Dialog className={style.ContainerModal}>
        <Modal.Header>
          <Modal.Title>Cadastrar {usuario[tipo].titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={style.content}
            style={{ display: partOne ? "flex" : "none" }}
          >
            <form action="" className={style.camposUsuario}>
              <Input
                id="nome"
                label={usuario[tipo].labelNome}
                type="text"
                {...nome}
                className={style.input100}
              />
              <div className={style.conjuntoInput}>
                <Input
                  id="documento"
                  label={usuario[tipo].labelDocumento}
                  type="text"
                  mask={usuario[tipo].docMask}
                  {...documento}
                />
                <Input
                  id="date"
                  label={usuario[tipo].labelData}
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
                <Input id="senha" label="Senha:" type="password" {...senha} />
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
            className={style.content}
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
        </Modal.Body>

        <Modal.Footer>
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
          <Button
            variant="primary"
            style={{ display: !partOne ? "flex" : "none" }}
            onClick={() => handleSubmit()}
          >
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

export default CadastrarUsuario;

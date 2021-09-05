import React from "react";
import { Modal, Button } from "react-bootstrap";
import Input from "../../Smart-components/Input/Input";
import useForm from "../../../Custom-Hooks/UseForm";
import style from "./CadastrarOng.module.css";
import DefaultImage from "../../../resources/images/cadastrar-usuario.png";
import DefaultImage2 from "../../../resources/images/cadastrar-usuario-pt2.png";
import { Link } from "react-router-dom";

const CadastrarOng = () => {

  const nome = useForm();
  const documento = useForm('cnpj');
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
  const razaoSocial = useForm()
  const focoInst = useForm()

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
      focoInst.validate() &&
      razaoSocial.validate() &&
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
      formData.append("cnpj",documento.value)
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
      formData.append("razaoSocial", razaoSocial.value)
      formData.append("focoInstitucional", focoInst.value)

    } 

  }

  return (
    <>
      <Modal.Dialog className={style.ContainerModal}>
        <Modal.Header>
          <Modal.Title>Cadastrar ONG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={style.content}
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

export default CadastrarOng;
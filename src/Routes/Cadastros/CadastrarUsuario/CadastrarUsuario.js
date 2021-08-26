import React from "react";
import { Modal, Button } from "react-bootstrap";
import Input from '../../../Components/Smart-components/Input/Input'
import useForm from "../../../Custom-Hooks/UseForm";

const CadastrarUsuario = () => {

    const nome = useForm();
    const cpf = useForm('cpf');
    const data = useForm();
    const telefone = useForm('telefone');
    const email = useForm('email');
    const senha = useForm()
    const senha2 = useForm()
    const [disabled, setDisabled] = React.useState(true)

    React.useEffect(() => {
        setDisabled(senha.value.length < 8)
    }, [senha])

    function validaSenhas(){
        if(senha.value !== senha2.value){
            senha2.setError('Senhas não compativeis')
        } 
    }

  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Cadastrar Usuário</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="content">
                <Input 
                    id="nome"
                    label="Nome:"
                    type="text"
                    {...nome}
                />
                <Input
                    id="cpf"
                    label="CPF:"
                    type="text"
                    mask="999.999.999-99"
                    {...cpf}
                />
                <Input
                    id="data"
                    label="Data de Nascimento:"
                    type="date"
                    {...data}
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
                    {...email}
                />
                <Input
                    id="senha"
                    label="Senha:"
                    type="password"
                    {...senha}
                />
                <Input
                    id="senha2"
                    label="Confirmar Senha:"
                    type="password"
                    {...senha2}
                    disabled={disabled}
                    onBlur={validaSenhas}
                />
            </div>
            <div className="containerImg">

            </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Limpar</Button>
          <Button variant="primary">Próximo</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

export default CadastrarUsuario;

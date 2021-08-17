import React from "react";
import { Modal, Button } from "react-bootstrap";
import style from './Cadastrar.module.css'
import Input from '../Smart-components/Input/Input.js'

const CadastrarItem = () => {

    const [form, setForm] = React.useState({
        nomeItem: '',
        unico: false,
        quantidade : 0,
        desc: ''
    })

  return (
    <div className="container-middle">
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Cadastrar Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className={style.cadastroItem}>
                <form >
                
                    <Input
                        type="text"
                        value=""
                        label="Nome do Item:"
                    />
                </form>
                <img src="" alt="" srcset="" />
            </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Limpar</Button>
          <Button variant="primary">Cadastrar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default CadastrarItem;

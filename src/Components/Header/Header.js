import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Header = () => {
  const [modalCadastro, setModalCadastro] = React.useState(false)
  const {logado } = React.useContext(UserContext)

  return (
    <>
    <Navbar bg="light" expand="lg" onMouseLeave={() => setModalCadastro(false)} >
      <Container>
        <Link to="/">Artemis</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto m-auto" style={{padding: '11px'}}>
            <Link to="/">Home</Link>
            {!logado && <Link to="" onMouseOver={() => setModalCadastro(true)} >Cadastro</Link>}
            {modalCadastro && 
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Link to="/login/criaDoador">Usuário</Link>
                <Link to="/login/criaOng">Instituição</Link>
              </div>
            }
            {!logado && <Link to="/login">Entrar</Link>}
            {logado && <Link to="/conta">MinhaConta</Link>}
            {/* <Link to="/cadastrarItem">CadastrarItem</Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;

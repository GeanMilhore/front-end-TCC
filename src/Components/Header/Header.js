import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [modalCadastro, setModalCadastro] = React.useState(false)
  return (
    <>
    <Navbar bg="light" expand="lg" onMouseLeave={() => setModalCadastro(false)} >
      <Container>
        <Link to="/">Artemis</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto m-auto" style={{padding: '11px'}}>
            <Link to="/">Home</Link>
            <Link to="" onMouseOver={() => setModalCadastro(true)} >Cadastrar</Link>
            {modalCadastro && 
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Link to="/cadastro/Usuario">Usuário</Link>
                <Link to="/cadastro/Instituicao">Instituição</Link>
              </div>
            }
            <Link to="/login">Entrar</Link>
            {/* <Link to="/cadastrarItem">CadastrarItem</Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;

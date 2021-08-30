import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../Context/AuthContext";

const Header = () => {
  const [modalCadastro, setModalCadastro] = React.useState(false)
  const {authenticated} = React.useContext(Context)

  return (
    <>
    <Navbar bg="light" expand="lg" onMouseLeave={() => setModalCadastro(false)} >
      <Container>
        <Link to="/">Artemis</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto m-auto" style={{padding: '11px'}}>
            <Link to="/">Home</Link>
            <Link to="" onMouseOver={() => setModalCadastro(true)} >Cadastro</Link>
            {modalCadastro && 
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Link to="/cadastro/Usuario">Usuário</Link>
                <Link to="/cadastro/Instituicao">Instituição</Link>
              </div>
            }
            {!authenticated && <Link to="/entrar">Entrar</Link>}
            {authenticated && <Link to="/MinhaConta">MinhaConta</Link>}
            {/* <Link to="/cadastrarItem">CadastrarItem</Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;

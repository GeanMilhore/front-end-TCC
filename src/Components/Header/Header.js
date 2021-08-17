import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">
        <Navbar.Brand href="#home">Artemis</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto m-auto">
            <Link to="/">
              <Nav.Link href="#home">Home</Nav.Link>
            </Link>
            <Link to="/doar">
              <Nav.Link href="#doar" >Doar</Nav.Link>
            </Link>
            <Link to="/cadastrarItem">
              <Nav.Link href="#cadastrarItem">CadastrarItem</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse> 
      </Container>
    </Navbar>
  );
};

export default Header;

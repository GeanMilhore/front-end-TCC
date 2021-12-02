import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Link as LinkScroll, animateScroll } from "react-scroll";
import { UserContext } from "../../UserContext";
import style from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [modalCadastro, setModalCadastro] = React.useState(false);
  const { logado, dadosUsuario } = React.useContext(UserContext);
  const [scroll, setScroll] = React.useState(false);

  React.useEffect(() => {
    if (window.location.pathname !== "/") {
      setScroll(style.notPage);
    } else {
      setScroll(null);
    }
    window.addEventListener("scroll", function () {
      if (window.scrollY > 3 && window.location.pathname === "/") {
        setScroll(style.scrollingActive);
      } else if (window.location.pathname === "/") {
        setScroll(null);
      } else {
        setScroll(style.notPage);
      }
    });
  }, [window.location.pathname]);

  return (
    <header className={`${style.navbar} ${scroll}`}>
      <Navbar
        expand="lg"
        onMouseLeave={() => setModalCadastro(false)}
        className={style.navBoot}
      >
        <Container>
          <Link to="/" onClick={() => animateScroll.scrollToTop()}>
            DOE+
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`me-auto m-auto ${style.navbarContent}`}
              style={{ padding: "11px" }}
            >
              {!logado && window.location.pathname == "/" && (
                <LinkScroll
                  to="sobre"
                  duration={500}
                  style={{
                    cursor: "pointer",
                    color: `${!scroll ? "black" : "white"}`,
                  }}
                >
                  Conheça
                </LinkScroll>
              )}
              {!logado && (
                <Link
                  to="/"
                  className={style.fundoNav}
                  style={{
                    cursor: "pointer",
                    color: `${!scroll ? "white" : "#2c2c2c"}`,
                    backgroundColor: `${!scroll ? "#2c2c2c" : "white"}`,
                  }}
                  onClick={async () => {
                    await navigate("/");
                    animateScroll.scrollToBottom();
                  }}
                >
                  Inscreva-se
                </Link>
              )}
              {!logado && (
                <Link
                  to="/login"
                  className={style.fundoNav}
                  style={{
                    color: `${!scroll ? "white" : "#2c2c2c"}`,
                    backgroundColor: `${!scroll ? "#2c2c2c" : "white"}`,
                  }}
                >
                  Login
                </Link>
              )}
              {logado && dadosUsuario && dadosUsuario.tipo == 'INSTITUICAO' && <Link to="/conta/configuracoes">{dadosUsuario.nomeFantasia}</Link>}
              {logado && dadosUsuario && dadosUsuario.tipo == 'DOADOR' && <Link to="/conta/configuracoes">{dadosUsuario.nome}</Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

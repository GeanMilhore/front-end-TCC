import React from "react";
import style from "./NavPerfil.module.css";
import donateicon from "../../../resources/images/donateicon.png";
import campanhaicon from "../../../resources/images/campanhaicon.png";
import homeiconv2 from "../../../resources/images/homeiconv2.png";
import handshakeicon from "../../../resources/images/handshakeicon.png";
import gearicon from "../../../resources/images/gearicon.png";
import Button from "../../Smart-components/Button/Button";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import useFetch from "../../../Custom-Hooks/UseFetch";
import { PEGA_DADOS_ONG } from "../../../api";
import imagemOng from "../../../resources/images/ongprofile.png"

const NavPerfil = ({ label, links, imgs, nome }) => {
  const { fazerLogout, dadosUsuario } = React.useContext(UserContext);
  const { request, error, loading, dados } = useFetch()
  const [imagem, setImagem] = React.useState()

  React.useEffect(() => {

    async function pegaDados() {
      if (dadosUsuario.tipo === "INSTITUICAO") {
        const token = window.localStorage.getItem('token')
        const { url, options } = PEGA_DADOS_ONG(token, Number(token) - 1)

        const { response, json } = await request(url, options)

        if (response.ok) {
          setImagem(json.image)
        }
      } else {

      }
    }

    pegaDados()
  }, [])

  return (
    <nav className={style.nav}>
      <header>
        {/* <img src={imagem} /> */}
        <span
          className={style.imagemNavbar}
          style={{
            backgroundImage: `url(${imagem ? imagem : imagemOng})`
          }}>.
        </span>
        <span>{nome}</span>
      </header>
      <main>
        {links[0] && (
          <NavLink to={links[0]}>
            <img src={imgs[0]} alt="icone" />
            {label.linha}
          </NavLink>
        )}
        <NavLink to={links[1]}>
          <img src={imgs[1]} alt="icone" />
          {label.linhaDois}
        </NavLink>
        <NavLink to={links[2]}>
          <img src={imgs[2]} alt="icone" />
          {label.linhaTres}
        </NavLink>
        {links[3] && (
          <NavLink to={links[3]}>
            <img src={imgs[3]} alt="icone" />
            {label.linhaQuatro}
          </NavLink>
        )}
      </main>
      <footer>
        <NavLink to="configuracoes">
          <img src={gearicon} alt="" />
          Configurações
        </NavLink>
        <br />
        <Button onClick={() => fazerLogout()}>Sair</Button>
      </footer>
    </nav>
  );
};

export default NavPerfil;

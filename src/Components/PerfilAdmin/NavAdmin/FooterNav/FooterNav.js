import React from "react";
import Button from "../../../Smart-components/Button/Button";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../../UserContext";
import style from './FooterNav.module.css'
import iconeconfiguracao from '../../../../resources/images/gearicon.png'

const FooterNav = () => {
  const { fazerLogout } = React.useContext(UserContext);

  return (
    <footer className={style.footer}>
      <NavLink to={"configuracoes"}> <img src={iconeconfiguracao} alt="icone" /> Configurações</NavLink>
      <br />
      <Button
        onClick={() => {
          fazerLogout();
        }}
      >
        Sair
      </Button>
    </footer>
  );
};

export default FooterNav;

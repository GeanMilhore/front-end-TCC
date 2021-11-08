import React from "react";
import style from './HeaderNav.module.css'

const HeaderNav = ({ nome }) => {
  return (
    <header className={style.header}>
      <h2>Foto</h2>
      <h2>{nome}</h2>
    </header>
  );
};

export default HeaderNav;

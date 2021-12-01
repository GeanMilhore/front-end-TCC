import React from "react";
import style from './HeaderNav.module.css'
import fotoadmin from "../../../../resources/images/fotoadmin.png"

const HeaderNav = ({ nome }) => {
  return (
    <header className={style.header}>
      <div
      className={style.fotoadmin}
        style={{backgroundImage: `url(${fotoadmin})`}}
      >
        .
      </div>
      <h2>{nome}</h2>
    </header>
  );
};

export default HeaderNav;

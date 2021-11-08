import React from "react";
import style from "./ConteudoAdmin.module.css";
import Dashboard from "./Dashboard/Dashboard";
import RoutesAdmin from "./RoutesAdmin/RoutesAdmin";

const ConteudoAdmin = () => {
  return (
    <div className={style.containerConteudo}>
        <RoutesAdmin />
    </div>
  );
};

export default ConteudoAdmin;

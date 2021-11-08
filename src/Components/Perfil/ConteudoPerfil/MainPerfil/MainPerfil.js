import React from "react";
import InfoPerfil from "../Configuracoes/InfoPerfil/InfoPerfil";
import style from "./MainPerfil.module.css";
import phoneicon from "../../../../resources/images/phone.png";
import locationicon from "../../../../resources/images/location.png";

const MainPerfil = ({ rua, telefone, numero, cidade, estado, cep }) => {
  return (
    <>
      <main className={style.main}>
        <InfoPerfil
          icone={phoneicon}
          titulo={"  Telefone"}
          informacao={telefone}
        />
        <div>
          <InfoPerfil
            icone={locationicon}
            titulo={"  Localidade"}
            informacao={
              "R." +
              rua +
              ", " +
              numero +
              " - " +
              cidade +
              ", " +
              estado +
              ", " +
              cep
            }
          />
          <span>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.431471823124!2d-46.401800249785985!3d-23.552942267090625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce65086cafaf55%3A0xf7da96815e7611da!2sETEC%20Guaianazes!5e0!3m2!1sen!2sbr!4v1635478946676!5m2!1sen!2sbr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </span>
        </div>
      </main>
    </>
  );
};

export default MainPerfil;

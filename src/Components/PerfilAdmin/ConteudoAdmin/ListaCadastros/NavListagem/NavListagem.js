import React from "react";
import Input from "../../../../Smart-components/Input/Input";
import Button from "../../../../Smart-components/Button/Button";
import style from "./NavListagem.module.css";
import iconepdf from "../../../../../resources/images/pdficon.png";
import useFetch from "../../../../../Custom-Hooks/UseFetch";
import download from "downloadjs";
import axios from "axios";

const NavListagem = ({
  nome,
  primeiraColuna,
  segundaColuna,
  terceiraColuna,
  urlPdf,
}) => {

  React.useEffect(() => {
    console.log(urlPdf);
  }, []);

  async function downloadPDF() {
    const { url, options } = urlPdf();

    let postInfo = {};

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postInfo),
    })
      .then(async (res) => ({
        filename: "relatorioPDF",
        blob: await res.blob(),
      }))
      .then((resObj) => {
        // It is necessary to create a new blob object with mime-type explicitly set for all browsers except Chrome, but it works for Chrome too.
        const newBlob = new Blob([resObj.blob], { type: "application/pdf" });

        // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
        } else {
          // For other browsers: create a link pointing to the ObjectURL containing the blob.
          const objUrl = window.URL.createObjectURL(newBlob);

          let link = document.createElement("a");
          link.href = objUrl;
          link.download = resObj.filename;
          link.click();

          // For Firefox it is necessary to delay revoking the ObjectURL.
          setTimeout(() => {
            window.URL.revokeObjectURL(objUrl);
          }, 250);
        }
      })
      .catch((error) => {
        console.log("DOWNLOAD ERROR", error);
      });
  }

  return (
    <>
      <nav className={style.navListagem}>
        <header>
          <span>Lista de {nome}</span>
          <Button onClick={() => downloadPDF()}>
            <img src={iconepdf} alt="icone" />
            PDF
          </Button>
        </header>
        <main>
          <span className={style.span1}>{primeiraColuna}</span>
          <span className={style.span2}>{segundaColuna}</span>
          <span className={style.span3}>{terceiraColuna}</span>
        </main>
      </nav>
    </>
  );
};

export default NavListagem;

import React from "react";
import style from "./TelaCampanhas.module.css"
import Modal from "../../../Smart-components/Modal/Modal"
import CriarCampanha from "../../../CriarCampanha/CriarCampanha"
import imgcampanha from "../../../../resources/images/criarcampanha.png"

const TelaCampanhas = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  return (
    <div className={style.testeMain}>
      <button onClick={() => setIsModalVisible(true)}>open</button>
      {isModalVisible ? (
        <Modal onClose={setIsModalVisible}>
          <div>
            <CriarCampanha
              titulo={"Criar Uma Campanha"}
              imgsrc={imgcampanha}
              labelUm={"Nome da Campanha:"}
              labelDois={"Descrição da Campanha:"}
              labelTres={"Quantidade para Arrecadar:"}
              btnUm={"Limpar"}
              btnDois={"Salvar"}
            />
            {/* titulo,
                            labelImg,
                            labelUm,
                            labelDois,
                            btnUm,
                            btnDois,
                            imgsrc, */}
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default TelaCampanhas;

import React from 'react'
import style from './ParaTeste.module.css'
import Modal from '../Modal/Modal'
import imgqualquer from '../../../resources/images/criarcampanha.png'
import CriarCampanha from '../../CriarCampanha/CriarCampanha'

const ParaTeste = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    return (
        <div className={style.testeMain}>
            <button onClick={() => setIsModalVisible(true)}>open</button>
            {isModalVisible ? <Modal 
                onClose={setIsModalVisible}
            >
                    <div>
                        <CriarCampanha 
                            titulo={'Criar Uma Campanha'}
                            imgsrc={imgqualquer}
                            labelUm={"Nome da Campanha:"}
                            labelDois={"Descrição da Campanha:"}
                            labelTres={"Quantidade para Arrecadar:"}
                            btnUm={"Limpar"}
                            btnDois={"Salvar"}
                        />
                    </div>
            </Modal> : null }
        </div>
    )
}

export default ParaTeste

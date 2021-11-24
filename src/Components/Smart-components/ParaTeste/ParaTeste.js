import React from 'react'
import style from './ParaTeste.module.css'
import Modal from '../Modal/Modal'
import imgqualquer from '../../../resources/images/doadoricon.png'
import CadastrarItem from '../../CadastroItem/CadastroItem'

const ParaTeste = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    return (
        <div className={style.testeMain}>
            <button onClick={() => setIsModalVisible(true)}>open</button>
            {isModalVisible ? <Modal 
                onClose={setIsModalVisible}
            >
                    <div>
                        <CadastrarItem 
                            titulo={'Cadastrar Um Item'}
                            imgsrc={imgqualquer}
                            labelUm={"Nome do Item:"}
                            labelDois={"Descrição do Item"}
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
            </Modal> : null }
        </div>
    )
}

export default ParaTeste

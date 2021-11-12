import React from 'react'
import style from './ParaTeste.module.css'
import Modal from '../Modal/Modal'

const ParaTeste = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    return (
        <div className={style.testeMain}>
            <button onClick={() => setIsModalVisible(true)}>open</button>
            {isModalVisible ? <Modal 
                onClose={setIsModalVisible}
            >
                <div className={style.testandoDiv}>
                    <div>
                        PURISSIDADE PURA
                    </div>
                    <div>
                        MINECRAFT PURO
                    </div>
                </div>
            </Modal> : null }
        </div>
    )
}

export default ParaTeste

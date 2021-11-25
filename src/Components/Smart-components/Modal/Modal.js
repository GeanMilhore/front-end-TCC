import React from 'react'
import style from './Modal.module.css'

const Modal = ({ id = 'modal' , onClose = () => {} , estilo, estiloContainer,   children}) => {
    const handleOutsideClick = (e) => {
        if(e.target.id === id) onClose()
    }

    return (
        <div id={id} className={style.modal} style={estilo} onClick={(e) => handleOutsideClick(e)} >
            <div className={style.container} style={estiloContainer}>
                <button className={style.btnModal} onClick={() => onClose(false)}>X</button>
                <div className={style.content}>{children}</div>
            </div>
        </div>
    )
}

export default Modal

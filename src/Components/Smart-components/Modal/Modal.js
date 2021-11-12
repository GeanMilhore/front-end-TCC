import React from 'react'
import style from './Modal.module.css'

const Modal = ({ id = 'modal' , onClose = () => {} ,  children}) => {
    const handleOutsideClick = (e) => {
        if(e.target.id === id) onClose()
    }

    return (
        <div id={id} className={style.modal} onClick={(e) => handleOutsideClick(e)}>
            <div className={style.container}>
                <button onClick={() => onClose(false)}>X</button>
                <div className={style.content}>{children}</div>
            </div>
        </div>
    )
}

export default Modal

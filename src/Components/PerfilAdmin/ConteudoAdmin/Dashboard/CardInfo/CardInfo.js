import React from 'react'
import style from './CardInfo.module.css'

const CardInfo = ({caminhoImagem, titulo, quantidade}) => {
    return (
        <div className={style.cardInfo}>
            <img src={caminhoImagem} alt={titulo} />
            <h5>{titulo}</h5>
            <h6>{quantidade}</h6>
        </div>
    )
}

export default CardInfo

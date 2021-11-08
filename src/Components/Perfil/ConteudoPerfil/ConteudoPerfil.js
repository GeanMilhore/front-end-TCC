import React from 'react'
import style from './ConteudoPerfil.module.css'

const ConteudoPerfil = ({routes}) => {
    return (
        <div className={style.conteudo}>
            {routes}
        </div>
    )
}

export default ConteudoPerfil

import React from 'react'
import iconnothing from "../../resources/images/nothingtoseehere.png"
import style from "./NadaParaVer.module.css"

const NadaParaVer = () => {
    return (
        <div className={style.verNada}>
            <h2><span>Ops!</span> Parece que ainda não há nada aqui...</h2>
            <img src={iconnothing} />
        </div>
    )
}

export default NadaParaVer

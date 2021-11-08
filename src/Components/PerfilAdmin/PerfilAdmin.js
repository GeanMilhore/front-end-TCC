import React from 'react'
import ConteudoAdmin from './ConteudoAdmin/ConteudoAdmin'
import NavAdmin from './NavAdmin/NavAdmin'

const PerfilAdmin = ({dadosPefil}) => {
    return (
        <>
            <NavAdmin nome={dadosPefil.nome} />
            <ConteudoAdmin />
        </>
    )
}

export default PerfilAdmin

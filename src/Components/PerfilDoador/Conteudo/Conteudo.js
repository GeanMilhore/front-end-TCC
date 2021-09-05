import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import ConteudoHeaderNav from './ConteudoHeaderNav'
import DoacoesRealizadas from './DoacoesRealizadas/DoacoesRealizadas'
import PropostasEnviadas from './PropostasDoador/PropostasEnviadas'
import PropostaEnviada from './PropostaDoador/PropostaEnviada'
import style from './Conteudo.module.css'
import DoacaoRealizada from './DoacaoRealizada/DoacaoRealizada'
import DoacaoPessoal from './DoacaoPessoal/DoacaoPessoal'

const Conteudo = () => {
    return (
        <div className={style.contentContainer}>
            <ConteudoHeaderNav />
            <Routes>
                <Route path="" element={<Navigate to="doacoesRealizadas" />} />
                <Route path="doacoesRealizadas" element={<DoacoesRealizadas />} />
                <Route path="doacoesRealizadas/item/:id" element={<DoacaoRealizada />} />
                <Route path="propostasEnviadas" element={<PropostasEnviadas />} />
                <Route path="propostasEnviadas/item/:id" element={<PropostaEnviada />} />
                <Route path="doacaoPessoal" element={<DoacaoPessoal />} />
            </Routes>
        </div>
    )
}

export default Conteudo

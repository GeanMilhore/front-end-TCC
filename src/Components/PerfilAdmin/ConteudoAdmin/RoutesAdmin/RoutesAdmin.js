import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import Dashboard from '../Dashboard/Dashboard'
import Configuracoes from '../Configuracoes/Configuracoes'
import ListaInstituicoes from '../TelasListas/ListaInstituicoes/ListaInstituicoes'
import ListaDoadores from '../TelasListas/ListaDoadores/ListaDoadores'
import ListaDoacoes from '../TelasListas/ListaDoacoes/ListaDoacoes'

const RoutesAdmin = () => {
    const labels = {
        ong: {
            nome: 'Instituições',
            primeiraColuna: 'Nome Fantasia',
            segundaColuna: 'Razão Social',
            terceiraColuna: 'Categoria'
        },
        doadores: {
            nome: 'Doadores',
            primeiraColuna: 'Nome Doador',
            segundaColuna: 'CPF',
            terceiraColuna: 'Data de Nascimento'
        },
        doacoes: {
            nome: 'Doações',
            primeiraColuna: 'Nome do Item',
            segundaColuna: 'Descrição da Doação',
            terceiraColuna: 'Quantidade'
        }
    }
    return (
        <Routes>
            <Route path={''} element={<Navigate to='graficos' />} />
            <Route path={'graficos'} element={<Dashboard />} />
            <Route path={'relatorio/instituicoes'} element={<ListaInstituicoes labels={labels.ong}  />} />
            <Route path={'relatorio/doadores'} element={<ListaDoadores labels={labels.doadores}/>} />
            <Route path={'relatorio/doacoes'} element={<ListaDoacoes labels={labels.doacoes}/>} />
            <Route path={'configuracoes'} element={<Configuracoes dados={null} />} />
        </Routes>
    )
}

export default RoutesAdmin

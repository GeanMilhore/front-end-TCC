import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './NavAdmin.module.css'
import FooterNav from './FooterNav/FooterNav'
import HeaderNav from './HeaderNav/HeaderNav'
import MainNav from './MainNav/MainNav'

const NavAdmin = ({nome}) => {

    
    return (
        <nav className={style.containerNav}>
            <HeaderNav nome={nome} />
            <MainNav />
            <FooterNav />
        </nav>
    )
}

export default NavAdmin

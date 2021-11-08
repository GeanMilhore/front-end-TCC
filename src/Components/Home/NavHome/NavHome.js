import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './NavHome.module.css';

const NavHome = ({ linkUm, LinkDois, opcaoUm, opcaoDois, imgs}) => {
    return (
        <nav className={style.nav}>
            <NavLink to={linkUm}>
                <img src={imgs[1]} alt="icone" />
                {opcaoUm}
            </NavLink>
            <NavLink to={LinkDois}>
                <img src={imgs[0]} alt="icone" />
                {opcaoDois}
            </NavLink>
        </nav>
    )
}

export default NavHome
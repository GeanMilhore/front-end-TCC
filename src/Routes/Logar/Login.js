import React from 'react'
import Input from '../../Components/Smart-components/Input/Input'
import UseForm from '../../Custom-Hooks/UseForm'
import style from './Login.module.css'

const Login = () => {
    const email =  UseForm()
    const senha = UseForm()

    return (
        <>
            <div className={style.container}>
                <div className={style.backgroundContainer} style={{backgroundColor: 'red'}}>
                    <div className={style.containerLogin}>
                        <div className="headerLogin">
                            Faça Seu Login
                        </div>
                        <div className={style.bodyLogin}>
                            <Input 
                                id="email"
                                label="E-mail:"
                                type="e-mail"
                                {...email}
                            />
                            <Input 
                                id="senha"
                                label="Senha: "
                                type="password"
                                {...senha}
                            />
                        </div>
                        <div className="footerLogin">
                            <button>Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

import React from 'react'
import { Context } from '../../Context/AuthContext'

const MinhaConta = () => {
    const {handleLogout} = React.useContext(Context)
    return (
        <div>
            <h1>Minha Contra Privada</h1>

            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default MinhaConta

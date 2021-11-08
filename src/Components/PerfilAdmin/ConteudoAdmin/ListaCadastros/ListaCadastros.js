import React from 'react'
import ListagemItens from './ListagemItens/ListagemItens'
import NavListagem from './NavListagem/NavListagem'
import style from './ListaCadastros.module.css'

const ListaCadastros = ({ cadastros, labels, urlPdf }) => {

    React.useEffect(() => { console.log(cadastros)},[])

    return (
        <div className={style.listaCadastros}>
            <NavListagem 
                nome={labels.nome}
                primeiraColuna={labels.primeiraColuna}
                segundaColuna={labels.segundaColuna}
                terceiraColuna={labels.terceiraColuna}
                urlPdf={urlPdf}
            />
            <ListagemItens cadastros={cadastros.content} />
        </div>
    )
}

export default ListaCadastros

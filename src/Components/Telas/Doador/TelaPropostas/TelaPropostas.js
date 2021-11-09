import React from 'react'
import { PEGAR_PROPOSTAS_DOADOR } from '../../../../api';
import useFetch from '../../../../Custom-Hooks/UseFetch'
import ListaCards from '../../ListaCards/ListaCards';

const TelaPropostas = () => {

    const [propostas, setPropostas] = React.useState(null)
    const { loading, error, dados, request } = useFetch();

    React.useEffect(() => {
        async function pegaPropostas(){
            const token = window.localStorage.getItem('token')
            const {url, options} = PEGAR_PROPOSTAS_DOADOR(token)

            const {response, json} = await request(url, options)

            if(response.ok){
                console.log(json)
                setPropostas(json)
            } else {
                console.log(error)
            }
        }

        pegaPropostas()
    }, [])

    if(loading) return <div className={' loader'} />
    if(!propostas) return null
    return (
        <>
            <ListaCards lista={propostas} />
        </>
    )
}

export default TelaPropostas

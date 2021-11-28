import React from 'react'
import useFetch from '../../../../Custom-Hooks/UseFetch'
import { PROPOSTAS_ONG, PROPOSTAS_ONG_PENDENTES } from '../../../../api'
import CardProposta from '../Cards/CardProposta/CardProposta'
import style from "./TelaPropostasOng.module.css"
import Paginacao from '../../../Smart-components/Paginacao/Paginacao'

const TelaPropostasOng = () => {

    const { request, dados, loading, error } = useFetch()
    const [propostas, setPropostas] = React.useState(null)
    const [page, setPage] = React.useState(0)
    const [size, setSize] = React.useState(4)


    const pegaPropostas = async function () {
        const token = window.localStorage.getItem('token')

        const { url, options } = PROPOSTAS_ONG_PENDENTES(Number(token) - 1,page, size)
        try {
            const { response, json } = await request(url, options)
            if (response.ok) {
                console.log(json)
                setPropostas(json)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        pegaPropostas()
    }, [])

    if(!propostas) return null
    return (
        <>
            <div>
                {propostas && (
                    <div className={style.lista}>
                        {propostas.content.map((proposta) => (
                            <CardProposta
                                idProposta={proposta.id}
                                foto={proposta.item.image}
                                nomeItem={proposta.item.nome}
                                descricao={proposta.item.descricao}
                                quantidade={proposta.status}
                                labels={{
                                    label1: 'Item',
                                    label2: 'Descricao',
                                    label3: 'STATUS'
                                }}
                                atualizar={pegaPropostas}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Paginacao
                page={page}
                size={size}
                setPagina={setPage}
                setItens={setPropostas}
                reqItens={PROPOSTAS_ONG_PENDENTES}
                totalPaginas={propostas.totalPages}
                isPrivate={true}
                token={Number(window.localStorage.getItem('token')) - 1}
            />
        </>
    )
}

export default TelaPropostasOng

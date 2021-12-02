import React from 'react'
import { PROPOSTAS_ONG, PROPOSTAS_ONG_ACEITAS } from "../../../../api"
import useFetch from '../../../../Custom-Hooks/UseFetch'
import Paginacao from '../../../Smart-components/Paginacao/Paginacao'
import CardDoacao from '../Cards/CardDoacao/CardDoacao'
import style from "./TelaDoacoes.module.css"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import NadaParaVer from '../../../NadaParaVer/NadaParaVer'

toast.configure()

const TelaDoacoes = () => {

    const { request, dados, error, loading } = useFetch()
    const [doacoes, setDoacoes] = React.useState(null)
    const [page, setPage] = React.useState(0)
    const [size, setSize] = React.useState(4)

    React.useEffect(() => {
        async function pegaDoacoes() {
            const token = window.localStorage.getItem('token')

            const { url, options } = PROPOSTAS_ONG_ACEITAS(Number(token) - 1, page, size)
            try {
                const { response, json } = await request(url, options)
                if (response.ok) {
                    console.log(json)
                    setDoacoes(json)
                }
            } catch (error) {
                console.log(error)
            }
        }
        pegaDoacoes()
    }, [])

    if(loading) return <div className={'arrumaLoad loader'} />
    if(!doacoes) return null
    return (
        <>
            <div className={style.lista}>
                {doacoes && (
                    doacoes.content.map((doacao) => (
                        <CardDoacao
                            foto={doacao.item.image}
                            nomeItem={doacao.item.nome}
                            descricao={doacao.item.descricao}
                            quantidade={doacao.status}
                            labels={{
                                label1: 'Item',
                                label2: 'Descricao',
                                label3: 'STATUS'
                            }}
                        />
                    ))
                )}
            </div>
            {doacoes.totalElements !== 0 ? (
                <Paginacao
                    page={page}
                    size={size}
                    reqItens={PROPOSTAS_ONG_ACEITAS}
                    setItens={setDoacoes}
                    setPagina={setPage}
                    paginar={doacoes}
                    token={Number(window.localStorage.getItem('token')) - 1}
                    isPrivate={true}
                />
            ) : (
                <NadaParaVer />
            )}
        </>
    )
}

export default TelaDoacoes

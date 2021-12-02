import React from "react";
import style from "./Dashboard.module.css";
import CardInfo from "./CardInfo/CardInfo";
import Grafico from "./Grafico/Grafico";
import ongicon from "../../../../resources/images/ongicon.png";
import doadoresicon from '../../../../resources/images/doadoresicon.png';
import usuariosicon from "../../../../resources/images/usuarioicon.png";
import doacaoicon from "../../../../resources/images/doacaoicon.png";
import UseFetch from "../../../../Custom-Hooks/UseFetch"
import { LISTAR_DOACOES, LISTAR_DOADORES, LISTAR_ONGS } from "../../../../api";

const Dashboard = () => {

  const [doadores, setDoadores] = React.useState(null)
  const [ongs, setOngs] = React.useState(null)
  const [usuarios, setUsuarios] = React.useState(null)
  const [doacoes, setDoacoes] = React.useState(null)
  const [porcentagem, setPorcentagem] = React.useState(null)
  const { request, loading, error, dados } = UseFetch()

  const calculaPorcentagem = async function () {
    const total = (doadores + doacoes + ongs)
    const pctDoador = (doadores * 100) / total
    const pctDoacoes = (doacoes * 100) / total
    const pctOngs = (ongs * 100) / total

    setPorcentagem({ doadores: pctDoador, doacoes: pctDoacoes, ongs: pctOngs })
    setUsuarios(Number(doadores) + Number(ongs))
  }


  React.useEffect(() => {
    setUsuarios(ongs + doadores)
    calculaPorcentagem()
  }, [doadores, ongs, doacoes])

  React.useEffect(() => {
    async function pegaDoadores() {
      const { url, options } = LISTAR_DOADORES()

      const { response, json } = await request(url, options)

      if (response.ok) {
        console.log(json.totalElements)
        setDoadores(json.totalElements)
      } else {
        window.alert('ops')
      }
    }

    async function pegaOngs() {
      const { url, options } = LISTAR_ONGS()

      const { response, json } = await request(url, options)

      if (response.ok) {
        console.log(json.totalElements)
        setOngs(json.totalElements)
      } else {
        window.alert('ops')
      }
    }

    async function pegaDoacoes() {
      const { url, options } = LISTAR_DOACOES()

      const { response, json } = await request(url, options)

      if (response.ok) {
        console.log(json.totalElements)
        setDoacoes(json.totalElements)
      } else {
        window.alert('ops')
      }
    }


    pegaDoadores()
    pegaOngs()
    pegaDoacoes()
  }, [])


  if(!porcentagem) return null
  return (
    <>
      <div className={style.containerDados}>
        <h4 className={style.titulos}>Dados Importantes</h4>
        <div className={style.apresentaDados}>
          <CardInfo
            titulo={"Ongs Cadastradas"}
            quantidade={ongs}
            caminhoImagem={ongicon}
          />
          <CardInfo
            titulo={"Doadores Cadastrados"}
            quantidade={doadores}
            caminhoImagem={doadoresicon}
          />
          <CardInfo
            titulo={"Doações Feitas"}
            quantidade={doacoes}
            caminhoImagem={doacaoicon}
          />
          <CardInfo
            titulo={"Usuários Cadastrados"}
            quantidade={usuarios}
            caminhoImagem={usuariosicon}
          />
        </div>
      </div>
      <div className={style.containerGrafico}>
        <h4 className={style.titulos}>Acompanhe o Crescimento</h4>
        <main className={style.grafico}>
          <Grafico
            titulo={"Ações de Cadastro"}
            subtitulo={"por tipo de conta"}
            estiloTitulo={{
              fontSize: "25px",
            }}
            tipo={"donut"}
            // 1 - doadores, 2 - instituicoes, 3 - doacoes
            valores={[porcentagem.doadores, porcentagem.ongs, porcentagem.doacoes]}
            simbolo={"%"}
            labels={["Doadores", "Instituições", "Doações"]}
          />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
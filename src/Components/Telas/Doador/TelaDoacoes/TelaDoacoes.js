import React from 'react'
import style from './TelaDoacoes.module.css'
import CardDoacoes from '../../Cards/CardDoacoes/CardDoacoes'
import { PEGAR_PROPOSTAS_ACEITAS_DOADOR } from '../../../../api';
import useFetch from '../../../../Custom-Hooks/UseFetch';
import Paginacao from '../../../Smart-components/Paginacao/Paginacao'
import NadaParaVer from '../../../NadaParaVer/NadaParaVer';


const TelaDoacoes = () => {
  const [doacoes, setDoacoes] = React.useState(null);
  const { loading, error, dados, request } = useFetch();
  const [page, setPage] = React.useState(0)
  const [size, setSize] = React.useState(4)

  React.useEffect(() => {
    async function pegaItens() {
      const token = window.localStorage.getItem("token");
      const { url, options } = PEGAR_PROPOSTAS_ACEITAS_DOADOR(token, page, size);

      const { response, json } = await request(url, options);

      if (response.ok) {
        console.log(json);
        setDoacoes(json);
      } else {
        console.log(error);
      }
    }

    pegaItens();
  }, []);

  if (loading) return <div className={"arrumaLoad loader"} />;
  if (!doacoes) return null;
  return (
    <>
      <div className={style.lista}>
        {doacoes.content.map((doacao) => {
          console.log(doacao);

          return (
            <>
              <CardDoacoes
                labels={{
                  label1: 'Nome do Item',
                  label2: 'Ong de Destino',
                  label3: 'Quantidade'
                }}
                foto={doacao.item.image}
                nomeOng={doacao.instituicao.nomeFantasia}
                nomeItem={doacao.item.nome}
                quantidade={doacao.item.quantidade}
              />
            </>
          );
        })}
      </div>
      {doacoes && doacoes.totalElements !== 0 ? (
        <Paginacao
          size={size}
          page={page}
          setItens={setDoacoes}
          setPagina={setPage}
          reqItens={PEGAR_PROPOSTAS_ACEITAS_DOADOR}
          paginar={doacoes}
          isPrivate={true}
        />
      ) : (
        <NadaParaVer />
      )}
    </>
  );
};

export default TelaDoacoes

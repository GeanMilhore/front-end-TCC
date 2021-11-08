import React from 'react'
import Chart from 'react-apexcharts'

const Grafico = ({tipo, valores, labels, titulo, subtitulo, simbolo, estiloTitulo, ...props }) => {
    return (
        <Chart 
            type={tipo}
            series={valores}
            width={400}
            height={400}
            options={{
                title: {
                    text: titulo ? titulo : null,
                    style: estiloTitulo
                },
                subtitle: {
                    text: subtitulo ? subtitulo : null
                },
                labels: labels,
                tooltip:{
                    y:{
                        formatter:((val) => { 
                            return `${val}${simbolo ? simbolo : null}`
                        })
                    }
                }
            }}
            {...props}
        />
    )
}

export default Grafico

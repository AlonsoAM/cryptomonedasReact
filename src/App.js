import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Formulario from './components/Formulario'
import imagen from './cryptomonedas.png'
import axios from 'axios'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  margin-bottom: 50px;
  font-size: 50px;
  margin-top: 50px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`

function App() {
  const [moneda, setMoneda] = useState('')
  const [cryptomoneda, setCryptomoneda] = useState('')
  const [cotizacion, setCotizacion] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    // Evitamos la ejecución la primera vez
    if (moneda === '') return

    // Consultar API oara tener al cotizacion
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`
      const resultado = await axios.get(url)

      // Mostrar el Spinne
      setCargando(true)
      // Ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        // cambiar el estado de cargando
        setCargando(false)
        // Guardar cotizacion
        setCotizacion(resultado.data.DISPLAY[cryptomoneda][moneda])
      }, 3000)
    }
    consultarAPI()
  }, [moneda, cryptomoneda])

  return (
    <>
      <Contenedor>
        <div>
          <Imagen src={imagen} alt="Imagen crypto" />
        </div>
        <div>
          <Heading>Cotiza Cryptomonedas al instante</Heading>
          <Formulario setMoneda={setMoneda} setCryptomoneda={setCryptomoneda} />
          {cargando ? (
            <Spinner />
          ) : (
            <Cotizacion
              cotizacion={cotizacion}
              moneda={moneda}
              cryptomoneda={cryptomoneda}
            />
          )}
        </div>
      </Contenedor>
    </>
  )
}

export default App

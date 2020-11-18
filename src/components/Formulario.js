import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCryptomoneda from '../hooks/useCryptomoneda'
import axios from 'axios'
import Error from './Error'
import PropTypes from 'prop-types'

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`

const Formulario = ({ setMoneda, setCryptomoneda }) => {
  // State del listado de cryptomonedas
  const [listacrypto, setlistacrypto] = useState([])

  // Validación
  const [error, setError] = useState(false)

  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar Estadounidense' },
    { codigo: 'PEN', nombre: 'Nuevo Sol' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' },
  ]

  // utiizar useMoneda
  const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS)

  // utilizar useCryptomoneda
  const [cryptomoneda, SelectCryptomoneda] = useCryptomoneda(
    'Elige tu cryptomoneda',
    '',
    listacrypto,
  )

  // Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=PEN`
      const resultado = await axios.get(url)
      setlistacrypto(resultado.data.Data)
    }
    consultarAPI()
  }, [])

  // función para cotizar moneda cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault()

    // Validar si ambos campos estan llenos
    if (moneda === '' || cryptomoneda === '') {
      setError(true)
      return
    }

    setError(false)

    // Pasar los datos al componente principal
    setMoneda(moneda)
    setCryptomoneda(cryptomoneda)
  }

  return (
    <>
      <form onSubmit={cotizarMoneda}>
        {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
        <SelectMonedas />
        <SelectCryptomoneda />
        <Boton type="submit" value="Calcular" />
      </form>
    </>
  )
}

Error.propTypes = {
  setMoneda: PropTypes.func.isRequired,
  setCryptomoneda: PropTypes.func.isRequired,
}

export default Formulario

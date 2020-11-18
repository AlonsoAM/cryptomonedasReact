import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const ResultadoDIV = styled.div`
  color: #fff;
  background-color: #326ac0;
  margin-top: 10px;
  border-radius: 10px;
  padding: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
`

const Info = styled.p`
  font-size: 18px;
  span {
    font-weight: bold;
  }
`

const Precio = styled.p`
  font-size: 30px;
`

const Seleccion = styled.div`
  background-color: #326ac0;
  text-align: center;
  margin-top: 10px;
  border-radius: 10px;
  padding: 1.5rem;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Bebas Neue', cursive;
  color: #fff;
`

const Cotizacion = ({ cotizacion, moneda, cryptomoneda }) => {
  if (Object.keys(cotizacion).length === 0) return null
  return (
    <>
      <Seleccion>
        Moneda: {moneda} -- Cryptomoneda: {cryptomoneda}
      </Seleccion>
      <ResultadoDIV>
        <Precio>
          El precio es: <span>{cotizacion.PRICE}</span>
        </Precio>
        <Info>
          Precio más alto del día: <span>{cotizacion.HIGHDAY}</span>
        </Info>
        <Info>
          Precio más bajo del día: <span>{cotizacion.LOWDAY}</span>
        </Info>
        <Info>
          Variación las últimas 24 horas:{' '}
          <span>{cotizacion.CHANGEPCT24HOUR}</span>
        </Info>
        <Info>
          Úlitima actualización: <span>{cotizacion.LASTUPDATE}</span>
        </Info>
      </ResultadoDIV>
    </>
  )
}

Cotizacion.propTypes = {
  cotizacion: PropTypes.object.isRequired,
}

export default Cotizacion

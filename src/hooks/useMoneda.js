import styled from '@emotion/styled'
import React, { useState } from 'react'

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`
const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`

const useMoneda = (label, stateInicial, opciones) => {
  // State de nustro custom hook
  const [state, setState] = useState(stateInicial)

  const Seleccionar = () => (
    <>
      <Label>{label}</Label>
      <Select onChange={(e) => setState(e.target.value)}>
        <option value="">-- Seleccione --</option>
        {opciones.map((opcion) => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  )

  // Retornar state, interfaz y función que modifica el state
  return [state, Seleccionar, setState]
}

export default useMoneda

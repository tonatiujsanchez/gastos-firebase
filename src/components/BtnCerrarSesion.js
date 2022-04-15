import { ReactComponent as IconoCerrarSesion } from '../images/log-out.svg'
import Boton from '../elements/Boton'

import React from 'react'
import { auth, signOut } from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const BtnCerrarSesion = () => {

  const navigate = useNavigate()
  const { setUsuario } = useAuth()
  const cerrarSesion = async() =>{
    try {
      await signOut( auth )
      navigate('/iniciar-sesion')
      setUsuario(null)

    } catch (error) {
      console.log( error )
    }
  }

  return (
    <Boton
        onClick={ cerrarSesion }
        iconoGrande as="button">
        <IconoCerrarSesion />
    </Boton>
  )
}

export default BtnCerrarSesion
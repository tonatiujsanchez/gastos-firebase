
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"



const RutaPrivada = ({ children }) => {


  const { usuario } = useAuth()

  return (
      usuario?.uid
        ? children
        : <Navigate replace to="/iniciar-sesion" />
  )
}

export default RutaPrivada
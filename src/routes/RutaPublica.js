import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const RutaPublica = ({ children }) => {

    const { usuario } = useAuth()

  return (

        usuario?.uid
            ? <Navigate replace to="/" />
            : children

  )
}

export default RutaPublica
import { useContext } from "react"
import TotalMesContext from "../context/TotalMesContext"


const useTotalMes = () => {
  return useContext( TotalMesContext )
}

export default useTotalMes
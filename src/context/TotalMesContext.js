import { createContext, useEffect, useState } from "react"
import useGastosDelMes from "../hooks/useGastosDelMes"


const TotalMesContext = createContext()

const TotalMesProvider = ({ children }) => {

    const [totalMes, setTotalMes] = useState(0)
    const [gastos] = useGastosDelMes()

    useEffect(()=>{
        if(gastos.length > 0 ){
            const total = gastos.reduce( (total, gasto)=> total + gasto.cantidad, 0 )
            setTotalMes( total )
        }else{
            setTotalMes(0)
        }
    },[gastos])



    return (
        <TotalMesContext.Provider value={{
            totalMes
        }}>
            {children}
        </TotalMesContext.Provider>
    )
}

export {
    TotalMesProvider
}

export default TotalMesContext
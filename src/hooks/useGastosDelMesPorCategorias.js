import { useEffect, useState } from "react"
import useGastosDelMes from "./useGastosDelMes"


const useGastosDelMesPorCategorias = () => {
  
    const [gastosCategorias, setGastosCategorias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [gastoMes] = useGastosDelMes()


    useEffect(()=>{
        const categorias = gastoMes.reduce((totalCategoria, gasto)=>{
    
            if( Object.keys( totalCategoria ).includes( gasto.categoria ) ){
    
                totalCategoria[gasto.categoria].cantidad += gasto.cantidad
    
            }else{
                totalCategoria[gasto.categoria]={
                    categoria:gasto.categoria,
                    cantidad: gasto.cantidad
                }
            }
    
            return totalCategoria
        },{})
        
        setGastosCategorias( Object.values(categorias) );
        setCargando( false )
    },[gastoMes])


    return [ gastosCategorias, cargando ]
}

export default useGastosDelMesPorCategorias
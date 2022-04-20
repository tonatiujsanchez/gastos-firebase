import { endOfMonth, getUnixTime, startOfMonth } from "date-fns"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/firebaseConfig"
import useAuth from "./useAuth"




const useGastosDelMes = () => {




    const [gastoMes, setGastoMes] = useState([])
    const { usuario } = useAuth()

    useEffect(()=>{

        if( !usuario ){
            return
        }

        const querySnapshot = getGastosDelMes()
        return(()=>{
            querySnapshot()
        })

    }, [usuario])


    const getGastosDelMes = () =>{

        const fechaInicial = getUnixTime( startOfMonth( new Date() ) )
        const fechaFinal   = getUnixTime( endOfMonth( new Date() ) )

        const consulta = query( 
            collection( db, "gastos" ),
            orderBy('fecha', 'desc'),
            where( 'fecha', '>=', fechaInicial ),
            where( 'fecha', '<=', fechaFinal ),
            where( 'uidUsuario', '==', usuario.uid )
        )

        return onSnapshot( consulta, ({ docs }) =>{
            const gastosArr = docs.map( gasto => ({ ...gasto.data(), id: gasto.id }))
            setGastoMes( gastosArr )
        },(error) =>{
            console.log( error)
        })


    }

    return [gastoMes]
}

export default useGastosDelMes
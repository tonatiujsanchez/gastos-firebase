import { useEffect, useState } from "react"
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, where, query, orderBy, limit, startAfter } from "firebase/firestore";
import useAuth from './useAuth'




const useGetGastos = () => {

    const [gastos, setGastos] = useState([])
    const [lastGastos, setLastGastos] = useState(null)
    const [ultimo, setUltimo] = useState({})
    const [cargando, setcargando] = useState(true)

    const { usuario } = useAuth()

    useEffect(() => {
        const lastSnapshot  = getLastSnapshot()
        const querySnapshot = getGastos()

        return( ()=>{
            lastSnapshot()
            querySnapshot()
        })

    }, [])


    const getLastSnapshot = () => {

        const consultaUltimo = query( 
            collection(db, "gastos"), 
            where("uidUsuario", "==", usuario.uid),
            orderBy( 'fecha', 'asc' ), 
            limit(1) )

        return onSnapshot( consultaUltimo, ({ docs })=>{
            if(docs.length > 0){
                const lastDoc = { ...docs[0].data(), id: docs[0].id }
                setUltimo( lastDoc )
            }

        },(error) =>{
            console.log( error)
        })
    }


    const getGastos = () => { 
        const consulta = query(
            collection(db, "gastos"), 
            where("uidUsuario", "==", usuario.uid),
            orderBy( 'fecha', 'desc' ),
            limit(10) )

        return onSnapshot( consulta, ({docs}) =>{

            const gastosArr = docs.map( doc => ({ ...doc.data(), id: doc.id }));
            setGastos( gastosArr )

            setLastGastos( docs[ docs.length - 1 ] )
            setcargando( false )
        },(error) =>{
            console.log( error)
        })
    }


    const cargarMas = () =>{

        const consulta = query(
            collection(db, "gastos"), 
            where("uidUsuario", "==", usuario.uid),
            orderBy( 'fecha', 'desc' ),
            startAfter(lastGastos),
            limit(10) )

        return onSnapshot( consulta, ({docs}) =>{

            const gastosTemp = docs.map( doc => ({ ...doc.data(), id: doc.id })) || [];
            setGastos([ ...gastos, ...gastosTemp ])

            setLastGastos( docs[ docs.length - 1 ] )

        },(error) =>{
            console.log( error)
        })
    }


    return [ gastos, ultimo, cargarMas, cargando ]
}

export default useGetGastos
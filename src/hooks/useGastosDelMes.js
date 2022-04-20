import { orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/firebaseConfig"




const useGastosDelMes = () => {


    

    const [gastoMes, setGastoMes] = useState([])

    useEffect(()=>{

    },[])


    return [gastoMes]
}

export default useGastosDelMes
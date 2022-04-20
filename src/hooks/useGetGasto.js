import { useEffect, useState } from "react"
import { db } from "../firebase/firebaseConfig"
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";



const useGetGasto = (idGasto) => {

    const [gasto, setGasto] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        
        getDoc(doc(db, "gastos", idGasto)).then((docSnap) => {

            if (docSnap.exists()) {
                setGasto({ ...docSnap.data(), id: docSnap.id })
            } else {
                navigate('/lista')
            }
        })

    }, [idGasto, navigate])




    return [gasto]
}

export default useGetGasto
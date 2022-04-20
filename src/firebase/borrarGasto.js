
import { db } from './firebaseConfig'
import { doc, deleteDoc } from "firebase/firestore"



const borrarGasto = async(idGasto) => {

    try {
        await deleteDoc(doc(db, "gastos", idGasto));
    } catch (error) {
        console.log( error )
    }

}

export default borrarGasto
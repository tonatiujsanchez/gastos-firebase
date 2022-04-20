import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


const editarGasto = async({ idGasto, categoria, descripcion, cantidad, fecha }) =>{
    try {
        return await updateDoc( doc(db, "gastos", idGasto), {
            categoria: categoria,
            descripcion: descripcion,
            fecha: fecha,
            cantidad: Number( cantidad )
        })
      } catch (e) {
        console.log("Error adding document: ", e)
      }
}

export default editarGasto
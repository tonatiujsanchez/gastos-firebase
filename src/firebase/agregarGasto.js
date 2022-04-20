import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const agregarGasto = ( gasto ) =>{
    try {
        return addDoc(collection(db, "gastos"), {...gasto, cantidad: Number( gasto.cantidad )});
      } catch (e) {
        console.log("Error adding document: ", e);
      }
}

export default agregarGasto

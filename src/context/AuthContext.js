
import { createContext, useEffect, useState } from 'react'
import { auth, onAuthStateChanged } from '../firebase/firebaseConfig'

const AuthContext =  createContext()



const AuthProvider = ({ children }) => {
  
  
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(()=>{

    const authSuscription = onAuthStateChanged( auth, ( user ) => {
        if (user) {
            // Esta autenticado
            const { email, uid, accessToken } = user
            setUsuario({
                email,
                uid,
                accessToken 
            })
            setCargando( false )
        }else{
            // NO esta autenticado
            setCargando( false )
        }
    })

    return( ()=>{
        authSuscription()
    })
  },[])
  
    return (
    <AuthContext.Provider value={{
        usuario,
        setUsuario
    }}>
        {!cargando && children }
    </AuthContext.Provider>
  )
}


export {
    AuthProvider
}

export default AuthContext
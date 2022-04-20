import styled from "styled-components";
import { Helmet } from "react-helmet"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

import { Header, Titulo, ContenedorHeader } from "./../elements/Header";
import Boton from "../elements/Boton";
import { ContenedorBoton, Formulario, Input } from "../elements/ElementosFormulario";

import Alerta from "../elements/Alerta";
import { ReactComponent as SvgLogin } from './../images/login.svg'
import { auth, signInWithEmailAndPassword } from "../firebase/firebaseConfig";





const InicioSesion = () => {

    const navigate = useNavigate()
    const [estadoAlerta, setEstadoAlerta] = useState(false)
    const [alerta, setAlerta] = useState({})


    const [ { email, password }, handleInputChange ] = useForm({
        email: '',
        password: ''
    })


    const handleSubmit = ( e ) =>{
        e.preventDefault()

        // Comprobar que ningun campor esta vacío
        if([ email.trim(), password.trim() ].includes('')){
            mostrarAlerta( 'error', 'Por favor llene todos los campos' )
            return
        }

        // Comprobar si el email es valido
        const expRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
        if(!expRegular.test(email)){
            mostrarAlerta( 'error', 'Por favor ingrese un correo válido' )
            return
        }

        iniciarSesion( email, password )
    }


    const iniciarSesion = async( email, password ) =>{
        try {
            await signInWithEmailAndPassword( auth, email, password )
            navigate('/')
        } catch (error) {
            const errorCode = error.code

            if( errorCode === 'auth/user-not-found' ){
                mostrarAlerta('error', 'Correo invalido')
                return
            }
            if( errorCode === 'auth/wrong-password'){
                mostrarAlerta('error', 'Contraseña incorrecta')
                return
            }

            mostrarAlerta('error', 'Hubo un error inesperado al intentar iniciar sesión')
        }
    }


    const mostrarAlerta = (tipo, texto) => {
        setAlerta({ tipo, texto })
        setEstadoAlerta(true)
        
        setTimeout(() => {
            setEstadoAlerta(false)
            setAlerta({})
        }, 3000);
    }

    return (
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <div>
                        <Boton to="/crear-cuenta">Crear Cuenta</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input type="email" name="email" value={ email } onChange={ handleInputChange } placeholder="Correo Electrónico" />
                <Input type="password" name="password"value={ password } onChange={ handleInputChange } placeholder="Contraseña" />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>
            { estadoAlerta && <Alerta alerta={ alerta } /> }
        </>
    )
}

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height:12.5rem; /* 200px */
    margin-bottom:1.25rem; /* 20px */
`

export default InicioSesion
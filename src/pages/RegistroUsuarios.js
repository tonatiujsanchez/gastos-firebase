import styled from "styled-components";
import { Helmet } from "react-helmet"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

import { auth, createUserWithEmailAndPassword } from "../firebase/firebaseConfig";

import { Header, Titulo, ContenedorHeader } from "./../elements/Header";
import { ContenedorBoton, Formulario, Input } from "../elements/ElementosFormulario";
import Boton from "../elements/Boton";
import Alerta from "../elements/Alerta";

import { ReactComponent as SvgLogin } from './../images/registro.svg'


const RegistroUsuarios = () => {

    const navigate = useNavigate()
    const [estadoAlerta, setEstadoAlerta] = useState(false)
    const [alerta, setAlerta] = useState({})

    const [ { email, password, password2 }, handleInputChange ] = useForm({
        email: '',
        password: '',
        password2: ''
    })



    const handleSubmit = ( e ) =>{
        e.preventDefault()

        // Comprobar que ningun campor esta vacío
        if([email.trim(), password.trim(), password2.trim() ].includes('')){
            mostrarAlerta( 'error', 'Por favor llene todos los campos' )
            return
        }
        
        // Comprobar si el email es valido
        const expRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
        if(!expRegular.test(email)){
            mostrarAlerta( 'error', 'Por favor ingrese un correo válido' )
            return
        }

        // Comprobar que las contraseñas sean iguales
        if(password !== password2){
            mostrarAlerta('error' ,'Las contraseñas no son iguales')
            return
        }

        if(password.length < 6){
            mostrarAlerta('error', 'La contraseña es muy corta, se requieren al menos 6 caracteres')
            return
        }

        authFirebase(email, password)
    }

    const authFirebase = async(email, password) =>{
        try {
            const userCredential = await createUserWithEmailAndPassword( auth, email, password)
            console.log(userCredential.user)
            navigate('/')

        } catch (error) {
            
            if(error.code === 'auth/email-already-in-use'){
                mostrarAlerta('error', `Ya existe una cuenta registada con el correo <<${email}>>`);
  
            }else{
                mostrarAlerta('error',`Hubo un error al intentar crear la cuenta, intentelo nuevamente`);
            }
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
                <title>Crear Cuenta</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion">Iniciar Sesión</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={ handleSubmit }>
                <Svg/>
                <Input type="email" name="email" value={email} onChange={handleInputChange} placeholder="ejemplo@correo.com" />
                <Input type="password" name="password" value={password} onChange={handleInputChange} placeholder="Contraseña" />
                <Input type="password" name="password2" value={password2} onChange={handleInputChange} placeholder="Repite Contraseña" />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>
            { estadoAlerta && <Alerta alerta={ alerta } /> }
        </>
    )
}


const Svg = styled(SvgLogin)`
    width: 100%;
    max-height:6.25rem; /* 100px */
    margin-bottom:1.25rem; /* 20px */
`

export default RegistroUsuarios
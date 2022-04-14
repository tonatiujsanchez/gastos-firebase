import styled from "styled-components";
import { Helmet } from "react-helmet"

import { Header, Titulo, ContenedorHeader } from "./../elements/Header";
import Boton from "../elements/Boton";
import { ContenedorBoton, Formulario, Input } from "../elements/ElementosFormulario";

import { ReactComponent as SvgLogin } from './../images/login.svg'



const InicioSesion = () => {
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
            <Formulario>
                <Svg />
                <Input type="email" name="email" placeholder="Correo Electrónico" />
                <Input type="password" name="password" placeholder="Contraseña" />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>
        </>
    )
}

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height:12.5rem; /* 200px */
    margin-bottom:1.25rem; /* 20px */
`

export default InicioSesion
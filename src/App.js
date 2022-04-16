import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from "./elements/Header";
import Boton from "./elements/Boton";
import BtnCerrarSesion from "./components/BtnCerrarSesion";
import FormularioGasto from "./components/FormularioGasto";




function App() {
    return (
        <>
            <Helmet>
                <title>Agregar Gasto</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Agregar Gasto</Titulo>
                    <ContenedorBotones>
                        <Boton to="/categorias">Categorías</Boton>
                        <Boton to="/lista">Lista Gastos</Boton>
                        <BtnCerrarSesion />
                    </ContenedorBotones>
                </ContenedorHeader>
            </Header>
            <FormularioGasto />
        </>
    );
}

export default App;

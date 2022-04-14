import { Header, Titulo } from "./../elements/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elements/BtnRegresar";


const ListaGastos = () => {
    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>
            <Header>
                <BtnRegresar ruta="/" ></BtnRegresar>
                <Titulo>Lista de Gastos</Titulo>
            </Header>
        </>
    )
}

export default ListaGastos
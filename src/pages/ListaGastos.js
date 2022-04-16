import { Header, Titulo } from "./../elements/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elements/BtnRegresar";
import BarraTotalGastado from "../components/BarraTotalGastado";

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
            <BarraTotalGastado />
        </>
    )
}

export default ListaGastos
import { Header, Titulo } from "./../elements/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elements/BtnRegresar";
import BarraTotalGastado from "../components/BarraTotalGastado";


const GastosPorCategoria = () => {
    return (
        <>
            <Helmet>
                <title>Gastos por Categoría</title>
            </Helmet>
            <Header>
                <BtnRegresar ruta="/" ></BtnRegresar>
                <Titulo>Gastos por Categoría</Titulo>
            </Header>
            <BarraTotalGastado />
        </>
    )
}

export default GastosPorCategoria
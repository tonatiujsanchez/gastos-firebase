import { Header, Titulo } from "./../elements/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elements/BtnRegresar";
import BarraTotalGastado from "../components/BarraTotalGastado";


import FormularioGasto from "../components/FormularioGasto";
import { useParams } from "react-router-dom";
import useGetGasto from "../hooks/useGetGasto";


const EditarGasto = () => {

    const { id  } = useParams()
    const [ gasto ] = useGetGasto( id )


    return (
        <>
            <Helmet>
                <title>Editar Gasto</title>
            </Helmet>
            <Header>
                <BtnRegresar ruta="/lista" ></BtnRegresar>
                <Titulo>Editar Gasto</Titulo>
            </Header>
            { Object.keys(gasto).length > 0 &&
                <FormularioGasto gasto={ gasto } />
            }
            <BarraTotalGastado />
        </>
    )
}

export default EditarGasto


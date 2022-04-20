import { Header, Titulo } from "./../elements/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elements/BtnRegresar";
import BarraTotalGastado from "../components/BarraTotalGastado";
import useGastosDelMesPorCategorias from "../hooks/useGastosDelMesPorCategorias";

import {
	ListaDeCategorias,
	ElementoListaCategorias,
	Categoria,
	Valor
} from './../elements/ElementosLista'
import IconoCategoria from "../components/IconoCategoria";
import formatoMoneda from "../helpers/formatoMoneda";



const GastosPorCategoria = () => {

    const [ gastosCategorias ] = useGastosDelMesPorCategorias()

    return (
        <>
            <Helmet>
                <title>Gastos por Categoría</title>
            </Helmet>
            <Header>
                <BtnRegresar ruta="/" ></BtnRegresar>
                <Titulo>Gastos por Categoría</Titulo>
            </Header>

            <ListaDeCategorias>
                {
                    gastosCategorias.map( item =>{
                        return(
                            <ElementoListaCategorias key={ item.categoria }>
                                <Categoria> 
                                    <IconoCategoria idCategoria={item.categoria} />  { item.categoria }
                                </Categoria>
                                <Valor>{ formatoMoneda(item.cantidad) }</Valor>
                            </ElementoListaCategorias>
                        )
                    })
                }
            </ListaDeCategorias>


            <BarraTotalGastado />
        </>
    )
}

export default GastosPorCategoria
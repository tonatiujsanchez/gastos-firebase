import { Header, Titulo } from "./../elements/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elements/BtnRegresar";
import BarraTotalGastado from "../components/BarraTotalGastado";
import useGastosDelMesPorCategorias from "../hooks/useGastosDelMesPorCategorias";

import {
	ListaDeCategorias,
	ElementoListaCategorias,
	Categoria,
	Valor,
    Subtitulo,
    ContenedorSubtitulo
} from './../elements/ElementosLista'
import IconoCategoria from "../components/IconoCategoria";
import formatoMoneda from "../helpers/formatoMoneda";
import { Link } from "react-router-dom";
import Boton from "../elements/Boton";



const GastosPorCategoria = () => {

    const [ gastosCategorias, cargando ] = useGastosDelMesPorCategorias()

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
                { !cargando && gastosCategorias.length > 0
                    ? gastosCategorias.map( item =>{
                        return(
                            <ElementoListaCategorias key={ item.categoria }>
                                <Categoria> 
                                    <IconoCategoria idCategoria={item.categoria} />  { item.categoria }
                                </Categoria>
                                <Valor>{ formatoMoneda(item.cantidad) }</Valor>
                            </ElementoListaCategorias>
                        )
                      })
                    : <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos agregados</Subtitulo>
                        <Boton as={ Link } to="/" >Agregar Gasto</Boton>
                      </ContenedorSubtitulo>
                }
            </ListaDeCategorias>


            <BarraTotalGastado />
        </>
    )
}

export default GastosPorCategoria
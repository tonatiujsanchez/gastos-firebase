import { Link } from "react-router-dom";
import { Header, Titulo } from "./../elements/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elements/BtnRegresar";
import BarraTotalGastado from "../components/BarraTotalGastado";
import useGetGastos from "../hooks/useGetGastos";
import IconoCategoria from './../components/IconoCategoria'
import formatoMoneda from './../helpers/formatoMoneda'
import { ReactComponent as IconoEditar } from './../images/editar.svg'
import { ReactComponent as IconoBorrar } from './../images/borrar.svg'
import Boton from './../elements/Boton'
import {
    Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from './../elements/ElementosLista'
import formatoFecha from "../helpers/formatoFecha";
import { Fragment } from "react";



const ListaGastos = () => {

    const [gastos, ultimo, cargarMas, cargando] = useGetGastos()
    

    const fechaEsIgual = ( gastos, index, gasto ) =>{

        if( index !== 0 ){

            const fechaActual = formatoFecha(gasto.fecha)
            const fechaAnterior = formatoFecha( gastos[index -1 ].fecha )

            return fechaActual === fechaAnterior
        }
    }


    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>
            <Header>
                <BtnRegresar ruta="/" ></BtnRegresar>
                <Titulo>Lista de Gastos</Titulo>
            </Header>
            <Lista>
                {!cargando && gastos.length > 0 &&
                    <>
                        {gastos.map((gasto, index) => {
                            return (
                                <Fragment key={gasto.id}>
                                    { !fechaEsIgual( gastos, index, gasto ) &&
                                        <Fecha>{ formatoFecha(gasto.fecha) }</Fecha>
                                    }
                                    <ElementoLista>
                                        <Categoria>
                                            <IconoCategoria idCategoria={gasto.categoria} />
                                            {gasto.categoria}
                                        </Categoria>
                                        <Descripcion>
                                            {gasto.descripcion}
                                        </Descripcion>
                                        <Valor>
                                            {formatoMoneda(gasto.cantidad)}
                                        </Valor>
                                        <ContenedorBotones>
                                            <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                                                <IconoEditar />
                                            </BotonAccion>
                                            <BotonAccion>
                                                <IconoBorrar />
                                            </BotonAccion>
                                        </ContenedorBotones>
                                    </ElementoLista>
                                </Fragment>
                            )
                        })}
                        <ContenedorBotonCentral>
                            { ultimo?.id !== gastos[gastos.length - 1].id &&
                                <BotonCargarMas onClick={cargarMas} >Cargar más</BotonCargarMas>
                            }
                        </ContenedorBotonCentral>
                    </>
                }
                {
                    !cargando && gastos.length === 0 &&
                        <ContenedorSubtitulo>
                            <Subtitulo>No hay gastos agregados</Subtitulo>
                            <Boton as={Link} to="/" >Agregar Gasto</Boton>
                        </ContenedorSubtitulo>
                }
            </Lista>
            <BarraTotalGastado />
        </>
    )
}




export default ListaGastos
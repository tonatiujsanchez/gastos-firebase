import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

import agregarGasto from '../firebase/agregarGasto'
import editarGasto from '../firebase/editarGasto'

import DatePicker from './DatePicker'

// Tranformar
import getUnixTime from 'date-fns/getUnixTime'
// Revertir transformación 
import fromUnixTime from 'date-fns/fromUnixTime'

import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elements/ElementosFormulario'
import Boton from './../elements/Boton'
import SelectCategorias from './SelectCategorias'

import Alerta from "../elements/Alerta"

import { ReactComponent as IconoPlus } from './../images/plus.svg'
import { ReactComponent as IconoEditarGasto } from './../images/editar.svg'


const FormularioGasto = ({ gasto }) => {

    const { usuario } = useAuth()

    const [categoria, setCategoria] = useState('hogar')
    const [fecha, setFecha] = useState(new Date())

    const [descripcion, setDescripcion] = useState('')
    const [cantidad, setCantidad] = useState('')


    const [estadoAlerta, setEstadoAlerta] = useState(false)
    const [alerta, setAlerta] = useState({})

    const navigate = useNavigate()
    


    useEffect(() => {

        if (gasto) {
            if (usuario.uid !== gasto.uidUsuario) {
                navigate('/')
                return
            }
           
            setCategoria(gasto.categoria)
            setFecha(fromUnixTime(gasto.fecha))
            setDescripcion(gasto.descripcion)
            setCantidad(gasto.cantidad)
        }
    }, [gasto, usuario, navigate])


    const handleSubmit = (e) => {
        e.preventDefault()

        if ([descripcion, cantidad].includes('')) {
            mostrarAlerta('error', 'Todos los campos son obligatorios')
            return
        }
        if (!(parseFloat(cantidad).toFixed(2))) {
            mostrarAlerta('error', 'Por favor ingresa una cantidad válida')
            return
        }


        
        if( gasto ){

            editarGasto({
                idGasto: gasto.id,
                categoria,
                descripcion,
                cantidad: parseFloat(cantidad).toFixed(2),
                fecha: getUnixTime(fecha)
            }).then(()=>{
                navigate('/lista')
            }).catch((error) => {
                mostrarAlerta('error', 'Hubo un error inesperado al intentar editar el gasto');
                console.log('Cath', error);
            })

        }else{
            agregarGasto({
                descripcion,
                cantidad: parseFloat(cantidad).toFixed(2),
                categoria,
                fecha: getUnixTime(fecha),
                uidUsuario: usuario.uid
            }).then(() => {
                mostrarAlerta('exito', 'Se agrego el gasto exitosamente')
                setDescripcion('')
                setCantidad('')
            }).catch((error) => {
                mostrarAlerta('error', 'Hubo un error inesperado al intentar agregar el gasto');
                console.log('Cath', error);
            })
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
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias categoria={categoria} setCategoria={setCategoria} />
                <DatePicker fecha={fecha} setFecha={setFecha} />
            </ContenedorFiltros>
            <div>
                <Input
                    type="text"
                    name='descripcion'
                    id='descripcion'
                    value={descripcion}
                    onChange={(e)=> setDescripcion( e.target.value )}
                    placeholder='Descripción del Gasto' />
                <InputGrande
                    type="text"
                    name='cantidad'
                    id='cantidad'
                    value={ cantidad }
                    onChange={(e)=> setCantidad( e.target.value.replace(/[^0-9.]/g, '') )}
                    placeholder='$0.00' />
                <ContenedorBoton>
                    <Boton as="button" type='submit' primario conIcono>
                        {
                            gasto
                            ? <>Editar Gasto <IconoEditarGasto /></>
                            : <>Agregar Gasto <IconoPlus /></>
                        }
                    </Boton>
                </ContenedorBoton>
            </div>
            {estadoAlerta && <Alerta alerta={alerta} />}
        </Formulario>
    )
}

export default FormularioGasto
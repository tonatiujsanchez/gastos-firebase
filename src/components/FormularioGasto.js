import { useState } from 'react'

import useAuth from '../hooks/useAuth'
import useForm from '../hooks/useForm'

import agregarGasto from '../firebase/agregarGasto'

import DatePicker from './DatePicker'

// Tranformar
import getUnixTime from 'date-fns/getUnixTime'
// Revertir transformación 
import fromUnixTime from 'date-fns/fromUnixTime'

import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elements/ElementosFormulario'
import Boton from './../elements/Boton'
import { ReactComponent as IconoPlus } from './../images/plus.svg'
import SelectCategorias from './SelectCategorias'

import Alerta from "../elements/Alerta"




const FormularioGasto = () => {
    
    const { usuario } = useAuth()

    const [categoria, setCategoria] = useState('hogar')
    const [fecha, setFecha] = useState( new Date() )

    const [{ descripcion, cantidad }, handleInputChange, resetForm] = useForm({
        descripcion: '',
        cantidad: ''
    })

    const [estadoAlerta, setEstadoAlerta] = useState(false)
    const [alerta, setAlerta] = useState({})


    const handleSubmit = ( e ) =>{
        e.preventDefault()

        if( [descripcion, cantidad].includes('') ){
            mostrarAlerta('error','Todos los campos son obligatorios')
            return
        }
        if( !(parseFloat(cantidad).toFixed(2)) ){
            mostrarAlerta('error','Por favor ingresa una cantidad válida')
            return
        }
        
        
        agregarGasto({
            descripcion, 
            cantidad: parseFloat(cantidad).toFixed(2), 
            categoria, 
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid 
        }).then( () =>{
            mostrarAlerta('exito', 'Se agrego el gasto exitosamente')
            resetForm()
        }).catch((error)=>{
            mostrarAlerta('error','Hubo un error inesperado al intentar agregar el gasto');
            console.log('Cath',error);
        })

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
        <Formulario onSubmit={ handleSubmit }>
            <ContenedorFiltros>
                <SelectCategorias categoria={ categoria } setCategoria={setCategoria} />
                <DatePicker fecha={ fecha } setFecha={setFecha} />
            </ContenedorFiltros>
            <div>
                <Input
                    type="text"
                    name='descripcion'
                    id='descripcion'
                    value={descripcion}
                    onChange={ handleInputChange }
                    placeholder='Descripción del Gasto' />
                <InputGrande
                    type="text"
                    name='cantidad'
                    id='cantidad'
                    value={ cantidad.replace(/[^0-9.]/g, '') }
                    onChange={ handleInputChange }
                    placeholder='$0.00' />
                <ContenedorBoton>
                    <Boton as="button" type='submit' primario conIcono>
                        Agregar Gasto <IconoPlus />
                    </Boton>
                </ContenedorBoton>
            </div>
            { estadoAlerta && <Alerta alerta={ alerta } /> }
        </Formulario>
    )
}

export default FormularioGasto
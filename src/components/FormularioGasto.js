import { useState } from 'react'
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elements/ElementosFormulario'
import useForm from '../hooks/useForm'
import Boton from './../elements/Boton'
import { ReactComponent as IconoPlus } from './../images/plus.svg'
import DatePicker from './DatePicker'
import SelectCategorias from './SelectCategorias'



const FormularioGasto = () => {

    const [categoria, setCategoria] = useState('hogar')
    const [fecha, setFecha] = useState( new Date() )

    const [{ descripcion, cantidad }, handleInputChange, resetForm] = useForm({
        descripcion: '',
        cantidad: ''
    })

    const handleSubmit = ( e ) =>{
        e.preventDefault()

        console.log( { descripcion, cantidad, categoria, fecha } )
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
                    placeholder='Descripcion del Gasto' />
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
        </Formulario>
    )
}

export default FormularioGasto
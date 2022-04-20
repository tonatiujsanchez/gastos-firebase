
import { format, fromUnixTime} from 'date-fns'
import { es } from 'date-fns/locale'

const formatoFecha = ( fecha ) => {

    return format( fromUnixTime( fecha ), "dd 'de' MMMM 'de' yyyy", {locale: es} )
}

export default formatoFecha

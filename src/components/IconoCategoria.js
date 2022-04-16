
import { ReactComponent as IconoComida } from './../images/cat_comida.svg';
import { ReactComponent as IconoCompras } from './../images/cat_compras.svg';
import { ReactComponent as IconoCuentasYPagos } from './../images/cat_cuentas-y-pagos.svg';
import { ReactComponent as IconoDiversion } from './../images/cat_diversion.svg';
import { ReactComponent as IconoHogar } from './../images/cat_hogar.svg';
import { ReactComponent as IconoRopa } from './../images/cat_ropa.svg';
import { ReactComponent as IconoSaludEHigiene } from './../images/cat_salud-e-higiene.svg';
import { ReactComponent as IconoTransporte } from './../images/cat_transporte.svg';


const iconosCategorias = {
    "comida"          : <IconoComida />,
    "compras"         : <IconoCompras />,
    "cuentas y pagos" : <IconoCuentasYPagos />,
    "diversion"       : <IconoDiversion />,
    "hogar"           : <IconoHogar />,
    "ropa"            : <IconoRopa />,
    "salud e higiene" : <IconoSaludEHigiene />,
    "transporte"      : <IconoTransporte />,
}


const IconoCategoria = ({ idCategoria }) => {

  return iconosCategorias[idCategoria]
}


export default IconoCategoria
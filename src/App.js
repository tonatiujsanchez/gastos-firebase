import { Helmet } from "react-helmet";
import BtnCerrarSesion from "./components/BtnCerrarSesion";
import Boton from "./elements/Boton";
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from "./elements/Header";




function App() {
  return (
      <>
        <Helmet>
            <title>Agregar Gasto</title>
        </Helmet>
        <Header>
          <ContenedorHeader>
            <Titulo>Agregar Gasto</Titulo>
            <ContenedorBotones>
              <Boton to="/categorias">Categorías</Boton>
              <Boton to="/lista">Lista Gastos</Boton>
              <BtnCerrarSesion />
            </ContenedorBotones>
          </ContenedorHeader>
        </Header>
      </>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';

import WebFont from 'webfontloader';
import { Helmet } from "react-helmet";

import Contenedor from './elements/Contenedor';

import EditarGasto from './pages/EditarGasto';
import GastosPorCategoria from './pages/GastosPorCategoria';
import InicioSesion from './pages/InicioSesion';
import ListaGastos from './pages/ListaGastos';
import RegistroUsuarios from './pages/RegistroUsuarios';

import favicon from './images/logo.png'
import Fondo from './elements/Fondo';


import RutaPrivada from './routes/RutaPrivada';
import RutaPublica from './routes/RutaPublica';


import { AuthProvider } from './context/AuthContext';
import { TotalMesProvider } from './context/TotalMesContext';




WebFont.load({
    google: {
        // Work+Sans:wght@400;500;700
        families: ['Work Sans:400,500,700', 'sans-serif']
    }
})



const Index = () => {


    return (
        <>
            <Helmet>
                <link rel="shortcut" href={ favicon } type="image/x-icon" />
            </Helmet>
            
            <AuthProvider>
                <TotalMesProvider>

                    <BrowserRouter>
                        <Contenedor>
                            <Routes>
                                <Route path='/iniciar-sesion' element={ 
                                    <RutaPublica>
                                        <InicioSesion /> 
                                    </RutaPublica>
                                }/>
                                <Route path='/crear-cuenta' element={ 
                                    <RutaPublica>
                                        <RegistroUsuarios /> 
                                    </RutaPublica>
                                }/>

                                <Route path="/categorias" element={
                                    <RutaPrivada >
                                        <GastosPorCategoria /> 
                                    </RutaPrivada>
                                } />

                                <Route path="/lista" element={
                                    <RutaPrivada >
                                        <ListaGastos /> 
                                    </RutaPrivada>
                                }/>

                                <Route path="/editar/:id" element={
                                    <RutaPrivada >
                                        <EditarGasto /> 
                                    </RutaPrivada>
                                }/>

                                <Route path="/" element={
                                    <RutaPrivada >
                                        <App /> 
                                    </RutaPrivada>
                                }/>
                            </Routes>
                        </Contenedor>
                    </BrowserRouter>

                </TotalMesProvider>
            </AuthProvider>
            <Fondo />
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);


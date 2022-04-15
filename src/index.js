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
            <BrowserRouter>
                <Contenedor>
                    <Routes>
                        <Route path='/iniciar-sesion' element={ <InicioSesion /> } />
                        <Route path='/crear-cuenta' element={ <RegistroUsuarios /> } />
                        <Route path='/categorias' element={ <GastosPorCategoria /> } />
                        <Route path='/lista' element={ <ListaGastos /> } />
                        <Route path='/editar/:id' element={ <EditarGasto /> } />
                        <Route path='/' element={ <App /> } />
                    </Routes>
                </Contenedor>
            </BrowserRouter>
            <Fondo />
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);


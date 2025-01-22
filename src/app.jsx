import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './componentes/login/login';
import Home from './componentes/home/Home';
import AgregarPoblacion from './componentes/agregarPoblacion/AgregarPoblacion';
import ProtectRuta from './componentes/utils/ProtectRuta';
import Navegacion from './componentes/navegacion/Navegacion';

function App() {
    return (
        <BrowserRouter>
        <Navegacion />
            <Routes>
                <Route path="/" element={<Login />} />

                <Route element={<ProtectRuta permiso="poblacion.consulta" redirectRuta="/" />}>
                    <Route path="/home" element={<Home />} />
                </Route>
                <Route element={<ProtectRuta permiso="poblacion.carga" redirectRuta="/" />}>
                    <Route path="/agregar-poblacion" element={<AgregarPoblacion />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

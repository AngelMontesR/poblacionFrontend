import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/login/login';
import Home from './componentes/home/Home';
import Navegacion from './componentes/navegacion/Navegacion';
import Footer from './componentes/footer/Footer';
import AgregarPoblacion from './componentes/agregarPoblacion/AgregarPoblacion';

function App() {
    return (
        <Router>
            <Navegacion />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/agregar-poblacion" element={<AgregarPoblacion />} />
                </Routes>
            <Footer />
        </Router>
    );
}

export default App;

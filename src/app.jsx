import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/login/login';
import Home from './componentes/home/Home';
import Navegacion from './componentes/navegacion/Navegacion';
import Footer from './componentes/footer/Footer';
import AgregarPoblacion from './componentes/agregarPoblacion/AgregarPoblacion';
import ProtectedRoute from './componentes/protectedRoute/ProtectedRoute';

function App() {
    return (
        <Router>
            <Navegacion />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/agregar-poblacion" element={<ProtectedRoute><AgregarPoblacion /></ProtectedRoute>} />
                </Routes>
            <Footer />
        </Router>
    );
}

export default App;

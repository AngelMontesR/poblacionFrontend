import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/login/login';
import Home from './componentes/home/Home';
import Navegacion from './componentes/navegacion/Navegacion';
import Footer from './componentes/footer/Footer';

function App() {
    return (
        <Router>
            <Navegacion />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

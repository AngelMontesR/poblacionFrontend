import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Navegacion = () => {

    const [salir, setSalir] = useState(false);
    const navegar = useNavigate();

    const cerrarSesion = (evento) => {
        console.log("cerrarSesion");
        console.log(evento);
        localStorage.removeItem("token");
        localStorage.removeItem("permisos");
        setSalir(false);
        navegar('/');
    }

    useEffect(() => {
        console.log("useEffect Navegacion");
        localStorage.getItem("token") ? setSalir(true) : setSalir(false);
    }, []);

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0"></div>
                {
                    salir ? (
                        <div className="col-md-3 text-end">
                            <button type="button" className="btn btn-dark" onClick={cerrarSesion}>Salir</button>
                        </div>
                    ) : (
                       null
                    )
                }
            </header>
        </div>
    );
};


export default Navegacion;
import React, { useState,useEffect } from "react";

const Navegacion = () => {

    const [salir, setSalir] = useState(true);

    const cerrarSesion = (evento) => {
       console.log("cerrarSesion");
       console.log(evento);
    }

    const verificaLogin = () => {
        setSalir(true);
    }

    useEffect(() => {
        verificaLogin();
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
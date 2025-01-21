import React, { useState,useEffect } from "react";

const Navegacion = () => {

    const [salir, setSalir] = useState(false);

    const cerrarSesion = (evento) => {

    }

    const verificaLogin = () => {
        setSalir(true);
    }

    useEffect(() => {
        verificaLogin();
    }, []);

    return (
        <div class="container">
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div class="col-md-3 mb-2 mb-md-0">
                    <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                        <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
                    </a>
                </div>
                {
                    salir ? (
                       null
                    ) : (
                        <div class="col-md-3 text-end">
                            <button type="button" class="btn btn-dark">Salir</button>
                        </div>
                    )
                }
            </header>
        </div>
    );
};


export default Navegacion;
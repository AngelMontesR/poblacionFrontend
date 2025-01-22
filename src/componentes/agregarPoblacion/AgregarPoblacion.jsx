import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgregarPoblacion.css';

function AgregarPoblacion() {
    const navegar = useNavigate();

    const home = () => {
        navegar('/home');
    };

    const [archivo, setArchivo] = useState(null);

    const soltar = (e) => {
        e.preventDefault();
        const archivosSoltados = e.dataTransfer.files;
        if (archivosSoltados.length > 0) {
            if(archivosSoltados[0].type != "text/csv") {
                alert("El archivo seleccionado no es un archivo CSV");
                return;
            }
            setArchivo(archivosSoltados[0]);
        }
    };

    const inputCarga = (e) => {
        const archivoSeleccionado = e.target.files[0];
        if (archivoSeleccionado) {
            if(archivoSeleccionado.type != "text/csv") {
                alert("El archivo seleccionado no es un archivo CSV");
                return;
            }
            setArchivo(archivoSeleccionado);
        }
    };

    const manejarArrastreSobre = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-secondary" onClick={home}>
                    Regresar
                </button>
            </div>
            <h2 className="text-center mb-4">Subir Layout</h2>
            <div className="border border-primary rounded p-4 text-center hover-primary" onDrop={soltar} onDragOver={manejarArrastreSobre}>
                <p className="mb-3 text-muted">
                    Arrastra y suelta tu archivo aquí, o haz clic para seleccionarlo.
                </p>
                <label className="btn btn-secondary">
                    Seleccionar Archivo
                    <input type="file" onChange={inputCarga} className="d-none"/>
                </label>
            </div>
            <div className="mt-4">
                <h4>Archivo seleccionado</h4>
                {archivo ? (
                   <div>
                        <ul className="list-group">
                            <li className="list-group-item">{archivo.name}</li>
                        </ul>
                        <button className="btn btn-primary mt-4">
                            Subir Archivo
                        </button>
                   </div>
                ) : (
                    null
                )}
            </div>
        </div>
    );
}

export default AgregarPoblacion;
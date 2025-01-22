import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cargando from '../cargando/Cargando';
import { descifrar } from '../../services/cifrar';
import './AgregarPoblacion.css';

function AgregarPoblacion() {
    const navegar = useNavigate();
    const [cargando, setcargando] = useState(false);

    const home = () => {
        navegar('/home');
    };

    const [archivo, setArchivo] = useState(null);

    const soltar = (evento) => {
        evento.preventDefault();
        const archivosSoltados = evento.dataTransfer.files;
        if (archivosSoltados.length > 0) {
            if(archivosSoltados[0].type != "text/csv") {
                alert("El archivo seleccionado no es un archivo CSV");
                return;
            }
            setArchivo(archivosSoltados[0]);
        }
    };

    const inputCarga = (evento) => {
        const archivoSeleccionado = evento.target.files[0];
        if (archivoSeleccionado) {
            if(archivoSeleccionado.type != "text/csv") {
                alert("El archivo seleccionado no es un archivo CSV");
                return;
            }
            setArchivo(archivoSeleccionado);
        }
    };

    const manejarArrastreSobre = (evento) => {
        evento.preventDefault();
    };

    const cargarArchivo = () => {
        if (archivo) {
            setcargando(true);
            let token = descifrar('token');
            console.log(token);

            let formulario = new FormData();
            formulario.append('archivo', archivo);

            axios.post(`${import.meta.env.VITE_API_URL}/carga-archivo`, formulario, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                alert('Archivo cargado correctamente');
                setcargando(false);
                setArchivo(null);
                console.log(response.data);
            })
            .catch(error => {
                alert('Error al cargar el archivo, intente nuevamente');
                setcargando(false);
                console.error(error);
            });
        } else {
            alert('No se ha seleccionado el archivo');
        }
    };

    return (
        cargando ? <Cargando /> : ( <div className="container mt-5">
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
                        <button className="btn btn-primary mt-4" onClick={cargarArchivo}>
                            Subir Archivo
                        </button>
                   </div>
                ) : (
                    null
                )}
            </div>
        </div>)
    );
}

export default AgregarPoblacion;
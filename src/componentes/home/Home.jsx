import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { descifrar } from '../../services/cifrar';
import Cargando from '../cargando/Cargando';

const Home = () => {
    const navegar = useNavigate();
    const [cargando, setcargando] = useState(false);
    const [poblacion, setPoblacion] = useState({ data: [], links: [] });
    const [permisos, setPermisos] = useState([]);
    const [mostrarModal, setShowModal] = useState(false);
    const [telefonos, setTelefonos] = useState([]);
    const [direcciones, setDirecciones] = useState([]);

    useEffect(() => {
        consultaPoblacion();
        console.log("useEffect");
        console.log(
        );
        verificarPermisos();
    }, []);

    const consultaPoblacion = () => {
        console.log("consultaPoblacion");
        const token = descifrar('token');
        setcargando(true);
        axios.get(`${import.meta.env.VITE_API_URL}/obtener-poblacion`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setcargando(false);
                setPoblacion(response.data);
            })
            .catch(error => {
                setcargando(false);
                console.error(error);
            });
    };

    const verificarPermisos = () => {
        setPermisos(descifrar('permisos'));
    };

    const agregar = () => {
        navegar('/agregar-poblacion');
    };

    const mostrarDetalle = (id) => () => {

        let telefonos = [];
        let direcciones = [];
        let persona = poblacion.data.find(persona => persona.id == id);

        telefonos = persona.telefonos;
        direcciones = persona.direcciones;

        setTelefonos(telefonos);
        setDirecciones(direcciones);
        setShowModal(true);
    }

    return (
        <div className="mt-5">
            {cargando ? (
                <Cargando />
            ) : (
                <div className='container'>
                    {
                        permisos.includes('poblacion.carga') ? (
                            <div className='mb-3'>
                                <button type="button" className="btn btn-primary" onClick={agregar}>Agregar Datos</button>
                            </div>
                        ) : null
                    }
                    <div className="row justify-content-center">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poblacion.data.length > 0 ? (
                                    poblacion.data.map((persona) => (
                                        <tr key={persona.id} onClick={mostrarDetalle(persona.id)}>
                                            <th scope="row">{persona.id}</th>
                                            <td>{persona.nombre} {persona.paterno} {persona.materno}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No hay datos disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <nav>
                        <ul className="pagination">
                            {poblacion.links.map((link, index) => (
                                <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
                                    <a className="page-link"
                                        href="#"
                                        onClick={() => {
                                            if (link.url) {
                                                axios.get(link.url, {
                                                    headers: {
                                                        Authorization: `Bearer ${descifrar('token')}`,
                                                    },
                                                })
                                                    .then(response => setPoblacion(response.data))
                                                    .catch(error => console.error(error));
                                            }
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}

            {mostrarModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles del Registro</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-6">
                                        <h5>Telefonos</h5>
                                        <ul>
                                            {telefonos.map(telefono => (
                                                <li key={telefono.id}>{telefono.telefono}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-6">
                                        <h5>Direcciones</h5>
                                        <ul>
                                            {direcciones.map(direccion => (
                                                <li key={direccion.id}>{direccion.calle} {direccion.numero_exterior} {direccion.numero_interior} {direccion.colonia} {direccion.cp}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

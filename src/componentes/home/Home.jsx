import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { descifrar } from '../../services/cifrar';
import Cargando from '../cargando/Cargando';

const Home = () => {
    const navegar = useNavigate();
    const [cargando, setcargando] = useState(false);
    const [poblacion, setPoblacion] = useState({ data: [], links: [] });

    useEffect(() => {
        consultaPoblacion();
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
            console.log(response.data);
        })
        .catch(error => {
            setcargando(false);
            console.error(error);
        });
    };

    const agregar = () => {
        navegar('/agregar-poblacion');
    };

    return (
        <div className="mt-5">
            {cargando ? (
                <Cargando />
            ) : (
                <div className='container'>
                    <div className='mb-3'>
                        <button type="button" className="btn btn-primary" onClick={agregar}>Agregar Datos</button>
                    </div>
                    <div className="row justify-content-center">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {poblacion.data.length > 0 ? (
                                    poblacion.data.map((persona) => (
                                        <tr key={persona.id}>
                                            <th scope="row">



                                            </th>
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
        </div>
    );
};

export default Home;

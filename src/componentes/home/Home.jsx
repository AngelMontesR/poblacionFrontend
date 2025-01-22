import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { descifrar } from '../../services/cifrar';
import Cargando from '../cargando/Cargando';

const Home = () => {

    const navegar = useNavigate();
    const [cargando, setcargando] = useState(false);

    useEffect(() => {
        consultaPoblacion();
    }, []);

    const consultaPoblacion = () => {
        console.log("consultaPoblacion");
        let token = descifrar('token');
        setcargando(true);
        axios.get(`${import.meta.env.VITE_API_URL}/obtener-poblacion`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setcargando(false);
            console.log(response.data);
        })
        .catch(error => {
            setcargando(false);
            console.error(error);
        });
    };

    const agregar = () => {
        navegar('/agregar-poblacion');
    }

    return (
        <div className="mt-5">
            {
                cargando ? (<Cargando />) : (
                    <div className='container'>
                        <div className='mb-3'>
                            <button type="button" className="btn btn-primary" onClick={agregar}>Agregar Datos</button>
                        </div>
                        <div className="row justify-content-center">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellido Paterno</th>
                                        <th scope="col">Apellido Materno</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colSpan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Anterior</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">Siguiente</a></li>
                            </ul>
                        </nav>
                    </div>
                )
            }
        </div>
    );
};

export default Home;

import React, { useState,useEffect } from 'react';
import { cifrar, descifrar } from '../../services/cifrar';
import axios from 'axios';
import Cargando from '../cargando/Cargando';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [cargando, setcargando] = useState(false);

    const campoUsuario = (e) => {
        setUsuario(e.target.value);
    };

    const campoContrasena = (e) => {
        setContrasena(e.target.value);
    };

    const iniciarSesion = (evento) => {
        evento.preventDefault();
        setcargando(true);
        axios.post(`${import.meta.env.VITE_API_URL}/login`, {
            email: usuario,
            password: contrasena
        })
        .then(response => {
            console.log('Respuesta del server:', response.data);
            console.log(JSON.stringify(response.data.permisos))
            cifrar(response.data.token,'token')
            cifrar(JSON.stringify(response.data.permisos),'permisos')
            setcargando(false);
            navegar('/home');
        })
        .catch(error => {
            alert('Hubo un error en el server');
            console.error('Hubo un error en el server:', error);
            setcargando(false);
        });
    };

    return (
        <div className="container mt-5">
            {
                cargando ? (<Cargando/>) :
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Iniciar sesión</h2>
                                <form onSubmit={iniciarSesion}>
                                    <div className="mb-3">
                                        <label htmlFor="usuario" className="form-label">Usuario</label>
                                        <input
                                            type="email"
                                            id="usuario"
                                            className="form-control"
                                            value={usuario}
                                            onChange={campoUsuario}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                                        <input
                                            type="password"
                                            id="contrasena"
                                            className="form-control"
                                            value={contrasena}
                                            onChange={campoContrasena}
                                            required
                                        />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Login;

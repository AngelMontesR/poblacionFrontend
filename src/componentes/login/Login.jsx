import React, { useState } from 'react';
import { cifrar, descifrar } from '../../services/cifrar';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const campoUsuario = (e) => {
        setUsuario(e.target.value);
    };

    const campoContrasena = (e) => {
        setContrasena(e.target.value);
    };

    const iniciarSesion = () => {
        alert(`Usuario: ${usuario}, Contraseña: ${contrasena}`);
    };

    return (
        <div className="container mt-5">
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
        </div>
    );
}

export default Login;

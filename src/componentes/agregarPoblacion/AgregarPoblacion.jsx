import React from 'react';
import { useNavigate } from 'react-router-dom';

function AgregarPoblacion() {
    const navegar = useNavigate();

    const home = () => {
        navegar('/home');
    }

    return (
        <div className="container mt-5">
            <div className='mb-3'>
                <button type="button" className="btn btn-secondary" onClick={home}>Regresar</button>
            </div>
        </div>
    );
};

export default AgregarPoblacion;
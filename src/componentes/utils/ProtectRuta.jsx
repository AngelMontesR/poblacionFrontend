import React, { useEffect } from "react";
import { descifrar } from '../../services/cifrar';
import { useNavigate, Outlet } from 'react-router-dom';

const ProtectRuta = ({ permiso, redirectRuta }) => {
    const token = descifrar('token');
    const permisos = descifrar('permisos');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Token:', token);
        console.log('Permisos:', permisos);
        console.log('Nombre de la ruta:', permiso);

        if (!permisos || !token || !permisos.includes(permiso)) {
            navigate(redirectRuta);
        }

    }, [permisos, token, permiso, redirectRuta, navigate]);

    if (permisos && token && permisos.includes(permiso)) {
        return <Outlet />;
    }

    return null;
};

export default ProtectRuta;

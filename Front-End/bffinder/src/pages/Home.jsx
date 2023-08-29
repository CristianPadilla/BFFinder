import React from 'react';
import { useNavigate } from "react-router-dom";
import NavHome from "../Components/NavHome";
import SectionPosts from '../containers/SectionAllPosts';

const Home = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Realiza las acciones de cierre de sesión aquí, como eliminar el token de autenticación del almacenamiento
    
        // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
        navigate("/login");
      };

    return (
        <div>
            <NavHome/>
            <SectionPosts />
        </div>
    );
};

export default Home;
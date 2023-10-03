import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "styles/Navp.scss";
import "styles/NavHome.scss";
import { Button } from "@mui/material";
import imglogobff from "imgs/logo-bffinder.png";
import logobff from "imgs/logo-bffinder-FINAL2.png";

const NavHome = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Realiza las acciones de cierre de sesión aquí, como eliminar el token de autenticación del almacenamiento

    // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
    navigate("/login");
  };

  return (
    <div>
      <header className="header-home">
        <a href="#">
          <img src={logobff} className="logobff" alt="imglog" />
        </a>

        <nav className="nav-h">
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Mis Mascotas</a>
            </li>

            <li><a href="#">Mi cuenta</a>
              <ul>
                <li>
 {/* <form onSubmit={handleLogout}> */}
                  <a href="/login">Cerrar Sesión</a>
{/* </form> */}
                  </li>
              </ul>
            </li>

            {/* <li>
           
              <input
                id="post-btn"
                type="submit"
                value="Publicar Mascota"
                className="btnp"
              />

            </li> */}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavHome;
import React from "react";

import { Button } from "@mui/material";
import imglogobff from "imgs/logo-bffinder.png";
import logobff from "imgs/logo-bffinder-FINAL2.png";

const Header = () => {

  return (
    <div>
      <header>
        <a href="#">
          <img src={logobff} className="logobff" alt="imglog" />
        </a>

        <nav>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Mis Mascotas</a>
            </li>

            <li><a href="#">Mi cuenta</a>
              <ul>
                <li><a href="#">Cerrar Sesión</a></li>
              </ul>
            </li>

            <li>
              <input
                id="post-btn"
                type="submit"
                value="Publicar Mascota"
                className="btnh"
              />
            </li>
          </ul>
        </nav>
      </header>
      <section className="zona1">
        <p className="text-figure">
          Miles de animalitos estan en busca de un hogar.
        </p>
        <input
          id="sign-in-btn"
          type="submit"
          value="Iniciar Sesión"
          className="btnf"
        />
      </section>
    </div>
  );
};

export default Header;

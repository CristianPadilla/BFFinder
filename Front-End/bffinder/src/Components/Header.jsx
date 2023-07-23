import React, { useEffect, useState } from 'react';
import 'styles/Header.scss';
import { Button } from "@mui/material";
import imglogobff from "imgs/logo-bffinder.png";
import logobff from "imgs/logo-bffinder-FINAL2.png";

const Header = () => {

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      header.classList.toggle('abajo', window.scrollY > 0);
    });
  }, []);

  return (
    <div>
      <header>
        
        <a href="#" className="logoh">
          <img src={logobff} className="logobff" alt="imglog" />
        </a>
        
        <nav>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Mascotas</a>
            </li>
            <li>
              <a href="#">Fundaciones</a>
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
        <p className='text-figure'>Miles de animalitos estan en busca de un hogar.</p>
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

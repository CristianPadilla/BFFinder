import React, { useEffect, useRef } from "react";
import "styles/Header.scss";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import imglogobff from "imgs/logo-bffinder.png";
import logobff from "imgs/logo-bffinder-FINAL2.png";
import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const showAlert = () => {
    Swal.fire({
      title: "Se requiere iniciar sesión",
      text: "Para publicar una mascota en BFFinder debes iniciar sesión",
      icon: "info",
      confirmButtonText: "Ir a iniciar sesión",
      cancelButtonText: "Cerrar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/auth/login");
      }
    });
  };

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  const handleScroll = () => {
    if (headerRef.current) {
      headerRef.current.classList.toggle("scrolled", window.scrollY > 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="inicio" className="header-container">
      <header ref={headerRef} className="header-prehome">
        <a href="#" className="logoh">
          <img src={logobff} className="logobff" alt="imglog" />
        </a>

        <nav className="nav-prehome">
          <ul>
            <li>
              <Link to="inicio" spy={true} smooth={true} duration={500}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="mascotas" spy={true} smooth={true} duration={500}>
                Mascotas
              </Link>
            </li>
            <li>
              <Link to="fundaciones" spy={true} smooth={true} duration={500}>
                Fundaciones
              </Link>
            </li>
            <li>
              <input
                id="post-btn"
                type="submit"
                value="Publicar Mascota"
                className="btnh"
                onClick={showAlert}
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
          onClick={handleLoginClick}
        />
      </section>
      <section className="abajo"></section>
    </div>
  );
};

export default Header;

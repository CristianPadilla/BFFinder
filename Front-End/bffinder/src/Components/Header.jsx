import React, { useEffect, useRef } from "react";
import "styles/Header.scss";
import { Link } from "react-scroll"; //libreria react-scroll para las sections
import { useNavigate } from "react-router-dom";
import { 
  Button, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, 
} from "@mui/material";
import imglogobff from "imgs/logo-bffinder.png";
import logobff from "imgs/logo-bffinder-FINAL2.png";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  //Para que el nav identifique si el usuario bajo en la pagina
    // const handleScroll = () => {
    //   console.log(header);
    //   const header = document.querySelector('header');
    //   header.classList.toggle('scrolled', window.scrollY > 0);
    // };

    const handleScroll = () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle("scrolled", window.scrollY > 0);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
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
              <Link to="inicio" spy={true} smooth={true} duration={500}>Inicio</Link >
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
                onClick={handleModalOpen}
              />
              <Dialog open={open} onClose={handleModalClose}>
                <DialogTitle><b>Atención</b></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <b>Para publicar una mascota en BFFinder debes
                    iniciar sesión.</b>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color="error" onClick={handleModalClose}>Cancelar</Button>
                  <Button variant="contained" color="success" onClick={handleLoginClick}>Iniciar Sesión</Button>
                </DialogActions>
              </Dialog>
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

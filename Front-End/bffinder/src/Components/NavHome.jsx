import React from "react";
import "styles/NavHome.scss";
import imglogobff from "imgs/logo-bffinder.png";
import logobff from "imgs/logo-bffinder-FINAL2.png";
import PerfilMenu from '../containers/PerfilMenu';
import PerfilMenuAdmin from "../containers/PerfilMenuAdmin";
import { useSelector } from "react-redux";

const NavHome = () => {
  const { role } = useSelector((state) => state.persisted.auth);

  return (
    <div>
      <nav>
        <a href="#" className="brand">
          <img src={logobff} className="logobff" alt="imglog" />
        </a>
        <div className="nav-menu">
          {role === 'a' ? <PerfilMenuAdmin /> : <PerfilMenu />}

        </div>
      </nav>
    </div>
  );
};

export default NavHome;
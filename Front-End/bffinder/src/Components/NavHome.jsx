import React, { useState, useEffect } from "react";
// import "styles/Navp.scss";
import "styles/NavHome.scss";
import imglogobff from "imgs/logo-bffinder.png";
import logobff from "imgs/logo-bffinder-FINAL2.png";
import PerfilMenu from '../containers/PerfilMenu';
import {Search} from '@mui/icons-material/';

const NavHome = () => {

  return (
    <div>
      <nav>
          <a href="#" className="brand">
            <img src={logobff} className="logobff" alt="imglog" />
          </a>
            <form action="#">
              <div className="form-input">
                <input type="search" placeholder="Buscar..." style={{ width: '300px' }}/>
                <button type="submit" className="search-btn">
                  <Search />
                </button>
              </div>
            </form>
            <div className="nav-menu">
                <PerfilMenu/>
              {/* <a href="#" className="notification">
				          <i className='bx bxs-bell' ></i>
				            <span className="num">8</span>
			        </a> */}
            </div>
          </nav>
    </div>
  );
};

export default NavHome;
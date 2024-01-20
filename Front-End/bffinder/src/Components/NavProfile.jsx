import React from "react";
import "styles/NavProfile.scss";
import imglogobff from "imgs/logo-bffinder.png";
import logobff from "imgs/logo-bffinder-FINAL2.png";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const NavProfile = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <nav className="nav-profile">
        <div className="zone-back">
          <IconButton onClick={handleGoBack}>
            {/* <ArrowBackIcon sx={{fontSize: "37px"}}/> */}
            Volver
          </IconButton>
        </div>
        <a href="#" className="fingerprint">
          <img src={logobff} className="logobffinder" alt="imglog" />
        </a>
      </nav>
    </div>
  );
};

export default NavProfile;

import React from "react";
import "styles/NavProfile.scss";
import imglogobff from "imgs/logo-bffinder.png";
import logobff from "imgs/logo-bffinder-FINAL2.png";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const NavProfile = () => {
  return (
    <div>
      <nav className="nav-profile">
        <div className="zone-back">
          <IconButton>
            <ArrowBackIcon sx={{fontSize: "37px"}}/>
            {/* <ArrowBackIosIcon sx={{fontSize: "35px"}}/> */}
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

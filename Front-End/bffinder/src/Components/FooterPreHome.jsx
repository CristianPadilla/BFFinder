import React from "react";
import 'styles/FooterPreHome.scss';
import { IconButton, Link, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const FooterPreHome = () => {   
  return (
    <div>
      <div className="footer">
        {/* Primera fila */}
        <div className="social-icons">
          <IconButton
            component={Link}
            href="https://www.facebook.com/bffinder"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://twitter.com/bffinder"
            target="_blank"
            rel="noopener"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.instagram.com/bffinder"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </IconButton>
        </div>

        {/* Segunda fila */}
        <Typography variant="body2" color="textSecondary" className="rights-text">
          © <Link color="inherit" href="#">
              BFFinder
            </Link>{" "} {new Date().getFullYear()}. Todos los derechos reservados.
        </Typography>
      </div>
    </div>
  );
};

export default FooterPreHome;

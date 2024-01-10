import React from "react";
import 'styles/FooterPreHome.scss';
import { IconButton, Link, Typography } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const FooterPreHome = () => {   
  return (
    <div>
      <div className="footer">
        <div className="social-icons">
          <IconButton
            component={Link}
            href="https://www.facebook.com/bffinder"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
          >
            <Facebook />
          </IconButton>
          <IconButton
            component={Link}
            href="https://twitter.com/bffinder"
            target="_blank"
            rel="noopener"
            aria-label="Twitter"
          >
            <Twitter />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.instagram.com/bffinder"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
          >
            <Instagram />
          </IconButton>
        </div>

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

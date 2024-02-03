import { Grid, Typography } from '@mui/material';
import React from 'react';
import pet from "../../assets/imgs/Pets/sad-cat.png";

const MessageDeniedUserFoundation = () => {
    return (
        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ position: "absolute"}}> */}
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={8}>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ fontWeight: "600", letterSpacing: "1px", margin: "0 5rem 0 2rem", textAlign: "justify"}}
            >
              Estimado refugio, fundación u organización para adopción de
              animalitos,
              <br />
              <br />
              Lamentamos informarte que no has cumplido con los requisitos para
              ser habilitado como refugio en Bffinder. Si no estás de acuerdo con
              esta decisión y deseas apelar, por favor, contáctanos a través de{" "}
              <a href="mailto:bffindersoporte@gmail.com">
                bffindersoporte@gmail.com
              </a>
              . Estamos aquí para ayudarte.
              <br />
              <br />
              Atentamente,
              <br />
              El equipo de Bffinder
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
          <img
            src={pet}
            alt=""
            style={{ bottom: "0" }}
          />
        </Grid>
        </Grid>
      </div>
    );
};

export default MessageDeniedUserFoundation;
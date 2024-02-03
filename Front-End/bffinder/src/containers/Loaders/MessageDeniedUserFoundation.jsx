import { Grid, Typography } from '@mui/material';
import React from 'react';

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
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ fontWeight: "600", letterSpacing: "1px", margin: 2 }}
            >
              Estimado refugio, fundación u organización para adopción de
              animalitos,
              <br />
              <br />
              Lamentamos informarte que no has cumplido con los requisitos para
              ser habilitado como refugio en Bffinder. Si no estás de acuerdo con
              esta decisión y deseas apelar, por favor, contáctanos a través de{" "}
              <a href="mailto:Bffinder.support@gmail.com">
                Bffinder.support@gmail.com
              </a>
              . Estamos aquí para ayudarte.
              <br />
              <br />
              Atentamente,
              <br />
              El equipo de Bffinder
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
};

export default MessageDeniedUserFoundation;
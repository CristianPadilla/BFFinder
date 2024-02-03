import { Grid, Typography } from "@mui/material";
import React from "react";
import pet from "../../assets/imgs/Pets/pug-through.png";

const MessageSuccessUserFoundation = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
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
            Para publicar tus mascotas en Bffinder, requerimos la validación de
            tu identidad como refugio. Por favor, envía al correo electrónico{" "}
            <a href="mailto:bffindersoporte@gmail.com">
            bffindersoporte@gmail.com
            </a> los documentos donde se pueda validar los siguientes datos:
            <br />
            - No. de Matrícula Mercantil (Cámara de Comercio).
            <br />
            - No. de Identificación Tributaria (NIT).
            <br />
            <br />
            Una vez verificada la información, podrás disfrutar de todas las funciones en Bffinder.
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

export default MessageSuccessUserFoundation;
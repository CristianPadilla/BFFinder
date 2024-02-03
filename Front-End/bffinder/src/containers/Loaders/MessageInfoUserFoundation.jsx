import { Grid, Typography } from "@mui/material";
import React from "react";

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
            sx={{ fontWeight: "600", letterSpacing: "1px" }}
          >
            Estimado refugio, fundación u organización para adopción de
            animalitos,
            <br />
            <br />
            Para publicar tus mascotas en Bffinder, requerimos la validación de
            tu identidad como refugio. Por favor, envía al correo electrónico{" "}
            <a href="mailto:Bffinder.support@gmail.com">
              Bffinder.support@gmail.com
            </a> los documentos donde se pueda validar los siguientes datos:
            <br />
            - No. de Matrícula Mercantil (Cámara de Comercio) de tu entidad.
            <br />
            - No. de Identificación Tributaria (NIT).
            <br />
            <br />
            Una vez verificada la información, podrás disfrutar de todas las funciones en Bffinder.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default MessageSuccessUserFoundation;

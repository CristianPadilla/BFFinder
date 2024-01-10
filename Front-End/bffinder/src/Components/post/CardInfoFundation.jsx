import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Grid,
  Stack,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  Facebook,
  YouTube,
  Instagram,
  Twitter,
  Language,
  WhatsApp,
} from "@mui/icons-material";

const CardInfoFundation = () => {
  return (
    <div>
      <Card elevation={3} sx={{ borderRadius: "18px" }}>
        <CardHeader
          avatar={<Avatar aria-label="avatar">A</Avatar>}
          title={
            <Typography variant="h6" component="div">
              Perfil
            </Typography>
          }
          subheader={
            <Stack direction="row" alignItems="center">
              <LocationOn
                fontSize="small"
                style={{
                  fontSize: 15,
                  marginBottom: "4px",
                  marginRight: ".3rem",
                }}
              />
              <Typography variant="body2"> Valle del Cauca / Cali</Typography>
            </Stack>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Barrio: Nombre del Barrio
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Dirección: Dirección de la ubicación
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <Phone
                  fontSize="small"
                  style={{ marginBottom: "-3px", marginRight: ".3rem" }}
                />{" "}
                Número Cel: (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <WhatsApp
                  fontSize="small"
                  style={{ marginBottom: "-3px", marginRight: ".3rem" }}
                />{" "}
                Whatsapp: (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <Language
                  fontSize="small"
                  style={{ marginBottom: "-4px", marginRight: ".3rem" }}
                />{" "}
                Página web: www.ejemplo.com
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Facebook fontSize="large" /> <YouTube fontSize="large" />{" "}
              <Instagram fontSize="large" /> <Twitter fontSize="large" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardInfoFundation;

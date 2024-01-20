import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Grid,
  Stack,
  Checkbox,
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
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";

const CardInfoFundation = ({post }) => {
  return (
    <>
      <Card elevation={2} sx={{ borderRadius: "8px" }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: 1 }}
        >
          <Typography
            variant="caption"
            sx={{
              // fontSize: ".8rem",
              margin: "0 0 0 .8rem",
            }}
          >
            Hace 3 horas
          </Typography>
          <Grid item>
            <Typography variant="caption" sx={{ marginRight: 1 }}>
              Agregar a favoritos
            </Typography>
            <Checkbox
              icon={<FavoriteBorder style={{ fontSize: 25 }} />}
              checkedIcon={<Favorite style={{ fontSize: 25, color: "red" }} />}
            />
          </Grid>
        </Grid>
        <CardHeader
          title={
            <Typography
              variant="h6"
              component="div"
              sx={{ margin: "0 .8rem 0 .8rem" }}
            >
              Nombre mascota 
            </Typography>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "normal",
              textAlign: "justify",
              margin: "0 .8rem 0 .8rem",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            ex impedit pariatur minima porro, eius, corrupti possimus ea magnam
            accusantium aspernatur! Officiis ipsa, facilis consequuntur rerum ut
            optio adipisci itaque.
          </Typography>
        </CardContent>
        <Card elevation={1} sx={{ borderRadius: "18px", margin: 2 }}>
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
      </Card>
    </>
  );
};

export default CardInfoFundation;

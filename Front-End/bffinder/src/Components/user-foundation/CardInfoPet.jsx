import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import imgdefault from "imgs/logo-bffinder.png";

const CardInfoPet = () => {
  const images = [{ imageUrl: "https://picsum.photos/id/1018/1000/600/" }];
  //   const { name, breedDetails, specie } = petPartialResponse;

  return (
    <>
      <div style={{ margin: ".1rem 0 1rem 1.3rem"}}>
        <Divider
          textAlign="left"
          color="text.secondary"
          sx={{ marginBottom: "-5px", marginTop: 4, width: "100%" }}
        >
          <Chip label="Información de la mascota" />
        </Divider>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2% 0" }}
        >
          <Card
            sx={{
              display: "flex",
              borderRadius: "10px",
              width: "70rem",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
            elevation={2}
          >
            <div
              style={{
                width: "30%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
                <CardMedia
                  component="img"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  image={
                    images && images.length > 0
                      ? images[0].imageUrl
                      : imgdefault
                  }
                  alt="Imagen"
                />
            </div>

            <CardContent sx={{ padding: "1rem", flexGrow: 1, height: "100%" }}>
              {/* <Link
              to="/ver-publicacion"
              style={{ textDecoration: "none", color: "inherit" }}
            > */}
              <Typography
                variant="h5"
                component="h6"
                sx={{ marginBottom: "0.7rem" }}
              >
                {/* {name} */} Name Pet
              </Typography>
              {/* </Link> */}

              <Grid container spacing={1} sx={{ alignItems: "center" }}>
                <Grid item xs={6}>
                  <Paper
                    elevation={0}
                    variant="outlined"
                    //   sx={{ margin: "1rem", borderRadius: "" }}
                  >
                    <Divider
                      variant="middle"
                      sx={{ marginTop: 1, marginBottom: 2 }}
                    >
                      Caracteristicas
                    </Divider>
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "1rem",
                      }}
                    >
                      <Grid item xs={6} sx={{ textAlign: "justify" }}>
                        {/* <Typography sx={{ margin: '.2rem'}}>{breedDetails.specie.name} / {breedDetails.name}</Typography>
      <Typography sx={{ margin: '.2rem'}}>Genero: {gender}</Typography> */}
                        <Typography sx={{ margin: ".1rem" }}>
                          Especie / Raza
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Genero: Macho
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Caracter: {"dangerous"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: "justify" }}>
                        <Typography sx={{ margin: ".1rem" }}>
                          Tamaño: {"size"}
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Peso: {"weight"}
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Edad: {"age"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider
                      variant="middle"
                      sx={{ marginTop: 1, marginBottom: 2 }}
                    ></Divider>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    elevation={0}
                    variant="outlined"
                    //   sx={{ margin: "1rem", borderRadius: "" }}
                  >
                    <Divider
                      variant="middle"
                      sx={{ marginTop: 1, marginBottom: 2 }}
                    >
                      Salud
                    </Divider>
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        margin: "1rem",
                      }}
                    >
                      <Grid item xs={6} sx={{ textAlign: "justify" }}>
                        <Typography sx={{ margin: ".1rem" }}>
                          {/* Vacunado: {vaccinated} */}
                          Vacunado: Si
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          {/* Esterilizado: {sterilized} */}
                          Esterilizado: No
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          {/* Desparasitado: {dewormed} */}
                          Desparasitado: No
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider
                      variant="middle"
                      sx={{ marginTop: 1, marginBottom: 2 }}
                    ></Divider>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CardInfoPet;

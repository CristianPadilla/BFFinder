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
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { t } from "i18next";

const CardInfoPet = ({ pet }) => {
  const images = [{ imageUrl: "https://picsum.photos/id/1018/1000/600/" }];

  const petToDisplay = pet
    ? {
        name: pet.name,
        breed: pet.breedDetails.name,
        specie: pet.breedDetails.specie.name,
        gender: pet.gender,
        character: pet.dangerous,
        size: pet.size,
        weight: pet.weight,
        age: pet.age,
        vaccinated: pet.vaccinated,
        dewormed: pet.dewormed,
        sterilized: pet.sterilized,
      }
    : {
        name: "Nombre de la mascota",
        size: "Tamaño",
        breed: "Raza",
        specie: "Especie",
        gender: "Genero",
        character: "Caracter",
        weight: "Peso",
        age: "Edad",
        vaccinated: "Vacunado",
        dewormed: "Desparasitado",
        sterilized: "Esterilizado",
      };

  // {pet ? name : "Nombre de la mascota"}

  // abtener todos las propiedades de la mascota de esta forma para  no tener un error
  const name = pet ? pet.name : "Nombre de la mascota";

  // console.log('pet del card info  : ', pet);

  return (
    <>
      <div style={{ margin: ".1rem 0 1rem 1.3rem" }}>
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
                  images && images.length > 0 ? images[0].imageUrl : imgdefault
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
                {/* {pet ? name : "Nombre de la mascota"} */}
                {petToDisplay.name}
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
                          {t(`species.${petToDisplay.specie}`)} /{" "}
                          {t(`breeds.${petToDisplay.breed}`)}
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Genero: {t(`genders.${petToDisplay.gender}`)}
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Caracter: {t(`dangerous.${petToDisplay.character}`)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: "justify" }}>
                        <Typography sx={{ margin: ".1rem" }}>
                          Tamaño: {t(`sizes.${petToDisplay.size}`)}
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Peso: {petToDisplay.weight} kg
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Edad:{" "}
                          {petToDisplay.age === 1
                            ? `${petToDisplay.age} año`
                            : petToDisplay.age === 0
                            ? "Menos de un año"
                            : `${petToDisplay.age} años`}
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
                          Vacunado:{" "}
                          {petToDisplay.vaccinated ? (
                            <CheckIcon color="success" sx={{ fontSize: 15 }} />
                          ) : (
                            <CloseIcon color="error" sx={{ fontSize: 15 }} />
                          )}
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Esterilizado: {petToDisplay.sterilized ? (
                            <CheckIcon color="success" sx={{ fontSize: 15 }} />
                          ) : (
                            <CloseIcon color="error" sx={{ fontSize: 15 }} />
                          )}
                        </Typography>
                        <Typography sx={{ margin: ".1rem" }}>
                          Desparasitado: {petToDisplay.dewormed ? (
                            <CheckIcon color="success" sx={{ fontSize: 15 }} />
                          ) : (
                            <CloseIcon color="error" sx={{ fontSize: 15 }} />
                          )}
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

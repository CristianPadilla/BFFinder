import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  CardActionArea,
  Alert,
  AlertTitle,
} from "@mui/material";
import imgdefault from "imgs/logo-bffinder.png";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import "styles/Card.scss";
import { useDispatch } from "react-redux";
import { startGetPetById } from "../store/pet/thunks";
import { t } from "i18next";

const CardVertical = ({ pet }) => {
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    // console.log("iddddddddddd: ", pet.id);
    dispatch(startGetPetById(pet.id));
  };

  // console.log("pet Card: ", pet);

  return (
    <>
      <div
        // className="custom-card"
        style={{ display: "flex", justifyContent: "center", margin: "4% 0" }}
      >
        <Card
          sx={{ width: "100%", maxWidth: 345, borderRadius: "18px" }}
          elevation={6}
        >
          <CardActionArea>
            <div className="card-click" onClick={handleOpenDialog}>
              <CardHeader
                avatar={
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontSize: "1.4rem" }}
                  >
                    {pet.name}
                  </Typography>
                }
                action={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "1rem", marginTop: ".4rem" }}
                  >
                    {t(`species.${pet.breedDetails.specie.name}`)} -{" "}
                    {t(`breeds.${pet.breedDetails.name}`)}
                  </Typography>
                }
              />
              {/* <div style={{ width: "100%", height: "250px", overflow: "hidden" }}> */}
              <CardMedia
                component="img"
                height="195"
                // sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                image={pet.profileImageUrl ? pet.profileImageUrl : imgdefault}
                alt="Imagen"
              />
              {/* </div> */}
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                    >
                      Tamaño: {t(`sizes.${pet.size}`)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                    >
                      Edad:{" "}
                      {pet.age === 1
                        ? `${pet.age} año`
                        : pet.age === 0
                        ? "Menos de un año"
                        : `${pet.age} años`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                    >
                      Sexo: {t(`genders.${pet.gender}`)}
                    </Typography>
                  </Grid>

                  {/* Columna Derecha */}
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                    >
                      {/* {console.log("Valor de vaccinated:", vaccinated)} */}
                      Vacunado:{" "}
                      {pet.vaccinated ? (
                        <CheckIcon color="success" sx={{ fontSize: 15 }} />
                      ) : (
                        <CloseIcon color="error" sx={{ fontSize: 15 }} />
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                    >
                      Esterilizado:{" "}
                      {pet.sterilized ? (
                        <CheckIcon color="success" sx={{ fontSize: 15 }} />
                      ) : (
                        <CloseIcon color="error" sx={{ fontSize: 15 }} />
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                    >
                      Desparasitado:{" "}
                      {pet.dewormed ? (
                        <CheckIcon color="success" sx={{ fontSize: 15 }} />
                      ) : (
                        <CloseIcon color="error" sx={{ fontSize: 15 }} />
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </div>

            <CardActions>
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{ marginLeft: "1px" }}
              >
                {pet.published ? (
                  <Typography
                    variant="button"
                    display="block"
                    gutterBottom
                    color="seagreen"
                    fontWeight="bold"
                  >
                    En proceso de adopción
                  </Typography>
                ) : (
                  <Typography
                    variant="button"
                    display="block"
                    gutterBottom
                    color="firebrick"
                    fontWeight="bold"
                  >
                    Sin publicar
                  </Typography>
                )}
              </Grid>
            </CardActions>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
};

export default CardVertical;

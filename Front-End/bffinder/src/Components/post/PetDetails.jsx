import React from "react";
import { Divider, Grid, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { t } from "i18next";

const PetDetails = ({ pet }) => {
  const petToDisplay = pet
    ? {
        specie: pet.breedDetails.specie.name,
        breed: pet.breedDetails.name,
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
        specie: "Especie",
        breed: "Raza",
        character: "Caracter",
        size: "Tamaño",
        weight: "Peso",
        age: "Edad",
        vaccinated: "Vacunado",
        dewormed: "Desparasitado",
        sterilized: "Esterilizado",
      };

  // console.log("petToDisplay", petToDisplay);

  return (
    <>
      <Divider
        sx={{
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        {/* Caracteristicas {pet ? pet.name : ""} */}
      </Divider>
      <Box sx={{ margin: "0 1rem 0 1rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "2rem" }}>
          Caracteristicas
        </Typography>
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", justifyContent: "center", margin: "0 1rem 0 1rem" }}
        >
          <Grid item xs={6} sx={{ textAlign: "justify" }}>
            <Typography sx={{ margin: ".2rem" }}>
              {t(`species.${petToDisplay.specie}`)} /{" "}
              {t(`breeds.${petToDisplay.breed}`)}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Genero: {t(`genders.${petToDisplay.gender}`)}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Caracter: {t(`dangerous.${petToDisplay.character}`)}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "justify" }}>
            <Typography sx={{ margin: ".2rem" }}>
              Tamaño: {t(`sizes.${petToDisplay.size}`)}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Peso: {petToDisplay.weight} kg
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Edad:{" "}
              {petToDisplay.age === 1
                ? `${petToDisplay.age} año`
                : petToDisplay.age === 0
                ? "Menos de un año"
                : `${petToDisplay.age} años`}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider
        sx={{
          marginTop: 4,
          marginBottom: 2,
        }}
      ></Divider>
      <Box sx={{ margin: "0 1rem 0 1rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "2rem" }}>
          Salud
        </Typography>
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", justifyContent: "left", margin: "0 1rem 0 1rem" }}
        >
          <Grid item xs={6} sx={{ textAlign: "justify" }}>
            <Typography sx={{ margin: ".2rem" }}>
              Vacunado:{" "}
              {petToDisplay.vaccinated ? (
                <CheckIcon color="success" sx={{ fontSize: 15 }} />
              ) : (
                <CloseIcon color="error" sx={{ fontSize: 15 }} />
              )}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Esterilizado:{" "}
              {petToDisplay.sterilized ? (
                <CheckIcon color="success" sx={{ fontSize: 15 }} />
              ) : (
                <CloseIcon color="error" sx={{ fontSize: 15 }} />
              )}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Desparasitado:{" "}
              {petToDisplay.dewormed ? (
                <CheckIcon color="success" sx={{ fontSize: 15 }} />
              ) : (
                <CloseIcon color="error" sx={{ fontSize: 15 }} />
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PetDetails;

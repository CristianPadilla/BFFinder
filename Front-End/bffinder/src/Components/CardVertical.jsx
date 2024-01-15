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
} from "@mui/material";
import imgdefault from "imgs/logo-bffinder.png";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import "styles/Card.scss";
import DialogViewPet from "./user-foundation/DialogViewPet";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startGetBreedsBySpecieId, startGetPetById } from "../store/pet/thunks";
import { setActivePet } from "../store/pet/petSlice";
import { t } from "i18next";

const CardVertical = ({ pet }) => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.pets);
  // const {
  //   id,
  //   name,
  //   breedDetails,
  //   specie,
  //   size,
  //   age,
  //   vaccinated,
  //   sterilized,
  //   dewormed,
  //   published,
  //   dangerous,
  //   gender,
  // } = pet;
  // console.log("log: ", pet);

  const navigate = useNavigate();

  const handleVerClick = () => {
    navigate("/ver-publicacion");
  };

  // const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    // console.log("iddddddddddd: ", pet.id);
    dispatch(startGetPetById(pet.id));
    // setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    dispatch(setActivePet(null));
    // setOpenDialog(false);
  };

  console.log("pet Card: ", pet);

  return (
    <div
      className="custom-card"
      style={{ display: "flex", justifyContent: "center", margin: "4% 0" }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 350, borderRadius: "18px" }}
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
            <div style={{ width: "100%", height: "250px", overflow: "hidden" }}>
              <CardMedia
                component="img"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                image={pet.profileImageUrl ? pet.profileImageUrl : imgdefault}
                alt="Imagen"
              />
            </div>
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
                    Genero: {t(`genders.${pet.gender}`)}
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
        </CardActionArea>
        <CardActions>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginLeft: "1px" }}
          >
            <Button variant="contained" size="small" onClick={handleVerClick}>
              Ver publicación
            </Button>
            {/* <Typography variant="body2" color="text.secondary" sx={{ padding: '.4rem', backgroundColor: 'lightgreen', borderRadius: '4px', fontWeight: '600', marginLeft: '8px'}}>
    En proceso de adopción
  </Typography> */}
            {pet.published ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  padding: ".4rem",
                  backgroundColor: "lightgreen",
                  borderRadius: "4px",
                  fontWeight: "600",
                  marginLeft: "8px",
                }}
              >
                En proceso de adopción
              </Typography>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  padding: ".4rem",
                  backgroundColor: "lightcoral",
                  color: "white",
                  borderRadius: "4px",
                  fontWeight: "600",
                  marginLeft: "8px",
                  width: "178px",
                  textAlign: "center",
                }}
              >
                Sin publicar
              </Typography>
            )}
          </Grid>
        </CardActions>
      </Card>
      {active != null && (
        <DialogViewPet open={active != null} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default CardVertical;

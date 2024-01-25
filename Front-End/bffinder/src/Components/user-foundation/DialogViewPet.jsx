import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import imgdefault from "imgs/logo-bffinder.png";
import FormAddPet from "../post/FormAddPet";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import Swal from 'sweetalert2';
import { start } from "@popperjs/core";
import { startDeletePet } from "../../store/pet";

const DialogViewPet = ({ open, onClose }) => {
  const [editing, setEditing] = useState(false);
  const { active: pet } = useSelector((state) => state.pets);

  

  console.log("pet del dialog: ", pet);
  const renderInformationSection = () => (
    <>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ margin: "1rem", borderRadius: "" }}
      >
        <Divider variant="middle" sx={{ marginTop: 1, marginBottom: 2 }}>
          Caracteristicas
        </Divider>
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
        >
          <Grid item xs={6} sx={{ textAlign: "justify" }}>
            <Typography sx={{ margin: ".2rem" }}>
              {t(`species.${pet.breedDetails.specie.name}`)} -{" "}
              {t(`breeds.${pet.breedDetails.name}`)}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Genero: {t(`genders.${pet.gender}`)}{" "}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Caracter: {t(`dangerous.${pet.dangerous}`)}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "justify" }}>
            <Typography sx={{ margin: ".2rem" }}>
              Tamaño: {t(`sizes.${pet.size}`)}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Peso: {pet.weight} kg
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Edad:{" "}
              {pet.age === 1
                ? `${pet.age} año`
                : pet.age === 0
                  ? "Menos de un año"
                  : `${pet.age} años`}
            </Typography>
          </Grid>
        </Grid>
        <Divider
          variant="middle"
          sx={{ marginTop: 1, marginBottom: 2 }}
        ></Divider>
      </Paper>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{ margin: "1rem", borderRadius: "" }}
      >
        <Divider variant="middle" sx={{ marginTop: 1, marginBottom: 2 }}>
          Salud
        </Divider>
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", justifyContent: "left", margin: "1rem" }}
        >
          <Grid item xs={6} sx={{ textAlign: "justify" }}>
            <Typography sx={{ margin: ".2rem" }}>
              Vacunado:{" "}
              {pet.vaccinated ? (
                <CheckIcon color="success" sx={{ fontSize: 15 }} />
              ) : (
                <CloseIcon color="error" sx={{ fontSize: 15 }} />
              )}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Esterilizado:{" "}
              {pet.sterilized ? (
                <CheckIcon color="success" sx={{ fontSize: 15 }} />
              ) : (
                <CloseIcon color="error" sx={{ fontSize: 15 }} />
              )}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Desparasitado:{" "}
              {pet.dewormed ? (
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
    </>
  );

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleDeletePet = () => {
    Swal.fire({
      title: `¿Estás seguro de eliminar a ${pet.name}?`,
      text: `No podrás recuperar la informacion de tu mascota!`,
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      didOpen: () => {
        // Ajusta el z-index del contenedor de Sweet Alert
        const sweetAlertContainer = document.querySelector('.swal2-container');
        if (sweetAlertContainer) {
          sweetAlertContainer.style.zIndex = '99999';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (pet.published) {
          Swal.fire({
            title: `${pet.name} tiene una publicacion actualmente ¿Eliminar de todas formas?`,
            text: `No podras recuperar la informacion de la publicacion!`,
            icon: 'question',
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            didOpen: () => {
              const sweetAlertContainer = document.querySelector('.swal2-container');
              if (sweetAlertContainer) {
                sweetAlertContainer.style.zIndex = '99999';
              }
            },
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(startDeletePet(pet.id));
            }
          })
        } else {
          dispatch(startDeletePet(pet.id));
        }
      }
    })
      ;
  };

  const handleSaveClick = () => {
    setEditing(false);
    // console.log("Datos guardados del edit:", formData);
  };

  const handleCancelClick = () => {
    setEditing(false);

  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "600",
        }}
      >
        {editing
          ? "Modificar información de la mascota"
          : "Información de la mascota"}
        <IconButton color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {editing ? (
          <FormAddPet />
        ) : (
          <>
            <Grid container spacing={2}>
              {/* <Grid container spacing={2} sx={{ height: "100vh" }}> */}
              <Grid item xs={12} md={5}>
                <div style={{ width: "100%", height: "300px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "400px",
                    }}
                  >
                    <img
                      src={pet.profileImageUrl ? pet.profileImageUrl : imgdefault}
                      alt=""
                      height="auto"
                    // height="400px"
                    // style={{ width: "auto" }}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ margin: ".8rem" }}>
                      {pet.name}
                    </Typography>
                    {renderInformationSection()}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {/* <Button variant="contained" color="info">Editar</Button>
        <Button variant="contained" color="success">Guardar Cambios</Button>
        <Button variant="contained" color="error">Borrar mascota</Button> */}
        {editing ? (
          <>
            {/* <Button variant="contained" color="success" onClick={handleSaveClick}>
              Guardar Cambios
            </Button> */}
            <Button
              variant="contained"
              color="warning"
              onClick={handleCancelClick}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="error" onClick={handleDeletePet}>
              ELiminar
            </Button>
            <Button variant="contained" color="info" onClick={handleEditClick}>
              Editar
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogViewPet;

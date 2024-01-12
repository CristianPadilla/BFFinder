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
import imgdefault from "imgs/logo-bffinder.png";
import FormAddPet from "../post/FormAddPet";
import { useDispatch, useSelector } from "react-redux";

const DialogViewPet = ({ open, onClose }) => {
  const [profileImageUrl] = useState("");
  const [editing, setEditing] = useState(false);
  const { active: pet } = useSelector((state) => state.pets);

  const renderInformationSection = () => (
    <>
      {console.log("petXX: ", pet)}
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
            {/* <Typography sx={{ margin: '.2rem'}}>{breedDetails.specie.name} / {breedDetails.name}</Typography>
      <Typography sx={{ margin: '.2rem'}}>Genero: {gender}</Typography> */}
            <Typography sx={{ margin: ".2rem" }}>iD {pet.id}</Typography>
            <Typography sx={{ margin: ".2rem" }}>Especie / Raza</Typography>
            <Typography sx={{ margin: ".2rem" }}>Genero: Macho</Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Caracter: {"dangerous"}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "justify" }}>
            <Typography sx={{ margin: ".2rem" }}>Tamaño: {"size"}</Typography>
            <Typography sx={{ margin: ".2rem" }}>Peso: {"weight"}</Typography>
            <Typography sx={{ margin: ".2rem" }}>Edad: {"age"}</Typography>
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
              Vacunado: {"vaccinated"}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Esterilizado: {"sterilized"}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Desparasitado: {"dewormed"}
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

  const handleSaveClick = () => {
    setEditing(false);
    // console.log("Datos guardados del edit:", formData);
    // Puedes realizar acciones de guardado aquí si es necesario
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Puedes realizar acciones de cancelación aquí si es necesario
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
                      src={profileImageUrl ? profileImageUrl : imgdefault}
                      alt=""
                      height="400px"
                      style={{ width: "auto" }}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ margin: ".8rem" }}>
                      {name}
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
              color="error"
              onClick={handleCancelClick}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button variant="contained" color="info" onClick={handleEditClick}>
            Editar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogViewPet;

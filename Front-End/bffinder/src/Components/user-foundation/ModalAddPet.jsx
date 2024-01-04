import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Divider,
  IconButton,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../form/TextInputComponent";
import SelecInputComponent from "../form/SelectInputComponent";
import RadioGroupComponent from "../form/RadioGroupComponent";
import CloseIcon from "@mui/icons-material/Close";
import DragandDrop from "../form/DragandDrop";

const formFields = {
  name: "",
  specie: "",
  breed: "",
  weight: "",
  size: "",
  dangerous: "",
  gender: "",
  age: "",
  vaccinated: "",
  sterilized: "",
  dewormed: "",
};

const ModalAddPet = ({ open, onClose, onAdd }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSpecieChange = (newValue) => {
    setSpecie(newValue); // Asegúrate de que estás actualizando el estado correctamente
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "600",
        }}
      >
        Agregar mascota
        <IconButton color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DragandDrop />
          </Grid>

          <Grid item xs={6}>
            <Formik
              initialValues={formFields}
              // onSubmit={handleRegistration}
              validationSchema={Yup.object({
                name: Yup.string()
                  .min(3, "El nombre debe tener al menos 3 caracteres")
                  .max(20, "El nombre debe tener 20 caracteres o menos")
                  .required("El nombre es obligatorio"),
                specie: Yup.string()
                  .oneOf(
                    [
                      "Perros",
                      "Gatos",
                      "Hamsters y Ratas",
                      "Aves",
                      "Peces",
                      "Gallinas",
                    ],
                    "Por favor, selecciona una especie válida"
                  )
                  .required("La especie es obligatoria"),
                breed: Yup.string().required("La raza es obligatoria"),
                size: Yup.string().required("El tamaño es obligatorio"),
                age: Yup.string().required("La edad es obligatoria"),
                weight: Yup.number()
                  .min(2, "El peso debe tener al menos 2 caracteres")
                  .max(3, "El peso debe tener 3 o 2 caracteres ")
                  .typeError("Ingresa un valor numérico")
                  .positive("El peso debe ser un número positivo")
                  .integer("El peso debe ser un número entero")
                  .required("El peso es obligatorio"),
              })}
            >
              {(formik) => (
                <Form>
                  {formik.errors.general && (
                    <div className="error-message">{formik.errors.general}</div>
                  )}
                  {console.log(formik.values)}
                  <Divider>Caracteristicas</Divider>
                  <TextInputComponent
                    required
                    type="text"
                    label="Nombre de la mascota"
                    name="name"
                    placeholder="Fundacion animalitos del mundo"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <SelecInputComponent
                    required
                    label="Selecciona la especie"
                    name="specie"
                    onChange={handleSpecieChange}
                    value={formik.values.specie}
                    options={[
                      { label: "Perro", value: "dog" },
                      { label: "Gato", value: "cat" },
                      { label: "Hamsters y Ratas", value: "otro" },
                      { label: "Aves", value: "otro" },
                      { label: "Peces", value: "otro" },
                      { label: "Gallinas", value: "otro" },
                    ]}
                  />
                  <SelecInputComponent
                    required
                    label="Raza"
                    name="breed"
                    onChange={handleSpecieChange}
                    value={formik.values.breed}
                    options={[
                      { label: "Pitbull", value: "pitbull" },
                      { label: "Siamese", value: "siamese" },
                    ]}
                  />
                  <FormControl
                    sx={{ width: "27ch" }}
                    margin="normal"
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-weight" required>
                      Peso
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      label="Peso"
                      endAdornment={
                        <InputAdornment position="end">kg</InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                  <SelecInputComponent
                    required
                    label="Tamaño"
                    name="size"
                    onChange={handleSpecieChange}
                    value={formik.values.size}
                    options={[
                      { label: "Grande", value: "grande" },
                      { label: "Mediano", value: "mediano" },
                      { label: "Pequeño", value: "pequeño" },
                    ]}
                  />
                  <RadioGroupComponent
                    row
                    label="Caracter"
                    name="dangerous"
                    value={formik.values.dangerous}
                    onChange={formik.handleChange}
                    options={[
                      { label: "Peligroso", value: true },
                      { label: "No peligroso", value: false },
                    ]}
                  />
                  <RadioGroupComponent
                    row
                    label="Género"
                    name="gender"
                    value={formik.values.gender || ""}
                    // value={gender}
                    // onChange={handleGenderChange}
                    onChange={(event) => {
                      formik.handleChange(event);
                      setGender(event.target.value);
                    }}
                    options={[
                      { label: "Macho", value: true },
                      { label: "Hembra", value: false },
                    ]}
                  />
                  <SelecInputComponent
                    required
                    label="Edad"
                    name="speciesAndBreed"
                    onChange={handleSpecieChange}
                    value={formik.values.age}
                    options={[
                      { label: "Menos de 1 año", value: "menos 1 año" },
                      { label: "2 años", value: "2 años" },
                      { label: "3 años", value: "3 años" },
                      { label: "4 años", value: "4 años" },
                      { label: "5 años", value: "5 años" },
                      { label: "6 años", value: "6 años" },
                      { label: "7 años", value: "7 años" },
                      { label: "8 años", value: "8 años" },
                      { label: "9 años", value: "9 años" },
                      { label: "10 años", value: "10 años" },
                      { label: "Mas de 10 años", value: "mas de 10 años" },
                    ]}
                  />
                  <Divider />

                  <Divider>Salud</Divider>
                  <RadioGroupComponent
                    row
                    label="Vacunado"
                    name="vaccinated"
                    value={formik.values.vaccinated}
                    onChange={formik.handleChange}
                    options={[
                      { label: "Si", value: true },
                      { label: "No", value: false },
                    ]}
                  />
                  <RadioGroupComponent
                    row
                    label="Esterilizado"
                    name="sterilized"
                    value={formik.values.sterilized}
                    onChange={formik.handleChange}
                    options={[
                      { label: "Si", value: true },
                      { label: "No", value: false },
                    ]}
                  />
                  <RadioGroupComponent
                    row
                    label="Desparasitado"
                    name="dewormed"
                    value={formik.values.dewormed}
                    onChange={formik.handleChange}
                    options={[
                      { label: "Si", value: true },
                      { label: "No", value: false },
                    ]}
                  />
                  <Divider></Divider>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={onAdd}
        >
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddPet;

import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Divider,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../form/TextInputComponent";
import SelecInputComponent from "../form/SelectInputComponent";
import RadioGroupComponent from "../form/RadioGroupComponent";
import DragandDrop from "../form/DragandDrop";

const formFields = {
  name: "",
  specie: null,
  breed: null,
  size: null,
  weight: "",
  age: null,
  gender: "",
  dangerous: "",
  vaccinated: "",
  sterilized: "",
  dewormed: "",
  image: null,
};

const FormAddPet = () => {
  const speciesIds = [1, 2, 3, 4, 5, 6];
  const genderOptions = [
    { label: "Macho", value: "m" },
    { label: "Hembra", value: "f" },
  ];

  return (
    <>
      <Grid container spacing={2}>
        {/* <Grid container spacing={2} sx={{ height: "100vh" }}> */}
        <Formik
          initialValues={formFields}
          // onSubmit={handleRegistration}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "El nombre debe tener al menos 3 caracteres")
              .max(20, "El nombre debe tener 20 caracteres o menos")
              .required("El nombre es obligatorio"),
            specie: Yup.number()
              .oneOf(speciesIds, "Por favor, selecciona una especie válida")
              .required("La especie es obligatoria"),
            breed: Yup.number()
            .oneOf(speciesIds, "Por favor, selecciona una especie válida")
              .required("La raza es obligatoria"),
            size: Yup.number()
            .oneOf(speciesIds, "Por favor, selecciona una especie válida")
              .required("El tamaño es obligatorio"),
            age: Yup.number()
            .oneOf(speciesIds, "Por favor, selecciona una especie válida")
              .required("La edad es obligatoria"),
            weight: Yup.number()
              .min(0, "El peso debe ser un número positivo")
              .max(500, "El peso no puede ser mayor a 500 kg")
              .typeError("Ingresa un valor numérico")
              .positive("El peso debe ser un número positivo")
              .required("El peso es obligatorio"),
            gender: Yup.string().required("El género es obligatorio"),
            dangerous: Yup.boolean().required("El caracter es obligatorio"),
            vaccinated: Yup.boolean().required("Vacunado es obligatorio"),
            sterilized: Yup.boolean().required("Esterilizado es obligatorio"),
            dewormed: Yup.boolean().required("Desparasitado es obligatorio"),
            image: Yup.mixed()
              .test("fileFormat", "Formato de imagen no permitido", (value) => {
                if (!value || !value.type) return true;

                const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
                const fileType = value.type.toLowerCase();

                return allowedFormats.includes(fileType);
              })
              .required("La imagen es obligatoria"),
          })}
        >
          {(formik) => (
            <>
              <Grid item xs={12} md={5}>
                <div style={{ width: "100%", height: "300px" }}>
                  <DragandDrop name="image" errorClassName="error-message" />
                  {/* <Typography variant="h6" color="error" textAlign={"center"}>
                    {formik.errors.image}
                  </Typography> */}
                </div>
              </Grid>

              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Form>
                      {formik.errors.general && (
                        <div className="error-message">
                          {formik.errors.general}
                        </div>
                      )}
                      <Paper
                        elevation={0}
                        variant="outlined"
                        sx={{
                          margin: ".5rem",
                          padding: ".8rem .8rem .8rem .8rem",
                          borderRadius: "",
                          alignItems: "center",
                        }}
                      >
                        <Divider
                          variant="middle"
                          sx={{ marginTop: 1, marginBottom: 2 }}
                          flexItem
                        >
                          Caracteristicas
                        </Divider>

                        <Grid
                          container
                          spacing={1}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Grid item xs={6} sx={{ textAlign: "center" }}>
                            <TextInputComponent
                              label="Nombre de la mascota*"
                              type="text"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              sx={{ width: "27ch" }}
                              // helperText={formik.errors.name}
                            />
                            <SelecInputComponent
                              label="Seleccione la especie*"
                              name="specie"
                              onChange={formik.handleChange}
                              value={formik.values.specie}
                              options={[
                                { label: "Perro", value: 6 },
                                { label: "Gato", value: 5 },
                                { label: "Hamsters y Ratas", value: 3 },
                                { label: "Aves", value: 1 },
                                { label: "Peces", value: 2 },
                                { label: "Gallinas", value: 4 },
                              ]}
                            />
                            <SelecInputComponent
                              label="Seleccione la raza*"
                              name="breed"
                              onChange={formik.handleChange}
                              value={formik.values.breed}
                              options={[
                                { label: "Pitbull", value: 1 },
                                { label: "Siamese", value: 2 },
                              ]}
                            />
                            <RadioGroupComponent
                              row
                              label="Género*"
                              name="gender"
                              value={formik.values.gender}
                              onChange={formik.handleChange}
                              options={genderOptions}
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ textAlign: "center" }}>
                            <SelecInputComponent
                              label="Seleccione el tamaño*"
                              name="size"
                              onChange={formik.handleChange}
                              value={formik.values.size}
                              options={[
                                { label: "Grande", value: 1 },
                                { label: "Mediano", value: 2 },
                                { label: "Pequeño", value: 3 },
                              ]}
                            />
                            <TextInputComponent
                              type="number"
                              label="Peso*"
                              name="weight"
                              value={formik.values.weight}
                              onChange={formik.handleChange}
                              // helperText={formik.errors.weight}
                              endAdornment={
                                <InputAdornment position="end">
                                  kg
                                </InputAdornment>
                              }
                              sx={{ width: "27ch" }}
                            />
                            <SelecInputComponent
                              label="Seleccione la edad*"
                              name="age"
                              onChange={formik.handleChange}
                              value={formik.values.age}
                              options={[
                                {
                                  label: "Menos de 1 año",
                                  value: 1,
                                },
                                { label: "2 años", value: 2 },
                                { label: "3 años", value: 3 },
                                { label: "4 años", value: 4 },
                                { label: "5 años", value: 5 },
                                { label: "6 años", value: 6 },
                                { label: "7 años", value: 7 },
                                { label: "8 años", value: 8 },
                                { label: "9 años", value: 9 },
                                { label: "10 años", value: 10 },
                                {
                                  label: "Mas de 10 años",
                                  value: 11,
                                },
                              ]}
                            />  
                            <RadioGroupComponent
                              row
                              label="Caracter*"
                              name="dangerous"
                              value={formik.values.dangerous}
                              onChange={formik.handleChange}
                              options={[
                                { label: "Sociable", value: true },
                                { label: "Territorial", value: false },
                              ]}
                            />
                          </Grid>
                        </Grid>
                        <Divider
                          variant="middle"
                          sx={{ marginTop: 1, marginBottom: 2 }}
                          flexItem
                        ></Divider>

                        <Divider
                          variant="middle"
                          sx={{ marginTop: 1, marginBottom: 2 }}
                          flexItem
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
                          <Grid item xs={6} sx={{ textAlign: "center" }}>
                            <RadioGroupComponent
                              row
                              label="Vacunado*"
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
                              label="Esterilizado*"
                              name="sterilized"
                              value={formik.values.sterilized}
                              onChange={formik.handleChange}
                              options={[
                                { label: "Si", value: true },
                                { label: "No", value: false },
                              ]}
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ textAlign: "center" }}>
                            <RadioGroupComponent
                              row
                              label="Desparasitado*"
                              name="dewormed"
                              value={formik.values.dewormed}
                              onChange={formik.handleChange}
                              options={[
                                { label: "Si", value: true },
                                { label: "No", value: false },
                              ]}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                      <Button variant="contained" type="submit" color="success">
                        Guardar Cambios
                      </Button>
                    </Form>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Formik>
      </Grid>
    </>
  );
};

export default FormAddPet;

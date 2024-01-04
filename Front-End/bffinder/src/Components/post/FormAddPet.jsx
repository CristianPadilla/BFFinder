import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../form/TextInputComponent";
import SelecInputComponent from "../form/SelectInputComponent";
import RadioGroupComponent from "../form/RadioGroupComponent";
import DragandDrop from "../form/DragandDrop";

const formFields = {
  petName: "",
  specie: "",
  breed: "",
  size: "",
  weight: "13",
  age: "",
  gender: "",
  dangerous: "",
  vaccinated: "",
  sterilized: "",
  dewormed: "",
};

const FormAddPet = () => {
  const speciesIds = [1, 2, 3, 4];
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
            petName: Yup.string()
              .min(3, "El nombre debe tener al menos 3 caracteres")
              .max(20, "El nombre debe tener 20 caracteres o menos")
              .required("El nombre es obligatorio"),
            specie: Yup.string()
              .oneOf(speciesIds, "Por favor, selecciona una especie válida")
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
            gender: Yup.string().required("El género es obligatorio"),
            dangerous: Yup.boolean().required("El campo es obligatorio"),
            vaccinated: Yup.boolean().required("El campo es obligatorio"),
            sterilized: Yup.boolean().required("El campo es obligatorio"),
            dewormed: Yup.boolean().required("El campo es obligatorio"),
          })}
        >
          {(formik) => (
            <>
              <Grid item xs={12} md={5}>
                <div style={{ width: "100%", height: "300px" }}>
                  <DragandDrop />
                </div>
              </Grid>

              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      variant="outlined"
                      sx={{
                        margin: "1rem",
                        borderRadius: "",
                        alignItems: "center",
                      }}
                    >
                      <Form>
                        {formik.errors.general && (
                          <div className="error-message">
                            {formik.errors.general}
                          </div>
                        )}
                        {console.log("Valores de formik:", formik.values)}
                        {console.log(
                          "Valor de formik.values.gender:",
                          formik.values.gender
                        )}
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
                            <TextInputComponent
                              type="text"
                              label="Nombre de la mascota"
                              name="petName"
                              value={formik.values.petName}
                              onChange={formik.handleChange}
                            />
                            <SelecInputComponent
                              label="Especie"
                              name="specie"
                              onChange={formik.handleChange}
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
                              label="Raza"
                              name="breed"
                              onChange={formik.handleChange}
                              value={formik.values.breed}
                              options={[
                                { label: "Pitbull", value: "pitbull" },
                                { label: "Siamese", value: "siamese" },
                              ]}
                            />
                            <RadioGroupComponent
                              row
                              label="Género"
                              name="gender"
                              value={formik.values.gender}
                              onChange={formik.handleChange}
                              options={genderOptions}
                              // className="tu-clase"
                              // errorClassName="tu-clase-de-error"
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ textAlign: "justify" }}>
                            <SelecInputComponent
                              label="Tamaño"
                              name="size"
                              onChange={formik.handleChange}
                              value={formik.values.size}
                              options={[
                                { label: "Grande", value: "grande" },
                                { label: "Mediano", value: "mediano" },
                                { label: "Pequeño", value: "pequeño" },
                              ]}
                            />
                            <TextInputComponent
                    
                      type="number"
                      label="Peso"
                      name="weight"
                      value={formik.values.weight}
                      onChange={formik.handleChange}
                      endAdornment={
                        <InputAdornment position="end">kg</InputAdornment>
                      }
                    />
                            {/* <FormControl
                              sx={{ width: "27ch" }}
                              margin="normal"
                              variant="outlined"
                            >
                              <InputLabel htmlFor="outlined-adornment-weight">
                                Peso
                              </InputLabel>
                              <OutlinedInput
                                value={formik.values.weight}
                                // onChange={formik.handleChange}
                                onChange={formik.handleChange}
                                // id="outlined-adornment-weight"
                                type="number"
                                name="weight"
                                label="Peso"
                                endAdornment={
                                  <InputAdornment position="end">
                                    kg
                                  </InputAdornment>
                                }
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                  "aria-label": "weight",
                                }}
                              />
                            </FormControl> */}
                            <SelecInputComponent
                              label="Edad"
                              name="speciesAndBreed"
                              onChange={formik.handleChange}
                              value={formik.values.age}
                              options={[
                                {
                                  label: "Menos de 1 año",
                                  value: "menos 1 año",
                                },
                                { label: "2 años", value: "2 años" },
                                { label: "3 años", value: "3 años" },
                                { label: "4 años", value: "4 años" },
                                { label: "5 años", value: "5 años" },
                                { label: "6 años", value: "6 años" },
                                { label: "7 años", value: "7 años" },
                                { label: "8 años", value: "8 años" },
                                { label: "9 años", value: "9 años" },
                                { label: "10 años", value: "10 años" },
                                {
                                  label: "Mas de 10 año",
                                  value: "mas de 10 años",
                                },
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
                          </Grid>
                        </Grid>
                        <Divider
                          variant="middle"
                          sx={{ marginTop: 1, marginBottom: 2 }}
                        ></Divider>

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
                          </Grid>
                          <Grid item xs={6} sx={{ textAlign: "justify" }}>
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
                          </Grid>
                        </Grid>
                        <Button
                          variant="contained"
                          type="submit"
                          color="success"
                        >
                          Guardar Cambios
                        </Button>
                      </Form>
                    </Paper>
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

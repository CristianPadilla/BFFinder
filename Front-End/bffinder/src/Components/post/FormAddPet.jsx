import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, Divider, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../form/TextInputComponent";
import RadioGroupComponent from "../form/RadioGroupComponent";
import DragandDrop from "../form/DragandDrop";
import SelectInputComponent from "../form/SelectInputComponent";
import { useDispatch, useSelector } from "react-redux";
import { getBreedsBySpecieId, getSpecies } from "../../store/global";
import { t } from "i18next";
import { startAddNewPet, startUpdatePet } from "../../store/pet";
import ProgressCircular from "../../containers/Loaders/ProgressCircular";

const FormAddPet = () => {
  const dispatch = useDispatch();
  const { active: pet, isSaving } = useSelector((state) => state.pets);
  const { contentLoading } = useSelector((state) => state.persisted.global);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);

  const speciesOptions = species.map((specie) => {
    return { label: t(`species.${specie.name}`), value: specie.id };
  });
  const breedsOptions = breeds.map((breed) => {
    return { label: t(`breeds.${breed.name}`), value: breed.id };
  });
  const sizeOptions = [
    { label: "Grande", value: "l" },
    { label: "Mediano", value: "m" },
    { label: "Pequeño", value: "s" },
  ];
  const genderOptions = [
    { label: "Macho", value: "m" },
    { label: "Hembra", value: "f" },
  ];

  useEffect(async () => {
    // console.log('useEffect==  : ', pet);
    const data = await dispatch(getSpecies());
    setSpecies(data);
    if (pet != null) {
      const breeds = await dispatch(
        getBreedsBySpecieId(pet.breedDetails.specie.id)
      );
      setBreeds(breeds);
    }
  }, []);

  const handleSpecieSelectChange = async (specieId) => {
    // console.log('handleSpecieSelectChange==  : ', specieOption);
    if (typeof specieId === "number" && specieId > 0) {
      const breeds = await dispatch(getBreedsBySpecieId(specieId));
      setBreeds(breeds);
    } else setBreeds([]);
  };

  const handleSubmit = (values) => {
    // console.log("handleSubmit==  : ", values);
    const petToSave = {
      id: pet != null ? pet.id : null,
      name: values.name,
      weight: values.weight,
      age: values.age.value,
      dangerous: values.dangerous,
      size: values.size.value,
      gender: values.gender,
      breedId: values.breed.value,
      vaccinated: values.vaccinated,
      sterilized: values.sterilized,
      dewormed: values.dewormed,
      image: values.image,
    };

    if (pet != null) {
      dispatch(startUpdatePet(petToSave));
    } else {
      dispatch(startAddNewPet(petToSave));
    }
  };

  const initialValues =
    pet != null
      ? {
          id: pet.id,
          name: pet.name,
          weight: pet.weight,
          age: {
            label: pet.age === 1 ? `hasta ${pet.age} año` : `${pet.age} años`,
            value: pet.age,
          },
          dangerous: pet.dangerous,
          size: { label: t(`sizes.${pet.size}`), value: pet.size },
          gender: pet.gender,
          breed: {
            label: t(`breeds.${pet.breedDetails.name}`),
            value: pet.breedDetails.id,
          },
          specie: {
            label: t(`species.${pet.breedDetails.specie.name}`),
            value: pet.breedDetails.specie.id,
          },
          vaccinated: pet.vaccinated,
          sterilized: pet.sterilized,
          dewormed: pet.dewormed,
          image: null,
        }
      : {
          id: null,
          name: "",
          weight: "",
          age: { label: "", value: null },
          dangerous: "",
          size: { label: "", value: null },
          gender: "",
          breed: { label: "", value: null },
          specie: { label: "", value: null },
          vaccinated: "",
          sterilized: "",
          dewormed: "",
          image: null,
        };
  return (
    isSaving
      ?<ProgressCircular />
      :
    <>

      <Grid container spacing={2}>
        {/* <Grid container spacing={2} sx={{ height: "100vh" }}> */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "El nombre debe tener al menos 3 caracteres")
              .max(15, "Sólo se permiten 15 carácteres")
              .required("El nombre es requerido"),
            specie: Yup.object().shape({
              value: Yup.number().required("Selecciona una especie válida"),
            }),
            breed: Yup.object().shape({
              value: Yup.number().required("Selecciona una raza válida"),
            }),
            size: Yup.object().shape({
              value: Yup.string().required(
                "Por favor especifica el tamaño del animal"
              ),
            }),
            age: Yup.object().shape({
              value: Yup.number()
                .required("Por favor especifica la edad del animalito")
                .min(1, "Por favor especifica la edad del animalito")
                .max(22, "Por favor especifica la edad del animalito"),
            }),
            weight: Yup.number()
              .min(0, "El peso debe ser un número positivo")
              .max(1000, "El peso del animal no debe superar los 1000 kg")
              .typeError("Digita un péso válido")
              .positive("El peso debe ser un número positivo")
              .required(
                "El peso ayuda a comprender el estado de salud y caracteristicas del animal"
              ),
            gender: Yup.string().required(
              "El género del animal es obligatorio"
            ),
            dangerous: Yup.boolean().required(
              "El caracter de la mascota ayuda a comprender su comportamiento"
            ),
            vaccinated: Yup.boolean().required(
              "Por favor define el estado de vacunación de la mascota"
            ),
            sterilized: Yup.boolean().required(
              "La esterilizacion permite conocer el estado de fertilidad de la mascota"
            ),
            dewormed: Yup.boolean().required(
              "El estado de desparacitacion de la mascota permite conocer su estado de salud"
            ),
            image: pet
              ? Yup.mixed()
                  .test(
                    "fileFormat",
                    "Formato de imagen no permitido",
                    (value) => {
                      if (!value || !value.type) return true;

                      const allowedFormats = [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                      ];
                      const fileType = value.type.toLowerCase();

                      return allowedFormats.includes(fileType);
                    }
                  )
                  .test(
                    "fileSize",
                    "La imagen es demasiado grande, el tamaño debe ser menor a 10MB",
                    (value) => {
                      if (!value || !value.size) return true;
                      const maxSizeInBytes = 1048576; // 1MB
                      return value.size <= maxSizeInBytes;
                    }
                  )
                  .notRequired()
              : Yup.mixed()
                  .test(
                    "fileFormat",
                    "Formato de imagen no permitido",
                    (value) => {
                      if (!value || !value.type) return true;
                      const allowedFormats = [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                      ];
                      const fileType = value.type.toLowerCase();

                      return allowedFormats.includes(fileType);
                    }
                  )
                  .test(
                    "fileSize",
                    "La imagen es demasiado grande, el tamaño debe ser menor a 10MB",
                    (value) => {
                      if (!value || !value.size) return true;
                      const maxSizeInBytes = 1048576; // 1MB
                      return value.size <= maxSizeInBytes;
                    }
                  )
                  .required("Por favor agrega una foto de perfil"),

            // Yup.mixed()
            //   .required(pet ? false : "Por favor agrega una foto de perfil")
            //   // .required("Por favor selecciona una imagen")
            //   .test("fileFormat", "Formato de imagen no permitido", (value) => {
            //     if (!value || !value.type) return true;

            //     const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
            //     const fileType = value.type.toLowerCase();

            //     return allowedFormats.includes(fileType);
            //   })
            //   .test(
            //     "fileSize",
            //     "La imagen es demasiado grande, el tamaño debe ser menor a 10MB",
            //     (value) => {
            //       if (!value || !value.size) return true;
            //       const maxSizeInBytes = 1048576; // 1MB
            //       return value.size <= maxSizeInBytes;
            //     }
            //   ),
            // // .notRequired(),
          })}
        >
          {(formik) => (
            <>
              <Grid item xs={12} md={5}>
                <div style={{ width: "100%", height: "300px" }}>
                  <DragandDrop
                    onBlur={formik.handleBlur}
                    name="image"
                    errorClassName="error-message"
                  />
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
                              label="Nombre de la mascota *"
                              type="text"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              sx={{ width: "27ch" }}
                            />
                            <SelectInputComponent
                              label="Especie / Grupo *"
                              name="specie"
                              errors={formik.errors.specie}
                              onBlur={formik.handleBlur}
                              value={formik.values.specie} // ESTOOOOOO
                              onChange={({ target }) => {
                                const specieOption = speciesOptions.find(
                                  (option) => option.value === target.value
                                );
                                handleSpecieSelectChange(target.value);
                                formik.setFieldValue("breed", {
                                  label: "",
                                  value: null,
                                });
                                formik.setFieldValue("specie", specieOption);
                              }}
                              clearIcon={false}
                              options={speciesOptions}
                            />
                            <SelectInputComponent
                              label="Raza / sub grupo *"
                              name="breed"
                              onChange={({ target }) => {
                                const breedOption = breedsOptions.find(
                                  (option) => option.value === target.value
                                );
                                formik.setFieldValue("breed", breedOption);
                              }}
                              options={breedsOptions}
                              onBlur={formik.handleBlur}
                              clearIcon={false}
                              value={formik.values.breed}
                            />
                            <RadioGroupComponent
                              row
                              label="Sexo *"
                              name="gender"
                              value={formik.values.gender}
                              onChange={formik.handleChange}
                              options={genderOptions}
                            />
                          </Grid>
                          <Grid item xs={6} sx={{ textAlign: "center" }}>
                            <SelectInputComponent
                              label="Tamaño *"
                              name="size"
                              value={formik.values.size}
                              options={sizeOptions}
                              onBlur={formik.handleBlur}
                              clearIcon={false}
                              onChange={({ target }) => {
                                const sizeOption = sizeOptions.find(
                                  (option) => option.value === target.value
                                );
                                formik.setFieldValue("size", sizeOption);
                              }}
                            />
                            <TextInputComponent
                              type="number"
                              label="Peso *"
                              name="weight"
                              value={formik.values.weight}
                              onChange={(event) => {
                                let value = parseFloat(event.target.value);
                                value = Math.floor(value * 10) / 10;
                                if (value.toString().length > 5) {
                                  value = parseFloat(
                                    value.toString().substring(0, 5)
                                  );
                                }
                                formik.setFieldValue("weight", value);
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  kg
                                </InputAdornment>
                              }
                              sx={{ width: "27ch" }}
                            />

                            <SelectInputComponent
                              label="Edad *"
                              name="age"
                              onBlur={formik.handleBlur}
                              clearIcon={false}
                              onChange={({ target }) => {
                                const ageValue = target.value;
                                const ageOption = {
                                  label:
                                    ageValue === 1
                                      ? `hasta ${ageValue} año`
                                      : `${ageValue} años`,
                                  value: ageValue,
                                };
                                formik.setFieldValue("age", ageOption);
                              }}
                              value={formik.values.age}
                              options={[...Array(20).keys()].map((i) => {
                                return {
                                  label:
                                    i + 1 === 1
                                      ? `hasta ${i + 1} año`
                                      : `${i + 1} años`,
                                  value: i + 1,
                                };
                              })}
                            />

                            <RadioGroupComponent
                              row
                              label="Caracter*"
                              name="dangerous"
                              value={formik.values.dangerous}
                              onChange={formik.handleChange}
                              options={[
                                { label: "Sociable", value: false },
                                { label: "Territorial", value: true },
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
                        {pet ? "Guardar Cambios" : "Guardar Mascota"}
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

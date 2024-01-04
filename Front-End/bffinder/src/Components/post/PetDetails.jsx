import React, { useState } from "react";
import {
  Paper,
  Divider,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormGroup,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../form/TextInputComponent";
import SelecInputComponent from "../form/SelectInputComponent";
import RadioGroupComponent from "../form/RadioGroupComponent";

const formFields = {
  name: "",
  specie: "",
  breed: "",
  size: "",
  weight: "",
  age: "",
  gender: "",
  dangerous: "",
  vaccinated: "",
  sterilized: "",
  dewormed: "",
};

const PetDetails = ({ editing }) => {
  const [name, setName] = useState("Name~");
  const [breed, setBreed] = useState("Pitbull");
  const [specie, setSpecie] = useState("Perro");
  const [gender, setGender] = useState("Macho");
  const [dangerous, setDangerous] = useState("Territorial");
  const [size, setSize] = useState("Mediano");
  const [weight, setWeight] = useState("15");
  const [age, setAge] = useState("Menos de 1 año");
  const [vaccinated, setVaccinated] = useState("Si");
  const [sterilized, setSterilized] = useState("Si");
  const [dewormed, setDewormed] = useState("Si");
  
  // const handleGenderChange = (event) => {
  //   // setGender(event.target.value);
  //   console.log("handleChangeGender se activó:", event);
  //   formik.handleChange(event); // Asegúrate de propagar el cambio al objeto de formik
  // };

  const handleSpecieChange = (newValue) => {
    setSpecie(newValue); // Asegúrate de que estás actualizando el estado correctamente
  };
  // const [editing, setEditing] = useState(false);
  const genderOptions = [
    { label: "Macho", value: true },
    { label: "Hembra", value: false },
  ];

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
            {/* <Typography sx={{ margin: '.2rem'}}>{breedDetails.specie.name} / {breedDetails.name}</Typography>
      <Typography sx={{ margin: '.2rem'}}>Genero: {gender}</Typography> */}
            <Typography sx={{ margin: ".2rem" }}>Especie / Raza</Typography>
            <Typography sx={{ margin: ".2rem" }}>Genero: Macho</Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Caracter: {dangerous}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "justify" }}>
            <Typography sx={{ margin: ".2rem" }}>Tamaño: {size}</Typography>
            <Typography sx={{ margin: ".2rem" }}>Peso: {weight}</Typography>
            <Typography sx={{ margin: ".2rem" }}>Edad: {age}</Typography>
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
              Vacunado: {vaccinated}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Esterilizado: {sterilized}
            </Typography>
            <Typography sx={{ margin: ".2rem" }}>
              Desparasitado: {dewormed}
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

  const renderEditableFormSection = () => (
    <>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ margin: "1rem", borderRadius: "" }}
      >
        <Formik
          initialValues={formFields}
          // onSubmit={handleRegistration}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "El nombre debe tener al menos 3 caracteres")
              .max(20, "El nombre debe tener 20 caracteres o menos")
              .required("El nombre es obligatorio"),
              specie: Yup.string()
              .oneOf(['Perros', 'Gatos', 'Hamsters y Ratas', 'Aves', 'Peces', 'Gallinas'], 'Por favor, selecciona una especie válida')
              .required('La especie es obligatoria'),
              breed: Yup.string().required('La raza es obligatoria'),
              size: Yup.string().required('El tamaño es obligatorio'),
              age: Yup.string().required('La edad es obligatoria'),
              weight: Yup.number()
              .min(2, "El peso debe tener al menos 2 caracteres")
              .max(3, "El peso debe tener 3 o 2 caracteres ")
              .typeError('Ingresa un valor numérico')
              .positive('El peso debe ser un número positivo')
              .integer('El peso debe ser un número entero')
              .required("El peso es obligatorio"),              
          })}
        >
          {(formik) => (
            <Form>
              {formik.errors.general && (
                <div className="error-message">{formik.errors.general}</div>
              )}
              {console.log("Valores de formik:", formik.values)}
              {console.log("Valor de formik.values.gender:", formik.values.gender)}
              <Divider variant="middle" sx={{ marginTop: 1, marginBottom: 2 }}>
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
                    required
                    type="text"
                    label="Nombre de la mascota"
                    name="name"
                    value={name}
                    onChange={formik.handleChange}
                  />
                  <SelecInputComponent
                    required
                    label="Especie"
                    name="specie"
                    onChange={handleSpecieChange}
                    value={specie}
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
                    value={breed}
                    options={[
                      { label: "Pitbull", value: "pitbull" },
                      { label: "Siamese", value: "siamese" },
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
                    options={genderOptions}
                    // className="tu-clase"
                    // errorClassName="tu-clase-de-error"
                  />
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "justify" }}>
                  <SelecInputComponent
                    required
                    label="Tamaño"
                    name="size"
                    onChange={handleSpecieChange}
                    value={size}
                    options={[
                      { label: "Grande", value: "grande" },
                      { label: "Mediano", value: "mediano" },
                      { label: "Pequeño", value: "pequeño" },
                    ]}
                  />
                  {/* <TextInputComponent
                    required
                    type="text"
                    label="Peso"
                    name="weight"
                    value={weight}
                    onChange={formik.handleChange}
                    // endAdornment={
                    //   <InputAdornment position="end">kg</InputAdornment>
                    // }
                  /> */}
                   <FormControl
                    sx={{ width: "27ch" }}
                    margin="normal"
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-weight" required >Peso</InputLabel>
                    <OutlinedInput
                      value={weight}
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
                    label="Edad"
                    name="speciesAndBreed"
                    onChange={handleSpecieChange}
                    value={age}
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
            </Form>
          )}
        </Formik>
      </Paper>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{ margin: "1rem", borderRadius: "" }}
      >
        <Formik
          initialValues={formFields}
          // onSubmit={handleRegistration}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "El nombre debe tener al menos 3 caracteres")
              .max(20, "El nombre debe tener 20 caracteres o menos")
              .required("El nombre es obligatorio"),
          })}
        >
          {(formik) => (
            <Form>
              {formik.errors.general && (
                <div className="error-message">{formik.errors.general}</div>
              )}
              {console.log(formik.values)}
              <Divider variant="middle" sx={{ marginTop: 1, marginBottom: 2 }}>
                Salud
              </Divider>
              <Grid
                container
                spacing={1}
                sx={{ display: "flex", justifyContent: "left", margin: "1rem" }}
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

              <Divider
                variant="middle"
                sx={{ marginTop: 1, marginBottom: 2 }}
              ></Divider>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
  return (
    <>{editing ? renderEditableFormSection() : renderInformationSection()}
    
    </>
  );
};

export default PetDetails;

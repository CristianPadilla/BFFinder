import React, { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import imgdefault from "imgs/logo-bffinder.png";
import GroupDragandDrop from "../form/GroupDragandDrop";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../form/TextInputComponent";
import SelecInputComponent from "../form/SelectInputComponent";
import SlidersImages from "../post/SlidersImages";
import CardInfoPet from "./CardInfoPet";

const formFields = {
  description: "",
  pet: "",
  image: null,
};

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const FormAddPost = () => {
  const [profileImageUrl] = useState("");
  const [editing, setEditing] = useState(false);

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
    <Formik
      initialValues={formFields}
      // onSubmit={handleRegistration}
      validationSchema={Yup.object({
        description: Yup.string()
          .required("La descripción es obligatorio"),
        pet: Yup.number()
          // .oneOf(speciesIds, "Por favor, selecciona una especie válida")
          .required("La seleccion de una mascota es obligatoria"),
        image: Yup.mixed()
          .test("fileFormat", "Formato de imagen no permitido", (value) => {
            if (!value || !value.type) return true;

            const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
            const fileType = value.type.toLowerCase();

            return allowedFormats.includes(fileType);
          })
          .required("Las imagenes son obligatorias"),
      })}
    >
      {(formik) => (
        <Form>
          {formik.errors.general && (
            <div className="error-message">{formik.errors.general}</div>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <SlidersImages
                images={images}
                showBullets={false}
                showNav={false}
                showPlayButton={false}
                thumbnailPosition={"left"}
              /> */}
              <GroupDragandDrop name="image" />
            </Grid>
            <Grid container spacing={1} sx={{ margin: "1rem" }}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  Historia de la mascota o su descripción
                </Typography>
                <TextInputComponent
                  sx={{ width: "50ch" }}
                  label="Descripción de la mascota"
                  type="text"
                  multiline
                  rows={4}
                  // inputStyle={{ width: '100%' }}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6} sx={{ height: "100%" }}>
                <Grid
                  container
                  spacing={2}
                  // justifyContent="space-between" // Alinea los elementos con espacio entre ellos
                  alignItems="center"
                  // sx={{ height: "100%" }}
                >
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">
                      Reasignación de mascota
                    </Typography>
                    <SelecInputComponent
                      label="Seleccione la mascota*"
                      name="pet"
                      onChange={formik.handleChange}
                      value={formik.values.pet}
                      options={[
                        { label: "Quira", value: 1 },
                        { label: "Arnulfo", value: 2 },
                        { label: "Manchas", value: 3 },
                        { label: "Tomas", value: 4 },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{  height: "100%", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      onClick={handleEditClick}
                    >
                      <Typography
                        component="div"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        Guardar <br /> cambios
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <CardInfoPet />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default FormAddPost;

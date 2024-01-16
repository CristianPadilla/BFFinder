import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getPetsByUserId } from "../../store/pet";
import { t } from "i18next";



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
  const { active: post, isSaving } = useSelector((state) => state.posts);
  const [selectPets, setSelectPets] = useState([]);
  const [currentSelectedPet, setCurrentSelectedPet] = useState(null);
  const dispatch = useDispatch();

  const petsOptions = selectPets.map((pet) => {
    return {
      label: `${pet.name} - ${t(`species.${pet.breedDetails.specie.name}`)} - ${t(`breeds.${pet.breedDetails.name}`)}`,
      value: pet.id
    }
  });

  useEffect(async () => {
    // console.log('useEffect==  : ', pet);
    const pets = await dispatch(getPetsByUserId());
    console.log('useEffect==  : ', pets);
    setSelectPets(pets);
    post && setCurrentSelectedPet(post.petResponse)

  }, []);



  const handleSubmit = (values) => {
    console.log("========== handleSubmit ", values)
    // setEditing(true);
  };

  const onImageInputChange = ({ target }) => {
    // console.log('onImageInputChange==  : ', target.files.length);
  }

  const initialValues = post
    ? {
      description: post.description,
      pet: { label: `${post.petResponse.name} - ${post.petResponse.breedDetails.specie.name} - ${post.petResponse.breedDetails.name}`, value: post.petResponse.id },
      images: [],
    }
    : {
      description: "",
      pet: { label: "", value: null },
      images: [],
    }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Yup.object({
        description: Yup.string()
          .required("La descripción es obligatorio"),
        pet: Yup.object()
          .shape({
            value: Yup.number().required("Selecciona una raza válida")
          }),
        image: Yup.mixed()
          .test("fileFormat", "Formato de imagen no permitido", (value) => {
            if (!value || !value.type) return true;

            const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
            const fileType = value.type.toLowerCase();

            return allowedFormats.includes(fileType);
          })
          .notRequired(),
      })}
    >
      {(formik) => (
        <Form>
          {formik.errors.general && (
            <div className="error-message">{formik.errors.general}</div>
          )}
          <Grid container spacing={2}>
            {console.log("formik.values ====", formik.values)}
            <Grid item xs={12}>
              {/* <SlidersImages
                images={images}
                showBullets={false}
                showNav={false}
                showPlayButton={false}
                thumbnailPosition={"left"}
              /> */}
              <GroupDragandDrop
                onBlur={formik.handleBlur}
                setImages={(imagesFiles) => {
                  formik.setFieldValue("images", imagesFiles);
                }
                }
                name="image" />
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
                      // onChange={formik.handleChange}
                      onChange={({ target }) => {
                        const petOption = petsOptions.find((option) => option.value === target.value);
                        formik.setFieldValue("pet", petOption);
                        setCurrentSelectedPet(selectPets.find((pet) => pet.id === petOption.value))
                      }
                      }
                      value={formik.values.pet}
                      options={petsOptions}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ height: "100%", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
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
            {<CardInfoPet pet={currentSelectedPet} />}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default FormAddPost;

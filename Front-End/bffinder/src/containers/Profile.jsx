import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startContentLoading,
  startGetLoggedUserInformation,
  startUpdateProfileImage,
  stopContentLoading,
} from "../store/global";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
} from "@mui/material";
import imgdefault from "imgs/logo-bffinder.png";
import ProgressCircular from "../containers/Loaders/ProgressCircular";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import DragAndDrop from "../Components/form/DragandDrop";

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const isMounted = useRef(true);
  const { role } = useSelector((state) => state.persisted.auth);
  const { edit, setEdit } = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // console.log("PRUEBAAAAAAAAAAAAAA ", role);
    const fetchUser = async () => {
      const user = await dispatch(startGetLoggedUserInformation());
      // console.log("profile ", user);
      if (isMounted.current) {
        setUser(user);
      }
    };
    fetchUser();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleUpdateProfileImage = (values) => {
    console.log("valuesssssssssssss ", values.image);
    dispatch(startUpdateProfileImage(values.image));  
  };



  const handleEditForm = () => {
    console.log("Editando");
    // setEdit(true);
    setDialogOpen(true);
  };

  const ButtonAddPhotoProfile = () => {
    return (
      <Button
        variant="contained"
        color="info"
        size="small"
        sx={{
          // marginTop: "6rem",
          bottom: 0,
          // left: "80%", // Opcional: centrar horizontalmente
          // transform: "translateX(-50%)", // Opcional: centrar horizontalmente
        }}
        onClick={handleEditForm}
      >
        {userToDisplay.profileImageUrl ? "Actualizar foto de perfil" : "Subir foto de perfil"}
      </Button>
    );
  };



  const userToDisplay = user
    ? {
      name: user.name,
      birthDate: user.birthDate,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.location ? user.location.address : "",
      nit: user.nit,
      commercialRegistrationNumber: user.commercialRegistrationNumber,
      description: user.description,
      profileImageUrl: user.profileImageUrl || imgdefault,
      neighborhood: user.location ? user.location.neighborhood : "",
      city: user.location ? user.location.city.name : "",
      department: user.location ? user.location.city.department.name : "",
      more_info: user.location ? user.location.more_info : "",
    }
    : {
      name: "Nombre",
      email: "Correo Electronico",
      phoneNumber: "Numero de Celular",
      address: "Dirección",
      nit: "No. Identificación Tributaria (NIT)",
      commercialRegistrationNumber:
        "No. Matricula Mercantil (Camara de Comercio)",
      description: "Descripción",
      profileImageUrl: { imgdefault },
      neighborhood: "Barrio",
      city: "Ciudad",
      department: "Departamento",
      more_info: "Mas información",
    };

  if (!user) return <ProgressCircular />;
  return (
    <>
      <Card sx={{ margin: "1rem 2rem 0 2rem" }}>
        <CardContent sx={{ margin: ".7rem" }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={5}>
              {
                // userToDisplay.profileImageUrl ? (
                <>
                  <div
                    style={{
                      height: "230px",
                      width: "230px",
                      overflow: "hidden",
                      margin: ".5rem 0 1rem 0",
                      borderRadius: "3px",
                    }}
                  >
                    <img
                      src={userToDisplay.profileImageUrl}
                      alt=""
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <ButtonAddPhotoProfile />
                </>
                // ) : (

                // )
              }

              <Divider
                sx={{ marginBottom: 4, marginTop: 3, width: "80%" }}
              ></Divider>

              {role === "s" && (
                <>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Datos de la fundación
                  </Typography>

                  <Typography variant="subtitle1">
                    Fecha en que se fundo: {userToDisplay.birthDate}
                  </Typography>
                </>
              )}

              {role === "u" && (
                <>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Datos personales
                  </Typography>

                  <Typography variant="subtitle1">
                    Fecha de cumpleaños: {userToDisplay.birthDate}
                  </Typography>
                </>
              )}

              <Typography variant="subtitle1">
                Correo Electronico: {userToDisplay.email}
              </Typography>
              <Typography variant="subtitle1">
                Número de Celular: {userToDisplay.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: "justify" }}>
              {/* <h2>User profileee {user.userId}</h2> */}

              <Typography
                variant="h5"
                sx={{ marginTop: ".6rem", marginBottom: 1 }}
              >
                {userToDisplay.name}
              </Typography>

              {role === "s" && (
                <>
                  <Typography variant="subtitle1">
                    Descripción: {userToDisplay.description}
                  </Typography>
                  <Typography variant="subtitle1">
                    No. Identificación Tributaria (NIT): {userToDisplay.nit}
                  </Typography>
                  <Typography variant="subtitle1">
                    No. Matricula Mercantil (Camara de Comercio):{" "}
                    {userToDisplay.commercialRegistrationNumber}
                  </Typography>
                </>
              )}

              <Divider
                sx={{ marginBottom: 4, marginTop: 3, width: "80%" }}
              ></Divider>

              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Ubicación
              </Typography>
              {userToDisplay.city && (
              <Typography variant="subtitle1">
                {userToDisplay.city} /{userToDisplay.department}
              </Typography>
               )}
              <Typography variant="subtitle1">
                Dirección: {userToDisplay.address}
              </Typography>

              {role === "u" && userToDisplay.more_info != null && (
                <Typography variant="subtitle1">
                  Mas información: {userToDisplay.more_info}
                </Typography>
              )}

              <Typography variant="subtitle1">
                Barrio: {userToDisplay.neighborhood}
              </Typography>

              <Button
                variant="contained"
                color="info"
                size="small"
                sx={{
                  marginTop: "4rem",
                  bottom: 0,
                  left: "80%",
                  transform: "translateX(-50%)",
                }}
              // onClick={handleEditForm}
              >
                Editar Información
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <EditFormDialog /> */}
      <Formik
        initialValues={{
          image: null,
        }}
        onSubmit={handleUpdateProfileImage}
        validationSchema={Yup.object({
          image: Yup.mixed()
            // .test(
            //   "fileFormat",
            //   "Formato de imagen no permitido",
            //   (value) => {
            //     if (!value || !value.type) return true;
            //     const allowedFormats = [
            //       "image/jpeg",
            //       "image/png",
            //       "image/jpg",
            //     ];
            //     const fileType = value.type.toLowerCase();

            //     return allowedFormats.includes(fileType);
            //   }
            // )
            // .test(
            //   "fileSize",
            //   "La imagen es demasiado grande, el tamaño debe ser menor a 10MB",
            //   (value) => {
            //     if (!value || !value.size) return true;
            //     const maxSizeInBytes = 1048576; // 1MB
            //     return value.size <= maxSizeInBytes;
            //   }
            // )
            .required("Por favor agrega una foto de perfil"),
        })}
      >
        {(formik) => (
          <>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
              <DialogTitle>Agregar foto de perfil</DialogTitle>
              <DialogContent>
                <Form>
                  <DragAndDrop
                    onBlur={formik.handleBlur}
                    name="image"
                    errorClassName="error-message"
                  />

                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
              </DialogActions>
            </Dialog>


          </>
        )}
      </Formik>
    </>
  );
};

export default Profile;

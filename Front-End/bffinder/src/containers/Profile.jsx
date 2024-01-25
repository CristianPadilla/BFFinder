import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startContentLoading,
  startGetLoggedUserInformation,
  stopContentLoading,
} from "../store/global";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import imgdefault from "imgs/logo-bffinder.png";
import ProgressCircular from "../Components/ProgressCircular";

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const isMounted = useRef(true);
  const { role } = useSelector((state) => state.persisted.auth);

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

  console.log("PRUEBAA11 ", user);
  console.log("PRUEBAA22 ", userToDisplay);
  if (!user) return <ProgressCircular />;
  return (
    <>
      <Card sx={{ margin: "1rem 2rem 0 2rem" }}>
        <CardContent sx={{ margin: ".7rem" }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={5}>
              <div
                style={{
                  height: "230px",
                  width: "230px",
                  overflow: "hidden",
                  margin: ".5rem",
                  borderRadius: "3px",
                }}
              >
                <img
                  src={userToDisplay.profileImageUrl}
                  alt=""
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </div>

              {/* <input type="file" /> */}

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

              <Typography variant="subtitle1">
                {userToDisplay.city} /{userToDisplay.department}
              </Typography>
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
                  left: "80%", // Opcional: centrar horizontalmente
                  transform: "translateX(-50%)", // Opcional: centrar horizontalmente
                }}
                // onClick={handleEditForm}
              >
                Editar Información
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;

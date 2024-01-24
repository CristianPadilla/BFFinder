import React from "react";
import { useNavigate } from "react-router-dom";
import imgdefault from "imgs/logo-bffinder.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "styles/CardPrePost.scss";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { t } from "i18next";
import CurrentDate from "./CurrentDate";
import Swal from "sweetalert2";

const HorizontalCard = ({ post }) => {
  const navigate = useNavigate();
  const { petPartialResponse, images, locationResponse, date } = post;
  const { name, breedDetails, specie } = petPartialResponse;
  const { city } = locationResponse;

  const showAlert = () => {
    Swal.fire({
      title: "Se requiere iniciar sesión",
      text: "Para ver una mascota en BFFinder debes iniciar sesión",
      icon: "info",
      confirmButtonText: "Ir a iniciar sesión",
      cancelButtonText: "Cerrar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/auth/login");
      }
    });
  };

  return (
    <>
      <Card
        sx={{ borderRadius: "18px", margin: "1rem", display: "flex" }}
        elevation={4}
      >
        <CardMedia
          onClick={showAlert}
          component="img"
          // sx={{ width: 200, height: 200, objectFit: "cover" }}
          sx={{ width: 200, cursor: "pointer"}}
          image={images && images.length > 0 ? images[0].imageUrl : imgdefault}
          alt="Imagen"
        />

        <Box sx={{ display: "flex", width: "100%" }}>
          <CardActionArea onClick={showAlert}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h5">{name}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ margin: " 1rem 0 .5rem 0" }}
              >
                <LocationOnIcon color="action" fontSize="small" /> {city.name},{" "}
                {city.department.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ margin: " .8rem 0 .1rem .3rem" }}
              >
                {t(`species.${breedDetails.specie.name}`)} -{" "}
                {t(`breeds.${breedDetails.name}`)}
              </Typography>
            </CardContent>

            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ margin: "0 0 .5rem .9rem" }}
              >
                <CurrentDate date={date} />
              </Typography>
            </Box>
          </CardActionArea>
        </Box>
      </Card>
    </>
  );
};

export default HorizontalCard;

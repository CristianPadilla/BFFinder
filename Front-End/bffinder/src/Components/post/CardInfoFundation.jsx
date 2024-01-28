import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Grid,
  Stack,
  Checkbox,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  Facebook,
  YouTube,
  Instagram,
  Twitter,
  Language,
  WhatsApp,
  FavoriteBorder,
  Favorite,
  MailOutline,
} from "@mui/icons-material";
import CurrentDate from "../CurrentDate";

const CardInfoFundation = ({ post }) => {
  // console.log("CARD INFO FUNDATION name", post);
  const postToDisplay = post
    ? {
        description: post.description,
        date: post.date,
        city: post.locationResponse.city.name,
        department: post.locationResponse.city.department.name,
        neighborhood: post.locationResponse.neighborhood,
        user: {
          // whatsapp: post.user.whatsapp,
          // webpage: post.user.webpage,
          name: post.user.name,
          profileImageUrl: post.user.profileImageUrl,
          email: post.user.email,
          address: post.locationResponse.address,
          phoneNumber: post.user.phoneNumber,
          webPageUrl: post.user.webPageUrl,
        },
        pet: {
          name: post.petResponse.name,
        },
      }
    : {
        description:"Descripción de la mascota",
        date: "Fecha de publicación",
        city:"Ciudad",
        department: "Departamento",
        neighborhood: "Barrio",
        user: {
          // whatsapp: post.user.whatsapp,
          // webpage: post.user.webpage,
          name:"Nombre del usuario",
          profileImageUrl: "https://picsum.photos/200",
          email: "Correo electrónico",
          address: "Dirección",
          phoneNumber: "Número de celular",
          webPageUrl: "Pagina web de la Fundación",
        },
        pet: {
          name:"Nombre de la mascota",
        },
      };
  // console.log("CARD INFO FUNDATION 22222222222", post);

  return (
    <>
      <Card
        elevation={0}
        sx={{ borderRadius: "8px", backgroundColor: "#f6dfc8" }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: 1 }}
        >
          <Typography
            variant="caption"
            sx={{
              // fontSize: ".8rem",
              margin: "0 0 0 .8rem",
            }}
          >
            <CurrentDate date={postToDisplay.date} />
          </Typography>
          <Grid item>
            <Typography variant="caption" sx={{ marginRight: 1 }}>
              Agregar a favoritos
            </Typography>
            <Checkbox
              icon={<FavoriteBorder style={{ fontSize: 25 }} />}
              checkedIcon={<Favorite style={{ fontSize: 25, color: "red" }} />}
            />
          </Grid>
        </Grid>
        <CardHeader
          title={
            <Typography
              variant="h6"
              component="div"
              sx={{ margin: "0 .8rem 0 .8rem" }}
            >
              {postToDisplay.pet.name}
            </Typography>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "normal",
              textAlign: "justify",
              margin: "0 .8rem 0 .8rem",
            }}
          >
            {postToDisplay.description}
          </Typography>
        </CardContent>
        <Card elevation={0} sx={{ borderRadius: "8px", margin: 2 }}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="avatar"
                src={postToDisplay.user.profileImageUrl}
              ></Avatar>
            }
            title={
              <Typography variant="h6" component="div">
                {postToDisplay.user.name}
              </Typography>
            }
            subheader={
              <Stack direction="row" alignItems="center">
                <LocationOn
                  fontSize="small"
                  style={{
                    fontSize: 15,
                    marginBottom: "4px",
                    marginRight: ".3rem",
                  }}
                />
                <Typography variant="body2">
                  {" "}
                  {postToDisplay.department} / {postToDisplay.city}
                </Typography>
              </Stack>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Barrio: {postToDisplay.user.neighborhood}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Dirección: {postToDisplay.user.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <MailOutline
                    fontSize="small"
                    style={{ marginBottom: "-4px", marginRight: ".3rem" }}
                  />{" "}
                  Correo Electronico: {postToDisplay.user.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <Phone
                    fontSize="small"
                    style={{ marginBottom: "-3px", marginRight: ".3rem" }}
                  />{" "}
                  Número Celular: {postToDisplay.user.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <WhatsApp
                    fontSize="small"
                    style={{ marginBottom: "-3px", marginRight: ".3rem" }}
                  />{" "}
                  Whatsapp: {postToDisplay.user.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <Language
                    fontSize="small"
                    style={{ marginBottom: "-4px", marginRight: ".3rem" }}
                  />{" "}
                  Página web: {postToDisplay.webPageUrl}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Facebook fontSize="large" /> <YouTube fontSize="large" />{" "}
                <Instagram fontSize="large" /> <Twitter fontSize="large" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Card>
    </>
  );
};

export default CardInfoFundation;

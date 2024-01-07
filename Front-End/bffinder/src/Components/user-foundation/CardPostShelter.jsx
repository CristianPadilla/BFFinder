import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import imgdefault from "imgs/logo-bffinder.png";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Grid,
  Checkbox,
  Avatar,
  CardActionArea,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DialogViewPost from "./DialogViewPost";

const CardPostShelter = ({ post }) => {
  const { petPartialResponse, images, date, user } = post;
  const { name, breedDetails, specie } = petPartialResponse;

  const parsedDate = new Date(date);
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();

  const formattedDate = `${day < 10 ? "0" : ""}${day}/${
    month < 10 ? "0" : ""
  }${month}/${year} - ${hours % 12 || 12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${hours >= 12 ? "pm" : "am"}`;

//   Dialog
const [openDialog, setOpenDialog] = useState(false);

const handleOpenDialog = () => {
  setOpenDialog(true);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
};

  return (
    //     <div style={{ display: "flex", justifyContent: "center", margin: "2% 0" }}>
    //   <Card
    //     sx={{
    //       display: "flex",
    //       borderRadius: "18px",
    //       width: "40rem",
    //       flexDirection: "row",
    //       alignItems: "flex-start",
    //     }}
    //     elevation={4}
    //   >
    //     <div
    //       style={{
    //         width: "30%",
    //         height: "100%",
    //         overflow: "hidden",
    //         position: "relative",
    //       }}
    //     >
    //       <Link to="/ver-publicacion">
    //         <CardMedia
    //           component="img"
    //           sx={{ width: "100%", height: "100%", objectFit: "cover" }}
    //           image={images && images.length > 0 ? images[0].imageUrl : imgdefault}
    //           alt="Imagen"
    //         />
    //       </Link>
    //     </div>

    //     <CardContent sx={{ padding: "1rem", flexGrow: 1, height: "100%" }}>
    //       <Link to="/ver-publicacion" style={{ textDecoration: "none", color: "inherit" }}>
    //         <Typography variant="h5" component="h2" sx={{ fontSize: "1.7rem", marginBottom: "0.5rem" }}>
    //           {name}
    //         </Typography>
    //       </Link>

    //       <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem", marginBottom: "0.8rem", marginLeft: ".3rem" }}>
    //         {breedDetails.specie.name} - {breedDetails.name}
    //       </Typography>

    //       <Typography variant="body2" color="text.secondary" sx={{ fontSize: ".9rem", marginTop: "4.2rem" }}>
    //         Publicado el {formattedDate}
    //       </Typography>
    //     </CardContent>

    //     {/* Botones de interacción */}
    //     <CardActions
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "flex-end",
    //         justifyContent: "flex-end",
    //         marginTop: "auto",
    //       }}
    //     >

    //       <Grid container spacing={1} alignItems="center" justifyContent="flex-end">
    //         <Grid item>
    //           <Typography variant="body2">2</Typography>
    //         </Grid>
    //         <Grid item>
    //           <Checkbox
    //             icon={<FavoriteBorder style={{ fontSize: 30 }} />}
    //             checkedIcon={<Favorite style={{ fontSize: 30, color: "red" }} />}
    //             sx={{ paddingLeft: "0px" }}
    //           />
    //         </Grid>
    //         <Grid item>
    //           <Typography variant="body2">4</Typography>
    //         </Grid>
    //         <Grid item>
    //           <QuestionAnswerIcon sx={{ marginRight: "10px" }} />
    //         </Grid>
    //       </Grid>

    //     </CardActions>
    //   </Card>
    // </div>

    <div
      className="custom-card"
      style={{ display: "flex", justifyContent: "center", margin: "4% 0" }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 300, borderRadius: "18px" }}
        elevation={6}
      >
        <CardActionArea onClick={handleOpenDialog}>
          {/* <div className="card-click" onClick={handleOpenDialog}> */}
          <CardHeader
            avatar={
              <Typography
                variant="h6"
                component="h2"
                // sx={{ fontSize: "1.4rem" }}
              >
                {name}
              </Typography>
            }
            action={
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: ".9rem", marginTop: ".5rem" }}
              >
                {breedDetails.specie.name} - {breedDetails.name}
              </Typography>
            }
          />
          {/* height: "250px", */}
          <div style={{ width: "100%", overflow: "hidden" }}>
            <CardMedia
              component="img"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              image={
                images && images.length > 0
                  ? images[0].profileImageUrl
                  : imgdefault
              }
              alt="Imagen"
            />
          </div>
          <CardContent>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: ".8rem" }}
            >
              Publicado el {formattedDate}
            </Typography>
          </CardContent>
          {/* </div> */}
        </CardActionArea>
        <CardActions>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginLeft: "1px" }}
          >
            <Grid
              container
              spacing={1}
              alignItems="center"
              //   justifyContent="justify-content"
            >
              <Grid item>
                <Favorite
                  fontSize="small"
                  style={{ color: "indianred", paddingLeft: "0px" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  2 personas guardaron en favoritos
                </Typography>
              </Grid>

              <Grid item xs={1} />
              <Grid item>
                <QuestionAnswerIcon
                  fontSize="small"
                  sx={{ color: "steelblue" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  4 personas preguntaron
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <DialogViewPost open={openDialog} onClose={handleCloseDialog}/>
    </div>
  );
};

export default CardPostShelter;

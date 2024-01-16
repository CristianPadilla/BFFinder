import React, { useState } from "react";
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
  Button,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DialogViewPost from "./DialogViewPost";
import { t } from "i18next";
import Swal from 'sweetalert2';
import { setActivePost, startGetPostById } from "../../store/post";
import { useDispatch, useSelector } from "react-redux";

const CardPostShelter = ({ post }) => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.posts);

  const { petPartialResponse, images, date, user, status, id } = post;
  const { name, breedDetails, specie } = petPartialResponse;

  const parsedDate = new Date(date);
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();

  const formattedDate = `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""
    }${month}/${year} - ${hours % 12 || 12}:${minutes < 10 ? "0" : ""
    }${minutes} ${hours >= 12 ? "pm" : "am"}`;

  //   Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    // console.log("iddddddddddd: ", id);
    dispatch(startGetPostById(id))
    // setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    dispatch(setActivePost(null));
    // setOpenDialog(false);
  };

const showAlert = () => {
  Swal.fire({
    title: '¿Estás seguro de deshabilitar esta publicación?',
    // text: 'No podrás revertir esta acción!',
    icon: 'question',
    confirmButtonText: 'Si, deshabilitar',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  });
};

  return (
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
                {t(`species.${breedDetails.specie.name}`)} - {t(`breeds.${breedDetails.name}`)}
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
              <Grid item container direction="row" alignItems="center" justifyContent="center">
                {status ? (
                  <>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        padding: ".6rem",
                        backgroundColor: "lightgreen",
                        borderRadius: "4px",
                        letterSpacing: "1px",
                        fontWeight: "600",
                        marginLeft: "8px",
                      }}
                    >
                      Activo
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={showAlert}
                      sx={{
                        marginLeft: "8px",
                        letterSpacing: "1px",
                      }}
                    >
                      Desactivar
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        padding: ".5rem",
                        backgroundColor: "lightcoral",
                        color: "white",
                        borderRadius: "4px",
                        fontWeight: "600",
                        letterSpacing: "1px",
                        marginLeft: "8px",
                        // width: "178px",
                        textAlign: "center",
                      }}
                    >
                      Inactivo
                    </Typography>
                    <Button
                      variant="contained"
                      color="success"
                      // onClick={handleActivateClick}
                      sx={{
                        marginLeft: "8px",
                        letterSpacing: "1px",
                      }}
                    >
                      Activar
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      {active != null && <DialogViewPost open={active != null} onClose={handleCloseDialog} />}
    </div>
  );
};

export default CardPostShelter;

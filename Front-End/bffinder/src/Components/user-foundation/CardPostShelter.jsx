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
import Swal from "sweetalert2";
import { setActivePost, startChangePostStatus, startGetPostById } from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import FormattedDatePost from "../FormattedDatePost";

const CardPostShelter = ({ post }) => {
  const dispatch = useDispatch();

  const { petPartialResponse, images, date, user, status, id } = post;
  const { name, breedDetails, specie, profileImageUrl } = petPartialResponse;

  //   Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    // console.log("iddddddddddd: ", id);
    dispatch(startGetPostById(id));
    // setOpenDialog(true);
  };


  const handleStatusChange = ({ target }) => {
    const { value } = target.dataset;
    const title =
      value === "disable"
        ? "¿Estás seguro de deshabilitar esta publicación?"
        : "¿Estás seguro de habilitar esta publicación?";

    const confirmButtonText =
      value === "disable"
        ? "Deshabilitar"
        : "Habilitar";

    const confirmButtonColor =
      value === "disable"
        ? "#d33"
        : "#1b5e20";

    console.log("value: ", value);
    Swal.fire({
      title: title,
      // text: 'No podrás revertir esta acción!',
      icon: "question",
      confirmButtonText: confirmButtonText,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startChangePostStatus(id, value));
      }
    })
      ;
  };

  // console.log("post Fundaciónn: ", post);

  return (
    <div
      // className="custom-card"
      style={{ display: "flex", justifyContent: "center", margin: "4% 0" }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 310, borderRadius: "18px" }}
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
                {t(`species.${breedDetails.specie.name}`)} -{" "}
                {t(`breeds.${breedDetails.name}`)}
              </Typography>
            }
          />
            <CardMedia
              component="img"
              height="194"
              image={profileImageUrl ? profileImageUrl : imgdefault}
              alt="Imagen"
            />
          <CardContent>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: ".8rem" }}
            >
              <FormattedDatePost date={date}/>
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
                  {(post.questionsQuantity)+3 || 0} personas guardaron en favoritos
                </Typography>
              </Grid>

              <Grid item xs={2} />
              <Grid item>
                <QuestionAnswerIcon
                  fontSize="small"
                  sx={{ color: "steelblue" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  {post.questionsQuantity || 0} personas preguntaron
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                {status ? (
                  <Button
                    data-value={"disable"}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleStatusChange}
                    sx={{
                      marginLeft: "8px",
                      letterSpacing: "1px",
                    }}
                  >
                    Deshabilitar
                  </Button>
                ) : (
                  <Button
                    data-value={"enable"}
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={handleStatusChange}
                    sx={{
                      marginLeft: "8px",
                      letterSpacing: "1px",
                    }}
                  >
                    Habilitar
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardPostShelter;

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import imgdefault from "imgs/logo-bffinder.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Grid,
  Checkbox,
  Avatar,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { setActivePost } from "../../store/post";

const formatTimeDifference = (hours) => {
  const weeks = Math.floor(hours / (24 * 7));
  const remainingHours = hours % (24 * 7);
  const months = Math.floor(weeks / 4);
  const remainingWeeks = weeks % 4;

  if (months > 0) {
    return `${months} ${months === 1 ? "mes" : "meses"}`;
  } else if (remainingWeeks > 0) {
    return `${remainingWeeks} ${remainingWeeks === 1 ? "semana" : "semanas"}`;
  } else {
    return `${remainingHours} ${remainingHours === 1 ? "hora" : "horas"}`;
  }
};

const CardPost = ({ post }) => {
  const { role } = useSelector((state) => state.persisted.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    petPartialResponse,
    images,
    date,
    profileImageUrl,
    locationResponse,
    user,
  } = post;
  const { name, breedDetails, specie } = petPartialResponse;
  const { city } = locationResponse;

  const publishDate = new Date(date);
  const currentDate = new Date();
  const timeDifferenceInHours = Math.floor(
    (currentDate - publishDate) / (1000 * 60 * 60)
  );
  const formattedTimeDifference = formatTimeDifference(timeDifferenceInHours);

  const handleVerClick = () => {
    console.log("post : ", post);
    dispatch(setActivePost(post));
    navigate("/ver-publicacion/" + post.id);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "2% 0" }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "18px",
          width: "50rem",
        }}
        elevation={4}
      >
        {/* <CardActionArea sx={{ width: "100%" }} component={Link} to="/ver-publicacion"> */}
        <div
          style={{
            width: "30%", // Porción de la card ocupada por la imagen
            // height: "50px", // Altura total de la card
            overflow: "hidden",
          }}
        >
          {/* <Link to="/ver-publicacion"> */}
          <CardMedia
            onClick={handleVerClick}
            component="img"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            image={
              images && images.length > 0 ? images[0].imageUrl : imgdefault
            }
            alt="Imagen"
          />
          {/* </Link> */}
        </div>
        <CardContent
          className="content-card"
          sx={{
            width: "70%",
            padding: "0px",
            ":last-child": { paddingBottom: "0px" },
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {/* style={{ textDecoration: "none", color: "inherit" }} */}
              <Typography
                onClick={handleVerClick}
                variant="h5"
                component="h2"
                sx={{ fontSize: "1.7rem", marginTop: "-6%" }}
              >
                {name}
              </Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                sx={{
                  backgroundColor: "blanchedalmond",
                  padding: "0 0 0 10px",
                  borderRadius: "18px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "1rem", marginRight: "0.5rem" }}
                >
                  {user.name}
                </Typography>
                <Avatar alt="Fundación" src={user.profileImageUrl} />
              </Grid>
            </Grid>
          </Grid>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: ".9rem", marginTop: "1rem" }}
          >
            <LocationOnIcon color="action" sx={{ fontSize: 15 }} /> {city.name},{" "}
            {city.department.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: ".9rem", marginTop: "1rem" }}
          >
            {t(`species.${breedDetails.specie.name}`)} -{" "}
            {t(`breeds.${breedDetails.name}`)}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: ".8rem", marginRight: "4rem" }}
          >
            Hace {formattedTimeDifference}
          </Typography>
          {/* 
            </CardActionArea> */}

          <CardActions sx={{ marginBottom: "-10px", marginTop: "9px" }}>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item>
                <Typography variant="body2">2</Typography>
              </Grid>
              <Grid item>
                <Checkbox
                  icon={<FavoriteBorder style={{ fontSize: 30 }} />}
                  checkedIcon={
                    <Favorite style={{ fontSize: 30, color: "red" }} />
                  }
                  sx={{ paddingLeft: "0px" }}
                />
              </Grid>

              <Grid item>
                <Typography variant="body2">4</Typography>
              </Grid>
              <Grid item>
                <QuestionAnswerIcon sx={{ marginRight: "10px" }} />
              </Grid>

              {/* <Button variant="contained" size="small" sx={{ fontSize: '1rem' }} onClick={handleVerClick}>
              Ver
            </Button> */}
            </Grid>
          </CardActions>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
    </div>
  );
};

export default CardPost;

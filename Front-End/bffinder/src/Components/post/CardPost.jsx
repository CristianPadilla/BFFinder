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
  Box,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { setActivePost } from "../../store/post";
import CurrentDate from "../CurrentDate";

const CardPost = ({ post }) => {
  const navigate = useNavigate();
  const { petPartialResponse, date, locationResponse, user } = post;
  const { name, breedDetails, specie } = petPartialResponse;
  const { city } = locationResponse;

  const handleVerClick = () => {
    console.log("post : ", post);
    // dispatch(setActivePost(post));
    navigate("/ver-publicacion/" + post.id);
  };

  console.log("CARDDD POST : ", post);

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "2% 0" }}>
      <Card
        sx={{
          display: "flex",
          // justifyContent: "center",
          borderRadius: "18px",
          width: "50rem",
        }}
        elevation={4}
      >
        <CardMedia
          onClick={handleVerClick}
          component="img"
          sx={{ width: 250, cursor: "pointer" }}
          // sx={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
          image={petPartialResponse.profileImageUrl || imgdefault}
          alt="Imagen"
        />

        <Box sx={{ display: "flex", width: "100%" }}>
          <CardContent
            // className="content-card"
            sx={{ flex: "1 0 auto" }}
            // sx={{
            //   width: "70%",
            //   padding: "0px",
            //   ":last-child": { paddingBottom: "0px" },
            // }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {/* style={{ textDecoration: "none", color: "inherit" }} */}
                <Typography
                  onClick={handleVerClick}
                  variant="h5"
                  sx={{ cursor: "pointer" }}
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
              sx={{ margin: " 1rem 0 .5rem 0" }}
            >
              <LocationOnIcon
                color="action"
                fontSize="small"
                sx={{ marginBottom: "-3px", marginRight: 1 }}
              />
              {city.name}, {city.department.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ margin: " .9rem 0 .1rem .3rem" }}
            >
              {t(`species.${breedDetails.specie.name}`)} -{" "}
              {t(`breeds.${breedDetails.name}`)}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ margin: "1.2rem 0 0 .3rem" }}
            >
              <CurrentDate date={date} />
            </Typography>

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
        </Box>

        {/* </CardActionArea> */}
      </Card>
    </div>
  );
};

export default CardPost;

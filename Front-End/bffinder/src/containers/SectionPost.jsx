import React from "react";
import SlidersImages from "../Components/post/SlidersImages";
import PetDetails from "../Components/post/PetDetails";
import CardInfoFundation from "../Components/post/CardInfoFundation";
import { Typography, Grid, Checkbox } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

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

const SectionPost = () => {
  return (
    <div>
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <Grid item xs={12} md={5}>
          <div style={{ width: "100%", height: "300px" }}>
            <SlidersImages
              images={images}
              showBullets={true}
              showPlayButton={false}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={4}>
          <div>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{ fontSize: ".8rem", margin: ".8rem" }}
                >
                  Hace 3 horas
                </Typography>
                <Typography variant="h4" sx={{ margin: ".8rem" }}>
                  Name~
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={1}
                >
                  <Grid item>
                    <Typography variant="body2">Agregar a favoritos</Typography>
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
                </Grid>
              </Grid>
            </Grid>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: "normal",
                textAlign: "justify",
                margin: ".8rem",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              ex impedit pariatur minima porro, eius, corrupti possimus ea
              magnam accusantium aspernatur! Officiis ipsa, facilis consequuntur
              rerum ut optio adipisci itaque.
            </Typography>

            <PetDetails />
          </div>
        </Grid>

        {/* Tercera columna */}
        <Grid item xs={12} md={3}>
          <div>
            <CardInfoFundation />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SectionPost;

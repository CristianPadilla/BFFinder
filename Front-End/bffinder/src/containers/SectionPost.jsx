import React from "react";
import SlidersImages from "../Components/post/SlidersImages";
import TablePet from "../Components/post/TablePet";
import CardInfoFundation from "../Components/post/CardInfoFundation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
        {/* Primera columna */}
        <Grid item xs={12} md={5}>
          <div style={{ width: "100%", height: "300px" }}>
            <SlidersImages images={images} />
          </div>
        </Grid>

        {/* Segunda columna */}
        <Grid item xs={12} md={4}>
          <div>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                {/* Nombre en la esquina izquierda */}
                <Typography variant="h4">Name~</Typography>
              </Grid>
              <Grid item xs={6}>
                {/* Checkbox en la esquina derecha inferior con texto al lado */}
                <Grid
                  container
                  alignItems="center" // Centrar verticalmente
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
              sx={{ fontSize: ".9rem" }}
            >
              {/* {breedDetails.specie.name} - {breedDetails.name} */}
              Especie - Raza
            </Typography>

            {/* <TextField
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              rows={4}
              defaultValue="Descripción de la mascota..."
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            /> */}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "normal", textAlign: "justify" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              ex impedit pariatur minima porro, eius, corrupti possimus ea
              magnam accusantium aspernatur! Officiis ipsa, facilis consequuntur
              rerum ut optio adipisci itaque.
            </Typography>

            <TablePet />
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

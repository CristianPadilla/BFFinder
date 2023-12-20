import React from "react";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import CardSpecie from "../Components/CardSpecie";
import dogPNG from "imgs/Pets/dog_png.png";
import catPNG from "imgs/Pets/cat_png.png";
// Importa las imágenes de las otras especies
import birdPNG from "imgs/Pets/dog_png.png";
import ratPNG from "imgs/Pets/dog_png.png";
import fishPNG from "imgs/Pets/dog_png.png";
import chickenPNG from "imgs/Pets/dog_png.png";
import hamsterPNG from "imgs/Pets/dog_png.png";

const speciesData = [
    { name: "Perros", image: dogPNG, link: "/home" },
    { name: "Gatos", image: catPNG, link: "/gatos" },
    { name: "Hamsters", image: hamsterPNG, link: "/hamsters" },
    { name: "Aves", image: birdPNG, link: "/aves" },
    { name: "Ratas", image: ratPNG, link: "/ratas" },
    { name: "Peces", image: fishPNG, link: "/peces" },
    { name: "Gallinas", image: chickenPNG, link: "/gallinas" },
  ];
  
  const SectionSelectSpecie = () => {
    return (
      <div>
        <Typography variant="h4" sx={{ textAlign: "center", margin: "3rem" }}>
          Selecciona una especie
        </Typography>
  
        <Grid container spacing={2} justifyContent="center">
          {speciesData.map((species, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CardSpecie
                speciesName={species.name}
                imagePet={species.image}
                linkTo={species.link}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };

export default SectionSelectSpecie;

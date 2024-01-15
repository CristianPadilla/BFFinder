import React, { useState, useEffect } from "react";
import CardSpecie from "./CardSpecie";
import dogPNG from "imgs/Pets/dog.png";
import catPNG from "imgs/Pets/cat.png";
import hamsterPNG from "imgs/Pets/cute-hamster.png";
import allPNG from "imgs/Pets/allPets.png";
import { Dialog, DialogContent, DialogTitle, IconButton, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// const dogPNG = "https://img.icons8.com/color/480/dog.png";
// const catPNG = "https://img.icons8.com/color/480/000000/calico-cat.png";
// const hamsterPNG = "https://img.icons8.com/color/480/cute-hamster.png";
// const allPNG = "https://img.icons8.com/color/96/budgie.png";

const speciesData = [
  { name: "Perros", image: dogPNG, link: "/home" },
  { name: "Gatos", image: catPNG, link: "/gatos" },
  { name: "Roedores", image: hamsterPNG, link: "/hamsters" },
  { name: "Todos", image: allPNG, link: "/home" },
];

const DialogSelectSpecie = ({open, onClose}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} onClickOutside={onClose} maxWidth="lg" fullWidth PaperProps={{
        style: {
          borderRadius: 20,
          padding: 20,
        },
      }}>
        <DialogTitle>
          <Typography variant="h4" style={{ textAlign: "center" }}>¿Qué tipo de mejor amigo buscas?</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            {speciesData.map((species, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <CardSpecie
                  speciesName={species.name}
                  imagePet={species.image}
                  linkTo={species.link}
                  // linkTo={onClose}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogSelectSpecie;

import { Grid, Typography } from "@mui/material";
import "styles/LoadingFilters.scss";
import Dog from "../assets/icons/icons8-dog-48.png";
import Cat from "../assets/icons/icons8-calico-cat-48.png";
import Hamster from "../assets/icons/icons8-cute-hamster-48.png";
import Parrot from "../assets/icons/icons8-budgie-48.png";
import Fish from "../assets/icons/icons8-bream-48.png";
import Horse from "../assets/icons/icons8-trotting-horse-48.png";
import Duck from "../assets/icons/icons8-duck-48.png";
import Chicken from "../assets/icons/icons8-chicken-48.png";
import React from "react";

const speciesData = [
  { image: Dog },
  { image: Cat },
  { image: Hamster },
  { image: Duck },
  { image: Chicken },
  { image: Horse },
  { image: Fish },
  { image: Parrot },
];

export const LoadingFilters = () => {
  return (
    <Grid container spacing={0}>
      <Grid item>
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{
            fontWeight: "600",
            letterSpacing: "1px",
            position: "absolute",
            top: "40%",
            left: "55.7%",
          }}
        >
          Buscando...
        </Typography>
        <div className="container-loading">
          <span className="lens" />
          <div className="center-loading">
            <div className="wrap">
              <div className="box">
                {speciesData.map((data, index) => (
                  <img
                    key={index}
                    className="icon-filter-loading"
                    src={data.image}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CardSpecie = ({ speciesName, imagePet, linkTo }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
      <Card
        elevation={6}
        sx={{ borderRadius: "6px", width: "300px", height: "320px" }}
      >
        <CardActionArea sx={{ height: "320px" }}>
          <Link
            to={linkTo}
            style={{
              textDecoration: "none",
              color: hovered ? "chocolate" : "black",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CardHeader
              title={
                <Typography variant="h4" align="center">
                  {speciesName}
                </Typography>
              }
              sx={{ top: "0", position: "absolute", width: "100%" }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // height: "70%",
              }}
            >
              <CardMedia
                component="img"
                alt={speciesName}
                height="100%"
                width="100%"
                image={imagePet}
                sx={{
                  objectFit: "cover",
                  padding: "2rem 1rem .5rem 1rem",
                }}
              />
            </div>
          </Link>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CardSpecie;

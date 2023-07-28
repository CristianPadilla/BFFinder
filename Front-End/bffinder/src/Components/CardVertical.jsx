import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import imgdefault from "imgs/logo-bffinder.png";

const CardVertical = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="" height="250" image={imgdefault} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Firulais
        </Typography>
        <Typography variant="body2" color="text.secondary">
          hace 3 horas
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="text.secondary">
          hace 3 horas
        </Typography>
        
        <Button variant="contained" size="small">
          Ver publicación
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardVertical;

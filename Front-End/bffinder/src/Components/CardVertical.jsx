import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import imgdefault from "imgs/logo-bffinder.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import 'styles/Card.scss';
import { useNavigate } from "react-router-dom";

const formatTimeDifference = (hours) => {
  const weeks = Math.floor(hours / (24 * 7));
  const remainingHours = hours % (24 * 7);
  const months = Math.floor(weeks / 4);
  const remainingWeeks = weeks % 4;

  if (months > 0) {
    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  } else if (remainingWeeks > 0) {
    return `${remainingWeeks} ${remainingWeeks === 1 ? 'semana' : 'semanas'}`;
  } else {
    return `${remainingHours} ${remainingHours === 1 ? 'hora' : 'horas'}`;
  }
};  

const CardVertical = ({ post }) => {
  const { petPartialResponse, images, locationResponse, date } = post;
  console.log("log: ",post);
  const { name, breedDetails, specie } = petPartialResponse;
  const { city } = locationResponse;

  const publishDate = new Date(date);
  const currentDate = new Date();
  const timeDifferenceInHours = Math.floor((currentDate - publishDate) / (1000 * 60 * 60));
  const formattedTimeDifference = formatTimeDifference(timeDifferenceInHours);

  const navigate = useNavigate();

  const handleVerClick = () => {
    navigate("/ver-publicacion");
  };

  return (
    <div className="custom-card" style={{display: 'flex', justifyContent: 'center', margin: '4% 0'}}>
    <Card sx={{ maxWidth: 345 }} elevation={6}>
    <CardMedia component="img" alt="Imagen" height="250" image={imgdefault} />
      <CardContent>
      <Typography variant="h5" component="h2" sx={{ fontSize: '1.7rem', marginTop: '-6%' }}>
        {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginTop: '1rem' }}>
        <LocationOnIcon color="action" sx={{ fontSize: 15 }}/> {city.name}, {city.department.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginTop: '1rem' }}>
        {breedDetails.specie.name} - {breedDetails.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.8rem', marginRight: '3rem', marginLeft: '1rem' }}>
        Hace {formattedTimeDifference}
        </Typography>
        
        <Button variant="contained" size="small" sx={{ fontSize: '1rem' }} onClick={handleVerClick}>
          Ver
        </Button>
      </CardActions>
    </Card>
    </div>
  );
};

export default CardVertical;

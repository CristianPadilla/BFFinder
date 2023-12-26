import React from "react";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import imgdefault from "imgs/logo-bffinder.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import 'styles/Card.scss';
import { useNavigate, Link } from "react-router-dom";

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
  const { name, breedDetails, specie, size, age, vaccinated, sterilized, dewormed, published } = petPartialResponse;
  // const { city } = locationResponse;

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
    <Card sx={{ width: '100%', maxWidth: 350, borderRadius: '18px' }} elevation={6}>
    <Link to="/ver-publicacion" style={{ textDecoration: 'none', color: 'inherit' }}>
    <CardHeader
        avatar={
          <Typography variant="h5" component="h2" sx={{ fontSize: '1.4rem' }}>
        {name}
        </Typography>
        }
        action={
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', marginTop: '.4rem' }}>
        {breedDetails.specie.name} - {breedDetails.name}
        </Typography>
        }
      />
<div style={{ width: '100%', height: '250px', overflow: 'hidden' }}>

    <CardMedia component="img"
      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      image={images && images.length > 0 ? images[0].imageUrl : imgdefault}
      alt="Imagen" />
      
      </div>
      <CardContent>
         <Grid container spacing={2}>
        <Grid item xs={6}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginBottom: '1rem' }}>
        Tamaño: {size}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginBottom: '1rem' }}>
        Edad: {age} años
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginBottom: '1rem' }}>
        Genero: {breedDetails.name}
      </Typography>
    </Grid>

    {/* Columna Derecha */}
    <Grid item xs={6}>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginBottom: '1rem' }}>
        {console.log("Valor de vaccinated:", vaccinated)}
        Vacunado: {vaccinated ? <CheckIcon color="success" sx={{ fontSize: 15 }} /> : <CloseIcon color="error" sx={{ fontSize: 15 }} />}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginBottom: '1rem' }}>
        Esterilizado: {sterilized ? <CheckIcon color="success" sx={{ fontSize: 15 }} /> : <CloseIcon color="error" sx={{ fontSize: 15 }} />}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginBottom: '1rem' }}>
        Desparasitado: {dewormed ? <CheckIcon color="success" sx={{ fontSize: 15 }} /> : <CloseIcon color="error" sx={{ fontSize: 15 }} />}
      </Typography>
    </Grid>
  </Grid>

      </CardContent>
      </Link>
      <CardActions>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginLeft: '1px'}} spacing={1}>
    <Button variant="contained" size="small" onClick={handleVerClick}>
      Ver publicación
    </Button>
    <Typography variant="body2" color="text.secondary" sx={{ padding: '.4rem', backgroundColor: 'lightgreen', borderRadius: '4px', fontWeight: '600', marginLeft: '8px'}}>
    En proceso de adopción
  </Typography>
    {/* {published ? (
  <Typography variant="body2" color="text.secondary" sx={{ padding: '.4rem', backgroundColor: 'lightgreen', borderRadius: '4px', fontWeight: '600', marginLeft: '8px' }}>
    En proceso de adopción
  </Typography>
) : (
  <Typography variant="body2" color="text.secondary" sx={{ padding: '.4rem', backgroundColor: 'lightcoral', borderRadius: '4px', fontWeight: '600', marginLeft: '8px', width: '178px', textAlign: 'center' }}>
    Sin publicar
  </Typography>
)} */}
 </Grid>
      </CardActions>
    </Card>
    </div>
  );
};

export default CardVertical;

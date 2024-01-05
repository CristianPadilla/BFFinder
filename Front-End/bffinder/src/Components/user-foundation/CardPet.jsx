import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import imgdefault from "imgs/logo-bffinder.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import 'styles/CardPrePost.scss';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Avatar from '@mui/material/Avatar';
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

const CardPet = ({ post }) => {
  const navigate = useNavigate();
  const { petPartialResponse, images, locationResponse, date, user, profileImageUrl } = post;
  const { name, breedDetails, specie } = petPartialResponse;


  const { city } = locationResponse;

  const publishDate = new Date(date);
  const currentDate = new Date();
  const timeDifferenceInHours = Math.floor((currentDate - publishDate) / (1000 * 60 * 60));
  const formattedTimeDifference = formatTimeDifference(timeDifferenceInHours);

  const handleVerClick = () => {
    navigate("/ver-publicacion");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '2% 0' }}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '18px',
          width: '50rem',
        }}
        elevation={4}
      >
        <div
          style={{
            width: '30%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Link to="/ver-publicacion">
            <CardMedia
              component="img"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              image={images && images.length > 0 ? images[0].imageUrl : imgdefault}
              alt="Imagen"
            />
          </Link>
        </div>

        <CardContent className="content-card" sx={{ width: '70%', padding: '0px', ':last-child': { paddingBottom: '0px' } }}>
          {/* Sección de la mascota */}
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link to="/ver-publicacion" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h5" component="h2" sx={{ fontSize: '1.7rem', marginTop: '-6%' }}>
                  {name}
                </Typography>
              </Link>
            </Grid>

            {/* Sección del perfil de la fundación -gainsboro-*/}
            {user && (
              <Grid item>
                <Grid container direction="row" alignItems="center" sx={{ backgroundColor: 'blanchedalmond', padding: '0 0 0 10px', borderRadius: '18px' }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '1rem', marginRight: '0.5rem' }}
                  >
                    {user.name}
                  </Typography>
                  <Avatar alt="Fundación" src={user.profileImageUrl} />
                </Grid>
              </Grid>
            )}
          </Grid>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '1rem', marginTop: '.9rem' }}
          >
            <Favorite color="error" sx={{ fontSize: 20 }} /> 10 personas estan interesadas
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '1rem', marginTop: '.9rem' }}
          >
            <QuestionAnswerIcon color="info" sx={{ fontSize: 20 }} /> 5 mensajes sin responder
          </Typography>

          {/* <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '.8rem', marginRight: '4rem' }}
          >
            Hace {formattedTimeDifference}
          </Typography> */}
          
          <CardActions sx={{ marginBottom: '-10px', marginTop: '9px'}}>
          <Grid container direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
          <Button variant="contained" size="small" sx={{ fontSize: '1rem' }} onClick={handleVerClick}>
              Ya fue adoptado
            </Button>

            <Grid container direction="column" alignItems="center" sx={{ backgroundColor: 'blanchedalmond', borderRadius: '18px' }}>
              <Typography variant="body2">Publicación</Typography>
              <Grid container direction="row" alignItems="center" >
              <Button variant="contained" size="small" sx={{ fontSize: '1rem' }} onClick={handleVerClick}>
              Ver
            </Button>
            <Button variant="contained" size="small" sx={{ fontSize: '1rem' }} onClick={handleVerClick}>
              Modificar
            </Button>
              </Grid>
            </Grid>
           
          </Grid>
        </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardPet;

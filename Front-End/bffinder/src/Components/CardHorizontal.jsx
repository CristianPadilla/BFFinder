import React from 'react';
import { useNavigate } from "react-router-dom";
import imgdefault from "imgs/logo-bffinder.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import 'styles/CardPrePost.scss';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

const HorizontalCard = ({ post }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { petDetails, images, locationDetails, date } = post;
  const { name, breedDetails, specie } = petDetails;
  const { city } = locationDetails;

  const publishDate = new Date(date);
  const currentDate = new Date();
  const timeDifferenceInHours = Math.floor((currentDate - publishDate) / (1000 * 60 * 60));
  const formattedTimeDifference = formatTimeDifference(timeDifferenceInHours);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '4% 0' }}>
    <Card className='card-prepost'sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.28)', borderRadius: '18px', display: 'flex', justifyContent: 'center' }}>
      {/* Imagen en la parte izquierda */}
      <CardMedia
        component="img"
        sx={{ width: 200, height: 200, objectFit: 'cover' }}
        image={images && images.length > 0 ? images[0].imageUrl : imgdefault}
        alt="Imagen"
      />
      
      {/* Contenido en la parte derecha */}
      <CardContent className='content-card'>

        <Typography variant="h5" component="h2" className='title-card' sx={{ fontSize: '1.7rem', marginTop: '-6%' }}>
        {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginTop: '1rem' }}>
        <LocationOnIcon color="action" sx={{ fontSize: 15 }}/> {city.name}, {city.department.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginTop: '1rem' }}>
        {breedDetails.specie.name} - {breedDetails.name}
        </Typography>

        <CardActions className='parrafo-card'>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.8rem', marginRight: '4rem' }}>
        Hace {formattedTimeDifference}
        </Typography>
        
        <Button variant="contained" size="small" sx={{ fontSize: '1rem' }} onClick={handleModalOpen}>
          Ver
        </Button>
      </CardActions>

      </CardContent>
    </Card>
    <Dialog open={open} onClose={handleModalClose}>
                <DialogTitle><b>Atención</b></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                  <b>Para ver una mascota en BFFinder debes
                    iniciar sesión.</b>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color="error" onClick={handleModalClose}>Cancelar</Button>
                  <Button variant="contained" color="success" onClick={handleLoginClick}>Iniciar Sesión</Button>
                </DialogActions>
              </Dialog>
    </div>
  );
};

export default HorizontalCard;

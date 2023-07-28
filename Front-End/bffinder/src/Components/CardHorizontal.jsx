import React from 'react';
import imgdefault from "imgs/logo-bffinder.png";
import 'styles/PrePost.scss';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

const HorizontalCard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '4% 0' }}>
    <Card className='card-prepost'sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.28)', borderRadius: '18px', display: 'flex', justifyContent: 'center' }}>
      {/* Imagen en la parte izquierda */}
      <CardMedia
        component="img"
        sx={{ width: 200, height: 200, objectFit: 'cover' }}
        image={imgdefault}
        alt="Imagen"
      />
      
      {/* Contenido en la parte derecha */}
      <CardContent className='content-card'>
        <Typography variant="h5" component="h2" className='title-card' sx={{ fontSize: '2rem', marginTop: '-6%' }}>
          Mateo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', marginTop: '1rem' }}>
          Ubicado en Salomia
        </Typography>
        <CardActions className='parrafo-card'>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.9rem', marginRight: '4rem' }}>
          hace 3 horas
        </Typography>
        
        <Button variant="contained" size="small" sx={{ fontSize: '1rem' }}>
          Ver
        </Button>
      </CardActions>
      </CardContent>
    </Card>
    </div>
  );
};

export default HorizontalCard;

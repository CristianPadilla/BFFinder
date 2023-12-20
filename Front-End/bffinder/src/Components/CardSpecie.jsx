import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CardSpecie = ({ speciesName, imagePet, linkTo }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '4% 0' }}>
      <Card elevation={3} sx={{ borderRadius: '18px', width: '300px', height: '350px' }}>
        <Link
          to={linkTo}
          style={{
            textDecoration: 'none',
            color: hovered ? 'green' : 'black', // Cambia el color cuando se pasa el cursor
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '70%',
            }}
          >
            <CardMedia
              component="img"
              alt={speciesName}
              height="100%"
              width="auto"
              image={imagePet}
              sx={{ marginTop: '40px', marginLeft: '40px', marginRight: '40px' }}
            />
          </div>
        </Link>

        <CardContent style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link
            to={linkTo}
            style={{
              textDecoration: 'none',
              color: hovered ? 'chocolate' : 'black', // Cambia el color cuando se pasa el cursor
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Typography variant="h4" align="center">
              {speciesName}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardSpecie;

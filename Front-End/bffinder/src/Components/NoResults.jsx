import React from 'react';
import { Grid, Typography } from '@mui/material';
import Pet from '../assets/imgs/Pets/pug-behind.png';

const NoResults = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {/* <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ position: "absolute"}}> */}
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Grid item>
          <img src={Pet} alt="Pet" style={{ width: '200px', height: 'auto' }} />
        </Grid>
        <Grid item>
          <Typography variant="h6" color="textSecondary" sx={{ fontWeight: "600", letterSpacing: "1px"}}>
            No se encontraron resultados
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default NoResults;

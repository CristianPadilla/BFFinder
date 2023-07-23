import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Cardh from '../Components/CardHorizontal';
import Cardv from '../Components/CardVertical';
import 'styles/PrePost.scss';
import 'styles/Prehome.scss';

const SectionPrePosts = () => {
  return (
    <div>
      <div className="title-container">
        <h1 className='title-pre'>Publicaciones de Adopción</h1>
      </div>
      <Box m={2}> 
    <Grid container spacing={1} className='section-prepost' style={{  }}>
      {/* Primera columna */}
      <Grid item xs={12} sm={6}>
        
          <Cardh />

      </Grid>

      {/* Segunda columna */}
      <Grid item xs={12} sm={6}>

          <Cardh />

      </Grid>

      <Grid item xs={12} sm={6}>

          <Cardh />

      </Grid>

      <Grid item xs={12} sm={6}>

          <Cardh />

      </Grid>
      
    </Grid>
    </Box>
    </div>
    
  );
};

export default SectionPrePosts;

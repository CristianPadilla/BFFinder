import React, { useState, useEffect } from 'react';
import { Grid, Box, IconButton } from '@mui/material';
import CardHorizontal from '../Components/CardHorizontal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import 'styles/CardPrePost.scss';
import 'styles/Prehome.scss';
import axios from 'axios';

const SectionPrePosts = () => {
  const [postList, setPostList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:9090/post/all/sort/date/true')
      .then((response) => {
        // console.log('Respuesta de la petición:', response.data);
        setPostList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error.response.data);
      });
  }, []);
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 4);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };
  
  return (
    <div>
    <div className='title-container'>
      <h1 className='title-pre'>Tu mejor amigo espera por ti !</h1>
    </div>
    <Box className='section-prepost' m={2}>
      <IconButton onClick={handlePrev} disabled={currentIndex === 0} className='left-arrow'>
        <ArrowBackIosNewIcon sx={{ fontSize: 70 }} />
      </IconButton>
      <Grid container spacing={1}>
        {postList.slice(currentIndex, currentIndex + 4).map((post) => (
          <Grid item xs={12} sm={6} key={post.id}>
            <CardHorizontal post={post} />
          </Grid>
        ))}
      </Grid>
      <IconButton onClick={handleNext} disabled={currentIndex + 4 >= postList.length} className='right-arrow'>
        <ArrowForwardIosIcon sx={{ fontSize: 70 }}/>
      </IconButton>
    </Box>
  </div>
  
  );
};

export default SectionPrePosts;

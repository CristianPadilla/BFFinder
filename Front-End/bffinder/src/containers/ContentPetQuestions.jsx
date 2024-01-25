import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Collapse,
  IconButton,
  CardHeader,
  Avatar,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import CardInfoPet from '../Components/user-foundation/CardInfoPet';
import CardQuestions from '../Components/CardQuestions';

const ContentPetQuestions = ({ questionsGroup }) => {
  const [expanded, setExpanded] = useState(false);

  const { questions, pet, petId } = questionsGroup;
  // console.log('PETTT INFO ContentPetQuestions => ', questionsGroup.pet);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card
        sx={{ margin: '1rem', background: '#f6dfc8', borderRadius: '7px' }}
        elevation={0}
      >
        <CardHeader
          avatar={<Avatar src={pet.profileImageUrl} sx={{ width: 60, height: 60 }}/>}
          title={
            <Typography variant="h6">
              {pet.name}
            </Typography>
            }
          action={
            <>
            <Typography variant="caption" sx={{fontSize: "1rem", marginRight: 1}}>
              Información de la mascota
            </Typography>
            <IconButton aria-expanded={expanded} onClick={handleExpandClick}>
              <ExpandMoreIcon fontSize='large'/>
            </IconButton>
            
          </>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardInfoPet pet={pet} />
          </CardContent>
        </Collapse>
        {/* Contenido fuera del colapso */}
        <CardContent>
          {questions &&
            questions.map((question) => (
              <CardQuestions
                key={question.id}
                question={question}
              />
            ))}
        </CardContent>
      </Card>
    </>
  );
};

export default ContentPetQuestions;

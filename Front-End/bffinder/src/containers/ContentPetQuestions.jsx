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
  // console.log('pet from ContentPetQuestions => ', questions);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card
        sx={{ margin: '1rem', background: '#fdfbf7', borderRadius: '7px' }}
        elevation={2}
      >
        <CardHeader
          avatar={<Avatar />}
          title={pet.name}
          action={
            <IconButton aria-expanded={expanded} onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </IconButton>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardInfoPet />
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

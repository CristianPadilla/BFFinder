import React, { useState } from 'react';
import { Card, CardContent, Tabs, Tab, Typography } from '@mui/material';
import CardQuestions from './CardQuestions';

const ContentMainProfile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [comments, setComments] = useState([
    { id: 1, content: 'Mensaje sin responder 1', isAnswered: false },
    { id: 2, content: 'Mensaje sin responder 2', isAnswered: false },
    { id: 3, content: 'Mensaje sin responder 3', isAnswered: false },
    { id: 4, content: 'Mensaje sin responder 4', isAnswered: false },
    { id: 5, content: 'Mensaje sin responder 5', isAnswered: false },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReply = (commentId, replyText) => {
    // Lógica para responder al comentario y actualizar el estado
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, isAnswered: true, replyText }
        : comment
    );
    setComments(updatedComments);
  };

  const handleEdit = (commentId, editedText) => {
    // Lógica para manejar la edición del comentario y actualizar el estado
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, replyText: editedText } : comment
    );
    setComments(updatedComments);
  };

  return (
    <Card elevation={0} sx={{ borderRadius: '5px' }}>
      <CardContent sx={{ margin: 1 }}>
        <Typography variant="h5" component="div" sx={{ marginBottom: 4 }}>
          Gestión de preguntas y respuestas
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Mensajes sin responder" />
          <Tab label="Mensajes Respondidos" />
        </Tabs>
        {tabValue === 0 && (
          <div>
            {comments
              .filter((comment) => !comment.isAnswered)
              .map((unansweredComment) => (
                <CardQuestions
                  key={unansweredComment.id}
                  comment={unansweredComment}
                  onReply={handleReply}
                  onEdit={handleEdit}
                />
              ))}
          </div>
        )}
        {tabValue === 1 && (
          <div>
            {comments
              .filter((comment) => comment.isAnswered)
              .map((answeredComment) => (
                <CardQuestions
                  key={answeredComment.id}
                  comment={answeredComment}
                  onReply={handleReply}
                  onEdit={handleEdit}
                />
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentMainProfile;

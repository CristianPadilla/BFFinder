import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const CardQuestions = ({ comment, onReply, onEdit }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState(comment.replyText || '');
  const [showEdit, setShowEdit] = useState(false);

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleSendReply = () => {
    setIsReplying(false);
    setShowEdit(true);
    onReply(comment.id, replyText);
  };

  const handleEditClick = () => {
    setIsReplying(true);
    setShowEdit(false);
  };

  const handleEditSave = () => {
    onEdit(comment.id, replyText);
    setIsReplying(false);
  };

  return (
    <Card elevation={1} sx={{ borderRadius: '12px', margin: '13px' }}>
      <CardContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar />
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              Nombre de la Mascota
            </Typography>
          </div>
        </div>

        <Typography
          variant="body2"
          sx={{ marginTop: 2, marginLeft: 1, marginBottom: 3 }}
        >
          {comment.content}
        </Typography>

        {comment.isAnswered ? (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            {isReplying ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Editar respuesta"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            ) : (
              <Typography variant="body2" color="GrayText" sx={{ marginLeft: 3 }}>
                {comment.replyText}
              </Typography>
            )}
            {isReplying ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditSave}
                sx={{ marginLeft: 1 }}
              >
                Guardar
              </Button>
            ) : (
              <Button
                variant="text"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEditClick}
                sx={{ marginLeft: 1 }}
                size="small"
              >
                Editar
              </Button>
            )}
          </div>
        ) : (
          <>
            {isReplying && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Responder"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendReply}
                  sx={{ marginLeft: 1 }}
                >
                  Enviar
                </Button>
              </div>
            )}
            {!isReplying && (
              <Button
                variant="text"
                color="primary"
                onClick={handleReplyClick}
                // sx={{ marginTop: 2 }}
              >
                Responder
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CardQuestions;

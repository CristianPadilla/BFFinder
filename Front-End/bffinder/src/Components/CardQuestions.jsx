import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { startUpdateQuestionAnswer } from "../store/questions";

const CardQuestions = ({ question, onEdit, showAnswered }) => {
  const dispatch = useDispatch();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState(question.answer || "");

  console.log("question from CardQuestions => ", question);
  const { user, descripcion, answer } = question;
  const { name } = user;


  // useEffect(() => {
  //   setReplyText(question.replyText || "");
  // }, [question.replyText]);

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleSendReply = () => {
    console.log('handleSendReply ', replyText);
    dispatch(startUpdateQuestionAnswer(question.id, replyText));

  };

  const handleEditClick = () => {
    setIsReplying(true);
  };

  const handleEditSave = () => {
    onEdit(question.id, replyText);

  };
  // console.log('replyyyyyyy  ', replyText);
  return (
    <Card elevation={1} sx={{ borderRadius: "12px", margin: "13px" }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar />
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              {name}
            </Typography>
            <Typography variant="caption" sx={{ marginLeft: 1, lineHeight: 0 }}>
              { }
            </Typography>
          </div>
        </div>

        <Typography
          variant="body2"
          sx={{ marginTop: 2, marginLeft: 1, marginBottom: 3 }}
        >
          {question.content}
        </Typography>

        {
          <div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            {isReplying ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Editar respuesta"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            ) : (
              <>
                <Typography
                  variant="body2"
                  color="GrayText"
                  sx={{ marginLeft: 3 }}
                >
                  {question.replyText}
                </Typography>
                <Typography variant="caption" sx={{ marginLeft: 1 }}>
                  {descripcion}  {question.id}
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleEditClick}
                  sx={{ marginLeft: 1 }}
                >
                  Editar
                </Button>
              </>
            )}
            {isReplying && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendReply}
                sx={{ marginLeft: 1 }}
              >
                Guardar
              </Button>
            )}
          </div>
        }

        {!isReplying && !showAnswered && (
          <div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            <Button variant="text" color="primary" onClick={handleReplyClick}>
              Responder
            </Button>
          </div>
        )}

        {isReplying && (
          <div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
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
      </CardContent>
    </Card>
  );
};

export default CardQuestions;

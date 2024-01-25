import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { startUpdateQuestionAnswer } from "../store/questions";
import FormattedDate from "./FormattedDate";
import { Edit, Send } from "@mui/icons-material";

const CardQuestions = ({ question, onEdit }) => {
  const dispatch = useDispatch();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState(question.answer || "");
  const [showCancelButton, setShowCancelButton] = React.useState(false);

  // console.log("INFOOOOO CardQuestions => ", question);
  const { user, date, descripcion, answer, answerDate, isAnswered } = question;
  const { name, avatar } = user;

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleSendReply = () => {
    // console.log('handleSendReply ', replyText);
    // console.log('question.descripcion ', question.descripcion);
    if (replyText === question.answer) {
      setIsReplying(false);
      return;
    }
    dispatch(startUpdateQuestionAnswer(question.id, replyText));
  };

  const handleEditClick = () => {
    setIsReplying(true);
  };

  const handleCancelClick = () => {
    setReplyText("");
    setShowCancelButton(false);
    console.log("Cancelled. showCancelButton:", showCancelButton);
  };

  const handleInputChange = (e) => {
    setReplyText(e.target.value);
    setShowCancelButton(!!e.target.value);
    console.log("showCancelButton:", showCancelButton);
  };
  // console.log('replyyyyyyy  ', replyText);
  return (
    <Card elevation={0} sx={{ borderRadius: "12px", margin: "13px" }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={avatar} />
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              {name}
            </Typography>
            <Typography variant="caption" sx={{ marginLeft: 1, lineHeight: 0 }}>
              - <FormattedDate date={date} />
            </Typography>
          </div>
        </div>

        <Typography
          variant="body1"
          sx={{ marginTop: 2, marginLeft: 1, marginBottom: 3 }}
        >
          {descripcion}
        </Typography>

        {isAnswered && (
          <div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            {isReplying ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Editar respuesta"
                value={replyText}
                onChange={handleInputChange}
                // onChange={(e) => setReplyText(e.target.value)}
                helperText={
                  <span>
                    {showCancelButton && (
                      <>
                        Con Esc puede cancelar&nbsp;
                        <IconButton onClick={handleCancelClick} size="small">
                          <CancelIcon />
                        </IconButton>
                      </>
                    )}
                  </span>
                }
              />
            ) : (
              <>
                <Typography
                  variant="body1"
                  // color="GrayText"
                  sx={{ marginLeft: 3 }}
                >
                  {question.replyText}
                </Typography>
                <div>
                  <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {answer}
                  </Typography>
                  <Typography variant="caption" color="GrayText">
                    <FormattedDate date={answerDate} />
                  </Typography>
                </div>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleEditClick}
                  sx={{ marginLeft: 1 }}
                  startIcon={<Edit />}
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
        )}
        {!isAnswered &&
          (!isReplying ? (
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 2 }}
            >
              <Button variant="text" color="primary" onClick={handleReplyClick}>
                Responder
              </Button>
            </div>
          ) : (
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 2 }}
            >
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
                endIcon={<Send />}
              >
                Enviar
              </Button>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default CardQuestions;

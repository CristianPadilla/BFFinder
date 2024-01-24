import React, { useEffect, useState } from "react";
import SlidersImages from "../Components/post/SlidersImages";
import PetDetails from "../Components/post/PetDetails";
import CardInfoFundation from "../Components/post/CardInfoFundation";
import {
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startCreateQuestion } from "../store/questions";
import { use } from "i18next";
import Swal from "sweetalert2";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const SectionPost = ({ post }) => {
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  // const { active: post } = useSelector((state) => state.posts);
  const { contentLoading } = useSelector((state) => state.persisted.global);
  const dispatch = useDispatch();

  const imagesToDisplay =
    post.images.length > 0
      ? [
          post.petResponse.profileImageUrl,
          post.images.map((image) => image.imageUrl),
        ]
      : [];

  const handleSaveQuestion = () => {
    if (question.length < 10 || question.length > 250) {
      setError("La pregunta debe tener entre 10 y 250 caracteres");
    } else {
      setError("");
      const postId = 452; // -------------------------------------------CAMBIAR id tara-----------------------------------------------
      dispatch(startCreateQuestion(question, postId))
        .then(() => {
          Swal.fire(
            "¡Pregunta realizada con Éxito!",
            "Se te notificará cuando el refugio responda tu pregunta",
            "success"
          );
          setQuestion("");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire(
            "¡Algo salió mal!",
            "Vuelve a intentarlo más tarde",
            "error"
          );
          setQuestion("");
        });
    }
  };

  return (
    <>
      <Paper elevation={0} sx={{ background: "white", padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            {/* <div style={{ width: "100%", height: "300px", position: "relative" }}> */}
            <SlidersImages
              images={imagesToDisplay || images}
              showBullets={true}
              showPlayButton={false}
              imageStyle={{ width: "93%", objectCover: "cover" }}
              thumbnailPosition="bottom"
            />
            {/* </div> */}

            {/* <div style={{ display: "flex", flexDirection: "column", marginTop: "28%" }}> */}
            {post && <PetDetails pet={post.petResponse} />}

            <Divider
              sx={{
                marginTop: 4,
                marginBottom: 4,
              }}
            ></Divider>
            <Box sx={{ margin: "1rem" }}>
              <Typography variant="h6" sx={{ marginBottom: ".2rem" }}>
                {" "}
                ¿Tienes alguna duda? preguntale al refugio
              </Typography>
              {contentLoading ? (
                <Typography variant="h4" component="div" gutterBottom>
                  Preguntando...
                </Typography>
              ) : (
                <Box component="form">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                      <TextField
                        variant="outlined"
                        label="Escribe tu inquietud"
                        fullWidth
                        error={!!error}
                        helperText={error}
                        onChange={(e) => {
                          e.target.value.length > 10 && setError("");
                          setQuestion(e.target.value);
                        }}
                        value={question}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        onClick={handleSaveQuestion}
                        variant="contained"
                        color="primary"
                      >
                        Enviar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

              <Typography
                variant="h6"
                sx={{ marginTop: "2rem", marginBottom: ".3rem" }}
              >
                {" "}
                Preguntas realizadas por otros usuarios
              </Typography>

              <List>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="¿Esta es una pregunta de ejemplo?"
                    secondary="Sí, esta es una respuesta de ejemplo."
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="¿Otra pregunta de ejemplo?"
                    secondary="Sí, esta es otra respuesta de ejemplo."
                  />
                </ListItem>
              </List>
            </Box>

            {}
            <Typography
              variant="body1"
              sx={{ marginTop: "2rem", marginBottom: ".3rem" }}
            >
              Preguntas realizadas por otros usuarios
            </Typography>

            <List>
              {post.questions &&
                post.questions.map((question) => (
                  <ListItem key={question.id} alignItems="flex-start">
                    <ListItemText
                      // primary={question.question}
                      primary={
                        <Grid
                          container
                          spacing={1}
                          justifyContent="space-between"
                        >
                          <Grid item>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {question.question || ""}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Realizado el: {question.date || ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                      secondary={
                        <>
                          {/* {question.answer && ( */}
                          <Typography
                            // component="span"
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ marginLeft: "10px" }}
                          >
                            <>
                              {question.answer || "Si, lo es bastante cariñosa"}{" "}
                              -{" "}
                              <span style={{ fontSize: "0.7rem" }}>
                                {question.answerDate || "2024-01-19"}
                              </span>
                            </>
                          </Typography>
                          {/* )} */}
                        </>
                      }
                    />
                  </ListItem>
                ))}
            </List>
            {/* </Box> */}
            {/* </div> */}
          </Grid>

          <Grid item xs={12} md={5}>
            <div style={{ position: "sticky", top: 0, maxHeight: "100vh" }}>
              {post && <CardInfoFundation post={post} />}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SectionPost;

import React from "react";
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
  const imagesToDisplay =
    post.images.length > 0
      ? [
          post.petResponse.profileImageUrl,
          post.images.map((image) => image.imageUrl),
        ]
      : [];

  console.log("INFO POSTT", post);
  // console.log("INFO POSTT TRAEEE", postToDisplay);

  return (
    <>
      <Paper elevation={0} sx={{ background: "white", padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            {/* <div
              style={{ width: "100%", height: "300px", position: "relative" }}
            > */}
            <SlidersImages
              images={imagesToDisplay || images}
              showBullets={true}
              showPlayButton={false}
              imageStyle={{ width: "93%", objectCover: "cover" }}
              thumbnailPosition="bottom"
            />
            {/* </div> */}

            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "15%",
              }}
            > */}
            {post && <PetDetails pet={post.petResponse} />}

            <Divider
              sx={{
                marginTop: 4,
                marginBottom: 4,
              }}
            ></Divider>
            <Box sx={{ margin: "1rem" }}>
              <Typography variant="h6" sx={{ marginBottom: "3rem" }}>
                Preguntas y respuestas
                {/* {post ? post.id : ""} */}
              </Typography>

              <Typography variant="body1" sx={{ marginBottom: ".2rem" }}>
                {" "}
                Preguntale al refugio
              </Typography>

              <Box
                component="form"
                // onSubmit={/ maneja el envío del formulario aquí */}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                    <TextField
                      variant="outlined"
                      label="Haz una pregunta"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button type="submit" variant="contained" color="primary">
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {
                
              }
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
                                {question.answer ||
                                  "Si, lo es bastante cariñosa"}{" "}
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
            </Box>
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

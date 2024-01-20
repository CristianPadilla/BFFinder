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
import { useSelector } from "react-redux";

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

const SectionPost = () => {
  const { active: post } = useSelector((state) => state.posts);
  return (
    <>
      <Paper elevation={0} sx={{ background: "white", padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <div
              style={{ width: "100%", height: "300px", position: "relative" }}
            >
              <SlidersImages
                images={images}
                showBullets={true}
                showPlayButton={false}
                // thumbnailPosition="left"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "28%",
              }}
            >
              {post && <PetDetails pet={post.petResponse} />}

              <Divider
                sx={{
                  marginTop: 4,
                  marginBottom: 4,
                }}
              ></Divider>
              <Box sx={{ margin: "1rem" }}>
                <Typography variant="h5" sx={{ marginBottom: "3rem" }}>
                  Preguntas y respuestas {post ? post.id : ""}
                </Typography>

                <Typography variant="h6" sx={{ marginBottom: ".2rem" }}>
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
            </div>
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

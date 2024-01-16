import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import imgdefault from "imgs/logo-bffinder.png";
import FormAddPost from "./FormAddPost";
import DragAndDrop from "../form/DragandDrop";
import SlidersImages from "../post/SlidersImages";
import CardInfoPet from "./CardInfoPet";
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

const DialogViewPost = ({ open, onClose }) => {
  const [profileImageUrl] = useState("");
  const { active: post } = useSelector((state) => state.posts);
  const [editing, setEditing] = useState(false);

  const renderInformationSection = () => (
    <>
      {/* <Divider variant="middle" sx={{ marginTop: 1, marginBottom: 2 }}>
          Caracteristicas
        </Divider> */}
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", justifyContent: "center", margin: ".1rem" }}
      >
        <Grid item xs={12} sx={{ margin: ".5rem", display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "normal",
              textAlign: "justify",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, ex
            impedit pariatur minima porro, eius, corrupti possimus ea magnam
            accusantium aspernatur! Officiis ipsa, facilis consequuntur rerum ut optio
            adipisci itaque.
          </Typography>

          <Grid container justifyContent="space-between" marginTop="1rem">
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                Fecha de publicación: 23423432
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID : {post.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hora de publicación: 23423432
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="info"
                onClick={handleEditClick}
              >
                Editar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Divider
          variant="middle"
          sx={{ marginTop: 1, marginBottom: 2 }}
        ></Divider> */}
    </>
  );

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    // console.log("Datos guardados del edit:", formData);
    // Puedes realizar acciones de guardado aquí si es necesario
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Puedes realizar acciones de cancelación aquí si es necesario
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "600",
        }}
      >
        {editing
          ? "Modificar información de la publicación"
          : "Información de la publicación"}
        <IconButton color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent >
        {editing ? (
          <FormAddPost />
        ) : (
          <>
            <Grid container spacing={2}>
              {/* <Grid container spacing={2} sx={{ height: "100vh" }}> */}
              <Grid item xs={12} md={5}>
                <SlidersImages images={images}
                  showBullets={false}
                  showPlayButton={false}
                  thumbnailPosition="left"
                  showNav={true}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {renderInformationSection()}
                  </Grid>
                </Grid>
              </Grid>
              <CardInfoPet pet={post.petResponse} />
            </Grid>

          </>
        )}
      </DialogContent>
      <DialogActions>
        {/* <Button variant="contained" color="info">Editar</Button>
        <Button variant="contained" color="success">Guardar Cambios</Button>
        <Button variant="contained" color="error">Borrar publicación</Button> */}
        {editing ? (
          <>
            {/* <Button variant="contained" color="success" onClick={handleSaveClick}>
              Guardar Cambios
            </Button> */}
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelClick}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button variant="contained" color="info" onClick={handleEditClick}>
            QUITARR
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogViewPost;

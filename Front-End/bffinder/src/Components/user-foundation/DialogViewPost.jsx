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
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import FormattedDate from "../FormattedDate";
import { Favorite, QuestionAnswer } from "@mui/icons-material";

const photos = [
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
  const { active: post } = useSelector((state) => state.posts);
  const [editing, setEditing] = useState(false);

  const imagesToDisplay =
    post.images.length > 0 ? post.images.map((image) => image.imageUrl) : [];

  const postToDisplay = post
    ? {
        description: post.description,
        date: post.date,
        images: imagesToDisplay,
      }
    : {
        description: "Descripción de la mascota",
        date: "Fecha de publicación",
        images: imagesToDisplay,
      };

  console.log("INFO DIALOG", imagesToDisplay);

  const renderInformationSection = () => (
    <>
      <Grid
        container
        spacing={1}
        height="100%"
        sx={{ display: "flex", justifyContent: "center", margin: ".1rem" }}
      >
        <Grid
          item
          xs={12}
          height="100%"
          sx={{ margin: ".5rem", display: "flex", flexDirection: "column" }}
        >
          <Typography variant="body2" color="text.primary">
            <FormattedDate date={postToDisplay.date} />
          </Typography>

          <Grid
            container
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: "1rem", marginBottom: "1.2rem" }}
          >
            <Grid item container alignItems="center" spacing={1}>
              <Grid item>
                <Favorite
                  fontSize="small"
                  style={{
                    color: "indianred",
                    paddingLeft: "0px",
                    marginBottom: "-5px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  2 personas guardaron en favoritos
                </Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center" spacing={1}>
              <Grid item>
                <QuestionAnswer
                  fontSize="small"
                  sx={{ color: "steelblue", marginBottom: "-5px" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  4 personas preguntaron
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
            marginTop="1rem"
            position="relative"
            height="-webkit-fill-available"
          >
            <Grid item>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                Descripción o su historia
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  whiteSpace: "normal",
                  textAlign: "justify",
                }}
              >
                {postToDisplay.description}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                 ID : {post.id}
                  </Typography> */}
            </Grid>

            <Grid item position="absolute" bottom="0" right="0">
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
    </>
  );

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
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
      <DialogContent>
        {editing ? (
          <FormAddPost />
        ) : (
          <>
            <Grid container spacing={2}>
              {/* <Grid container spacing={2} sx={{ height: "100vh" }}> */}
              <Grid item xs={12} md={5}>
                <SlidersImages
                  images={postToDisplay.images}
                  showBullets={false}
                  showPlayButton={false}
                  thumbnailPosition="left"
                  showNav={true}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                {renderInformationSection()}
              </Grid>
              <CardInfoPet pet={post.petResponse} />
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {editing ? (
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelClick}
            >
              Cancelar
            </Button>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogViewPost;

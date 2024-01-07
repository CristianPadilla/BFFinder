import React, { useEffect, useState, useRef } from "react";
import Cards from "../Components/CardHorizontal";
import Cardv from "../Components/CardVertical";
import CardPost from "../Components/post/CardPost";
import Stack from "@mui/material/Stack";
import { Fab, Tooltip, Grid, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModalAddPet from "../Components/user-foundation/ModalAddPet";
import "styles/SectionAllPosts.scss";
import axios from "axios";
import "styles/Home.scss";
import { postApi } from "../api/postApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/post";
import CardPostShelter from "../Components/user-foundation/CardPostShelter";

const SectionFilterPost = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts.page);
  // const { role } = useSelector((state) => state.persisted.auth);
  const sectionRef = useRef(null);

  useEffect(
    () => {
      !posts && dispatch(fetchPosts());
    },
    []
    // [postList]
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    sectionRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddPet = () => {
    handleCloseDialog();
  };

  return (
    <>
      {posts && posts.map((post) => (
        //  {/* <Grid item xs={12} key={post.id}>
        //    <CardPost post={post} />
        //  </Grid> */}

        <Grid
          item
          key={post.id}
          xs={12}
          sm={6}
          md={4}
          style={{ display: "flex" }}
        >
          <CardPostShelter post={post} style={{ flex: "1 0 auto" }} />
        </Grid>
      ))}

      <Tooltip
        title={<span style={{ fontSize: "16px" }}>Crear Publicación</span>}
        arrow
        placement="left"
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpenDialog}
          sx={{ position: "fixed", bottom: "16px", right: "25px" }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <ModalAddPet
        open={openDialog}
        onClose={handleCloseDialog}
        onAdd={handleAddPet}
      />
    </>
  );
};

export default SectionFilterPost;

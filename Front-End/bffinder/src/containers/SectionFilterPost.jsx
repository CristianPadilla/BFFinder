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

const SectionFilterPost = () => {
  const dispatch = useDispatch();
  const { posts = [], loading } = useSelector((state) => state.posts);
  const sectionRef = useRef(null);

  const postsRequest = {
    search: "",
    filters: {
      // from_date: "2020-05-01",
      // specie_id: 0,
      // breed_id: 0,
      // size: '',
      // department_id: 0,
      // city_id: 0
    },
    sorting: {
      //  sort: "date",
      //   desc: true
    },
    page: 0,
    page_size: 5,
  };

  useEffect(
    () => {
      dispatch(fetchPosts(0, postsRequest));
    },
    []
    // [postList]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Cantidad de posts por página

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
    // Lógica para agregar la mascota, si es necesario
    handleCloseDialog();
  };

  return (
    <>
      <span>Loading:{loading ? "True" : "False"}</span>
      {posts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <CardPost post={post} />
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

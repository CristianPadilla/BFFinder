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
import { changePostsRequest, fetchPosts } from "../store/post";
import SectionFilterPost from "./SectionFilterPost";
import { SectionFilterPet } from "./SectionFilterPet";
import { act } from "react-dom/test-utils";
import { changePetsRequest, setPetsRequest } from "../store/pet";

const MainContent = () => {
  const sectionRef = useRef(null);
  const { activeModule } = useSelector((state) => state.persisted.global);
  const dispatch = useDispatch();
  const { totalPages, pageNumber } =
    activeModule === "posts"
      ? useSelector((state) => state.posts.page)
      : useSelector((state) => state.pets.page);

  console.log("UUUUUUUUUUUUUUUUU ", totalPages, pageNumber);

  const { loading } =
    activeModule === "posts"
      ? useSelector((state) => state.posts)
      : useSelector((state) => state.pets);

  const handlePageChange = (event, value) => {
    activeModule === "posts"
      ? dispatch(changePostsRequest({ page: value - 1 }))
      : dispatch(changePetsRequest({ page: value - 1 }));
    // sectionRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="layout-container">
      <section ref={sectionRef} className="inicio-user-comun">
        <Grid container spacing={1} className="grid-container">
          {loading
            ? <h2>loading...</h2>
            : (activeModule === "posts" ? (
              <SectionFilterPost />
            ) : (
              <SectionFilterPet />
            ))}
        </Grid>
        <Grid
          container
          className="grid-container"
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              color="warning"
              className="pagination-custom"
              page={pageNumber + 1}
              onChange={handlePageChange}
            />
          </Stack>
        </Grid>
      </section>
    </div>
  );
};

export default MainContent;

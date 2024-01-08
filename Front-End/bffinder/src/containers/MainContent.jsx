import React, { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Pagination } from "@mui/material";
import "styles/SectionAllPosts.scss";
import "styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { changePostsRequest } from "../store/post";
import SectionFilterPost from "./SectionFilterPost";
import { SectionFilterPet } from "./SectionFilterPet";
import { changePetsRequest } from "../store/pet";

const MainContent = () => {
  const { activeModule } = useSelector((state) => state.persisted.global);
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const { totalPages, pageNumber } =
    activeModule === "posts"
      ? useSelector((state) => state.posts.page)
      : useSelector((state) => state.pets.page);


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
          {activeModule === "posts"
            ? <SectionFilterPost />
            : <SectionFilterPet />
          }
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

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
import SectionFilterPost from "./SectionFilterPost";
import { SectionFilterPet } from "./SectionFilterPet";

const MainContent = () => {
  const sectionRef = useRef(null);
  const { pageable } = useSelector((state) => state.posts);

  // const postsRequest = {
  //   search: "",
  //   filters: {
  //     // from_date: "2020-05-01",
  //     // specie_id: 0,
  //     // breed_id: 0,
  //     // size: '',
  //     // department_id: 0,
  //     // city_id: 0
  //   },
  //   sorting: {
  //     //  sort: "date",
  //     //   desc: true
  //   },
  //   page: 0,
  //   page_size: 5,
  // };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    sectionRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="layout-container">
      <section ref={sectionRef} className="inicio-user-comun">
        <Grid container spacing={1} className="grid-container">
          {/* <SectionFilterPost /> */}
          {console.log("sectionnnnnnnnnnnnnnnn ")}
          <SectionFilterPet />
        </Grid>

        <Grid
          container
          className="grid-container"
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={2}>
            <Pagination
              count={pageable.totalPages}
              color="warning"
              className="pagination-custom"
              page={pageable.pageNumber}
              onChange={handlePageChange}
            />
          </Stack>
        </Grid>
      </section>
    </div>
  );
};

export default MainContent;

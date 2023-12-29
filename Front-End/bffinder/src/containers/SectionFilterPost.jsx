import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Cards from "../Components/CardHorizontal";
import Cardv from "../Components/CardVertical";
import CardPost from "../Components/post/CardPost";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "styles/SectionAllPosts.scss";
import axios from "axios";
import "styles/Home.scss";
import { postApi } from "../api/postApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/post";

const SectionFilterPost = () => {
  const dispatch = useDispatch();
  const { posts = [], pageable, loading } = useSelector(state => state.posts);
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

  useEffect(() => {
    console.log('holaaaa', postsRequest);
    dispatch(fetchPosts(0, postsRequest));

  }, []
    // [postList]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Cantidad de posts por página
              
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    sectionRef.current.scrollIntoView({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="layout-container">
      <span >Loading:{loading ? 'True' : 'False'}</span>
      {!loading && <section ref={sectionRef} className="inicio-user-comun">
        <Grid container className="grid-container">
          {posts.map((post) => (
            <Grid item xs={12} key={post.id}>
              {/* <Cardv post={post} /> */}
              <CardPost post={post} />
            </Grid>
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
              count={pageable.totalPages}
              color="warning"
              className="pagination-custom"
              page={pageable.pageNumber}
              onChange={handlePageChange}
            />
          </Stack>
        </Grid>
      </section>}

    </div>
  );
};

export default SectionFilterPost;

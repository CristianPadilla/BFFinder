import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import CardPet from "../Components/user-foundation/CardPet";
import Cardv from "../Components/CardVertical";
import CardPost from "../Components/post/CardPost";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "styles/SectionAllPosts.scss";
import axios from "axios";
import "styles/Home.scss";

const SectionAllPosts = () => {
  const [postList, setPostList] = useState([]);
  const sectionRef = useRef(null);
  const filters = {
    search: "",
    filters: {
      from_date: "2020-05-01",
    },
    sorting: {},
    page: 0,
    page_size: 10,
  };

  const authToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YWthbmRhQG1haWwuY29tIiwiaWF0IjoxNzAzNTM5NTgzLCJleHAiOjE3MDM2MjU5ODN9.ltl4zL4S8IxOWBpqCm1BDweifaGQ8kIUAc_ReC-lDa0";

  const axiosInstance = axios.create({
    baseURL: "http://localhost:9090",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`, // Agrega el token a la cabecera
    },
  });

  useEffect(() => {
    axiosInstance
      .post("/post/all/filter", filters)
      // .post("/pet/user/52/filter", filters)
      .then((response) => {
        console.log("Datos obtenidos:", response.data);
        setPostList(response.data.content);
        console.log("RRRRRRRRRRRRRR ", postList);
        // window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((error) => {
        console.error(
          "Error al obtener datos:",
          error.response ? error.response.data : error.message
        );
      });
  }, [postList]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Cantidad de posts por página

  // Calcula el índice del primer y último post en la página actual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Obtiene los posts que se mostrarán en la página actual
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  // Cambia la página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    sectionRef.current.scrollIntoView({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="layout-container">
      <section ref={sectionRef} className="inicio-user-comun">
      <Grid container className="grid-container">
        {currentPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4} lg={4} xl={4} spacing={1}>
          <Cardv post={post} />
        </Grid>
          // <Grid item xs={12} key={post.id}>
          //   <CardPost post={post}/>
          // </Grid>
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
            count={Math.ceil(postList.length / postsPerPage)}
            color="warning"
            className="pagination-custom"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </Grid>
    </section>
    </div>
  );
};

export default SectionAllPosts;

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Cards from "../Components/CardHorizontal";
import Cardv from "../Components/CardVertical";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "styles/SectionAllPosts.scss";
import axios from "axios";
import "styles/Home.scss";

const SectionAllPosts = () => {
  const [postList, setPostList] = useState([]);
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
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YWthbmRhQG1haWwuY29tIiwiaWF0IjoxNzAyNTYwNjUyLCJleHAiOjE3MDI2NDcwNTJ9.uhKrpeN8aD712Drgwe9nl6LlN9JIjk_4__HOLJdmv_U";

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
      .then((response) => {
        console.log("Datos obtenidos:", response.data);
        setPostList(response.data.content);
        console.log("RRRRRRRRRRRRRR ", postList);
      })
      .catch((error) => {
        console.error(
          "Error al obtener datos:",
          error.response ? error.response.data : error.message
        );
      });
  }, [postList]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // Cantidad de posts por página

  // Calcula el índice del primer y último post en la página actual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Obtiene los posts que se mostrarán en la página actual
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  // Cambia la página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="layout-container">
      <section className="inicio-user-comun">
      <Grid container className="grid-container">
        {currentPosts.map((post) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={post.id}>
            <Cardv post={post} />
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

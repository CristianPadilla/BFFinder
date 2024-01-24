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
import DialogSelectSpecie from "../Components/DialogSelectSpecie";
import { specieApi } from "../api/specieApi";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const MainContent = () => {
  const { activeModule } = useSelector((state) => state.persisted.global);
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const { totalPages, pageNumber } =
    activeModule === "posts"
      ? useSelector((state) => state.posts.page)
      : useSelector((state) => state.pets.page);

  const handlePageChange = (event, value) => {
    if (value === pageNumber + 1) return;
    activeModule === "posts"
      ? dispatch(changePostsRequest([{ page: value - 1 }]))
      : dispatch(changePetsRequest([{ page: value - 1 }]));
    // sectionRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // useEffect(() => {
  //   handleOpenDialog();
  // }, []);

  const theme = createTheme({
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            "&.MuiPaginationItem-root.Mui-selected:hover": {
              backgroundColor: "#da9054",
            },
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            // color: "#da9054",
          },
          page: {
            "&.Mui-selected": {
              backgroundColor: "#da9054",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "#E1A26A",
              color: "white", 
            },
          },
        },
      },
    },
  });

  return (
    <div className="layout-container">
      {/* <section ref={sectionRef} className="inicio-user-comun"> */}
      <Grid container spacing={1} className="grid-container">
        {activeModule === "posts" ? (
          <SectionFilterPost />
        ) : (
          <SectionFilterPet />
        )}
        <Grid item>
          <DialogSelectSpecie onClose={handleCloseDialog} open={openDialog} />
        </Grid>
      </Grid>
      <Grid
        container
        className="grid-container"
        justifyContent="center"
        alignItems="end"
      >
        <Stack spacing={2}>
          <ThemeProvider theme={theme}>
            <Pagination
              count={totalPages}
              // style={{ color: "#E1A26A", "& .Mui-selected": { backgroundColor: "#E1A26A" } }}
              className="pagination-custom"
              page={pageNumber + 1}
              onChange={handlePageChange}
            />
          </ThemeProvider>
        </Stack>
      </Grid>
      {/* </section> */}
    </div>
  );
};

export default MainContent;

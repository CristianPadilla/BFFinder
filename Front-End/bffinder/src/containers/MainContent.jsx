import React, { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import { Fab, Grid, Pagination, Tooltip } from "@mui/material";
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
import { Add } from "@mui/icons-material";
import ModalAddPet from "../Components/user-foundation/ModalAddPet";

const MainContent = ({ noResult }) => {
  const { activeModule } = useSelector((state) => state.persisted.global);
  const { role } = useSelector((state) => state.persisted.auth);
  const [tooltipOpen, setTooltipOpen] = useState(true);
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

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
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
  console.log("noResult", noResult);
  return (
    <>
      {noResult != null ? (
        noResult
      ) : (
        <div className="layout-container">
          {/* <section ref={sectionRef} className="inicio-user-comun"> */}
          <Grid container spacing={1} className="grid-container">
            {activeModule === "posts" ? (
              <SectionFilterPost />
            ) : (
              <SectionFilterPet />
            )}
            <Grid item>
              <DialogSelectSpecie
                onClose={handleCloseDialog}
                open={openDialog}
              />
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
        </div>
      )}

{ role === "s" && (
  <>
  <Tooltip
        title={
          <span style={{ fontSize: "16px" }}>
            {activeModule === "posts" ? "Crear Publicación" : "Agregar mascota"}
            {/* Crear Publicación Agregar mascota */}
          </span>
        }
        arrow
        placement="left"
        open={tooltipOpen}
        onClose={handleTooltipClose}
        onOpen={handleTooltipOpen}
      >
        <Fab
          aria-label="add"
          onClick={handleOpenDialog}
          sx={{
            position: "fixed",
            bottom: "16px",
            right: "25px",
            backgroundColor: "#E1A26A",
            "&:hover": {
              backgroundColor: "#da9054",
            },
          }}
        >
          <Add sx={{ color: "white" }} />
        </Fab>
      </Tooltip>

      <ModalAddPet
        open={openDialog}
        onClose={handleCloseDialog}
        // onAdd={handleAddPet}
      />
      </>
)}
      
    </>
  );
};

export default MainContent;

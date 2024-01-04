import React, { useEffect, useState, useRef } from "react";
import { Fab, Tooltip, Grid, Pagination } from "@mui/material";
import CardVertical from "../Components/CardVertical";
import ModalAddPet from "../Components/user-foundation/ModalAddPet";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../store/pet";

export const SectionFilterPet = () => {
  //   const pets = [];
  const dispatch = useDispatch();
  const { pets = [], loading } = useSelector((state) => state.pets);

  console.log("pets from component aaaaaaaaaaaaaa", pets);
  useEffect(
    () => {
      console.log("useEffect from componenet");
      dispatch(fetchPets(0, {}));
    },
    []
    // [postList]
  );

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
      {pets.map((pet) => (
        <Grid key={pet.id} item xs={12} sm={6} md={4} lg={4} xl={4}>
          <CardVertical pet={pet} />
        </Grid>
      ))}

      <Tooltip
        title={<span style={{ fontSize: "16px" }}>Agregar mascota</span>}
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

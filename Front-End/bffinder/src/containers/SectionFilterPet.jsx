import React, { useEffect, useState, useRef } from "react";
import { Fab, Tooltip, Grid, Pagination } from "@mui/material";
import CardVertical from "../Components/CardVertical";
import ModalAddPet from "../Components/user-foundation/ModalAddPet";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets, startFetchPets } from "../store/pet";

export const SectionFilterPet = () => {
  //   const pets = [];
  const dispatch = useDispatch();
  const { page, loading } = useSelector((state) => state.pets);
  const { pets } = page;
  const petsRequest = {
    search: "",
    size: "",
    specie_id: 0,
    breed_id: 0,
    age: 0,
    gender: "",
    vaccinated: null,
    sterilized: null,
    dewormed: null,
    posted: null,
    sort: "",
    desc: false,
    page: 0,
    page_size: 10,
  };

  // console.log("pets from component aaaaaaaaaaaaaa", pets);
  useEffect(
    () => {
      // console.log("useEffect from componenet");
      dispatch(startFetchPets(petsRequest));
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
        <Grid key={pet.id} item xs={5} sm={3} md={3} lg={4} xl={4}>
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

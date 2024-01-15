import React, { useState } from "react";
import { Fab, Tooltip, Grid, Pagination } from "@mui/material";
import CardVertical from "../Components/CardVertical";
import ModalAddPet from "../Components/user-foundation/ModalAddPet";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

export const SectionFilterPet = () => {
  const { page, isSaving } = useSelector((state) => state.pets);
  const { pets } = page;

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
    isSaving
      ? <h2> Loadinggg</h2 >
      :
      <>
        {pets && pets.map((pet) => (
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

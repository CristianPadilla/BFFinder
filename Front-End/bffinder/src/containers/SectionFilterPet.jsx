import React, { useState } from "react";
import { Fab, Tooltip, Grid, Pagination } from "@mui/material";
import CardVertical from "../Components/CardVertical";
import ModalAddPet from "../Components/user-foundation/ModalAddPet";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import ProgressCircular from "../Components/ProgressCircular";
import DialogViewPet from "../Components/user-foundation/DialogViewPet";
import { setActivePet } from "../store/pet";

export const SectionFilterPet = () => {
  const { page, isSaving } = useSelector((state) => state.pets);
  const { pets } = page;
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.pets);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialogViewPet = () => {
    dispatch(setActivePet(null));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };



  return isSaving ? (
    <ProgressCircular />
  ) : (
    <>
      {
        pets &&
          pets.map((pet) => (
            <Grid key={pet.id} item xs={5} sm={3} md={3} lg={4} xl={4}>
              <CardVertical pet={pet} />
            </Grid>
          ))
        // <Grid key={pets[0].id} item xs={5} sm={3} md={3} lg={4} xl={4}>
        //   <CardVertical pet={pets[0]} />
        // </Grid>
      }

      {active != null && (
        <DialogViewPet
          open={active != null}
          onClose={handleCloseDialogViewPet}
        />
      )}
    </>
  );
};

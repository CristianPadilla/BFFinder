import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormAddPet from "../post/FormAddPet";
import FormAddPost from "./FormAddPost";

const ModalAddPet = ({ open, onClose, onAdd }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "600",
        }}
      >
        Agregar mascota
        <IconButton color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* <FormAddPet /> */}
        <FormAddPost />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancelar
        </Button>
        {/* <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={onAdd}
        >
          Agregar
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddPet;

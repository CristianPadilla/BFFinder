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
import { useSelector } from "react-redux";

const ModalAddPet = ({ open, onClose, onAdd }) => {
  const { activeModule } = useSelector((state) => state.persisted.global);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "600",
        }}
      >
        {activeModule === "posts" ? "Publica una mascota" : "Registra una mascota"}

        <IconButton color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {activeModule === "posts" ? <FormAddPost /> : <FormAddPet />}
        {/* <FormAddPet /> */}

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

import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Button, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ErrorMessage, useField } from "formik";

const StyledDrag = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .file-upload-wrap {
    position: relative;
    height: 100px;
    border: 4px solid #d0d7de;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      background-color: transparent;
      border: 4px dashed #d0d7de;
      cursor: pointer;
    }
  }

  .file-upload-input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer; /* Añadir cursor pointer para indicar que es clickeable */
  }

  .text-information {
    text-align: center;
    margin: 1rem;

    a {
      color: #1976d2;
      text-decoration: underline;
      cursor: pointer; /* Añadir cursor pointer para indicar que es clickeable */
    }
  }

  .image-container {
    position: relative;
    margin: 1rem;
    height: 400px;
    overflow: hidden;
  }

  .center img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
  }

  .delete-button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const DragAndDrop = ({ label, name, errorClassName, ...props }) => {
  const [imageSelectedPrevious, setImageSelectedPrevious] = useState(null);
  const [field, meta, helpers] = useField(name);

  // console.log(`meta del ${name}  = `, meta);

  const changeImage = (e) => {
    if (e.target.files[0] !== undefined) {
      const file = e.target.files[0];
      const allowedFormats = ["jpg", "jpeg", "png"];
      const extension = file.name.split(".").pop().toLowerCase();

      if (!allowedFormats.includes(extension)) {
        helpers.setError("Formato no permitido");
        return;
      }

      // Añadir validación de tamaño de archivo
      const maxSizeInMB = 10;
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > maxSizeInMB) {
        console.log("El tamaño de la imagen es demasiado grande");
        helpers.setError("El tamaño de la imagen es demasiado grande, el tamaño debe ser menor a 10MB");
        
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result);

        // Limpiar el mensaje de error
        helpers.setError("");
        // Establecer el valor del campo
        helpers.setValue(e.target.result);
      };
    } else {
      // Limpiar el mensaje de error si no se selecciona ninguna imagen
      helpers.setError("");
      setImageSelectedPrevious(null);
      // Limpiar el valor del campo
      helpers.setValue(null);
    }
  };

  const deleteImage = () => {
    setImageSelectedPrevious(null);
    // Limpiar el mensaje de error
    helpers.setError("");
    // Limpiar el valor del campo
    helpers.setValue(null);
  };

  return (
    <>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          margin: ".5rem",
          padding: ".1rem",
          borderRadius: "",
          alignItems: "center",
        }}
      >
        <StyledDrag>
          <div className="file-upload-wrap">
            <input
              className="file-upload-input"
              type="file"
              accept="image/*"
              multiple
              name={name}
              onBlur={props.onBlur}
              onChange={(e) => {
                changeImage(e);
              }}
            />
            <div className="text-information">
              <Typography variant="h6">
                {label || "Arrastre su imagen dentro de esta área"}
                <br />o haga clic&nbsp;
                <a href="#" onClick={() => console.log("Clickeado")}>
                  aquí
                </a>
              </Typography>
            </div>
          </div>

          {imageSelectedPrevious && (
            <div className="image-container">
              <div className="center">
                <img src={imageSelectedPrevious} alt="" />
              </div>
              <Button
                className="delete-button"
                variant="contained"
                color="error"
                size="small"
                onClick={deleteImage}
              >
                <IconButton>
                  <DeleteIcon sx={{ color: "white", marginLeft: "-12px" }} />
                </IconButton>
                Eliminar
              </Button>
            </div>
          )}
        </StyledDrag>
        {/* <div style={{ textAlign: "center", marginTop: "-6px" }}>
      {meta.touched && meta.error && (
        <span className={errorClassName} style={{ fontSize: ".8rem" }}>
          {meta.error}
        </span>
      )}
    </div> */}
      </Paper>
      <div style={{ textAlign: "center", marginTop: "-6px" }}>
        <ErrorMessage
          name={name}
          component="span"
          className={errorClassName}
          style={{ fontSize: ".8rem", color: "red" }}
        />
      </div>
    </>
  );
};

export default DragAndDrop;

import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Button, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useField, ErrorMessage } from "formik";

const StyledDrag = styled.div`
.file-upload-wrap {
  position: relative;
  height: 100px;
  // width: 100px;
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
  cursor: pointer;
}

.text-information {
  text-align: center;
  margin: 1rem;

  a {
    color: #1976d2;
    text-decoration: underline;
    cursor: pointer;
  }
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.center img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
}

  // .images-row {
  //   display: flex;
  //   overflow-x: auto;
  //   width: 100%;
  // }

  .image-container {
    flex: 0 0 auto;
    margin: 0.5rem;
    height: 200px;
    width: calc(100% / 6 - 1rem);
    overflow: hidden;
    position: relative;
  }

  .delete-button {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 15px;
  }
`;

const GroupDragandDrop = ({ label, name, errorClassName, ...props }) => {
  const [imagesSelected, setImagesSelected] = useState([]);
  const [field, meta, helpers] = useField(name);
  const [isInputVisible, setIsInputVisible] = useState(true);

  const changeImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const allowedFormats = ["jpg", "jpeg", "png"];
      const extension = file.name.split(".").pop().toLowerCase();

      if (!allowedFormats.includes(extension)) {
        helpers.setError("Formato no permitido");
        return;
      }

      // Añadir validación de tamaño de archivo
      const maxSizeInMB = 1;
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > maxSizeInMB) {
        console.log("El tamaño dede un de los archivos excede el tamaño permitido de 10 MB");
        helpers.setError("El tamaño de la imagen es demasiado grande, el tamaño debe ser menor a 10MB");

        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        e.preventDefault();
        const newImage = { name: file.name, data: e.target.result };

        // Verificar si la imagen ya está en la lista
        const alreadyExists = imagesSelected.some((img) => img.name === newImage.name);

        if (!alreadyExists && imagesSelected.length < 6) {
          setImagesSelected((prevImagesSelected) => {
            // Mueve la comprobación aquí
            if (prevImagesSelected.length + 1 === 6) {
              setIsInputVisible(false);
            }
            props.setImages([...prevImagesSelected, newImage])
            return [...prevImagesSelected, newImage];
          });
        }
      };
    }
  };

  const deleteImage = (index) => {
    setImagesSelected((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      // Verificar si se han eliminado suficientes imágenes para mostrar el input nuevamente
      if (updatedImages.length < 6) {
        setIsInputVisible(true);
      }
      props.setImages(updatedImages)
      return updatedImages;
    });
  };
  // console.log('KKKKKKKKKKKKKKKKKKKKKK imagesSelected : ', imagesSelected);
  return (
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
        {isInputVisible && ( // Mostrar el input solo si es visible
          <div className="file-upload-wrap">
            <input
              className="file-upload-input"
              type="file"
              accept="image/*"
              name={name}
              onBlur={props.onBlur}
              multiple
              onChange={(e) => {
                changeImage(e);
              }}
            />
            <div className="text-information">
              <Typography variant="h6">
                {label || "Arrastre su imagen aquí"}
                <br />o haga clic&nbsp;
                <a href="#" onClick={() => console.log("Clickeado")}>
                  aquí
                </a>
              </Typography>
            </div>
          </div>
        )}

        <div className="image-list">
          {imagesSelected.map((image, index) => (
            <div key={index} className="image-container">
              <div className="center">
                <img src={image.data} alt={image.name} />
              </div>
              <Button
                className="delete-button"
                variant="contained"
                color="error"
                size="small"
                sx={{ minWidth: "5px", padding: "0" }}
                onClick={() => deleteImage(index)}
              >
                <IconButton>
                  <DeleteIcon sx={{ color: "white" }} />
                </IconButton>
              </Button>
            </div>
          ))}
        </div>
      </StyledDrag>

      <div style={{ textAlign: "center", marginTop: "-6px" }}>
        <ErrorMessage
          name={name}
          component="span"
          className={errorClassName}
          style={{ fontSize: ".8rem", color: "red" }}
        />
      </div>
    </Paper>
  );
};

export default GroupDragandDrop;

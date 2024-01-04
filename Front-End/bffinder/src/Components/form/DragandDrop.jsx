import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

const DragAndDrop = (props) => {
  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
  const { value, name, onChange } = props;
  const changeImage = (e) => {
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result);
      };
    }
  };

  const deleteImage = () => {
    setImageSelectedPrevious(null);
  };

  return (
    <StyledDrag>
      <div className="file-upload-wrap">
        <input
          className="file-upload-input"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            changeImage(e);
          }}
        />
        <div className="text-information">
          <Typography variant="h6">
            Arrastre su imagen dentro de esta área
            <br />o haga clic&nbsp;
            <a href="#" onClick={() => console.log("Clickeado")}>
              aquí
            </a>
          </Typography>
        </div>
      </div>

      {ImageSelectedPrevious && (
        <div className="image-container">
          <div className="center">
            <img src={ImageSelectedPrevious} alt="" />
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
  );
};

export default DragAndDrop;

import React, { useState } from "react";
import { Card, 
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";
import imgdefault from "imgs/logo-bffinder.png";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import "styles/Card.scss";
import DialogViewPet from "./user-foundation/DialogViewPet";
import { useNavigate } from "react-router-dom";

const CardVertical = ({ pet }) => {
  const { name,
    breedDetails,
    specie,
    size,
    age,
    vaccinated,
    sterilized,
    dewormed,
    published,
    images,
    dangerous,
   } = pet;
  // console.log("log: ", pet);

  const navigate = useNavigate();
  
  const handleVerClick = () => {
    navigate("/ver-publicacion");
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div
      className="custom-card"
      style={{ display: "flex", justifyContent: "center", margin: "4% 0" }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 350, borderRadius: "18px" }}
        elevation={6}
      >
        <CardActionArea>
        <div className="card-click" onClick={handleOpenDialog} >
        
          <CardHeader
            avatar={
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontSize: "1.4rem" }}
              >
                {name}
              </Typography>
            }
            action={
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "1rem", marginTop: ".4rem" }}
              >
                {breedDetails.specie.name} - {breedDetails.name}
              </Typography>
            }
          />
          <div style={{ width: "100%", height: "250px", overflow: "hidden" }}>
            <CardMedia
              component="img"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              image={
                images && images.length > 0 ? images[0].profileImageUrl : imgdefault
              }
              alt="Imagen"
            />
          </div>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                >
                  Tamaño: {size}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                >
                  Edad: {age} años
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                >
                  Genero: {breedDetails.name}
                </Typography>
              </Grid>

              {/* Columna Derecha */}
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                >
                  {/* {console.log("Valor de vaccinated:", vaccinated)} */}
                  Vacunado:{" "}
                  {vaccinated ? (
                    <CheckIcon color="success" sx={{ fontSize: 15 }} />
                  ) : (
                    <CloseIcon color="error" sx={{ fontSize: 15 }} />
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                >
                  Esterilizado:{" "}
                  {sterilized ? (
                    <CheckIcon color="success" sx={{ fontSize: 15 }} />
                  ) : (
                    <CloseIcon color="error" sx={{ fontSize: 15 }} />
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: ".9rem", marginBottom: "1rem" }}
                >
                  Desparasitado:{" "}
                  {dewormed ? (
                    <CheckIcon color="success" sx={{ fontSize: 15 }} />
                  ) : (
                    <CloseIcon color="error" sx={{ fontSize: 15 }} />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          
        </div>
        </ CardActionArea>
        <CardActions>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginLeft: "1px" }}
          >
            <Button variant="contained" size="small" onClick={handleVerClick}>
              Ver publicación
            </Button>
            {/* <Typography variant="body2" color="text.secondary" sx={{ padding: '.4rem', backgroundColor: 'lightgreen', borderRadius: '4px', fontWeight: '600', marginLeft: '8px'}}>
    En proceso de adopción
  </Typography> */}
            {published ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  padding: ".4rem",
                  backgroundColor: "lightgreen",
                  borderRadius: "4px",
                  fontWeight: "600",
                  marginLeft: "8px",
                }}
              >
                En proceso de adopción
              </Typography>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  padding: ".4rem",
                  backgroundColor: "lightcoral",
                  color: "white",
                  borderRadius: "4px",
                  fontWeight: "600",
                  marginLeft: "8px",
                  width: "178px",
                  textAlign: "center",
                }}
              >
                Sin publicar
              </Typography>
            )}
          </Grid>
        </CardActions>
      </Card>
      <DialogViewPet open={openDialog} onClose={handleCloseDialog}/>
    </div>
  );
};

export default CardVertical;

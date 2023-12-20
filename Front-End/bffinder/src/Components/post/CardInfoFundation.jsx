import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Grid,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const CardInfoFundation = () => {
  return (
    <div>
      <Card elevation={3} sx={{borderRadius: '18px' }}>
        <CardHeader
          avatar={<Avatar aria-label="avatar">A</Avatar>}
          title={
            <Typography variant="h6" component="div">
              Perfil
            </Typography>
          }
          subheader={
            <Stack direction="row" alignItems="center">
            <LocationOnIcon fontSize="small" style={{ fontSize: 15, marginBottom: "4px", marginRight: ".3rem" }}/>
            <Typography variant="body2"> Valle del Cauca / Cali</Typography>
          </Stack>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Barrio: Nombre del Barrio
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Dirección: Dirección de la ubicación
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <PhoneIcon fontSize="small" style={{ marginBottom: "-3px", marginRight: ".3rem" }}/> Número Cel: (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <WhatsAppIcon fontSize="small" style={{ marginBottom: "-3px", marginRight: ".3rem" }}/> Whatsapp: (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
              <LanguageIcon fontSize="small" style={{ marginBottom: "-4px", marginRight: ".3rem" }}/> Página web: www.ejemplo.com
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <FacebookIcon fontSize="large"/>  <YouTubeIcon fontSize="large"/>  <InstagramIcon fontSize="large"/>  <TwitterIcon fontSize="large"/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardInfoFundation;

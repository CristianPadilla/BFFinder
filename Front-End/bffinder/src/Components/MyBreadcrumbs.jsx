import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from '@mui/material/Link';

const MyBreadcrumbs = () => {
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ fontSize: '.9rem'}}
      >
        <Link underline="hover" color="inherit" href="/">Publicaciones de Adopción</Link>
        {/* <Link underline="hover" color="inherit" href="/">example</Link> */}
        <Typography color="textPrimary" sx={{ fontSize: '.9rem'}} >Página Actual</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default MyBreadcrumbs;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, Card, CardContent } from "@mui/material";
import { RegisterUserPage } from "../pages/RegisterUserPage";
import { RegisterFoundationPage } from "../pages/RegisterFoundationPage";
import "../styles/Card.scss";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState("user");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedRole(newValue === 0 ? "user" : "foundation");
  };

  return (
    <Card
      sx={{
        height: "93vh",
        width: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="¿Quieres adoptar?" value={0} />
        <Tab label="¿Tienes un refugio?" value={1} />
      </Tabs>

      <CardContent sx={{ flex: "1" }}>
        <CustomTabPanel value={value} index={0}>
          <h2 className="titulo-r">Registrarse</h2>
          <Box sx={{ overflowY: "auto", maxHeight: "72vh", paddingTop: 4, paddingBottom: 3 }}>
            <RegisterUserPage />
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <h2 className="titulo-r">Registrarse</h2>
          <Box sx={{ overflowY: "auto", maxHeight: "72vh", paddingTop: 4, paddingBottom: 3 }}>
            <RegisterFoundationPage />
          </Box>
        </CustomTabPanel>
      </CardContent>
    </Card>
  );
}

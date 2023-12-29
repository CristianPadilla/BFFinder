import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
    <Card className="card-register">
      <CardContent>
        <Box>
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Usuario Regular" value={0} />
              <Tab label="Fundación" value={1} />
            </Tabs>
          </Box>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <h2 className="titulo-r">Registrarse</h2>
          <RegisterUserPage />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <h2 className="titulo-r">Registrarse</h2>
          <RegisterFoundationPage />
        </CustomTabPanel>
      </CardContent>
    </Card>
  );
}

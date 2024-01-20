import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Settings,
  QuestionAnswer,
  Favorite,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveModule } from "../store/global";

const ProfilePanel = () => {
  const dispatch = useDispatch();
  const { name, photoUrl } = useSelector((state) => state.persisted.auth);
  const user = {
    name: name || "Usuario",
    joinDate: "01/01/2022",
  };

  // const navigationItems = [
  //   { text: "Perfil", icon: <AccountCircle />, link: "/perfil" },
  //   { text: "Configuración", icon: <Settings />, link: "/configuracion" },
  //   { text: "Preguntas", icon: <QuestionAnswer />, link: "/preguntas" },
  //   { text: "Favoritos", icon: <Favorite />, link: "/favoritos" },
  // ];
  const navigationItems = [
    { value: "profile", text: "Perfil", icon: <AccountCircle /> },
    { value: "config", text: "Configuración", icon: <Settings /> },
    { value: "questions", text: "Preguntas", icon: <QuestionAnswer /> },
    { value: "favs", text: "Favoritos", icon: <Favorite /> },
  ];

  const handleModuleChange = (e) => {
    console.log("handleModuleChange===", e.currentTarget.dataset.value);
    dispatch(setActiveModule({ module: e.currentTarget.dataset.value }));
  };



  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Avatar src={photoUrl || ""} sx={{ width: 100, height: 100 }} />
        <Typography variant="h6" sx={{ marginTop: 1, marginBottom: 0 }}>
          {user.name}
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item, index) => (
          <ListItem
            onClick={handleModuleChange}
            button
            key={index}
            component={Link}
            to={item.link}
            data-value={item.value}
            sx={{ margin: ".9rem" }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ProfilePanel;

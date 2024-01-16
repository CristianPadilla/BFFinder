import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { AccountCircle, Settings, QuestionAnswer, Favorite } from '@mui/icons-material';

const ProfilePanel = () => {
  const user = {
    name: 'Nombre del Usuario',
    joinDate: '01/01/2022',
  };

  const navigationItems = [
    { text: 'Perfil', icon: <AccountCircle />, link: '/perfil' },
    { text: 'Configuración', icon: <Settings />, link: '/configuracion' },
    { text: 'Preguntas', icon: <QuestionAnswer />, link: '/preguntas' },
    { text: 'Favoritos', icon: <Favorite />, link: '/favoritos' },
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Avatar sx={{ width: 64, height: 64 }} />
        <Typography variant="h6" sx={{ marginTop: 1, marginBottom: 0 }}>
          {user.name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Se unió el {user.joinDate}
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ProfilePanel;
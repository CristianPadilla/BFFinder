import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from "react-router-dom";

const PerfilMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(false);
  const [selected2, setSelected2] = React.useState(false);

  const handleToggle1 = () => {
    setSelected(true);
    setSelected2(false);
    if (!selected) {
      navigate("/ejemplo");
    }
  };

  const handleToggle2 = () => {
    setSelected(false);
    setSelected2(true);
    if (!selected2) {
      navigate("/ejemplo");
    }
  };

  const commonButtonStyles = {
    borderRadius: '16px',
    // color: "#A0A0A0",
    // color: "black",
    color: "#BA8C63",
    mr: '1rem',
  };
  
  const selectedButtonStyles = {
    backgroundColor: "#BA8C63", // Cambia el color cuando el botón está seleccionado
    color: "white", // Cambia el color del texto cuando el botón está seleccionado
    border: "1px solid white",
    fontWeight: "bold", 
    "&:hover": {
      backgroundColor: "#BA8C63",
      color: "white",
    },
  };

  const handleLogout = () => {
    // Aquí puedes realizar las acciones necesarias para cerrar la sesión
    // Por ejemplo, podrías limpiar el token de autenticación, etc.

    // Después, redirige al usuario a la página de inicio de sesión
    navigate('/login');
    
    // Cierra el menú (si es necesario)
    handleClose();
  };

    return (
        <div>
           <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <IconButton aria-label="" size="large">
        <FavoriteIcon />
        </IconButton> */}
        {/* <Button variant="outlined" startIcon={<FavoriteIcon />}>

        </Button> */}
        <Tooltip title={<span style={{ fontSize: '16px' }}>Adoptar</span>} arrow>
           <ToggleButton
            value="check"
             selected={selected2}
             onChange={handleToggle2}
          sx={{
            ...commonButtonStyles,
            "&.Mui-selected": selectedButtonStyles,
          }}
        >
          <PetsIcon /> <Typography sx={{ minWidth: 100 }}>Adoptar</Typography>
        </ToggleButton>
        </Tooltip>

        <Tooltip title={<span style={{ fontSize: '16px' }}>Favoritos</span>} arrow>
        <ToggleButton
          value="check"
          selected={selected}
          // style={buttonStyle}
          onChange={handleToggle1}
          sx={{
            ...commonButtonStyles,
            "&.Mui-selected": selectedButtonStyles,
          }}
        >
          <FavoriteIcon /> <Typography sx={{ minWidth: 100 }}>Favoritos</Typography>
        </ToggleButton>
        </Tooltip>   

        <Tooltip title={<span style={{ fontSize: '16px' }}>Perfil</span>} arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 3 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 37, height: 37, backgroundColor: "blue" }}>EX</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Mi Cuenta
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuraciones
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu> 
        </div>
    );
};

export default PerfilMenu;
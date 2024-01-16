import * as React from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  ToggleButton,
} from "@mui/material";
import { Settings, Logout, Favorite, Pets } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../store/auth';
import { changeActiveModule } from '../store/global';

const PerfilMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { page } = useSelector((state) => state.pets);
  const { activeModule } = useSelector((state) => state.persisted.global);
  const { role } = useSelector((state) => state.persisted.auth);

  const postsModuleTitle = role === 'u' ? "Adoptar" : "Mis publicaciones";
  
  const commonButtonStyles = {
    borderRadius: "16px",
    // color: "#A0A0A0",
    // color: "black",
    color: "#BA8C63",
    mr: "1rem",
  };

  const selectedButtonStyles = {
    backgroundColor: "#BA8C63",
    color: "white",
    border: "1px solid white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#BA8C63",
      color: "white",
    },
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/ver-perfil");
  };

  const handleChangeModule = (module) => {
    dispatch(changeActiveModule({ module }))
  };

  const handleLogout = () => {
    dispatch(startLogout({}));
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip
          title={<span style={{ fontSize: "16px" }}>{postsModuleTitle}</span>}
          arrow
        >
          <ToggleButton
            value="posts"
            selected={activeModule === "posts" ? true : false}
            onClick={() => handleChangeModule("posts")}
            sx={{
              ...commonButtonStyles,
              "&.Mui-selected": selectedButtonStyles,
            }}
          >
            <Pets />{" "}
            <Typography sx={{ minWidth: 100 }}>{postsModuleTitle}</Typography>
          </ToggleButton>
        </Tooltip>

        {role === "s" && (
          <Tooltip
            title={<span style={{ fontSize: "16px" }}>Mascotas</span>}
            arrow
          >
            <ToggleButton
              value="pets"
              selected={activeModule === "pets" ? true : false}
              // style={buttonStyle}
              onClick={() => handleChangeModule("pets")}
              disabled={false}
              sx={{
                ...commonButtonStyles,
                "&.Mui-selected": selectedButtonStyles,
              }}
            >
              <Favorite />{" "}
              <Typography sx={{ minWidth: 100 }}>Mascotas</Typography>
            </ToggleButton>
          </Tooltip>
        )}

        <Tooltip title={<span style={{ fontSize: "16px" }}>Perfil</span>} arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 3 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 37, height: 37, backgroundColor: "blue" }}>
              EX
            </Avatar>
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
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile}>
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
        <MenuItem onClick={handleProfile}>
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
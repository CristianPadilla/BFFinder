import React from "react";
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
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../store/auth";
import { changeActiveModule, setActiveModule } from "../store/global";
import { startGetLoggedUserInformation } from "../store/global";

const PerfilMenuAdmin = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { activeModule } = useSelector((state) => state.persisted.global);
  const { photoUrl } = useSelector((state) => state.persisted.auth);
  const { role } = useSelector((state) => state.persisted.auth);

  const commonButtonStyles = {
    borderRadius: "16px",
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

  const handleChangeModule = (module) => {
    dispatch(changeActiveModule({ module }));
  };

  const handleLogout = () => {
    dispatch(startLogout({}));
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>

        {/* {role === "s" && ( */}
          <Tooltip
            title={<span style={{ fontSize: "16px" }}>Gestión usuarios</span>}
            arrow
          >
            <ToggleButton
              value="pets"
            //   selected={activeModule === "pets" ? true : false}
              selected={true}
              // style={buttonStyle}
              onClick={() => handleChangeModule("pets")}
              disabled={false}
              sx={{
                ...commonButtonStyles,
                "&.Mui-selected": selectedButtonStyles,
              }}
            >
              {/* <Favorite />{" "} */}
              <Typography sx={{ minWidth: 100, marginLeft: 1 }}>Gestión usuarios</Typography>
            </ToggleButton>
          </Tooltip>
        {/* )} */}

          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 3 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={photoUrl || ""}
              sx={{ width: 37, height: 37, marginRight: 1 }}>
            </Avatar>Administrador
          </IconButton>

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

export default PerfilMenuAdmin;

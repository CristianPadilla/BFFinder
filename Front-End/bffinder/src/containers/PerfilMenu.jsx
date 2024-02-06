import React, { useEffect } from "react";
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
  Badge,
} from "@mui/material";
import {
  Settings,
  Logout,
  Favorite,
  Pets,
  QuestionAnswer,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../store/auth";
import { changeActiveModule, setActiveModule } from "../store/global";
import { startGetLoggedUserInformation } from "../store/global";
import { startFetchPendingQuestionsCount } from "../store/questions";

const PerfilMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { activeModule } = useSelector((state) => state.persisted.global);
  const { photoUrl } = useSelector((state) => state.persisted.auth);
  const { role } = useSelector((state) => state.persisted.auth);
  const { pendingQuestionsCount } = useSelector((state) => state.questions);


  useEffect(() => {
    // console.log('useEffect== 11 : ', questions);

    dispatch(startFetchPendingQuestionsCount());
  }, []);

  const [count, setCount] = React.useState(Math.floor(Math.random() * 10) + 1);
  const postsModuleTitle = role === "u" ? "Adoptar" : "Mis publicaciones";



  const commonButtonStyles = {
    borderRadius: "16px",
    // color: "#A0A0A0",
    // color: "black",
    color: "#BA8C63",
    // mr: "1rem",
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

  const handleProfile = (e) => {
    console.log("handleProfile===", e.currentTarget.dataset.value);
    dispatch(setActiveModule({ module: e.currentTarget.dataset.value }));
    navigate("/account");
  };

  const handleChangeModule = (module) => {
    dispatch(changeActiveModule({ module }));
  };

  const handleLogout = () => {
    dispatch(startLogout({}));
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await dispatch(startGetLoggedUserInformation());
  //     console.log("profile MENU: ", user);
  //     if (isMounted.current) {
  //       setUser(user);
  //     }
  //   };
  //   fetchUser();

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  // console.log("DATOSSS: ", photoUrl);

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
              marginRight: "1rem"
            }}
          >
            <Pets />{" "}
            <Typography sx={{ minWidth: 100, marginLeft: 1 }}>
              {postsModuleTitle}
            </Typography>
          </ToggleButton>
        </Tooltip>

        {role === "s" && (
          <Tooltip
            title={<span style={{ fontSize: "16px" }}>Mis mascotas</span>}
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
              <Typography sx={{ minWidth: 100, marginLeft: 1 }}>
                Mis Mascotas
              </Typography>
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
            <Badge color="warning" badgeContent={pendingQuestionsCount}
            // anchorOrigin={{
            //   vertical: 'top',
            //   horizontal: 'left',
            // }}
            >
              <Avatar
                src={photoUrl || ""}
                sx={{ width: 37, height: 37 }}
              ></Avatar>
            </Badge>
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
        <MenuItem data-value="profile" onClick={handleProfile}>
          {/* <Avatar />  */}
          Mi Cuenta
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
        <MenuItem data-value="config" onClick={handleProfile}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem>
        {role === "s" && (
          <MenuItem data-value="questions" onClick={handleProfile}>
            <ListItemIcon>
              <Badge color="warning" badgeContent={pendingQuestionsCount}
              // anchorOrigin={{
              //   vertical: 'top',
              //   horizontal: 'left',
              // }}
              >
                <QuestionAnswer fontSize="small" />
              </Badge>
            </ListItemIcon>
            Preguntas
          </MenuItem>
        )}

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

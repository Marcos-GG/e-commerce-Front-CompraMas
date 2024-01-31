import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Hidden,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

const NavBarAdmin = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        bgcolor: "#F5F5F5",
        height: "3.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 5px 15px #888888",
        position: "sticky",
      }}
    >
      <Box>
        <Hidden
          mdUp //manejamos la vida del componente desplegable
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="top" open={drawerOpen} onClose={handleDrawerToggle}>
            {" "}
            {/* modificamos el estado */}
            <List
              sx={{
                bgcolor: "#f5f5f5",
              }}
            >
              <ListItem button component={NavLink} to="/">
                <Typography variant="body1" sx={{ textDecoration: "none" }}>
                  Home
                </Typography>
              </ListItem>
              <ListItem button component={NavLink} to="/admin">
                <Typography variant="body1" sx={{ textDecoration: "none" }}>
                  Comentarios
                </Typography>
              </ListItem>
              <ListItem button component={NavLink} to="/admin/users">
                <Typography variant="body1" sx={{ textDecoration: "none" }}>
                  Usuarios
                </Typography>
              </ListItem>
              <ListItem button component={NavLink} to="/admin/products">
                <Typography variant="body1" sx={{ textDecoration: "none" }}>
                  Productos
                </Typography>
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/admin/desactivatedProducts"
              >
                <Typography variant="body1" sx={{ textDecoration: "none" }}>
                  Productos Desactivados
                </Typography>
              </ListItem>
              <ListItem button component={NavLink} to="/admin/createProduct">
                <Typography variant="body1" sx={{ textDecoration: "none" }}>
                  Crear Producto
                </Typography>
              </ListItem>
              <ListItem button component={NavLink} to="/logout">
                <Typography variant="body1" sx={{ textDecoration: "none" }}>
                  LogOut
                </Typography>
              </ListItem>
            </List>
          </Drawer>
        </Hidden>

        <Hidden // controlamos la vida del componente
          mdDown
        >
          <Box
            sx={{
              width: "100vw",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ ml: "20px", display: "flex", gap: "15px" }}>
              <Button
                variant="contained"
                component={NavLink}
                to="/"
                size="small"
              >
                Home
              </Button>
              <Button
                variant="contained"
                component={NavLink}
                to="/admin"
                size="small"
              >
                Comentarios
              </Button>
              <Button
                variant="contained"
                component={NavLink}
                to="/admin/users"
                size="small"
              >
                Usuarios
              </Button>
              <Button
                variant="contained"
                component={NavLink}
                to="/admin/products"
                size="small"
              >
                Productos
              </Button>
              <Button
                variant="contained"
                component={NavLink}
                to="/admin/desactivatedProducts"
                size="small"
              >
                Productos Desactivados
              </Button>
              <Button
                variant="contained"
                component={NavLink}
                to="/admin/createProduct"
                size="small"
              >
                Crear Producto
              </Button>
            </Box>

            <Box sx={{ mr: "20px" }}>
              <Button
                variant="contained"
                size="small"
                component={NavLink}
                to="/logout"
              >
                LogOut
              </Button>
            </Box>
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
};

export default NavBarAdmin;

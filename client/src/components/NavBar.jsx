import {
  Box,
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const admin = localStorage.getItem("admin");
  const ShoppingCart = useSelector((state) => state.shoppingCart);

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
        boxShadow: "0px 5px 15px #888888;",
        position: "sticky",
        width: "100%",
      }}
    >
      <Box>
        <Hidden mdUp>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ ml: "15px" }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
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
              {admin && (
                <ListItem button component={NavLink} to="/admin">
                  <Typography variant="body1" sx={{ textDecoration: "none" }}>
                    Administador
                  </Typography>
                </ListItem>
              )}
              <ListItem button component={NavLink} to="/carrito">
                <Typography variant="body1" sx={{ textDecoration: "none" }}>
                  Carrito{" "}
                  {ShoppingCart?.products?.length > 0
                    ? `(${ShoppingCart?.products?.reduce(function (acc, obj) {
                        return acc + (obj?.cantidad || 1);
                      }, 0)})`
                    : ""}
                </Typography>
              </ListItem>
              <ListItem button component={NavLink} to="/favoritos">
                <Typography variant="body1" sx={{ textDecoration: "none" }}>
                  Favoritos
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
      </Box>

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
          <Box
            sx={{
              ml: "20px",
              display: "flex",
              gap: "15px",
            }}
          >
            <Button variant="contained" component={NavLink} to="/" size="small">
              Home
            </Button>

            <Button
              variant="contained"
              component={NavLink}
              to="/carrito"
              size="small"
            >
              Carrito
              {ShoppingCart?.products?.length > 0
                ? `(${ShoppingCart?.products?.reduce(function (acc, obj) {
                    return acc + (obj?.cantidad || 1);
                  }, 0)})`
                : ""}
            </Button>

            <Button
              variant="contained"
              component={NavLink}
              to="/favoritos"
              size="small"
            >
              Favoritos
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
  );
};

export default NavBar;

import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBarAdmin = () => {
  return (
    <Box
      sx={{
        bgcolor: "#F5F5F5",
        height: "3.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 5px 15px #888888;",
      }}
    >
      <Box sx={{ display: "flex", gap: "15px", ml: "20px" }}>
        <NavLink to="/">
          <Button variant="contained" size="small">
            {" "}
            Home{" "}
          </Button>
        </NavLink>

        <NavLink to="/admin">
          <Button variant="contained" size="small">
            {" "}
            Comentarios{" "}
          </Button>
        </NavLink>

        <NavLink to="/admin/users">
          <Button variant="contained" size="small">
            {" "}
            Usuarios{" "}
          </Button>
        </NavLink>

        <NavLink to="/admin/products">
          <Button variant="contained" size="small">
            {" "}
            Productos{" "}
          </Button>
        </NavLink>

        <NavLink to="/admin/desactivatedProducts">
          <Button variant="contained" size="small">
            {" "}
            Productos Desactivados
          </Button>
        </NavLink>

        <NavLink to="/admin/createProduct">
          <Button variant="contained" size="small">
            Crear Producto
          </Button>
        </NavLink>
      </Box>

      <Box sx={{ mr: "20px" }}>
        <NavLink to="/logout">
          <Button variant="contained" size="small">
            LogOut
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
};

export default NavBarAdmin;

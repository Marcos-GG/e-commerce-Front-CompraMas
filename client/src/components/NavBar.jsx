import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const admin = localStorage.getItem("admin");

  const ShoppingCart = useSelector((state) => state.shoppingCart);

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
      }}
    >
      <Box sx={{ display: "flex", gap: "15px", ml: "20px" }}>
        <NavLink to="/">
          <Button variant="contained" size="small">
            Home
          </Button>
        </NavLink>

        {admin && (
          <NavLink to="/admin">
            <Button variant="contained" size="small">
              Administador
            </Button>
          </NavLink>
        )}

        <NavLink to="/carrito">
          <Button variant="contained" size="small">
            Carrito
            {ShoppingCart?.products?.length > 0
              ? `(${ShoppingCart?.products?.reduce(function (acc, obj) {
                  return acc + (obj?.cantidad || 1);
                }, 0)})`
              : ""}
          </Button>
        </NavLink>

        <NavLink to="/favoritos">
          <Button variant="contained" size="small">
            Favoritos
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

export default NavBar;

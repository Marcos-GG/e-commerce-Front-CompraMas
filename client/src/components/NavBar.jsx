import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const admin = localStorage.getItem("admin");

  const ShoppingCart = useSelector((state) => state.shoppingCart);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        width: 1,
        py: 2,
      }}
    >
      <div>
        {admin && (
          <NavLink to="/admin">
            <button> Administador </button>
          </NavLink>
        )}
        <NavLink to="/">
          <button> Home </button>
        </NavLink>

        <NavLink to="/carrito">
          <button>
            {" "}
            Carrito{" "}
            {ShoppingCart?.products?.length > 0
              ? `(${ShoppingCart?.products?.reduce(function (acc, obj) {
                  return acc + (obj?.cantidad || 1);
                }, 0)})`
              : ""}
          </button>
        </NavLink>

        <NavLink to="/favoritos">
          <button> Favoritos </button>
        </NavLink>
      </div>
      <div>
        <NavLink to="/logout">
          <button> LogOut </button>
        </NavLink>
      </div>
    </Box>
  );
};

export default NavBar;

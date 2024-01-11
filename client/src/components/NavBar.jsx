import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const admin = localStorage.getItem("admin");

  const ShoppingCart = useSelector((state) => state.shoppingCart);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
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
              ? `(${ShoppingCart?.products?.length})`
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
    </div>
  );
};

export default NavBar;

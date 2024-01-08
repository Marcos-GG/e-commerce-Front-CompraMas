import { NavLink } from "react-router-dom";

const NavBar = () => {
  const admin = localStorage.getItem("admin");

  return (
    <>
      {admin && (
        <NavLink to="/admin">
          <button> Administador </button>
        </NavLink>
      )}
      <NavLink to="/">
        <button> Home </button>
      </NavLink>

      <NavLink to="/carrito">
        <button> Carrito </button>
      </NavLink>

      <NavLink to="/favoritos">
        <button> Favoritos </button>
      </NavLink>
    </>
  );
};

export default NavBar;

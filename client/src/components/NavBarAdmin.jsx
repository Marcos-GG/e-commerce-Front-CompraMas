import { NavLink } from "react-router-dom";

const NavBarAdmin = () => {
  return (
    <>
      <NavLink to="/admin">
        <button> Comentarios </button>
      </NavLink>

      <NavLink to="/admin/users">
        <button> Usuarios </button>
      </NavLink>
    </>
  );
};

export default NavBarAdmin;

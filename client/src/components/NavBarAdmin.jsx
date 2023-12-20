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

      <NavLink to="/admin/products">
        <button> Productos </button>
      </NavLink>

      <NavLink to="/admin/desactivatedProducts">
        <button> Productos Desactivados</button>
      </NavLink>

      <NavLink to="/admin/createProduct">
        <button>Crear Producto</button>
      </NavLink>
    </>
  );
};

export default NavBarAdmin;

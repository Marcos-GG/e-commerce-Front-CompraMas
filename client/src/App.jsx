/* eslint-disable react-hooks/exhaustive-deps */
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./views/Home/Home";
import Admin from "./views/Admin/Admin";
import NavBarAdmin from "./components/NavBarAdmin";
import Login from "./views/Login/Login";
import UserBlocked from "./components/Userblocked";
import Register from "./views/Register/Register";
import FormProduct from "./components/FormProduct";
import ProductsAdmin from "./components/ProductsAdmin";
import DesactivatedProducts from "./components/DesactivatedProducts";
import DetailProduct from "./views/DetailProduct/DetailProduct";
import ShoppingCart from "./views/ShoppingCart/ShoppingCart";
import NavBar from "./components/NavBar";
import Favoritos from "./components/Favoritos";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogOut from "./views/Logout/LogOut";
import "./App.css";
import { SET_INITIAL_CART } from "./Redux/actionsTypes/ShoppingCartActionTypes";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const tokenLocalStorage = localStorage.getItem("token");
  const adminLocalStorage = localStorage.getItem("admin") === "true";

  const tokenRedux = useSelector((state) => state.token.token);
  const adminRedux = useSelector((state) => state.token.admin);

  const token = tokenRedux || tokenLocalStorage;
  const admin = adminRedux || adminLocalStorage;

  useEffect(() => {
    if (
      !token &&
      !location.pathname.includes("login") &&
      !location.pathname.includes("register")
    ) {
      navigate("/login"); // Redirigir a la página de inicio de sesión si no hay un token y no es la página de inicio de sesión
    }
  }, [token, location.pathname, navigate, admin]);

  const dispatch = useDispatch();

  useEffect(() => {
    const cart = localStorage.getItem("carrito");
    if (cart) {
      const parseCart = JSON.parse(cart);

      console.log(parseCart, "cart parseado");

      dispatch({
        type: SET_INITIAL_CART,
        payload: parseCart,
      });
    }
  }, []);

  return (
    <div>
      {location.pathname.includes("admin") ? (
        <NavBarAdmin />
      ) : (
        !location.pathname.includes("login") && <NavBar />
      )}
      <Routes>
        <Route
          path="/register"
          element={token ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Login />} // Si ya hay un token en local storage o Redux, redirigir a Home
        />
        <Route path="/logout" element={<LogOut />} />
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />} // Si no hay un token, redirigir a Login
        />
        <Route
          path="/admin"
          element={token && admin ? <Admin /> : <Navigate to="/login" />} // Si no hay un token o si no es admin, redirigir a Login
        />

        <Route
          path="/admin/desactivatedProducts"
          element={
            token && admin ? <DesactivatedProducts /> : <Navigate to="/login" />
          } // Si no hay un token o si no es admin, redirigir a Login
        />

        <Route
          path="/admin/products"
          element={
            token && admin ? <ProductsAdmin /> : <Navigate to="/login" />
          } // Si no hay un token o si no es admin, redirigir a Login
        />

        <Route
          path="/detail/:id"
          element={!token ? <Navigate to="/login" /> : <DetailProduct />}
        />

        <Route
          path="/admin/users"
          element={token ? <UserBlocked /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/createProduct"
          element={token && admin ? <FormProduct /> : <Navigate to="/login" />}
        />

        <Route
          path="/carrito"
          element={token ? <ShoppingCart /> : <Navigate to="/login" />}
        />

        <Route
          path="/favoritos"
          element={token ? <Favoritos /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;

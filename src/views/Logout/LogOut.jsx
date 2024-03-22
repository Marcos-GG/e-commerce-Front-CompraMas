/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { LOGOUT } from "../../Redux/actionsTypes/LoginRegisterTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CLEAN_CARRITO } from "../../Redux/actionsTypes/ShoppingCartActionTypes";

export default function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: LOGOUT });
    // localStorage.removeItem("carrito");
    localStorage.clear();
    dispatch({ type: CLEAN_CARRITO });
    navigate("/login");
  }, []);

  return <div>LogOut</div>;
}

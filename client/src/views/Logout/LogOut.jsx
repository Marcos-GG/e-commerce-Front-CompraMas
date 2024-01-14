import { useEffect } from "react";
import { LOGOUT } from "../../Redux/actionsTypes/LoginRegisterTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: LOGOUT });
    // localStorage.removeItem("carrito");
    localStorage.clear();
    navigate("/login");
  }, []);

  return <div>LogOut</div>;
}

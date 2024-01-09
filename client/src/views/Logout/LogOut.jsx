import { useEffect } from "react";
import { LOGOUT } from "../../Redux/actionsTypes/LoginRegisterTypes";
import { useDispatch } from "react-redux";

export default function LogOut() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  }, [dispatch]);

  return <div>LogOut</div>;
}

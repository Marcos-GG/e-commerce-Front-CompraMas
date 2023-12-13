import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Redux/actions/UsersAction";
import { useEffect } from "react";

const UserBlocked = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>bloquear usuarios</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            Nombre: {user.name} {user.lastname}
          </p>
        </div>
      ))}
    </>
  );
};

export default UserBlocked;

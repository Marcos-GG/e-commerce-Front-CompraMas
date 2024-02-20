import { useDispatch, useSelector } from "react-redux";
import {
  blockUser,
  getUsers,
  unlockUser,
  deleteUser,
} from "../Redux/actions/UsersAction";
import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";

const UserBlocked = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  console.log(users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserBlocked = (user) => {
    if (user.active) {
      dispatch(blockUser(user));
    } else {
      dispatch(unlockUser(user));
    }
  };

  const handlerDeleteUser = (user) => {
    dispatch(deleteUser(user));
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: "35px" }}>
        Bloquear usuarios
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "90%",
          m: "auto",
        }}
      >
        {users.map((user) => (
          <Box
            sx={{
              height: "14rem",
              width: "10rem",
              bgcolor: "#F5F5F5",
              m: "15px",
              borderRadius: "5px",
              boxShadow: "10px 10px 15px #888888",
            }}
            key={user.id}
          >
            <Box
              sx={{
                height: "68%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50%",
                  flexDirection: "column",
                }}
              >
                {user?.active ? (
                  <AccountCircleIcon sx={{ color: "gray", fontSize: "6rem" }} />
                ) : (
                  <NoAccountsIcon sx={{ color: "gray", fontSize: "8rem" }} />
                )}
              </Box>

              <Box
                sx={{
                  maxHeight: "40px",
                  overflow: "break-word",
                  wordWrap: "break-word",
                }}
              >
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {user.name} {user.lastname}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {/* faltan botones para bloquear y desbloquear clientes */}
              <Button
                variant="contained"
                sx={{ width: "80%" }}
                size="small"
                onClick={() => handleUserBlocked(user)}
              >
                {user?.active ? "Bloquear" : "Desbloquear"}
              </Button>
              <Button
                variant="contained"
                sx={{ width: "80%", mb: "5px" }}
                size="small"
                onClick={() => handlerDeleteUser(user)}
              >
                eliminar
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserBlocked;

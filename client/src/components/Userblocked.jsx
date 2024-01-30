import { useDispatch, useSelector } from "react-redux";
import { blockUser, getUsers, unlockUser } from "../Redux/actions/UsersAction";
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

  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: "35px" }}>
        Bloquear usuarios
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          bgcolor: "red",
          width: "80%",
          m: "auto",
        }}
      >
        {users.map((user) => (
          <Box
            sx={{
              height: "18rem",
              width: "14rem",
              bgcolor: "#F5F5F5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: "15px",
              borderRadius: "5px",
            }}
            key={user.id}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                // width: "8rem",
                height: "68%",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {user?.active ? (
                <AccountCircleIcon sx={{ color: "gray", fontSize: "8rem" }} />
              ) : (
                <NoAccountsIcon sx={{ color: "gray", fontSize: "8rem" }} />
              )}

              <Typography
                variant="body1"
                component="p"
                sx={{
                  textAlign: "center",
                  width: "12rem",
                }}
              >
                {user.name} {user.lastname}
              </Typography>
            </Box>

            <Box>
              {/* faltan botones para bloquear y desbloquear clientes */}
              <Button
                variant="contained"
                sx={{ marginBottom: "15px", width: "8rem" }}
                size="small"
                onClick={() => handleUserBlocked(user)}
              >
                {user?.active ? "Bloquear" : "Desbloquear"}
              </Button>
              <br />
              <Button
                variant="contained"
                sx={{ marginButton: "15px", width: "100%" }}
                size="small"
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

import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Redux/actions/UsersAction";
import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";

const UserBlocked = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  console.log(users);

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              bgcolor: "beige",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: "15px",
              borderRadius: "10px",
            }}
            key={user.id}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                bgcolor: "white",
                flexWrap: "wrap",
                // width: "8rem",
                height: "68%",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {user?.active ? (
                <AccountCircleIcon sx={{ color: "gray", fontSize: "7rem" }} />
              ) : (
                <NoAccountsIcon sx={{ color: "gray", fontSize: "7rem" }} />
              )}

              <Typography
                variant="body1"
                component="p"
                sx={{
                  textAlign: "center",
                  bgcolor: "red",
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

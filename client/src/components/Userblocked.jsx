/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  blockUser,
  getUsers,
  unlockUser,
  deleteUser,
  getUsersName,
} from "../Redux/actions/UsersAction";
import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SearchIcon from "@mui/icons-material/Search";
import Respuesta from "./Respuesta";

const UserBlocked = () => {
  const isLTE426 = useMediaQuery(`(max-width: 426px)`);
  const isLTE779 = useMediaQuery(`(max-width: 779px)`);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [nameUser, setNameUser] = useState({
    string: "",
  });

  const handlerName = (event) => {
    setNameUser({ string: event.target.value });
  };

  useEffect(() => {
    dispatch(getUsersName(nameUser.string));
  }, [nameUser.string]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerUserBlocked = (user) => {
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
      <Respuesta />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: isLTE426 ? "center" : "end",
          mb: "15px",
          p: "10px",
        }}
      >
        <TextField
          id="search"
          label="Buscar usuario"
          variant="outlined"
          onChange={handlerName}
          InputProps={{
            endAdornment: <SearchIcon />,
            sx: {
              fontSize: isLTE426 ? "15px" : "17px",
              width: isLTE426 ? "12rem" : "15rem",
              height: isLTE426 ? "2.7rem" : "3rem",
              mr: "15px",
            },
          }}
          sx={{
            "& label": {
              fontSize: isLTE426 ? "13px" : "15px",
              color: "gray",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: isLTE779 ? "99%" : "80%",
          m: "auto",
          height: "45rem",
          maxHeight: "50rem",
          overflow: "auto",
        }}
      >
        <Box sx={{ width: "95%", m: "auto" }}>
          {users &&
            users.map((user) => (
              <Box
                sx={{
                  // height: "14rem",
                  width: "100%",
                  borderRadius: "5px",
                  display: "flex",
                  mt: "3px",
                  border: "1px solid gray",
                }}
                key={user.id}
              >
                <Box
                  sx={{
                    width: "90%",
                    height: "3.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "50%",
                      ml: "5px",
                      flexDirection: "column",
                    }}
                  >
                    {user?.active ? (
                      <AccountCircleIcon
                        sx={{
                          color: "gray",
                          fontSize: isLTE426 ? "2.5rem" : "3rem",
                        }}
                      />
                    ) : (
                      <NoAccountsIcon
                        sx={{
                          color: "gray",
                          fontSize: isLTE426 ? "2.5rem" : "3rem",
                        }}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      maxHeight: "40px",
                      overflow: "break-word",
                      wordWrap: "break-word",
                      ml: isLTE779 ? "0.5rem" : "1.5rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{
                        textAlign: "center",
                        fontSize: isLTE426 && "15px",
                        overflow: "hidden",
                      }}
                    >
                      {user.name} {user.lastname}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "10%",
                    minWidth: isLTE779 ? "7rem" : "8rem",
                    bgcolor: "#F5f5f5",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "80%",
                        cursor: "pointer",
                      }}
                      size="small"
                      onClick={() => handlerUserBlocked(user)}
                    >
                      {user?.active ? (
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <LockOpenIcon
                            fontSize={isLTE426 ? "13px" : "small"}
                          />
                          <Typography
                            sx={{
                              fontSize: isLTE426 ? "13px" : isLTE779 && "15px",
                            }}
                          >
                            Bloquear
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",

                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <LockIcon fontSize={isLTE426 ? "13px" : "small"} />
                          <Typography
                            sx={{
                              fontSize: isLTE426 ? "13px" : isLTE779 && "15px",
                            }}
                          >
                            Desbloquear
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Divider sx={{ bgcolor: "#F5F5F5", width: "80%" }} />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        cursor: "pointer",
                      }}
                      size="small"
                      onClick={() => handlerDeleteUser(user)}
                    >
                      <DeleteForeverIcon
                        fontSize={isLTE426 ? "13px" : "small"}
                      />{" "}
                      <Typography sx={{ fontSize: isLTE426 && "13px" }}>
                        Eliminar
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserBlocked;

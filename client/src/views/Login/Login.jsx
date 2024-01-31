import { useState } from "react";
import { useDispatch } from "react-redux";
import { postLogin } from "../../Redux/actions/LoginRegister";

import { NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  Box,
  Button,
  Card,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";

function Login() {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLessThanOrEqual762 = useMediaQuery(theme.breakpoints.down(762));
  const isLessThanOrEqual507 = useMediaQuery(theme.breakpoints.down(507));

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const formHandler = (event) => {
    const campo = event.target.name;
    let value = event.target.value;

    setForm({
      ...form,
      [campo]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ejecuta la acción de inicio de sesión con los datos del formulario
    dispatch(postLogin(form));

    event.target.reset();
  };

  return (
    // <Box sx={{ display: "flex" }}>
    <Box
      sx={{
        background:
          "linear-gradient(0deg, rgba(2,0,36,0.8) 0%, rgba(9,102,121,1) 47%, rgba(0,212,255,1) 100%);",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          // bgcolor: "#81b2c1",
          backdropFilter: "blur(20px)",
          borderRadius: "30px",
          boxShadow: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isLessThanOrEqual762 ? "column" : "row",
            // width: "35rem",
            justifyContent: "center",
            // height: "30rem",
            alignItems: "center",
            p: 6,
            maxWidth: "90vw",
          }}
        >
          <Box
            mb={2.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              component="img"
              src="/logonegro.svg"
              sx={{
                display: "flex",
                mr: isLessThanOrEqual507 ? "10px" : "50px",
                width: isLessThanOrEqual507 ? "17rem" : "24rem",
              }}
            />
            <Typography variant="subtitle2">
              Ingresa tu correo electrónico y contraseña
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: isLessThanOrEqual507
                  ? "16rem"
                  : isLessThanOrEqual762
                  ? "27rem"
                  : isMdScreen
                  ? "15rem"
                  : "27rem",
                maxWidth: "90vw",
                gap: 2,
                maxHeight: "80vh",
              }}
            >
              <Box>
                {/* <MailOutlineIcon sx={{ marginLeft: "10px" }} /> */}
                <TextField
                  name="email"
                  value={form.email}
                  onChange={formHandler}
                  variant="outlined"
                  placeholder="E-mail"
                  fullWidth
                  sx={{
                    backgroundColor: "transparent",
                    width: "100%",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box>
                <TextField
                  name="password"
                  value={form.password}
                  onChange={formHandler}
                  variant="outlined"
                  placeholder="Password"
                  fullWidth
                  type="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box
                sx={{
                  py: 1,
                }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<LoginIcon />}
                >
                  Iniciar sesión
                </Button>
              </Box>
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle2">
                  <u>Olvide mi contraseña</u>
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle2">
                  No tenes una cuenta?{" "}
                  <NavLink to="/register" style={{ textDecoration: "none" }}>
                    <u>Registrate acá</u>
                  </NavLink>
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;

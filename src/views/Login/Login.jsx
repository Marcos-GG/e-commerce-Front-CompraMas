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
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import Respuesta from "../../components/Respuesta";
import Validations from "../../Validations/Validations";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Login() {
  const isLTE507 = useMediaQuery(`(max-width: 507px)`);
  const isLTE700 = useMediaQuery(`(max-width: 700px)`);

  const [error, setError] = useState();

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

    setError(
      Validations(
        {
          ...form,
          [campo]: value,
        },
        campo
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ejecuta la acción de inicio de sesión con los datos del formulario
    dispatch(postLogin(form));

    event.target.reset();
  };

  const [visibility, setvisibility] = useState(false);

  const handleVisibility = () => {
    setvisibility(!visibility);
  };

  return (
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
      <Respuesta />
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isLTE700 ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            p: isLTE507 ? 2 : 4,
            maxWidth: "90vw",
          }}
        >
          <Box
            mb={isLTE700 ? "2.3rem" : 2.5}
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
                mr: isLTE507 ? "10px" : "50px",
                width: /* isLessThanOrEqual507 ? "17rem" : */ "24rem",
                maxWidth: "100%",
              }}
            />
          </Box>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "24rem",
              height: isLTE700 && "20rem",
              maxWidth: "98%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "100%",
                maxWidth: "90vw",
                gap: 2,
                maxHeight: "80vh",
              }}
            >
              <Box>
                {error?.email && (
                  <Typography sx={{ fontSize: "13px", color: "red" }}>
                    {error.email}
                  </Typography>
                )}
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
                {error?.password && (
                  <Typography sx={{ fontSize: "13px", color: "red" }}>
                    {error.password}
                  </Typography>
                )}
                <TextField
                  name="password"
                  value={form.password}
                  onChange={formHandler}
                  variant="outlined"
                  placeholder="Password"
                  fullWidth
                  type={!visibility ? "password" : "text"}
                  InputProps={{
                    endAdornment: form.password ? (
                      <IconButton onClick={() => handleVisibility()}>
                        {visibility ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    ) : (
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

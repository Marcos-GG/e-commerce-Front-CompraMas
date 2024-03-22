import { useState } from "react";
import { useDispatch } from "react-redux";
import { postUsers } from "../../Redux/actions/LoginRegister";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import Validations from "../../Validations/Validations";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Register() {
  const isLTE483 = useMediaQuery(`(max-width: 483px)`);

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& input": {
              width: "100%",
              height: isLTE483 ? "0.6rem" : "1rem",
              fontSize: isLTE483 && "15.5px",
            },
            width: "100%",
            marginTop: "20px ",
          },
        },
      },
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visibility, setvisibility] = useState(false);

  const handleVisibility = () => {
    setvisibility(!visibility);
  };

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    DNI: "",
    birthDate: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(postUsers(form));
      navigate("/login");
    } catch (error) {
      return error.message;
    }
    event.target.reset();
  };

  const getMaxDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background:
            "linear-gradient(0deg, rgba(2,0,36,0.8) 0%, rgba(9,102,121,1) 47%, rgba(0,212,255,1) 100%);",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            borderRadius: 4,
            maxWidth: "28rem",
            width: "94%",
            maxHeight: "98%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box my={1.8}>
              <Box
                component="img"
                src="/logonegro.svg"
                sx={{
                  display: "flex",
                  mr: "50px",
                  maxWidth: "20rem",
                  width: "95%",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "90%",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Box>
                  {error?.name && (
                    <Typography
                      sx={{ fontSize: "13px", color: "red", mb: "-20px" }}
                    >
                      {error.name}
                    </Typography>
                  )}

                  <TextField
                    placeholder="Nombre"
                    type="text"
                    name="name"
                    onChange={formHandler}
                    value={form.name}
                  />
                </Box>
                <Box>
                  {error?.lastname && (
                    <Typography
                      sx={{ fontSize: "13px", color: "red", mb: "-20px" }}
                    >
                      {error.lastname}
                    </Typography>
                  )}

                  <TextField
                    placeholder="Apellido"
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={formHandler}
                  />
                </Box>
                <Box>
                  {error?.email && (
                    <Typography
                      sx={{ fontSize: "13px", color: "red", mb: "-20px" }}
                    >
                      {error.email}
                    </Typography>
                  )}

                  <TextField
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={formHandler}
                  />
                </Box>
                <Box>
                  {error?.DNI && (
                    <Typography
                      sx={{ fontSize: "13px", color: "red", mb: "-20px" }}
                    >
                      {error.DNI}
                    </Typography>
                  )}

                  <TextField
                    placeholder="DNI"
                    type="number"
                    name="DNI"
                    value={form.DNI}
                    onChange={formHandler}
                  />
                </Box>
                <Box>
                  {error?.birthDate && (
                    <Typography
                      sx={{ fontSize: "13px", color: "red", mb: "-20px" }}
                    >
                      {error.birthDate}
                    </Typography>
                  )}

                  <TextField
                    type="date"
                    name="birthDate"
                    placeholder="Fecha de nacimiento"
                    value={form.birthDate}
                    onChange={formHandler}
                    InputProps={{
                      inputProps: {
                        max: getMaxDate(),
                      },
                    }}
                  />
                </Box>
                <Box>
                  {error?.phone && (
                    <Typography
                      sx={{ fontSize: "13px", color: "red", mb: "-20px" }}
                    >
                      {error.phone}
                    </Typography>
                  )}

                  <TextField
                    placeholder="Número de teléfono"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={formHandler}
                  />
                </Box>
                <Box>
                  {error?.password && (
                    <Typography
                      sx={{ fontSize: "13px", color: "red", mb: "-20px" }}
                    >
                      {error.password}
                    </Typography>
                  )}

                  <TextField
                    placeholder="Contraseña"
                    type={!visibility ? "password" : "text"}
                    name="password"
                    value={form.password}
                    onChange={formHandler}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => handleVisibility()}>
                          {visibility ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    m: "25px 0 15px 0",
                  }}
                >
                  <Button variant="contained" type="submit" value="Enviar">
                    Registrarse
                  </Button>
                  <Button
                    component={NavLink}
                    to="/login"
                    sx={{
                      fontSize: isLTE483 && "13.7px",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default Register;

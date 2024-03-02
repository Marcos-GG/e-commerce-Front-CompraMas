import { useState } from "react";
import { useDispatch } from "react-redux";
import { postUsers } from "../../Redux/actions/LoginRegister";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  TextField,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";

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

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    DNI: "",
    birthDate: "",
    phone: "",
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
                  <TextField
                    placeholder="Nombre"
                    type="text"
                    name="name"
                    onChange={formHandler}
                    value={form.name}
                  />
                </Box>
                <Box>
                  <TextField
                    placeholder="Apellido"
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={formHandler}
                  />
                </Box>
                <Box>
                  <TextField
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={formHandler}
                  />
                </Box>
                <Box>
                  <TextField
                    placeholder="DNI"
                    type="text"
                    name="DNI"
                    value={form.DNI}
                    onChange={formHandler}
                  />
                </Box>
                <Box>
                  <TextField
                    type="date"
                    name="birthDate"
                    placeholder="Fecha de nacimiento"
                    value={form.birthDate}
                    onChange={formHandler}
                  />
                </Box>
                <Box>
                  <TextField
                    placeholder="Número de teléfono"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={formHandler}
                  />
                </Box>
                <Box>
                  <TextField
                    placeholder="Contraseña"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={formHandler}
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

import { useState } from "react";
import { useDispatch } from "react-redux";
import { postLogin } from "../../Redux/actions/LoginRegister"; // Asegúrate de importar la acción correcta para el inicio de sesión

function Login() {
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
    <div>
      <h1>¡Hola, soy el formulario de inicio de sesión!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={formHandler}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={formHandler}
          />
        </div>
        <div>
          <input type="submit" value="Iniciar Sesión" />
        </div>
      </form>
    </div>
  );
}

export default Login;

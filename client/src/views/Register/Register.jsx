import { useState } from "react";
import { useDispatch } from "react-redux";
import { postUsers } from "../../Redux/actions/LoginRegister";

function Register() {
  const dispatch = useDispatch();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postUsers(form));
    event.target.reset();
  };

  return (
    <div>
      <h1>hola soy register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            onChange={formHandler}
            value={form.name}
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={formHandler}
          />
        </div>
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
          <label>DNI:</label>
          <input
            type="text"
            name="DNI"
            value={form.DNI}
            onChange={formHandler}
          />
        </div>
        <div>
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={formHandler}
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
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
          <input type="submit" value="Enviar" />
        </div>
      </form>
    </div>
  );
}

export default Register;

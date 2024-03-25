const Validations = (form, campo) => {
  const error = {};
  // login
  if (campo === "email") {
    if (!form.email) {
      error.email = "Campo está vacio.";
    } else if (/^[a-zA-Z]+\d*@[a-zA-Z]+\.[a-zA-Z]+$/.test(form.email)) {
      error.email = "";
    } else {
      error.email = "Incorrecto.";
    }
  }

  if (campo === "password") {
    if (!form.password) {
      error.password = "Campo está vacio.";
    } else if (!/^[a-zA-Z0-9]+$/.test(form.password)) {
      error.password = "Solo letras y numeros.";
    }
  }

  // form
  if (campo === "name") {
    if (!form.name) {
      error.name = "Campo está vacio.";
    } else if (form.name.length > 13) {
      error.name = "Máximo 13 caracteres.";
    }
  }

  if (campo === "lastname") {
    if (!form.lastname) {
      error.lastname = "Campo está vacio.";
    } else if (form.lastname.length > 12) {
      error.lastname = "Máximo 12 caracteres.";
    }
  }

  // create Product
  if (campo === "title") {
    if (!form.title) {
      error.title = "Campo está vacio.";
    } else if (form.title.length > 36) {
      error.title = "Titulo demasiado largo.";
    } else if (form.title.length < 5) {
      error.title = "Titulo demasiado corto.";
    }
  }

  if (campo === "image1") {
    if (!form.image1) {
      error.image1 = "Campo vacio.";
    } else if (!/^https?:\/\/.*/.test(form.image1)) {
      error.image1 = "URL no válida.";
    }
  }

  if (campo === "image2") {
    if (!form.image2) {
      error.image2 = "Campo vacio.";
    } else if (!/^https?:\/\/.*/.test(form.image2)) {
      error.image2 = "URL no válida.";
    }
  }

  if (campo === "image3") {
    if (!form.image3) {
      error.image3 = "Campo vacio.";
    } else if (!/^https?:\/\/.*/.test(form.image3)) {
      error.image3 = "URL no válida.";
    }
  }

  if (campo === "image4") {
    if (!form.image4) {
      error.image4 = "Campo vacio.";
    } else if (!/^https?:\/\/.*/.test(form.image4)) {
      error.image4 = "URL no válida.";
    }
  }

  if (campo === "description") {
    if (!form.description) {
      error.description = "Campo vacio.";
    } else if (form.description.length > 1000) {
      error.description = "Descripción demasiado largo. (máximo 1000).";
    } else if (form.description.length < 20) {
      error.description = "Descripción demasiado corto. (mínimo 20).";
    }
  }

  if (campo === "price") {
    if (!form.price) {
      error.price = "Campo vacio.";
    } else if (/[^0-9]/.test(form.price)) {
      error.price = "No se aceptan puntos ni comas.";
    }
  }

  if (campo === "birthDate") {
    const today = new Date();

    const fechaIngresada = new Date(form.birthDate);

    const años = today.getFullYear() - fechaIngresada.getFullYear();

    if (!form.birthDate) {
      error.birthDate = "Campo vacio.";
    } else if (!(today >= fechaIngresada) || !(años >= 18)) {
      error.birthDate = "Debe tener al menos 18 años.";
    }
  }

  if (campo === "DNI") {
    if (!form.DNI) {
      error.DNI = "Campo vacio.";
    } else if (form.DNI.length < 7) {
      error.DNI = "Minimo 8 caracteres.";
    } else if (form.DNI.length > 8) {
      error.DNI = "Máximo 8 caracteres.";
    }
  }

  if (campo === "phone") {
    if (!form.phone) {
      error.phone = "Campo vacio.";
    } else if (!/^[0-9]+$/.test(form.phone)) {
      error.phone = "Solo se aceptan números.";
    } else if (form.phone.length > 10) {
      error.phone = "Máximo 10 caracteres.";
    }
  }

  return error;
};

export default Validations;

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

  return error;
};

export default Validations;

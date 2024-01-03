export const configureHeaders = (Token) => {
  try {
    const token = localStorage.getItem("token");

    if (!token && !Token) {
      //("Token no encontrado en localStorage");
      return {};
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return {
      headers,
    };
  } catch (error) {
    console.error("Error al acceder al token en el localStorage:", error);
    return {};
  }
};

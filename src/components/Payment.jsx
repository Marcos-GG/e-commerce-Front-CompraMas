import { Box } from "@mui/material";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useSelector } from "react-redux";

// comienza siendo el boton y termina siendo el check out

const Payment = () => {
  // inicializamos mercadopago
  initMercadoPago(import.meta.env.VITE_PUBLIC_KEY, {
    //locale ( idioma de la integracion)
    locale: "es-AR",
  });

  const preferenceId = useSelector((state) => state.products.preferenceId);

  return (
    <Box>
      {preferenceId && (
        <Wallet
          initialization={{ preferenceId: preferenceId }}
          // customization={{ texts: { valueProp: "hola" } }}
        />
      )}
    </Box>
  );
};

export default Payment;

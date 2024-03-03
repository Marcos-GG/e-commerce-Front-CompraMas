/* eslint-disable react/prop-types */
import { Box, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CLEAN_ERROR,
  CLEAN_SUCCESS,
} from "../Redux/actionsTypes/ProductsActionTypes";

const Respuesta = () => {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.products.success);
  const error = useSelector((state) => state.products.error);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (success) {
      setMessage(success);
      setSeverity("success");
      setOpen(true);
    } else if (error) {
      setMessage(error);
      setSeverity("error");
      setOpen(true);
    }
  }, [success, error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setMessage("");
    if (success) dispatch({ type: CLEAN_SUCCESS });
    if (error) dispatch({ type: CLEAN_ERROR });
  };

  return (
    <Box sx={{ zIndex: 6 }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Respuesta;

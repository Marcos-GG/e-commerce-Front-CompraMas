import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders";

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} from "../actionsTypes/ShoppingCartActionTypes";
import { SUCCESS } from "../actionsTypes/ProductsActionTypes";

export const addProduct = (product) => {
  return async function (dispatch) {
    const carrito = localStorage.getItem("carrito");

    if (!carrito) {
      let carritoCreado = [
        {
          ...product,
          cantidad: 1,
        },
      ];

      localStorage.setItem("carrito", JSON.stringify(carritoCreado));
    } else {
      let carritoObtenido = localStorage.getItem("carrito");
      let carritoParse = JSON.parse(carritoObtenido);

      const siExiste = carritoParse.findIndex(
        (productoDeCarrito) => product.id === productoDeCarrito.id
      );

      if (siExiste !== -1) {
        carritoParse[siExiste].cantidad += 1;
      } else {
        carritoParse.push({ ...product, cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carritoParse));
    }

    dispatch({ type: ADD_PRODUCT, payload: product });
  };
};

export const removeProduct = (product) => {
  return async function (dispatch) {
    let carritoObtenido = localStorage.getItem("carrito");

    if (carritoObtenido) {
      let carritoParse = JSON.parse(carritoObtenido);

      const siExiste = carritoParse.findIndex(
        (productoDeCarrito) => product.id === productoDeCarrito.id
      );

      if (siExiste !== -1) {
        carritoParse[siExiste].cantidad -= 1;
      }

      const mayoresAUno = carritoParse.filter(
        (product) => product.cantidad > 0
      );

      localStorage.setItem("carrito", JSON.stringify(mayoresAUno));
    }

    dispatch({ type: REMOVE_PRODUCT, payload: product });
  };
};

export const finalizarCompra = () => {
  return async function (dispatch) {
    const config = configureHeaders();

    await axios.post(`${import.meta.env.VITE_LOCALHOST}compra`, {}, config);

    dispatch({ type: SUCCESS, payload: "Compra finalizada con éxito!" });
  };
};

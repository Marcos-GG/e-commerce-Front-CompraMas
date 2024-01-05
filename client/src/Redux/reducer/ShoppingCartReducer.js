import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} from "../actionsTypes/ShoppingCartActionTypes";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      const siExiste = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (siExiste !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[siExiste].cantidad += 1;

        return { ...state, products: updatedProducts };
      } else {
        return {
          ...state,
          products: [...state.products, { ...action.payload, cantidad: 1 }],
        };
      }
    }

    case REMOVE_PRODUCT: {
      const siExiste = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (siExiste !== -1) {
        const updatedProducts = [...state.products];

        updatedProducts[siExiste].cantidad -= 1;

        const mayoresAUno = updatedProducts.filter(
          (product) => product.cantidad > 0
        );

        return { ...state, products: mayoresAUno };
      }

      return;
    }

    default:
      return { ...state };
  }
};

export default reducer;

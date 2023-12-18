import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
} from "../actionsTypes/ProductsActionTypes";

const initialState = {
  products: [],
  productId: [],
  desactivatedproducts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      const statusTrue = action.payload.filter(
        (product) => product.status === true
      );
      console.log(statusTrue, "productos activados");

      const statusFalse = action.payload.filter(
        (product) => product.status === false
      );
      console.log(statusFalse, "productos desactivados");

      return {
        ...state,
        products: statusTrue,
        desactivatedproducts: statusFalse,
      };
    }

    case GET_PRODUCT_ID: {
      return { ...state, productId: action.payload };
    }

    default:
      return { ...state };
  }
};

export default reducer;

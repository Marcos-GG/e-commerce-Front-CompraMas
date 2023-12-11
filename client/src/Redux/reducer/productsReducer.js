import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
} from "../actionsTypes/ProductsActionTypes";

const initialState = {
  products: [],
  productId: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return { ...state, products: action.payload };
    }

    case GET_PRODUCT_ID: {
      return { ...state, productId: action.payload };
    }

    default:
      return { ...state };
  }
};

export default reducer;

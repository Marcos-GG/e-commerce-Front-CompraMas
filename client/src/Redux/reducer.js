import { GET_PRODUCTS } from "./acionsTypes/ProductsActionTypes";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return { ...state, products: action.payload };
    }

    default:
      return { ...state };
  }
};

export default reducer;

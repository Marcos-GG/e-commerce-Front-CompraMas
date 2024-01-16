import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
  PUT_PRODUCT,
  MOVE_TO_ACTIVE,
  MOVE_TO_DEACTIVATE,
  CREATE_PRODUCT,
  POST_COMMENT_PRODUCT_ID,
  POST_ANSWER_PRODUCT_ID,
  PRODUCT_FILTERED,
} from "../actionsTypes/ProductsActionTypes";

const initialState = {
  products: [],
  productId: [],
  desactivatedproducts: [],
  productsFiltered: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      const statusTrue = action.payload.filter(
        (product) => product.status === true
      );

      const statusFalse = action.payload.filter(
        (product) => product.status === false
      );

      return {
        ...state,
        products: statusTrue,
        desactivatedproducts: statusFalse,
      };
    }

    case GET_PRODUCT_ID: {
      return { ...state, productId: action.payload };
    }

    case POST_COMMENT_PRODUCT_ID: {
      return {
        ...state,
        productId: {
          ...state.productId,
          Comments: [action.payload, ...state.productId.Comments],
        },
      };
    }

    case POST_ANSWER_PRODUCT_ID: {
      const commentId = action.payload.commentId;

      // encontramos el comentario especifico para agregarle answer
      const updatedComments = state.productId.Comments.map((comment) => {
        if (comment.id === commentId) {
          // actualizamos Answers y le agregamos el nuevo
          return {
            ...comment,
            Answers: [...comment.Answers, action.payload],
          };
        }
        return comment;
      });

      return {
        ...state,
        productId: {
          ...state.productId,
          Comments: updatedComments,
        },
      };
    }

    case PUT_PRODUCT: {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    }

    case MOVE_TO_ACTIVE: {
      const nuevoProductoActivado = state.desactivatedproducts.find(
        (product) => product.id === action.payload
      );

      return {
        ...state,
        products: [...state.products, nuevoProductoActivado],
        desactivatedproducts: state.desactivatedproducts.filter(
          (product) => product.id !== action.payload
        ),
      };
    }

    case MOVE_TO_DEACTIVATE: {
      const nuevoProductoDesactivado = state.products.find(
        (product) => product.id === action.payload
      );

      return {
        ...state,
        desactivatedproducts: [
          ...state.desactivatedproducts,
          nuevoProductoDesactivado,
        ],
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    }

    case CREATE_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }

    case PRODUCT_FILTERED: {
      return;
    }

    default:
      return { ...state };
  }
};

export default reducer;

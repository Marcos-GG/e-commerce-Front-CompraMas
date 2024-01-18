import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
  PUT_PRODUCT,
  MOVE_TO_ACTIVE,
  MOVE_TO_DEACTIVATE,
  CREATE_PRODUCT,
  POST_COMMENT_PRODUCT_ID,
  POST_ANSWER_PRODUCT_ID,
  APPLY_FILTERS,
  CLEAR_FILTERED_PRODUCTS,
} from "../actionsTypes/ProductsActionTypes";
import { ADD_LIKE, REMOVE_LIKE } from "../actionsTypes/LikesTypes";

const initialState = {
  products: [],
  productId: [],
  desactivatedproducts: [],
  productsFiltered: [],
  favoritos: [],
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

    case APPLY_FILTERS: {
      return {
        ...state,
        productsFiltered: action.payload,
      };
    }

    case CLEAR_FILTERED_PRODUCTS: {
      return {
        ...state,
        productsFiltered: [],
      };
    }

    case ADD_LIKE: {
      const product = state.products.find(
        (product) => product.id === action.payload.productId
      );

      product.Likes = [
        ...product.Likes,
        {
          userId: action.payload.userId,
        },
      ];

      return {
        ...state,
        favoritos: [...state.favoritos, product],
      };
    }

    case REMOVE_LIKE: {
      console.log(action.payload, "como llega a removeLIke");
      const updatedFavoritos = state.favoritos.filter(
        (product) => product.id !== action.payload.like.productId
      );

      console.log(updatedFavoritos, "favoritos sin el eliminado");

      return {
        ...state,
        favoritos: updatedFavoritos,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;

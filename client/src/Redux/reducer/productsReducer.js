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
  SET_FAVORITES,
  GET_TERM_PRODUCTS,
} from "../actionsTypes/ProductsActionTypes";
import { ADD_LIKE, REMOVE_LIKE } from "../actionsTypes/LikesTypes";

const initialState = {
  products: [],
  productId: [],
  desactivatedproducts: [],
  productsFiltered: [],
  productsFilteredFalse: [],
  favoritos: [],
  isSearchFilterUsed: false,
  isApplyFilterUsed: false,
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

    case GET_TERM_PRODUCTS: {
      if (state.isApplyFilterUsed) {
        const filteredProducts = state.productsFiltered.filter((product) => {
          const products = action.payload.some(
            (payloadProduct) => payloadProduct.id === product.id
          );

          return products && products.status;
        });
        if (filteredProducts.length > 0) {
          return {
            ...state,
            productsFiltered: filteredProducts,
            isSearchFilterUsed: true,
          };
        } else {
          // Devolver un mensaje que se mostrará al cliente
          alert(
            "No se encontraron coincidencias con los filtros aplicados previamente."
          );
          return { ...state };
        }
      } else {
        const productStatusTrue = action.payload.filter(
          (product) => product.status === true
        );
        const productStatusFalse = action.payload.filter(
          (product) => product.status === false
        );
        return {
          ...state,
          productsFiltered: productStatusTrue,
          productsFilteredFalse: productStatusFalse,
          isSearchFilterUsed: true,
        };
      }
    }

    case POST_ANSWER_PRODUCT_ID: {
      const commentId = action.payload.commentId;

      // Encuentra el comentario específico para agregarle la respuesta
      const updatedComments = state.productId.Comments.map((comment) => {
        if (comment.id === commentId) {
          // Actualiza Answers y le agrega la nueva respuesta
          return {
            ...comment,
            Answers: comment.Answers
              ? [...comment.Answers, action.payload]
              : [action.payload],
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
        productsFilteredFalse: state.productsFilteredFalse.filter(
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
        productsFiltered: state.productsFiltered.filter(
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
      if (state.isSearchFilterUsed) {
        const filterProducts = state.productsFiltered.filter((product) => {
          return action.payload.some(
            (payloadProduct) => payloadProduct.id === product.id
          );
        });
        if (filterProducts.length > 0) {
          return {
            ...state,
            productsFiltered: filterProducts,
            isApplyFilterUsed: true,
          };
        } else {
          alert(
            "No se encontraron coincidencias con los filtros aplicados previamente."
          );
          return { ...state };
        }
      } else {
        return {
          ...state,
          productsFiltered: action.payload,
          isApplyFilterUsed: true,
        };
      }
    }

    case CLEAR_FILTERED_PRODUCTS: {
      return {
        ...state,
        productsFiltered: [],
        isSearchFilterUsed: false,
        isApplyFilterUsed: false,
      };
    }

    case ADD_LIKE: {
      const product = action.payload.product;

      return {
        ...state,
        favoritos: [...state.favoritos, product],
      };
    }
    case SET_FAVORITES: {
      return {
        ...state,
        favoritos: action.payload,
      };
    }

    case REMOVE_LIKE: {
      const updatedFavoritos = state.favoritos.filter(
        (product) => product.id !== action.payload.like.productId
      );

      const updatedProducts = state.products.map((product) => {
        if (product.id === action.payload.like.productId) {
          const updatedLikes = product.Likes.filter(
            (like) => like.userId !== action.payload.userId
          );
          return {
            ...product,
            Likes: updatedLikes,
          };
        }
        return product;
      });

      return {
        ...state,
        favoritos: updatedFavoritos,
        products: updatedProducts,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;

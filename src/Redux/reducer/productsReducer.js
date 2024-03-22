import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
  PUT_PRODUCT,
  MOVE_TO_ACTIVE,
  MOVE_TO_DEACTIVATE,
  CREATE_PRODUCT,
  APPLY_FILTERS,
  CLEAR_FILTERED_PRODUCTS,
  SET_FAVORITES,
  GET_TERM_PRODUCTS,
  SUCCESS,
  ERROR,
  CLEAN_ERROR,
  LENGTH_PRODUCTS,
  CLEAN_SUCCESS,
  CLEAN_DETAIL,
  RELATED_PRODUCTS,
  GET_ALL_PRODUCTS,
  PRECIO_MAX,
  LENGTH_PRODUCTS_FILTERED,
  CREATE_PREFERENCE,
  GET_COMPRAS,
} from "../actionsTypes/ProductsActionTypes";
import { ADD_LIKE, REMOVE_LIKE } from "../actionsTypes/LikesTypes";
import { POST_COMMENT } from "../actionsTypes/CommentsTypes";

const initialState = {
  preferenceId: null,
  products: [],
  compras: [],
  lengthProducts: null,
  lengthProductsFiltered: null,
  productId: [],
  commentId: [],
  priceMax: null,
  activatedProductsAdmin: [],
  desactivatedproducts: [],
  relacionados: [],
  productsFiltered: [],
  productsFilteredFalse: [],
  success: "",
  error: "",
  favoritos: [],
  isSearchFilterUsed: false,
  isApplyFilterUsed: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PREFERENCE: {
      return { ...state, preferenceId: action.payload };
    }
    case GET_ALL_PRODUCTS: {
      const statusTrue = action.payload.filter(
        (product) => product.status === true
      );

      const statusFalse = action.payload.filter(
        (product) => product.status === false
      );

      console.log(statusTrue);
      console.log(statusFalse);
      return {
        ...state,
        activatedProductsAdmin: statusTrue,
        desactivatedproducts: statusFalse,
      };
    }

    case GET_PRODUCTS: {
      // const statusTrue = action.payload.filter(
      //   (product) => product.status === true
      // );

      // const statusFalse = action.payload.filter(
      //   (product) => product.status === false
      // );

      return {
        ...state,
        products: action.payload,
        // desactivatedproducts: statusFalse,
      };
    }

    case GET_COMPRAS: {
      return { ...state, compras: action.payload };
    }

    case PRECIO_MAX: {
      return { ...state, priceMax: action.payload };
    }

    case LENGTH_PRODUCTS: {
      return { ...state, lengthProducts: action.payload };
    }

    case LENGTH_PRODUCTS_FILTERED: {
      return { ...state, lengthProductsFiltered: action.payload };
    }

    case GET_PRODUCT_ID: {
      return { ...state, productId: action.payload };
    }
    case RELATED_PRODUCTS: {
      console.log("relacionados redux", action.payload);
      return { ...state, relacionados: action.payload };
    }

    case CLEAN_DETAIL: {
      return { ...state, productId: "", relacionados: "" };
    }

    case POST_COMMENT: {
      console.log(action.payload);

      return {
        ...state,
        products: state.products.map((product) => {
          if (product?.id === action.payload.productId) {
            return {
              ...product,
              Comments: [...product.Comments, action.payload],
            };
          }
          return product;
        }),
        productId: {
          ...state.productId,
          Comments: [...state.productId.Comments, action.payload],
        },
      };
    }

    case GET_TERM_PRODUCTS: {
      console.log("hola");
      if (state.isApplyFilterUsed) {
        console.log("tenia aplicado filtros", action.payload);
        const filteredProducts = state.productsFiltered.filter((product) => {
          // Verificar si el producto actual está en action.payload
          const isProductInPayload = action.payload.some(
            (payloadProduct) => payloadProduct.id === product.id
          );

          // Retornar true solo si el producto está en action.payload y su estado es verdadero
          return isProductInPayload && product.status;
        });

        console.log(filteredProducts, "asd");
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
          return { ...state, error: "No se encontraron coincidencias" };
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

    case "POST_ANSWER_PRODUCTS": {
      // const commentId = action.payload.commentId;

      console.log(action.payload);

      const updatedProducts = state.products.map((product) => {
        if (product.id == action.payload.Comment.Product.id) {
          console.log(product);

          let ProductUpdate = {
            ...product,
            Comments: product.Comments.map((comment) => {
              if (comment.id === action.payload.Comment.id) {
                console.log("true", comment);

                let objetoConAnswer = {
                  ...comment,
                  Answers: [...(comment.Answers || []), action.payload],
                };

                console.log(objetoConAnswer);

                return objetoConAnswer;
              }
              return comment;
            }),
          };

          console.log(ProductUpdate, "mensaje actualizado");
          return ProductUpdate;
        }
        return product;
      });

      console.log(state.productId.Comments);

      return {
        ...state,
        products: updatedProducts,
        productId: {
          ...state.productId,
          Comments: [
            ...state.productId.Comments.map((comment) => {
              if (comment.id === action.payload.commentId) {
                console.log(comment, "mensaje actualiz");

                const comentarioActualizado = {
                  ...comment,
                  Answers: [...(comment?.Answers || []), action.payload],
                };

                console.log(comentarioActualizado, "mensaje actualizado");

                return comentarioActualizado;
              }
              return comment;
            }),
          ],
        },
      };
    }

    case PUT_PRODUCT: {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        activatedProductsAdmin: state.activatedProductsAdmin.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        desactivatedproducts: state.desactivatedproducts.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    }

    case SUCCESS: {
      return { ...state, success: action.payload };
    }
    case CLEAN_SUCCESS: {
      return { ...state, success: "" };
    }

    case ERROR: {
      return { ...state, error: action.payload };
    }

    case CLEAN_ERROR: {
      return { ...state, error: "" };
    }

    case MOVE_TO_ACTIVE: {
      const nuevoProductoActivado = state.desactivatedproducts.find(
        (product) => product.id === action.payload
      );

      return {
        ...state,
        success: "Ahora el producto esta activo.",
        activatedProductsAdmin: [
          ...state.activatedProductsAdmin,
          nuevoProductoActivado,
        ],
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
        activatedProductsAdmin: state.activatedProductsAdmin.filter(
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
      console.log("entra a apllyFilters", action.payload);
      if (state.isSearchFilterUsed) {
        const filterProducts = state.productsFiltered.filter((product) => {
          return action.payload.some(
            (payloadProduct) => payloadProduct.id === product.id
          );
        });

        console.log(filterProducts, "aa");
        if (filterProducts.length > 0) {
          return {
            ...state,
            productsFiltered: filterProducts,
            isApplyFilterUsed: true,
          };
        } else {
          return {
            ...state,
            error: "No se encontraron coincidencias.",
            isApplyFilterUsed: false,
          };
        }
      } else {
        console.log(action.payload, "jajs");
        return {
          ...state,
          productsFiltered: action.payload,
          isApplyFilterUsed: true,
        };
      }
    }

    case CLEAR_FILTERED_PRODUCTS: {
      console.log("entra el clearaaaaa");
      console.log("Estado actual de productsFiltered:", state.productsFiltered);
      return {
        ...state,
        isSearchFilterUsed: false,
        isApplyFilterUsed: false,
        productsFiltered: [],
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
      const productsStatusTrue = action.payload.filter(
        (product) => product.status === true
      );
      return {
        ...state,
        favoritos: productsStatusTrue,
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

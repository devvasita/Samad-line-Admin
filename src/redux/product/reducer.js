/* eslint no-underscore-dangle: 0 */
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../contants';

const INIT_STATE = {
  products: null,
  selectedProduct: null,
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, loaded: false };

    case ADD_PRODUCT_SUCCESS: {
      const { product } = action.payload;

      return {
        ...state,
        loaded: true,
        products: {
          ...state.products,
          data: [...state.products.data, product],
        },
      };
    }
    case ADD_PRODUCT_ERROR:
      return { ...state, loaded: true, error: action.payload.message };
    case GET_PRODUCTS:
      return { ...state, loading: true, error: '' };
    case GET_PRODUCTS_SUCCESS: {
      const type = action.payload.key ?? 'products';
      console.log({ type });
      return {
        ...state,
        [type]: action.payload.list,
      };
    }
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };

    case GET_SINGLE_PRODUCT:
      return { ...state, loading: true, error: '' };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: action.payload,
        error: '',
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        selectedProduct: null,
        error: action.payload.message,
      };

    case UPDATE_PRODUCT:
      return { ...state, loaded: false };

    case UPDATE_PRODUCT_SUCCESS: {
      const { item } = action.payload;
      const { _id } = item;
      const index = [...state.products.data].map((e) => e._id).indexOf(_id);
      const dataToUpdate = [...state.products.data];
      dataToUpdate.splice(index, 1, item);

      return {
        ...state,
        loaded: true,
        products: { ...state.products, data: dataToUpdate },
      };
    }
    case UPDATE_PRODUCT_ERROR:
      return { ...state, loaded: true, error: action.payload };

    case DELETE_PRODUCT:
      return { ...state, loaded: false };

    case DELETE_PRODUCT_SUCCESS: {
      const { _id } = action.payload;
      const index = [...state.products.data].map((e) => e._id).indexOf(_id);
      console.log({ index, product: state.products.data });
      const dataToUpdate = [...state.products.data];
      dataToUpdate.splice(index, 1);

      return {
        ...state,
        loaded: true,
        products: { ...state.products, data: dataToUpdate },
      };
    }
    case DELETE_PRODUCT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    }
    default:
      return { ...state };
  }
};

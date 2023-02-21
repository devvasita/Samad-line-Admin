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
} from '../contants';

const INIT_STATE = {
  products: null,
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, loaded: false };

    case ADD_PRODUCT_SUCCESS: {
      const { item, type } = action.payload;

      console.log(state[type], item, 'boooomm boomml');
      return {
        ...state,
        loaded: true,
        [type]: { ...state[type], data: [...state[type].data, item] },
      };
    }
    case ADD_PRODUCT_ERROR:
      return { ...state, loaded: true, error: action.payload };
    case GET_PRODUCTS:
      return { ...state, loading: true, error: '' };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.message,
      };
    case UPDATE_PRODUCT:
      return { ...state, loaded: false };

    case UPDATE_PRODUCT_SUCCESS: {
      const { item, type } = action.payload;
      const { _id } = item;
      const index = [...state[type].data].map((e) => e._id).indexOf(_id);
      const dataToUpdate = [...state[type].data];
      dataToUpdate.splice(index, 1, item);

      return {
        ...state,
        loaded: true,
        [type]: { ...state[type], data: dataToUpdate },
      };
    }
    case UPDATE_PRODUCT_ERROR:
      return { ...state, loaded: true, error: action.payload };

    case DELETE_PRODUCT:
      return { ...state, loaded: false };

    case DELETE_PRODUCT_SUCCESS: {
      const { id, type } = action.payload;
      const index = [...state[type].data].map((e) => e._id).indexOf(id);
      const dataToUpdate = [...state[type].data];
      dataToUpdate.splice(index - 1, 1);

      return {
        ...state,
        loaded: true,
        [type]: { ...state[type], data: dataToUpdate },
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

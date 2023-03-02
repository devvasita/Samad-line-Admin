/* eslint no-underscore-dangle: 0 */
import {
  ADD_BRAND_AND_CATEGORY,
  ADD_BRAND_AND_CATEGORY_SUCCESS,
  ADD_BRAND_AND_CATEGORY_ERROR,
  GET_BRAND_AND_CATEGORY,
  GET_BRAND_AND_CATEGORY_SUCCESS,
  GET_BRAND_AND_CATEGORY_ERROR,
  UPDATE_BRAND_AND_CATEGORY,
  UPDATE_BRAND_AND_CATEGORY_SUCCESS,
  UPDATE_BRAND_AND_CATEGORY_ERROR,
  DELETE_BRAND_AND_CATEGORY,
  DELETE_BRAND_AND_CATEGORY_SUCCESS,
  DELETE_BRAND_AND_CATEGORY_ERROR,
} from '../contants';

const INIT_STATE = {
  loaded: false,
  brand: [],
  category: [],
  message: '',
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_BRAND_AND_CATEGORY:
      return { ...state, loaded: false };

    case ADD_BRAND_AND_CATEGORY_SUCCESS: {
      const { item, type } = action.payload;

      return {
        ...state,
        loaded: true,
        [type]: { ...state[type], data: [...state[type].data, item] },
      };
    }
    case ADD_BRAND_AND_CATEGORY_ERROR:
      return { ...state, loaded: true, error: action.payload };
    case GET_BRAND_AND_CATEGORY:
      return { ...state, loading: true, error: '' };
    case GET_BRAND_AND_CATEGORY_SUCCESS: {
      const { data, type } = action.payload;
      return {
        ...state,
        loading: false,
        [type]: data,
        error: '',
      };
    }
    case GET_BRAND_AND_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    case UPDATE_BRAND_AND_CATEGORY:
      return { ...state, loaded: false };

    case UPDATE_BRAND_AND_CATEGORY_SUCCESS: {
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
    case UPDATE_BRAND_AND_CATEGORY_ERROR:
      return { ...state, loaded: true, error: action.payload };

    case DELETE_BRAND_AND_CATEGORY:
      return { ...state, loaded: false };

    case DELETE_BRAND_AND_CATEGORY_SUCCESS: {
      const { _id, type } = action.payload;
      const index = [...state[type].data].map((e) => e._id).indexOf(_id);
      const dataToUpdate = [...state[type].data];
      dataToUpdate.splice(index - 1, 1);

      return {
        ...state,
        loaded: true,
        [type]: { ...state[type], data: dataToUpdate },
        message: `${type} deleted successfully`,
      };
    }
    case DELETE_BRAND_AND_CATEGORY_ERROR: {
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

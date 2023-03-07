/* eslint-disable no-debugger */
/* eslint no-underscore-dangle: 0 */
import {
  ADD_OFFER,
  ADD_OFFER_SUCCESS,
  ADD_OFFER_ERROR,
  GET_OFFERS,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_ERROR,
  GET_SINGLE_OFFER,
  GET_SINGLE_OFFER_SUCCESS,
  GET_SINGLE_OFFER_ERROR,
  DELETE_OFFER,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_ERROR,
  UPDATE_OFFER,
  UPDATE_OFFER_SUCCESS,
  UPDATE_OFFER_ERROR,
} from '../contants';

const INIT_STATE = {
  offers: [],
  selectedOffer: null,
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_OFFER:
      return { ...state, loaded: false };

    case ADD_OFFER_SUCCESS: {
      const { offer } = action.payload;
      return {
        ...state,
        loaded: true,
        offers: {
          ...state.offers,
          data: [...state.offers.data, offer],
        },
      };
    }
    case ADD_OFFER_ERROR:
      return { ...state, loaded: true, error: action.payload.message };

    case UPDATE_OFFER:
      return { ...state, loaded: false };

    case UPDATE_OFFER_SUCCESS: {
      const { item } = action.payload;
      const { _id } = item;
      const index = [...state.offers.data].map((e) => e._id).indexOf(_id);
      const dataToUpdate = [...state.offers.data];
      dataToUpdate.splice(index, 1, item);

      return {
        ...state,
        loaded: true,
        offers: { ...state.offers, data: dataToUpdate },
      };
    }
    case UPDATE_OFFER_ERROR:
      return { ...state, loaded: true, error: action.payload };

    case GET_OFFERS:
      return { ...state, loading: true, error: '' };
    case GET_OFFERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        offers: action.payload,
        error: '',
      };
    }
    case GET_OFFERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    case GET_SINGLE_OFFER:
      return { ...state, loading: true, error: '' };
    case GET_SINGLE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedOffer: action.payload,
        error: '',
      };
    case GET_SINGLE_OFFER_ERROR:
      return {
        ...state,
        loading: false,
        selectedOffer: null,
        error: action.payload.message,
      };

    case DELETE_OFFER:
      return { ...state, loaded: false };

    case DELETE_OFFER_SUCCESS: {
      const _id = action.payload;
      const index = [...state.offers].map((e) => e._id).indexOf(_id);
      const dataToUpdate = [...state.offers];
      dataToUpdate.splice(index - 1, 1);

      return {
        ...state,
        loaded: true,
        offers: dataToUpdate,
      };
    }

    case DELETE_OFFER_ERROR: {
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

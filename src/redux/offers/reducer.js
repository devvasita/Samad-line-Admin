/* eslint no-underscore-dangle: 0 */
import {
  ADD_OFFER,
  ADD_OFFER_SUCCESS,
  ADD_OFFER_ERROR,
  GET_OFFERS,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_ERROR,
} from '../contants';

const INIT_STATE = {
  offer: [],
  selectedOffers: null,
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
        offer: {
          ...state.offer,
          data: [...state.offer.data, offer],
        },
      };
    }
    case ADD_OFFER_ERROR:
      return { ...state, loaded: true, error: action.payload.message };

    case GET_OFFERS:
      return { ...state, loading: true, error: '' };
    case GET_OFFERS_SUCCESS: {
      // const { data } = action.payload;
      console.log(action.payload, 'paylod');
      return {
        ...state,
        loading: false,
        offer: action.payload,
        error: '',
      };
    }
    case GET_OFFERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    default:
      return { ...state };
  }
};

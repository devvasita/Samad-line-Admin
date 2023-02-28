import {
  ADD_OFFER,
  ADD_OFFER_SUCCESS,
  ADD_OFFER_ERROR,
  UPDATE_OFFER,
  UPDATE_OFFER_SUCCESS,
  UPDATE_OFFER_ERROR,
  DELETE_OFFER,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_ERROR,
  GET_OFFERS,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_ERROR,
  GET_SINGLE_OFFER,
  GET_SINGLE_OFFER_SUCCESS,
  GET_SINGLE_OFFER_ERROR,
} from '../contants';

export const addOffer = (product, history) => {
  return {
    type: ADD_OFFER,
    payload: { product, history },
  };
};
export const addOfferSuccess = (product) => {
  return {
    type: ADD_OFFER_SUCCESS,
    payload: { product },
  };
};
export const addOfferError = (message) => ({
  type: ADD_OFFER_ERROR,
  payload: { message },
});

export const getOffers = (data) => ({
  type: GET_OFFERS,
  payload: data,
});
export const getOfferSuccess = (data) => ({
  type: GET_OFFERS_SUCCESS,
  payload: data,
});
export const getOffersError = (message) => ({
  type: GET_OFFERS_ERROR,
  payload: { message },
});
export const getSingleOffer = (id) => {
  return {
    type: GET_SINGLE_OFFER,
    payload: id,
  };
};
export const getSingleOfferSuccess = (id) => ({
  type: GET_SINGLE_OFFER_SUCCESS,
  payload: id,
});
export const getSingleOfferError = (message) => ({
  type: GET_SINGLE_OFFER_ERROR,
  payload: { message },
});

export const updateOffer = (product, history, id) => {
  return {
    type: UPDATE_OFFER,
    payload: { product, history, _id: id },
  };
};
export const updateOfferSuccess = (item, type) => {
  return {
    type: UPDATE_OFFER_SUCCESS,
    payload: { item, type },
  };
};
export const updateOfferError = (message) => ({
  type: UPDATE_OFFER_ERROR,
  payload: { message },
});

export const deleteOffer = (_id) => ({
  type: DELETE_OFFER,
  payload: { _id },
});
export const deleteOfferSuccess = (_id) => ({
  type: DELETE_OFFER_SUCCESS,
  payload: { _id },
});
export const deleteOfferError = (message) => ({
  type: DELETE_OFFER_ERROR,
  payload: { message },
});

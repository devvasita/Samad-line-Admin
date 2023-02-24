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
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../contants';

export const addProduct = (product, history) => {
  return {
    type: ADD_PRODUCT,
    payload: { product, history },
  };
};
export const addProductSuccess = (product) => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload: { product },
  };
};
export const addProductError = (message) => ({
  type: ADD_PRODUCT_ERROR,
  payload: { message },
});

export const getProducts = (data) => ({
  type: GET_PRODUCTS,
  payload: data,
});
export const getProductSuccess = (list, key) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: { list, key },
});
export const getProductsError = (message) => ({
  type: GET_PRODUCTS_ERROR,
  payload: { message },
});
export const getSingleProduct = (id) => {
  return {
    type: GET_SINGLE_PRODUCT,
    payload: id,
  };
};
export const getSingleProductSuccess = (id) => ({
  type: GET_SINGLE_PRODUCT_SUCCESS,
  payload: id,
});
export const getSingleProductError = (message) => ({
  type: GET_SINGLE_PRODUCT_ERROR,
  payload: { message },
});

export const updateProduct = (product, history, id) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { product, history, _id: id },
  };
};
export const updateProductSuccess = (item, type) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: { item, type },
  };
};
export const updateProductError = (message) => ({
  type: UPDATE_PRODUCT_ERROR,
  payload: { message },
});

export const deleteProduct = (_id) => ({
  type: DELETE_PRODUCT,
  payload: { _id },
});
export const deleteProductSuccess = (_id) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: { _id },
});
export const deleteProductError = (message) => ({
  type: DELETE_PRODUCT_ERROR,
  payload: { message },
});

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
} from '../contants';

export const addProduct = (item, type) => {
  return {
    type: ADD_PRODUCT,
    payload: { item, type },
  };
};
export const addProductSuccess = (item, type) => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload: { item, type },
  };
};
export const addProductError = (message) => ({
  type: ADD_PRODUCT_ERROR,
  payload: { message },
});

export const getProducts = () => ({
  type: GET_PRODUCTS,
});

export const getProductSuccess = (list) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: list,
});
export const getProductsError = (message) => ({
  type: GET_PRODUCTS_ERROR,
  payload: { message },
});

export const updateProduct = (item, type) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { item, type },
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

export const deleteProduct = (id, type) => ({
  type: DELETE_PRODUCT,
  payload: { id, type },
});
export const deleteProductSuccess = (id, type) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: { id, type },
});
export const deleteProductError = (message) => ({
  type: DELETE_PRODUCT_ERROR,
  payload: { message },
});

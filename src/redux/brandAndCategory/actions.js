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

export const addBrandAndCategory = (item, type) => {
  return {
    type: ADD_BRAND_AND_CATEGORY,
    payload: { item, type },
  };
};
export const addBrandAndCategorySuccess = (item, type) => {
  return {
    type: ADD_BRAND_AND_CATEGORY_SUCCESS,
    payload: { item, type },
  };
};
export const addBrandAndCategoryError = (message) => ({
  type: ADD_BRAND_AND_CATEGORY_ERROR,
  payload: { message },
});

export const getBrandAndCategory = (type) => {
  return {
    type: GET_BRAND_AND_CATEGORY,
    payload: { type },
  };
};
export const getBrandAndCategorySuccess = (data, type) => {
  return {
    type: GET_BRAND_AND_CATEGORY_SUCCESS,
    payload: { data, type },
  };
};
export const getBrandAndCategoryError = (message) => ({
  type: GET_BRAND_AND_CATEGORY_ERROR,
  payload: { message },
});

export const updateBrandAndCategory = (item, type) => {
  console.log(item, 'item');
  return {
    type: UPDATE_BRAND_AND_CATEGORY,
    payload: { item, type },
  };
};
export const updateBrandAndCategorySuccess = (item, type) => {
  console.log(item, 'item');
  return {
    type: UPDATE_BRAND_AND_CATEGORY_SUCCESS,
    payload: { item, type },
  };
};
export const updateBrandAndCategoryError = (message) => ({
  type: UPDATE_BRAND_AND_CATEGORY_ERROR,
  payload: { message },
});

export const deleteBrandAndCategory = (id, type) => ({
  type: DELETE_BRAND_AND_CATEGORY,
  payload: { id, type },
});
export const deleteBrandAndCategorySuccess = (id, type) => ({
  type: DELETE_BRAND_AND_CATEGORY_SUCCESS,
  payload: { id, type },
});
export const deleteBrandAndCategoryError = (message) => ({
  type: DELETE_BRAND_AND_CATEGORY_ERROR,
  payload: { message },
});

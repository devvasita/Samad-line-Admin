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
  GET_CATEGORY_BY_ID,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_ERROR,
  UPDATE_SUB_CATEGORY_BY_ID,
  UPDATE_SUB_CATEGORY_BY_ID_SUCCESS,
  UPDATE_SUB_CATEGORY_BY_ID_ERROR,
  DELETE_SUB_CATEGORY_BY_ID,
  DELETE_SUB_CATEGORY_BY_ID_SUCCESS,
  DELETE_SUB_CATEGORY_BY_ID_ERROR,
  CREATE_SUB_CATEGORY,
  CREATE_SUB_CATEGORY_SUCCESS,
  CREATE_SUB_CATEGORY_ERROR,
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
export const deleteBrandAndCategorySuccess = (data, type) => ({
  type: DELETE_BRAND_AND_CATEGORY_SUCCESS,
  payload: { data, type },
});
export const deleteBrandAndCategoryError = (message) => ({
  type: DELETE_BRAND_AND_CATEGORY_ERROR,
  payload: { message },
});

export const getCategoryDetails = (_id) => ({
  type: GET_CATEGORY_BY_ID,
  payload: { _id },
});

export const getCategoryDetailsSuccess = (data) => ({
  type: GET_CATEGORY_BY_ID_SUCCESS,
  payload: data,
});

export const getCategoryDetailsError = (message) => ({
  type: GET_CATEGORY_BY_ID_ERROR,
  payload: { message },
});

export const updateSubCategory = (data) => ({
  type: UPDATE_SUB_CATEGORY_BY_ID,
  payload: data,
});
export const updateSubCategorySuccess = (data) => ({
  type: UPDATE_SUB_CATEGORY_BY_ID_SUCCESS,
  payload: data,
});

export const updateSubCategoryError = (message) => ({
  type: UPDATE_SUB_CATEGORY_BY_ID_ERROR,
  payload: { message },
});

export const deleteSubCategory = (data) => ({
  type: DELETE_SUB_CATEGORY_BY_ID,
  payload: data,
});
export const deleteSubCategorySuccess = (data) => ({
  type: DELETE_SUB_CATEGORY_BY_ID_SUCCESS,
  payload: data,
});

export const deleteSubCategoryError = (message) => ({
  type: DELETE_SUB_CATEGORY_BY_ID_ERROR,
  payload: { message },
});

export const createSubCategory = (data) => ({
  type: CREATE_SUB_CATEGORY,
  payload: data,
});
export const createSubCategorySuccess = (data) => ({
  type: CREATE_SUB_CATEGORY_SUCCESS,
  payload: data,
});

export const createSubCategoryError = (message) => ({
  type: CREATE_SUB_CATEGORY_ERROR,
  payload: { message },
});

/* eslint-disable camelcase */
import API from 'helpers/API';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  ADD_BRAND_AND_CATEGORY,
  GET_BRAND_AND_CATEGORY,
  UPDATE_BRAND_AND_CATEGORY,
  DELETE_BRAND_AND_CATEGORY,
  GET_CATEGORY_BY_ID,
  UPDATE_SUB_CATEGORY_BY_ID,
  DELETE_SUB_CATEGORY_BY_ID,
  CREATE_SUB_CATEGORY,
} from '../contants';
import {
  addBrandAndCategorySuccess,
  addBrandAndCategoryError,
  getBrandAndCategorySuccess,
  getBrandAndCategoryError,
  updateBrandAndCategorySuccess,
  updateBrandAndCategoryError,
  deleteBrandAndCategorySuccess,
  deleteBrandAndCategoryError,
  getCategoryDetailsSuccess,
  getCategoryDetailsError,
  updateSubCategorySuccess,
  updateSubCategoryError,
  deleteSubCategorySuccess,
  deleteSubCategoryError,
  createSubCategorySuccess,
  createSubCategoryError,
} from './actions';

const addBrandAndCategoryAsync = async (item, type) => {
  const res = await API.post(`/${type}`, item);
  return res;
};

function* addBrandAndCategoryWorker({ payload }) {
  const { item, type } = payload;

  try {
    const { data, status } = yield call(addBrandAndCategoryAsync, item, type);
    const { message } = data;
    if (status === 201) {
      yield put(addBrandAndCategorySuccess(data, type));
    } else {
      yield put(
        addBrandAndCategoryError(
          message ?? message.message ?? 'something went wrong'
        )
      );
    }
  } catch (error) {
    console.log({ error });
    yield put(addBrandAndCategoryError('something went wrong'));
  }
}

export function* watchAddBrandAndCategory() {
  yield takeEvery(ADD_BRAND_AND_CATEGORY, addBrandAndCategoryWorker);
}

const getBrandAndCategoryAsync = async (type) => {
  try {
    const res = await API.get(`/${type}`);
    return res;
  } catch (error) {
    return error;
  }
};

export function* getBrandAndCategoryWorker({ payload }) {
  const { type } = payload;
  try {
    const { data } = yield call(getBrandAndCategoryAsync, type);
    if (data) {
      yield put(getBrandAndCategorySuccess(data, type));
    } else {
      yield put(getBrandAndCategoryError('something went wrong'));
    }
  } catch (error) {
    yield put(getBrandAndCategoryError('something went wrong'));
  }
}

export function* watchGetBrandAndCategory() {
  yield takeEvery(GET_BRAND_AND_CATEGORY, getBrandAndCategoryWorker);
}

const updateBrandAndCategoryAsync = async (item, type) => {
  const res = await API.put(`/${type}`, item);
  return res;
};

function* updateBrandAndCategoryWorker({ payload }) {
  const { item, type } = payload;
  try {
    const { data, status } = yield call(
      updateBrandAndCategoryAsync,
      item,
      type
    );
    const { message } = data;
    if (status === 200) {
      yield put(updateBrandAndCategorySuccess(data, type));
    } else {
      yield put(
        updateBrandAndCategoryError(
          message ?? message.message ?? 'something went wrong'
        )
      );
    }
  } catch (error) {
    console.log({ error });
    yield put(updateBrandAndCategoryError('something went wrong'));
  }
}

export function* watchUpdateBrandAndCategory() {
  yield takeEvery(UPDATE_BRAND_AND_CATEGORY, updateBrandAndCategoryWorker);
}

const deleteBrandAndCategoryAsync = async (id, type) => {
  const res = await API.delete(`/${type}`, {
    data: {
      _id: id,
    },
  });
  return res;
};

function* deleteBrandAndCategoryWorker({ payload }) {
  const { id, type } = payload;
  try {
    const {
      data: { message, data },
      status,
    } = yield call(deleteBrandAndCategoryAsync, id, type);

    if (status === 200) {
      yield put(deleteBrandAndCategorySuccess(data, type));
    } else {
      yield put(
        deleteBrandAndCategoryError(
          message ?? message.message ?? 'something went wrong'
        )
      );
    }
  } catch (error) {
    console.log({ error });
    yield put(deleteBrandAndCategoryError('something went wrong'));
  }
}

export function* watchDeleteBrandAndCategory() {
  yield takeEvery(DELETE_BRAND_AND_CATEGORY, deleteBrandAndCategoryWorker);
}

const getCategoryDetailsAsync = async (id) => {
  console.log({ cat: id });
  const res = await API.get(`/category/${id}`);
  return res;
};

function* getCategiryDetails({ payload }) {
  try {
    const { _id } = payload;
    const { data, message, status } = yield call(getCategoryDetailsAsync, _id);

    if (status === 200) {
      yield put(getCategoryDetailsSuccess(data));
    } else {
      yield put(getCategoryDetailsError(message));
    }
  } catch (error) {
    yield put(getCategoryDetailsError('Something went wrong '));
  }
}

export function* watchGetCategoryDetails() {
  yield takeEvery(GET_CATEGORY_BY_ID, getCategiryDetails);
}

const updateSubCategoryAsync = async (parent_id, _id, name) => {
  const res = await API.put(`/category/${parent_id}?subCategoryId=${_id}`, {
    name,
  });
  return res;
};

function* updateSubCategory({ payload }) {
  try {
    const { parent_id, _id, name } = payload;
    const { data, message, status } = yield call(
      updateSubCategoryAsync,
      parent_id,
      _id,
      name
    );

    if (status === 200) {
      yield put(updateSubCategorySuccess(data));
    } else {
      yield put(updateSubCategoryError(message));
    }
  } catch (error) {
    yield put(updateSubCategoryError('Something went wrong '));
  }
}

export function* watchupdateSubCategory() {
  yield takeEvery(UPDATE_SUB_CATEGORY_BY_ID, updateSubCategory);
}

const deleteSubCategoryAsync = async (parent_id, _id) => {
  const res = await API.delete(`/category/${parent_id}?subCategoryId=${_id}`);
  return res;
};

function* deleteSubCategory({ payload }) {
  try {
    const { parent_id, _id } = payload;
    const { data, message, status } = yield call(
      deleteSubCategoryAsync,
      parent_id,
      _id
    );

    if (status === 200) {
      yield put(deleteSubCategorySuccess(data));
    } else {
      yield put(deleteSubCategoryError(message));
    }
  } catch (error) {
    yield put(deleteSubCategoryError('Something went wrong '));
  }
}

export function* watchdeleteSubCategory() {
  yield takeEvery(DELETE_SUB_CATEGORY_BY_ID, deleteSubCategory);
}

const createSubCategoryAsync = async (_id, name) => {
  const res = await API.post(`/category/${_id}`, { name });
  return res;
};

function* createSubCategory({ payload }) {
  try {
    const { name, _id } = payload;
    const { data, message, status } = yield call(
      createSubCategoryAsync,
      _id,
      name
    );

    if (status === 201) {
      yield put(createSubCategorySuccess(data));
    } else {
      yield put(createSubCategoryError(message));
    }
  } catch (error) {
    yield put(createSubCategoryError('Something went wrong '));
  }
}

export function* watchcreateSubCategory() {
  yield takeEvery(CREATE_SUB_CATEGORY, createSubCategory);
}
export default function* rootSaga() {
  yield all([
    fork(watchAddBrandAndCategory),
    fork(watchGetBrandAndCategory),
    fork(watchUpdateBrandAndCategory),
    fork(watchDeleteBrandAndCategory),
    fork(watchGetCategoryDetails),
    fork(watchupdateSubCategory),
    fork(watchdeleteSubCategory),
    fork(watchcreateSubCategory),
  ]);
}

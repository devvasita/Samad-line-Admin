import API from 'helpers/API';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  ADD_BRAND_AND_CATEGORY,
  GET_BRAND_AND_CATEGORY,
  UPDATE_BRAND_AND_CATEGORY,
  DELETE_BRAND_AND_CATEGORY,
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
} from './actions';

const addBrandAndCategoryAsync = async (name, image, type) => {
  const res = await API.post(`/${type}`, {
    name,
    image,
  });
  return res;
};

function* addBrandAndCategoryWorker({ payload }) {
  const { name, image } = payload.item;
  const { type } = payload;

  try {
    const { data, status } = yield call(
      addBrandAndCategoryAsync,
      name,
      image,
      type
    );
    if (status === 201) {
      yield put(addBrandAndCategorySuccess(data, type));
    } else {
      yield put(addBrandAndCategoryError('token expired'));
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
      yield put(getBrandAndCategoryError('token expired'));
    }
  } catch (error) {
    yield put(getBrandAndCategoryError('something went wrong'));
  }
}

export function* watchGetBrandAndCategory() {
  yield takeEvery(GET_BRAND_AND_CATEGORY, getBrandAndCategoryWorker);
}

const updateBrandAndCategoryAsync = async (name, image, id, type) => {
  console.log(name, image, id, type);
  const res = await API.put(`/${type}`, {
    name,
    image,
    _id: id,
  });
  console.log(res, 'response');
  return res;
};

function* updateBrandAndCategoryWorker({ payload }) {
  const { name, image, id } = payload.item;
  const { type } = payload;
  console.log(payload, 'kkkkkk');
  try {
    const { data, status } = yield call(
      updateBrandAndCategoryAsync,
      name,
      image,
      id,
      type
    );
    console.log(data, '====');
    if (status === 201) {
      yield put(updateBrandAndCategorySuccess(data, type));
    } else {
      yield put(updateBrandAndCategoryError('token expired'));
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
  console.log({ id, type });
  const res = await API.delete(`/${type}`, {
    data: {
      _id: id,
    },
  });
  console.log(res, 'resss');
  return res;
};

function* deleteBrandAndCategoryWorker({ payload }) {
  const { id, type } = payload;

  console.log(payload, 'kkkkkk');
  try {
    const { data, status } = yield call(deleteBrandAndCategoryAsync, id, type);
    if (status === 201) {
      yield put(deleteBrandAndCategorySuccess(data, type));
    } else {
      yield put(deleteBrandAndCategoryError('token expired'));
    }
  } catch (error) {
    console.log({ error });
    yield put(deleteBrandAndCategoryError('something went wrong'));
  }
}

export function* watchDeleteBrandAndCategory() {
  yield takeEvery(DELETE_BRAND_AND_CATEGORY, deleteBrandAndCategoryWorker);
}

export default function* rootSaga() {
  yield all([
    fork(watchAddBrandAndCategory),
    fork(watchGetBrandAndCategory),
    fork(watchUpdateBrandAndCategory),
    fork(watchDeleteBrandAndCategory),
  ]);
}

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
    const { data, status } = yield call(deleteBrandAndCategoryAsync, id, type);
    const { message } = data;
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

export default function* rootSaga() {
  yield all([
    fork(watchAddBrandAndCategory),
    fork(watchGetBrandAndCategory),
    fork(watchUpdateBrandAndCategory),
    fork(watchDeleteBrandAndCategory),
  ]);
}

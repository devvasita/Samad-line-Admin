/* eslint-disable no-underscore-dangle */
import API from 'helpers/API';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
} from '../contants';
import {
  addProductSuccess,
  addProductError,
  getProductSuccess,
  getProductsError,
  getSingleProductSuccess,
  getSingleProductError,
  deleteProductSuccess,
  deleteProductError,
  updateProductSuccess,
  updateProductError,
} from './actions';

const addProductAsync = async (product) => {
  const res = await API.post('/product', product);
  return res;
};

function* addProductWorker({ payload }) {
  const { product, history } = payload;
  try {
    const { data, status } = yield call(addProductAsync, product);
    const { messgae } = data;
    if (status === 201) {
      history.push('/app/applications/product');
      yield put(addProductSuccess(data));
    } else {
      yield put(addProductSuccess(messgae));
    }
  } catch (error) {
    yield put(addProductError(error));
  }
}

export function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT, addProductWorker);
}

const getProductAsync = async (filterBy, unit) => {
  const res = await API.get('/product', { params: { filterBy, unit } });
  return res;
};
function* getProductWorker({ payload }) {
  const { key, filterBy, unit } = payload;
  try {
    const { data, status } = yield call(getProductAsync, filterBy, unit);
    const { message } = data;
    if (status === 200 && data) {
      yield put(getProductSuccess(data, key));
    } else {
      yield put(getProductsError(message));
    }
  } catch (error) {
    console.log({ error });
    yield put(getProductsError('something went wrong'));
  }
}
export function* watchGetProduct() {
  yield takeEvery(GET_PRODUCTS, getProductWorker);
}

const getSingleProductAsync = async (id) => {
  const res = await API.get(`/product/${id}`);
  return res;
};
function* getSingleProductWorker({ payload }) {
  try {
    const { data, status } = yield call(getSingleProductAsync, payload);
    const { message } = data;
    if (status === 200 && data) {
      yield put(getSingleProductSuccess(data));
    } else {
      yield put(getSingleProductError(message));
    }
  } catch (error) {
    console.log({ error });
    yield put(getSingleProductError('something went wrong'));
  }
}
export function* watchGetSingleProduct() {
  yield takeEvery(GET_SINGLE_PRODUCT, getSingleProductWorker);
}

const updateProductAsync = async (product, _id) => {
  const res = await API.put(`/product/${_id}`, product);
  return res;
};

function* updateProductWorker({ payload }) {
  const { product, history, _id } = payload;
  try {
    const { data, status } = yield call(updateProductAsync, product, _id);
    const { message } = data;
    if (status === 200) {
      history.push('/app/applications/product');
      yield put(updateProductSuccess(data));
    } else {
      yield put(updateProductError(message));
    }
  } catch (error) {
    yield put(updateProductError(error));
  }
}
export function* watchUpdateProduct() {
  yield takeEvery(UPDATE_PRODUCT, updateProductWorker);
}

const deleteProductAsync = async (_id) => {
  console.log({ _id });
  const res = await API.delete(`/product/${_id}`);
  return res;
};
function* deleteProductWorker({ payload }) {
  console.log({ payload });
  const { _id } = payload;
  try {
    const { status, data } = yield call(deleteProductAsync, _id);
    const { message } = data;
    if (status === 200) {
      yield put(deleteProductSuccess(_id));
    } else {
      yield put(deleteProductError(message));
    }
  } catch (error) {
    yield put(deleteProductError(error));
  }
}

export function* watchDeleteProduct() {
  yield takeEvery(DELETE_PRODUCT, deleteProductWorker);
}

export default function* rootSaga() {
  yield all([
    fork(watchAddProduct),
    fork(watchGetProduct),
    fork(watchGetSingleProduct),
    fork(watchDeleteProduct),
    fork(watchUpdateProduct),
  ]);
}

import API from 'helpers/API';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ADD_PRODUCT, GET_PRODUCTS, GET_SINGLE_PRODUCT } from '../contants';
import {
  addProductSuccess,
  addProductError,
  getProductSuccess,
  getProductsError,
  getSingleProductSuccess,
  getSingleProductError,
} from './actions';

const addProductAsync = async (product) => {
  const res = await API.post('/product', product);
  return res;
};

function* addProductWorker({ payload }) {
  const { product } = payload;
  try {
    const { data, status } = yield call(addProductAsync, product);
    if (status === 201) {
      yield put(addProductSuccess(data));
    } else {
      yield put(addProductSuccess('token expired'));
    }
  } catch (error) {
    console.log({ error });
    yield put(addProductError('something went wrong'));
  }
}

export function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT, addProductWorker);
}
const getProductAsync = async () => {
  const res = await API.get('/product');
  return res;
};
function* getProductWorker() {
  try {
    const { data, status } = yield call(getProductAsync);
    const { message } = data;
    if (status === 200 && data) {
      yield put(getProductSuccess(data));
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

export default function* rootSaga() {
  yield all([
    fork(watchAddProduct),
    fork(watchGetProduct),
    fork(watchGetSingleProduct),
  ]);
}

import API from 'helpers/API';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ADD_PRODUCT } from '../contants';
import { addProductSuccess, addProductError } from './actions';

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

export function* watchProduct() {
  yield takeEvery(ADD_PRODUCT, addProductWorker);
}

export default function* rootSaga() {
  yield all([fork(watchProduct)]);
}

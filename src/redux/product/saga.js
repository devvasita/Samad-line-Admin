import API from 'helpers/API';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ADD_PRODUCT } from '../contants';
import { addProductSuccess, addProductError } from './actions';

const addProductAsync = async (name, image, type) => {
  const res = await API.post(`/${type}`, {
    name,
    image,
  });
  return res;
};

function* addProductWorker({ payload }) {
  const { name, image } = payload.item;
  const { type } = payload;

  try {
    const { data, status } = yield call(addProductAsync, name, image, type);
    if (status === 201) {
      yield put(addProductSuccess(data, type));
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

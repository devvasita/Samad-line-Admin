/* eslint-disable no-underscore-dangle */
import API from 'helpers/API';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ADD_OFFER } from '../contants';
import { addOfferSuccess, addOfferError } from './actions';

const addOfferAsync = async (offer) => {
  const res = await API.post('/offer', offer);
  return res;
};

function* addOfferWorker({ payload }) {
  const { offer, history } = payload;
  try {
    const { data, status } = yield call(addOfferAsync, offer);
    const { messgae } = data;
    if (status === 201) {
      history.push('/app/applications/offer');
      yield put(addOfferSuccess(data));
    } else {
      yield put(addOfferSuccess(messgae));
    }
  } catch (error) {
    yield put(addOfferError(error));
  }
}

export function* watchAddOffer() {
  yield takeEvery(ADD_OFFER, addOfferWorker);
}

export default function* rootSaga() {
  yield all([fork(watchAddOffer)]);
}

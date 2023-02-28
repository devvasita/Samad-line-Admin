/* eslint-disable no-underscore-dangle */
import API from 'helpers/API';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ADD_OFFER, GET_OFFERS } from '../contants';
import {
  addOfferSuccess,
  addOfferError,
  getOfferSuccess,
  getOffersError,
} from './actions';

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

const getOfferAsync = async () => {
  try {
    const res = await API.get(`/offer`);
    console.log(res, '---');
    return res;
  } catch (error) {
    return error;
  }
};

export function* getOfferWorker() {
  console.log('dedewf');
  try {
    const { data, messgae } = yield call(getOfferAsync);
    if (data) {
      yield put(getOfferSuccess(data));
    } else {
      yield put(getOffersError(messgae));
    }
  } catch (error) {
    yield put(getOffersError('something went wrong'));
  }
}

export function* watchGetOffer() {
  yield takeEvery(GET_OFFERS, getOfferWorker);
}

export default function* rootSaga() {
  yield all([fork(watchAddOffer)], [fork(watchGetOffer)]);
}

/* eslint-disable no-underscore-dangle */
import API from 'helpers/API';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  ADD_OFFER,
  DELETE_OFFER,
  GET_OFFERS,
  GET_SINGLE_OFFER,
  UPDATE_OFFER,
} from '../contants';
import {
  addOfferSuccess,
  addOfferError,
  getOfferSuccess,
  getOffersError,
  getSingleOfferSuccess,
  getSingleOfferError,
  deleteOfferSuccess,
  deleteOfferError,
  updateOfferSuccess,
  updateOfferError,
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
      history.push('/app/applications/Offers');
      yield put(addOfferSuccess(data));
    } else {
      yield put(addOfferError(messgae));
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
    return res;
  } catch (error) {
    return error;
  }
};
export function* getOfferWorker() {
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
const getSingleOfferAsync = async (id) => {
  const res = await API.get(`/offer/${id}`);
  return res;
};
function* getSingleOfferWorker({ payload }) {
  try {
    const { data, status } = yield call(getSingleOfferAsync, payload);
    const { message } = data;
    if (status === 200 && data) {
      yield put(getSingleOfferSuccess(data));
    } else {
      yield put(getSingleOfferError(message));
    }
  } catch (error) {
    yield put(getSingleOfferError(error));
  }
}
export function* watchGetSingleOffer() {
  yield takeEvery(GET_SINGLE_OFFER, getSingleOfferWorker);
}

const updateOfferAsync = async (offer, _id) => {
  const res = await API.put(`/offer/${_id}`, offer);
  return res;
};

function* updateOfferWorker({ payload }) {
  const { offer, history, _id } = payload;
  try {
    const { data, status } = yield call(updateOfferAsync, offer, _id);
    const { message } = data;
    if (status === 200) {
      history.push('/app/applications/Offers');
      yield put(updateOfferSuccess(data));
    } else {
      yield put(updateOfferError(message));
    }
  } catch (error) {
    yield put(updateOfferError(error));
  }
}
export function* watchUpdateOffer() {
  yield takeEvery(UPDATE_OFFER, updateOfferWorker);
}

const deleteOfferAsync = async (_id) => {
  const res = await API.delete(`/offer/${_id}`);
  return res;
};
function* deleteOfferWorker({ payload }) {
  const { _id } = payload;
  try {
    const { status, data } = yield call(deleteOfferAsync, _id);
    const { message } = data;
    if (status === 200) {
      yield put(deleteOfferSuccess(_id));
    } else {
      yield put(deleteOfferError(message));
    }
  } catch (error) {
    yield put(deleteOfferError(error));
  }
}
export function* watchDeleteOffer() {
  yield takeEvery(DELETE_OFFER, deleteOfferWorker);
}

export default function* rootSaga() {
  yield all([
    fork(watchAddOffer),
    fork(watchGetOffer),
    fork(watchGetSingleOffer),
    fork(watchUpdateOffer),
    fork(watchDeleteOffer),
  ]);
}

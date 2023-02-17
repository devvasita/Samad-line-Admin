import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { adminRoot, currentUser } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
import API from 'helpers/API';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_USER_DETAILS,
  OTP_VERIFY,
  CHANGE_PASSWORD,
} from '../contants';

import {
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  getUserDetailSuccess,
  getUserDetailsError,
  verifyOtpSuccess,
  verifyOtpError,
  changePasswordError,
  changePasswordSuccess,
} from './actions';

const getUSerDetailsAsync = async () => {
  try {
    const res = await API.get('/user/profile');
    return res;
  } catch (error) {
    return error;
  }
};

export function* getUserWorker({ payload }) {
  const { history } = payload;
  try {
    const { data } = yield call(getUSerDetailsAsync);
    if (data) {
      yield put(getUserDetailSuccess(data));
    } else {
      history.push('/');
      yield put(getUserDetailsError('token expired'));
    }
  } catch (error) {
    history.push('/');
    yield put(getUserDetailsError('something went wrong'));
  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER_DETAILS, getUserWorker);
}

const loginWithPhoneNumberPasswordAsync = async (mobileNo, password) => {
  try {
    const res = await API.post('/user/login', {
      mobileNo,
      password,
    });
    return res;
  } catch (error) {
    return error;
  }
};

const GenerateOtpAsync = async (mobileNo) => {
  try {
    const res = await API.post('/user/generate-otp', {
      mobileNo,
    });
    return res;
  } catch (error) {
    return error;
  }
};

function* loginWithPhoneNumberPassword({ payload }) {
  const { mobileNo, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(
      loginWithPhoneNumberPasswordAsync,
      mobileNo,
      password
    );
    const {
      data: { message },
      status,
    } = loginUser;

    if (status === 200) {
      yield call(GenerateOtpAsync, mobileNo);
      localStorage.setItem('mobileNo', JSON.stringify({ mobileNo }));
      history.push('/user/otp');
    } else {
      yield put(loginUserError(message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginWithPhoneNumberPassword);
}

const verifyOtpAsync = async (mobileNo, otp) => {
  try {
    const { data, status } = await API.post('/user/verify-otp', {
      mobileNo,
      otp,
    });
    return { data, status };
  } catch (error) {
    return error;
  }
};
function* verifyOtp({ payload }) {
  const {
    otpValues: { mobileNo, otp, resetPass },
    history,
  } = payload;

  try {
    const {
      data: { success, token, user, message },
      status,
    } = yield call(verifyOtpAsync, mobileNo, otp);
    if (status === 200 && success) {
      yield put(verifyOtpSuccess());
      localStorage.removeItem('mobileNo');
      if (resetPass) history.push(`/user/reset-password/${token}`);
      else {
        localStorage.setItem('auth_token', token);
        yield put(getUserDetailSuccess(user));
        history.push('/app/dashboards/ecommerce');
      }
    } else {
      yield put(verifyOtpError(message));
    }
  } catch (error) {
    yield put(verifyOtpError('something went wrong please try again'));
  }
}
export function* watchVerifyOtp() {
  yield takeEvery(OTP_VERIFY, verifyOtp);
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) => {
  console.log({ email, password });
};

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  history.push('/');
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  localStorage.clear();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

function* forgotPassword({ payload }) {
  const { mobileNo, history } = payload;
  try {
    const {
      status,
      data: { message },
    } = yield call(GenerateOtpAsync, mobileNo);
    if (status === 200) {
      yield put(forgotPasswordSuccess('OTP sent successfully to your number'));
      history.push('/user/otp');
    } else {
      yield put(forgotPasswordError(message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (token, newPassword) => {
  try {
    const res = await API.post(`/user/password/${token}`, {
      password: newPassword,
    });
    return res;
  } catch (error) {
    return error;
  }
};

function* resetPassword({ payload }) {
  const { newPassword, token } = payload;
  try {
    const {
      status,
      data: { message, success },
    } = yield call(resetPasswordAsync, token, newPassword);
    if (status === 200 && success) {
      yield put(resetPasswordSuccess(message));
      window.location.href = '/';
    } else {
      yield put(resetPasswordError(message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

const changePasswordAsync = async (oldPassword, newPassword) => {
  try {
    const res = await API.put('user/password', { oldPassword, newPassword });
    return res;
  } catch (error) {
    return error;
  }
};
function* changePassword({ payload }) {
  const { oldPassword, newPassword, history } = payload;
  try {
    const {
      status,
      data: { success, message },
    } = yield call(changePasswordAsync, oldPassword, newPassword);
    if (status === 200 && success) {
      yield put(changePasswordSuccess());
      history.push('/app/dashboards/default');
    } else {
      yield put(changePasswordError(message));
    }
  } catch (error) {
    yield put(changePasswordError(error));
  }
}
export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchGetUser),
    fork(watchVerifyOtp),
    fork(watchChangePassword),
  ]);
}

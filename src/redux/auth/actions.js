import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  OTP_VERIFY,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_ERROR,
  GET_USER_DETAILS,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_ERROR,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD,
} from '../contants';

export const getUserDetails = (history) => ({
  type: GET_USER_DETAILS,
  payload: { history },
});
export const getUserDetailSuccess = (user) => ({
  type: GET_USER_DETAILS_SUCCESS,
  payload: user,
});
export const getUserDetailsError = (message) => ({
  type: GET_USER_DETAILS_ERROR,
  payload: { message },
});

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});

export const verifyOtp = (otpValues, history) => ({
  type: OTP_VERIFY,
  payload: { otpValues, history },
});
export const verifyOtpSuccess = () => ({
  type: OTP_VERIFY_SUCCESS,
});
export const verifyOtpError = (message) => ({
  type: OTP_VERIFY_ERROR,
  payload: { message },
});

export const forgotPassword = (mobileNo, history) => ({
  type: FORGOT_PASSWORD,
  payload: { mobileNo, history },
});
export const forgotPasswordSuccess = (mobileNo) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: mobileNo,
});
export const forgotPasswordError = (message) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { message },
});

export const resetPassword = ({ token, newPassword, history }) => ({
  type: RESET_PASSWORD,
  payload: { token, newPassword, history },
});
export const resetPasswordSuccess = (newPassword) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: { newPassword },
});
export const resetPasswordError = (message) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message },
});

export const changePassword = (values, history) => ({
  type: CHANGE_PASSWORD,
  payload: { ...values, history },
});
export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});
export const changePasswordError = (message) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: { message },
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },
});
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});
export const registerUserError = (message) => ({
  type: REGISTER_USER_ERROR,
  payload: { message },
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

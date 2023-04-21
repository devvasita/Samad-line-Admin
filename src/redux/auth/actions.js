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
  USER_AUTH_SUCCESS,
  GET_ADMIN_ORDERS,
  GET_ADMIN_ORDERS_ERROR,
  GET_ADMIN_ORDERS_SUCCESS,
  GET_ADMIN_ORDER_BY_ID,
  GET_ADMIN_ORDER_BY_ID_SUCCESS,
  GET_ADMIN_ORDER_BY_ID_ERROR,
  UPDATE_ADMIN_ORDER_BY_ID,
  UPDATE_ADMIN_ORDER_BY_ID_SUCCESS,
  UPDATE_ADMIN_ORDER_BY_ID_ERROR,
  ADD_BLOG,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_ERROR,
  GET_BLOGS,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_ERROR,
  GET_BLOG_BY_ID,
  GET_BLOG_BY_ID_SUCCESS,
  GET_BLOG_BY_ID_ERROR,
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
export const changePasswordSuccess = (message) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: { message },
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
export const authSuccess = () => ({
  type: USER_AUTH_SUCCESS,
});
export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const getAdminOrders = () => ({
  type: GET_ADMIN_ORDERS,
});

export const getAdminOrdersSuccess = (orders) => ({
  type: GET_ADMIN_ORDERS_SUCCESS,
  payload: orders,
});

export const getAdminOrdersError = (message) => ({
  type: GET_ADMIN_ORDERS_ERROR,
  payload: { message },
});

export const getOrderById = (_id) => ({
  type: GET_ADMIN_ORDER_BY_ID,
  payload: { _id },
});

export const getOrderByIdSuccess = (order) => ({
  type: GET_ADMIN_ORDER_BY_ID_SUCCESS,
  payload: order,
});

export const getOrderByIdError = (message) => ({
  type: GET_ADMIN_ORDER_BY_ID_ERROR,
  payload: { message },
});

export const updateOrderById = (_id, status) => ({
  type: UPDATE_ADMIN_ORDER_BY_ID,
  payload: { _id, status },
});

export const updateOrderByIdSuccess = (order) => ({
  type: UPDATE_ADMIN_ORDER_BY_ID_SUCCESS,
  payload: order,
});

export const updateOrderByIdError = (message) => ({
  type: UPDATE_ADMIN_ORDER_BY_ID_ERROR,
  payload: { message },
});

export const addBlog = (data, history) => ({
  type: ADD_BLOG,
  payload: { data, history },
});
export const addBlogSuccess = (data) => ({
  type: ADD_BLOG_SUCCESS,
  payload: data,
});
export const addBlogError = (message) => ({
  type: ADD_BLOG_ERROR,
  payload: { message },
});

export const getBlog = (data, history) => ({
  type: GET_BLOGS,
  payload: { data, history },
});
export const getBlogSuccess = (data) => ({
  type: GET_BLOGS_SUCCESS,
  payload: data,
});
export const getBlogError = (message) => ({
  type: GET_BLOGS_ERROR,
  payload: { message },
});
export const getBlogById = (_id) => ({
  type: GET_BLOG_BY_ID,
  payload: { _id },
});
export const getBlogByIdSuccess = (data) => ({
  type: GET_BLOG_BY_ID_SUCCESS,
  payload: data,
});
export const getBlogByIdError = (message) => ({
  type: GET_BLOG_BY_ID_ERROR,
  payload: { message },
});

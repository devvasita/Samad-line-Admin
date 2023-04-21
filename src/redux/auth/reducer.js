import { isAuthGuardActive, currentUser } from 'constants/defaultValues';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  OTP_VERIFY,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_ERROR,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_ERROR,
  GET_USER_DETAILS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  USER_AUTH_SUCCESS,
  GET_ADMIN_ORDERS,
  GET_ADMIN_ORDERS_ERROR,
  GET_ADMIN_ORDERS_SUCCESS,
  GET_ADMIN_ORDER_BY_ID,
  GET_ADMIN_ORDER_BY_ID_SUCCESS,
  GET_ADMIN_ORDER_BY_ID_ERROR,
  ADD_BLOG,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_ERROR,
  GET_BLOGS,
  GET_BLOGS_SUCCESS,
  GET_BLOG_BY_ID_SUCCESS,
  GET_BLOG_BY_ID_ERROR,
} from '../contants';

const INIT_STATE = {
  currentUser: isAuthGuardActive ? currentUser : null,
  orders: { orders: [], razorpayOrders: [] },
  forgotUserMail: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  error: '',
  selectedOrder: {
    currentOrderStatus: {},
    orderItems: [],
    shippingAddress: {},
    subTotal: 0,
    total: 0,
    tax: 0,
  },
  blogs: [],
  success: '',
  selectedBlog: { image: {} },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      return { ...state, loading: true, error: '' };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case GET_USER_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case OTP_VERIFY:
      return { ...state, loading: true, error: '' };
    case OTP_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case OTP_VERIFY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: action.payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: '',
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPassword: action.payload,
        resetPasswordCode: '',
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        newPassword: '',
        resetPasswordCode: '',
        error: action.payload.message,
      };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        success: '',
      };
    case CHANGE_PASSWORD_SUCCESS:
      console.log(action.payload.message, '00000');
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        error: '',
      };
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: '' };
    case GET_ADMIN_ORDERS:
      return { ...state, loading: true };
    case GET_ADMIN_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case GET_ADMIN_ORDERS_ERROR:
      return { ...state, loading: false, error: action.payload.message };
    case GET_ADMIN_ORDER_BY_ID:
      return { ...state, loading: true };
    case GET_ADMIN_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, selectedOrder: action.payload };
    case GET_ADMIN_ORDER_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload.message };
    case ADD_BLOG:
      return { ...state, loading: true };
    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        loading: true,
        blogs: [action.payload, ...state.blogs],
      };
    case ADD_BLOG_ERROR:
      return { ...state, loading: false, error: action.payload.message };
    case GET_BLOGS:
      return { ...state, loading: true };
    case GET_BLOGS_SUCCESS:
      return { ...state, loading: true, blogs: action.payload };
    case GET_BLOG_BY_ID_SUCCESS:
      return { ...state, loading: false, selectedBlog: action.payload };
    case GET_BLOG_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload.message };
    default:
      return { ...state };
  }
};

import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export default axios.create({
  baseURL: baseUrl,
  timeout: 30000, // 30 secs
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
  },
  validateStatus: (status) => status,
});

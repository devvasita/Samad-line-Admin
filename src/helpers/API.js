import axios from 'axios';

const baseUrl =
  'http://localhost:8080/api/v1' || process.env.REACT_APP_BASE_URL;

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

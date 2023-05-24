import axios from 'axios';

const authToken = localStorage.getItem('authToken');
export const axiosMain = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_END_POINT_URL_DEV
      : process.env.REACT_APP_END_POINT_URL_DEV,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  },
});

export const paymentMain = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_PAYMENT_BASE_URL
      : process.env.REACT_APP_PAYMENT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authMain = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_END_POINT_URL_DEV_AUTH
      : process.env.REACT_APP_END_POINT_URL_DEV_AUTH,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const marketMain = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_END_POINT_URL_DEV_MARKET
      : process.env.REACT_APP_END_POINT_URL_DEV_MARKET,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userMain = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_END_POINT_URL_USER
      : process.env.REACT_APP_END_POINT_URL_USER,
  headers: {
    'Content-Type': 'application/json',
  },
});

// export default axiosMain;

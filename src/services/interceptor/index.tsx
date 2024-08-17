/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";

let base_url = process.env.NEXT_PUBLIC_BASE_URL

const clearSession = () => {
  Cookies.remove('token')
  window.location.reload();
};

const axiosInstance = axios.create({
  baseURL: base_url,
  timeout: 40000, // 40 sec
});

// Add a request interceptor to attach the auth token to each request
axiosInstance.interceptors.request.use(
  async (config) => {
    const sessionCookies = Cookies.get('token')
    if (sessionCookies) {
      config.headers.Authorization = `Bearer ${sessionCookies}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to check for success and move to catch block
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.isSuccessful === false) {
      return Promise.reject(response.data); // Move to catch block
    }

    return response;
  },
  (error) => {
    if(error?.code === "ERR_NETWORK"){
      toast(error?.message)
    }
    if (error.response && error.response.status === 401) {
      clearSession(); // Remove token and reload the app
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
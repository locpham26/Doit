import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 300000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const request = (params) => {
  return axiosInstance.request(params);
};

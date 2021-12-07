import axios from "axios";
import { BASE_URL } from "./baseApi"

import store from '../store/index'

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = store.state.token || localStorage.getItem('token');
    config.headers.Authorization = token;

    console.log(store, store.state)

    console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


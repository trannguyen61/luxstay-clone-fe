import axios from "axios";
import { BASE_URL } from "./baseApi"

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


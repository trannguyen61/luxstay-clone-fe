import axios from "axios";
import { BASE_URL } from "../api/baseApi";

export default {
  install(app) {
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
    });

    app.config.globalProperties.$axios = axiosInstance;

    app.provide("$axios", axiosInstance);
  },
};

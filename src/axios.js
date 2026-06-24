// src/axios.js
import axios from "axios";
import router from "@/router";

const instance = axios.create({
  baseURL: "https://api.yokodrive.com/yoko_driver_api/public/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const ImageUrl = "https://api.yokodrive.com/yoko_driver_api/public";

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("activeUser");

      router.push("/");
    }

    return Promise.reject(error);
  }
);

export default instance;
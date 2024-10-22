// axiosConfig.js
import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL, COOKIE_NAME } from "../constants/appContants";

// Créez une instance d'Axios
const api = axios.create({
  baseURL: BACKEND_URL,
});

// Intercepteur de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 403) ||
      error.response.status === 401
    ) {
      Cookies.remove(COOKIE_NAME);

      window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;

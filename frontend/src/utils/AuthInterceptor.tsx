import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { COOKIE_NAME } from "../constants/appContants";
import { useEffect } from "react";

const AuthInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          Cookies.remove(COOKIE_NAME);
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return null;
};

export default AuthInterceptor;

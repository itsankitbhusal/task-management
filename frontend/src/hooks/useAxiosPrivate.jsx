import { useEffect, useContext } from "react";
import request from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import { UserContext } from "../context/UserContext";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { logout } = useContext(UserContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const requestIntercept = request.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = request.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          if (error?.response?.data?.error === "expired") {
            logout();
          }
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          localStorage.setItem("accessToken", newAccessToken);
          return request(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      request.interceptors.request.eject(requestIntercept);
      request.interceptors.response.eject(responseIntercept);
    };
  }, [localStorage.getItem("accessToken"), refresh]);

  return request;
};

export default useAxiosPrivate;

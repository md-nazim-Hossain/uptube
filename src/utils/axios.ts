import Axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

const axios = Axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BASE_URL,
    Authorization: `Bearer ${getCookie("accessToken")}`,
  },
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any, any>) => {
    return Promise.reject(error?.response) as Promise<
      AxiosResponse<AxiosError>
    >;
  },
);

export default axios;

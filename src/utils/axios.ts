import { IAPIResponse } from "@/types";
import Axios, { AxiosResponse } from "axios";

const axios = Axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response?.data as AxiosResponse<IAPIResponse<any>, any>;
  },
  (error) => {
    return Promise.reject(error?.response?.data) as Promise<IAPIResponse<any>>;
  },
);

export default axios;

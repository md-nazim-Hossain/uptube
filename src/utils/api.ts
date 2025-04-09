import { getCookie } from "cookies-next";
import axios from "./axios";

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      ...params,
    }),
  post: <T>(url: string, data: any) =>
    axios.post<T>(url, data, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }),
  patch: <T>(url: string, data: any) =>
    axios.patch<T>(url, data, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }),
  put: <T>(url: string, data: any) =>
    axios.put<T>(url, data, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }),
  delete: <T>(url: string) =>
    axios.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }),
};

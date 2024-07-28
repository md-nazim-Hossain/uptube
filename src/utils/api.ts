import cookie from "js-cookie";
import axios from "./axios";

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, {
      headers: {
        Authorization: `Bearer ${cookie.get("accessToken")}`,
      },
      ...params,
    }),
  post: <T>(url: string, data: any) =>
    axios.post<T>(url, data, {
      headers: {
        Authorization: `Bearer ${cookie.get("accessToken")}`,
      },
    }),
  patch: <T>(url: string, data: any) =>
    axios.patch<T>(url, data, {
      headers: {
        Authorization: `Bearer ${cookie.get("accessToken")}`,
      },
    }),
  delete: <T>(url: string) =>
    axios.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${cookie.get("accessToken")}`,
      },
    }),
};

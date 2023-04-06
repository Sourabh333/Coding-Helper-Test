import axios, { AxiosPromise } from "axios";
import { API_BASE_URL } from "../../env";

type HttpMethod = "get" | "post" | "delete" | "put";

const doRequest = <R, D>(
  method: HttpMethod,
  url: string,
  data?: D
): AxiosPromise<R> => {
  return axios({
    method: method,
    url: `${API_BASE_URL}/api/${url}`,
    data: data,
  });
};

const doGet = <R>(url: string): AxiosPromise<R> => {
  return doRequest("get", url);
};

const doPost = <R, D>(url: string, data: D): AxiosPromise<R> => {
  return doRequest("post", url, data);
};

export { doGet, doPost };

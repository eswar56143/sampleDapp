import axios from "axios";
import { PUBLIC_URL } from "./constants";

/** Format URL */
const formatUrl = (url, params) => {
  const param =
    params && Object.keys(params)?.length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : "";
  return `${url}${param}`;
};

const instance = axios.create({
  baseURL: PUBLIC_URL,
  withCredentials: false,
  headers: {
    "content-type": "application/json",
  },
});

/** POST Request */
export const httpPost = (url, header, data, params = {}) =>
  new Promise((resolve) => {
    instance
      .post(formatUrl(url, params), data, { headers: header })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });

/** GET Request */
export const httpGet = async (url, header, params) =>
  new Promise((resolve) => {
    console.log(url);
    instance
      .get(formatUrl(url, params), { headers: header })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });

/** PUT Request */
export const httpPut = (url, header, data, params = {}) =>
  new Promise((resolve) => {
    instance
      .put(formatUrl(url, params), data, { headers: header })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });

/** PATCH Request */
export const httpPatch = (url, header, data, params = {}) =>
  new Promise((resolve) => {
    instance
      .patch(formatUrl(url, params), data, { headers: header })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });

/** DELETE Request */
export const httpDelete = (url, header, params) =>
  new Promise((resolve) => {
    instance
      .delete(formatUrl(url, params), { headers: header })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });

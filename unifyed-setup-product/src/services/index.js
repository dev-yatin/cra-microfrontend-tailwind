import http from "./http";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleResponse = (response) => {
  if (response.results) {
    return response.results;
  }

  if (response.data) {
    return response.data;
  }

  return response;
};

const handleError = (error) => {
  if (error.response) {
    return error.response;
  }
  return error;
};

/** @param {string} path */
const get = (path) =>
  http.get(`${BASE_URL}/${path}`).then(handleResponse).catch(handleError);

/** @param {string} path */
/** @param {object} model */
const post = (resource, model) =>
  http
    .post(`${BASE_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);

/** @param {string} path */
/** @param {object} model */
const put = (path, model) =>
  http
    .put(`${BASE_URL}/${path}`, model)
    .then(handleResponse)
    .catch(handleError);

/** @param {string} path */
/** @param {object} model */
const patch = (path, model) =>
  http
    .patch(`${BASE_URL}/${path}`, model)
    .then(handleResponse)
    .catch(handleError);

/** @param {string} path */
/** @param {string} id */
const remove = (path) =>
  http.delete(`${BASE_URL}/${path}`).then(handleResponse).catch(handleError);

export const apiProvider = {
  get,
  post,
  put,
  patch,
  remove,
  serverBaseUrl: BASE_URL,
};

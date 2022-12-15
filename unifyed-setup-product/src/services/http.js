import axios from "axios";

const http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const handleUnauthenticatedRequest = () => {
  // redirect to login page
  // window.location.href = "/login";
  // window.location.reload();
  // throw new axios.Cancel("SESSION_TIMEOUT");
};

http.doLogin = (url, data) => {
  const promise = axios.post(url, data);
  const response = promise.then((response) => response.data);
  return response;
};

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    console.log("Requesting http token: ", token);
    if (!!token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      handleUnauthenticatedRequest();
    }
    return Promise.reject(error);
  }
);

export default http;

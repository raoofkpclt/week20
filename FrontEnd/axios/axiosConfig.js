import axios from "axios";

let axiosBaseUrl = axios.create({
  baseURL: "http://localhost:3033",
});

axios.interceptors.request.use(
  (config) => {
    console.log("interceptor is working");
    const token = JSON.parse(localStorage.getItem("authToken"));

    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("axios request catch block error");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //check the error is an unauthorized error:
    if (error.response && error.response.status == 401) {
      console.log("you must login");
    }
    return Promise.reject(error);
  }
);

export default axiosBaseUrl;

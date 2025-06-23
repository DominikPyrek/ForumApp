import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

async function refreshToken() {
  axiosInstance.post("/token/refresh/");
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      await refreshToken();
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

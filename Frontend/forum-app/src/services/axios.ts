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
  return axiosInstance.post("/token/refresh/");
}

async function logOut() {
  return axiosInstance.post("/logout/");
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {
      originalRequest._retry = true;
      await refreshToken();
      return axiosInstance(originalRequest);
    } else if (
      error.response?.data?.detail ===
        "Invalid or expired refresh token. Please log in again." &&
      !originalRequest._retry
    ) {
      await logOut();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

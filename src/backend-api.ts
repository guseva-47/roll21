import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;

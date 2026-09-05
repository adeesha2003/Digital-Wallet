import axios from "axios";

// Backend API base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Automatically attach JWT token
// to protected requests
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
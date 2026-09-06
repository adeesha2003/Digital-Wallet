import axios from "axios";

// Backend API base URL
// The URL is loaded from the frontend .env file
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Automatically attach the logged-in user's JWT
// to protected backend requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
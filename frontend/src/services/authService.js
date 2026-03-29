import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class AuthService {
  static async staffLogin(credentials) {
    try {
      console.log(credentials)
      const response = await api.post("/staff-login", credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async patientLogin(credentials) {
    try {
      const response = await api.post("/patient-login", credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getCurrentUser() {
    try {
      const response = await api.get("/get-curr-user");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async logout() {
    try {
      const response = await api.post("/logout");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static handleError(error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Authentication error");
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export default api;

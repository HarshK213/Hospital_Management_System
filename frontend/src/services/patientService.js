import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export class PatientService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/patient`,
      withCredentials: true,
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async register(registrationData) {
    try {
      const response = await this.api.post("/register", registrationData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verify() {
    try {
      const response = await this.api.get("/verify");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getDoctors() {
    try {
      const response = await this.api.get("/doctors");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async bookAppointment(appointmentData) {
    try {
      const response = await this.api.post("/appointment", appointmentData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getBills() {
    try {
      const response = await this.api.get("/bills");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getBill(billId) {
    try {
      const response = await this.api.get(`/bill/${billId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMedicalHistory() {
    try {
      const response = await this.api.get("/medical-history");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPayments() {
    try {
      const response = await this.api.get("/payments");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateUser(updateData) {
    try {
      const response = await this.api.put("/update", updateData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Patient service error");
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export const patientService = new PatientService();

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export class DoctorService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
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

  async addMedicalRecord(patientId, recordData) {
    try {
      const response = await this.api.post(`/doctor/patient/${patientId}/medical-record`, recordData);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPatientDetails(patientId) {
    try {
      const response = await this.api.get(`/patient/${patientId}`);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAppointments(params = {}) {
    try {
      const response = await this.api.get("/doctor/appointments", { params });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Doctor service error");
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export const doctorService = new DoctorService();

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export class AdminService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/admin`,
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

  async addStaff(staffData) {
    try {
      const response = await this.api.post("/add-staff", staffData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateStaffStatus(staffId, statusData) {
    try {
      const response = await this.api.put(`/staff-status/${staffId}`, statusData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPatientMedicalHistory(patientId) {
    try {
      const response = await this.api.get(`/medical-history/${patientId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Admin service error");
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export const adminService = new AdminService();

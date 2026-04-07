import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export class AdminService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}`,
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
      const response = await this.api.post("/admin/add-staff", staffData);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStaffByUserId(userId) {
    try {
      const response = await this.api.get(`/admin/staff/user-id/${userId}`);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteStaff(staffId) {
    try {
      const response = await this.api.delete(`/admin/staff/${staffId}`);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPatientMedicalHistory(patientId) {
    try {
      const response = await this.api.get(
        `/admin/medical-history/${patientId}`,
      );
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAllStaff() {
    try {
      const response = await this.api.get(`/admin/staff`);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Admin service error");
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export const adminService = new AdminService();

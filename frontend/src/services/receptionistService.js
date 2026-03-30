import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export class ReceptionistService {
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

  async registerPatient(patientData) {
    try {
      const response = await this.api.post("/receptionist/patient/register", patientData);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async bookAppointment(appointmentData) {
    try {
      const response = await this.api.post("/receptionist/appointment/book", appointmentData);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateAppointment(appointmentId, appointmentData) {
    try {
      const response = await this.api.put(`/receptionist/appointment/${appointmentId}`, appointmentData);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPatientProfile(patientId) {
    try {
      const response = await this.api.get(`/receptionist/patient/${patientId}`);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async generateOPDBill(billData) {
    try {
      const response = await this.api.post("/receptionist/bill/opd", billData);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getDoctors() {
    try {
      const response = await this.api.get("/patient/doctors");
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async searchPatientByUsername(username) {
    try {
      const response = await this.api.get(`/patient/search?username=${username}`);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Receptionist service error");
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export const receptionistService = new ReceptionistService();

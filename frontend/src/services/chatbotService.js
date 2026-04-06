import axios from "axios";

const CHATBOT_API_URL = "http://localhost:8000/api";

const chatbotApi = axios.create({
  baseURL: CHATBOT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export class ChatBotService {
  static async sendMessage(message, conversationHistory = []) {
    try {
      const response = await chatbotApi.post("/chat", {
        message,
        history: conversationHistory,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getConversation(id) {
    try {
      const response = await chatbotApi.get(`/conversation/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async resetConversation(id) {
    try {
      const response = await chatbotApi.post(`/conversation/${id}/reset`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static handleError(error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Chatbot error");
    } else if (error.request) {
      throw new Error("Unable to connect to chatbot. Please try again.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export default chatbotApi;

import apiClient from "./axios";

class ApiService {
  #apiClient;

  constructor() {
    this.#apiClient = apiClient;
  }

  async sendRequest(url, method, data = null, params = {}, headers = null) { 
    if (!url) {
      throw new Error("URL is required");
    }
  
    try {
      let res;
  
      switch (method.toLowerCase()) {
        case 'get':
          console.log("GET request to:", url, "with params:", params);
          res = await this.#apiClient.get(url, { params, headers });
          break;
        case 'post':
          res = await this.#apiClient.post(url, data, { params, headers });
          break;
        case 'put':
          res = await this.#apiClient.put(url, data, { params, headers });
          break;
        case 'delete':
          res = await this.#apiClient.delete(url, { params, headers });
          break;
        default:
          throw new Error("Unsupported HTTP method");
      }
  
      return res.data;
    } catch (error) {
      console.error("API Request failed:", error);
  
      const message =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error.message ||
        "Unknown error";
  
      throw new Error(message);
    }
  }
}

const apiService = new ApiService();
export default apiService;
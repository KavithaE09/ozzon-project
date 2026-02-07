import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const containerPurchaseApi = {
  // ==================== CREATE ====================
  createPurchase: async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/container-purchase`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error creating container purchase:", error);
      throw error;
    }
  },

  // ==================== GET ALL ====================
  getAllPurchases: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/container-purchase`);
      return response.data;
    } catch (error) {
      console.error("Error fetching container purchases:", error);
      throw error;
    }
  },

  // ==================== GET BY ID ====================
  getPurchaseById: async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/container-purchase/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching container purchase:", error);
      throw error;
    }
  },

  // ==================== UPDATE ====================
  updatePurchase: async (id, data) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/container-purchase/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating container purchase:", error);
      throw error;
    }
  },

  // ==================== DELETE ====================
  deletePurchase: async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/container-purchase/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting container purchase:", error);
      throw error;
    }
  },

  // ==================== SEARCH ====================
  searchPurchases: async (searchTerm) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/container-purchase/search`,
        {
          params: { search: searchTerm },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching container purchases:", error);
      throw error;
    }
  },
};

export default containerPurchaseApi;
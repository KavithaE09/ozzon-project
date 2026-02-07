import axios from "axios";
import { BASE_URL } from "./baseurl";

const API_BASE_URL = `${BASE_URL}/material-list`;

const materialApi = {
  // ==================== GET ALL ====================
  getAllMaterials: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching materials:", error);
      throw error;
    }
  },

  // ==================== GET BY ID ====================
  getMaterialById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${encodeURIComponent(id)}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching material:", error);
      throw error;
    }
  },

  // ==================== CREATE ====================
  createMaterial: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating material:", error);
      throw error;
    }
  },

  // ==================== UPDATE ====================
  updateMaterial: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${encodeURIComponent(id)}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating material:", error);
      throw error;
    }
  },

  // ==================== DELETE ====================
  deleteMaterial: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${encodeURIComponent(id)}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting material:", error);
      throw error;
    }
  },

  // ==================== SEARCH ====================
  searchMaterials: async (searchTerm) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { search: searchTerm },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching materials:", error);
      throw error;
    }
  },
};

export default materialApi;

import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const templateSettingsApi = {

  createTemplate: async (data) => {
    const response = await axios.post(
      `${API_BASE_URL}/template-settings`,
      data
    );
    return response.data;
  },

  getAllTemplates: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/template-settings`
    );
    return response.data;
  },

  getTemplateById: async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/template-settings/${id}`
    );
    return response.data;
  },

  updateTemplate: async (id, data) => {
    const response = await axios.put(
      `${API_BASE_URL}/template-settings/${id}`,
      data
    );
    return response.data;
  },

  deleteTemplate: async (id) => {
    const response = await axios.delete(
      `${API_BASE_URL}/template-settings/${id}`
    );
    return response.data;
  },

  getTempGroups: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/master/tempgroup`
    );
    return response.data;
  },

};

export default templateSettingsApi;

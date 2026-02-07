import axios from "axios";
import { BASE_URL } from "./baseurl";

const API_BASE_URL = `${BASE_URL}/template-settings`;

const templateSettingsApi = {
  createTemplate: async (data) => {
    const response = await axios.post(`${API_BASE_URL}`, data);
    return response.data;
  },

  getAllTemplates: async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  },

  getTemplateById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  updateTemplate: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  },

  deleteTemplate: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  getTempGroups: async () => {
    const response = await axios.get(`${BASE_URL}/master/tempgroup`);
    return response.data;
  },

  getAllTemplateSpecifications: async () => {
    const response = await axios.get(`${BASE_URL}/template-settings/template-specifications`);
    return response.data;
  },
};

export default templateSettingsApi;

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const materialApi = {
  getAllMaterials: async () => {
    const response = await axios.get(`${API_BASE_URL}/material-list`);
    return response.data;
  },

  createMaterial: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/material-list`, data);
    return response.data;
  },

  updateMaterial: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/material-list/${id}`, data);
    return response.data;
  },

  deleteMaterial: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/material-list/${id}`);
    return response.data;
  },

  searchMaterials: async (name) => {
    const response = await axios.get(`${API_BASE_URL}/material-list/search`, {
      params: { name }
    });
    return response.data;
  },

  getMaterialGroups: async () => {
    const response = await axios.get(`${API_BASE_URL}/material-groups`);
    return response.data;
  },

  getUnits: async () => {
    const response = await axios.get(`${API_BASE_URL}/units`);
    return response.data;
  }
};

export default materialApi;
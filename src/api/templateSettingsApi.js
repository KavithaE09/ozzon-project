import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const templateSettingsApi = {

  // ================= TEMPLATE SETTINGS =================

  // CREATE
  createTemplate: async (data) => {
    const response = await axios.post(
      `${API_BASE_URL}/template-settings`,
      data
    );
    return response.data;
  },

  // GET ALL
  getAllTemplates: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/template-settings`
    );
    return response.data;
  },

  // GET BY ID (EDIT)
  getTemplateById: async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/template-settings/${id}`
    );
    return response.data;
  },

  // UPDATE
  updateTemplate: async (id, data) => {
    const response = await axios.put(
      `${API_BASE_URL}/template-settings/${id}`,
      data
    );
    return response.data;
  },

  // DELETE
  deleteTemplate: async (id) => {
    const response = await axios.delete(
      `${API_BASE_URL}/template-settings/${id}`
    );
    return response.data;
  },


  // ================= MASTER DATA =================

  // TEMP GROUP MASTER
  getTempGroups: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/master/tempgroup`
    );
    return response.data;
  },

  // TEMP SPEC MASTER
//   getTempSpecs: async () => {
//   const res = await axios.get(
//     `${API_BASE_URL}/master/tempspec`
//   );
//   return res.data;
// }


};

export default templateSettingsApi;

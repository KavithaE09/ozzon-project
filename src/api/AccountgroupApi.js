import axios from "axios";
import { BASE_URL } from "./baseurl";

const API_BASE_URL = `${BASE_URL}/account-groups`;

const accountGroupApi = {
  // Get all account groups with optional search and pagination
  getAllAccountGroups: async (params = {}) => {
    try {
      const response = await axios.get(API_BASE_URL, { params });
      return response.data;
    } catch (error) {
      console.error("Get account groups error:", error);
      throw error;
    }
  },

  // Get account groups for dropdown (simple list)
  getAccountGroupsForDropdown: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dropdown`);
      if (response.data && response.data.data) {
        const transformedData = response.data.data.map(group => ({
          accountGroupId: group.GroupCode,
          accountGroupName: group.GroupName
        }));
        return { ...response.data, data: transformedData };
      }
      return response.data;
    } catch (error) {
      console.error("Get dropdown account groups error:", error);
      throw error;
    }
  },

  // Get account group by ID
  getAccountGroupById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${encodeURIComponent(id)}`);
      return response.data;
    } catch (error) {
      console.error("Get account group by ID error:", error);
      throw error;
    }
  },

  // Create new account group
  createAccountGroup: async (data) => {
    try {
      const response = await axios.post(API_BASE_URL, data);
      return response.data;
    } catch (error) {
      console.error("Create account group error:", error);
      throw error;
    }
  },

  // Update account group
  updateAccountGroup: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${encodeURIComponent(id)}`, data);
      return response.data;
    } catch (error) {
      console.error("Update account group error:", error);
      throw error;
    }
  },

  // Delete account group
  deleteAccountGroup: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${encodeURIComponent(id)}`);
      return response.data;
    } catch (error) {
      console.error("Delete account group error:", error);
      throw error;
    }
  },
};

export default accountGroupApi;

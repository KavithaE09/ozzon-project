import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const accountGroupApi = {
  // Get all account groups with optional search and pagination
  getAllAccountGroups: async (params = {}) => {
    const response = await axios.get(`${API_BASE_URL}/account-groups`, { params });
    return response.data;
  },

  // Get account groups for dropdown (simple list)
  getAccountGroupsForDropdown: async () => {
    const response = await axios.get(`${API_BASE_URL}/account-groups/dropdown`);
    
    // ✅ Transform the response to match frontend expectations
    if (response.data && response.data.data) {
      const transformedData = response.data.data.map(group => ({
        accountGroupId: group.GroupCode,
        accountGroupName: group.GroupName
      }));
      
      return {
        ...response.data,
        data: transformedData
      };
    }
    
    return response.data;
  },

  // Get account group by ID
  getAccountGroupById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/account-groups/${id}`);
    return response.data;
  },

  // Create new account group
  createAccountGroup: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/account-groups`, data);
    return response.data;
  },

  // Update account group
  updateAccountGroup: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/account-groups/${id}`, data);
    return response.data;
  },

  // Delete account group
  deleteAccountGroup: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/account-groups/${id}`);
    return response.data;
  },
};

export default accountGroupApi;
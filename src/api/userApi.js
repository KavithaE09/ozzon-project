import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const userApi = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  },

  // Create user
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, {
        username: userData.username,
        departmentId: userData.departmentId,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        roleId: userData.roleId
      });
      return response.data;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${userId}`, {
        username: userData.username,
        departmentId: userData.departmentId,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        roleId: userData.roleId
      });
      return response.data;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },

  // Search users
  searchUsers: async (searchTerm) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/search?username=${searchTerm}`);
      return response.data;
    } catch (error) {
      console.error('Search users error:', error);
      throw error;
    }
  }
};

export default userApi;
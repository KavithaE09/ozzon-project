import axios from 'axios';
import { BASE_URL } from "./baseurl";

const API_URL = `${BASE_URL}/users`;

const userApi = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(API_URL, {
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

  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`, {
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

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },

  searchUsers: async (searchTerm) => {
    try {
      const response = await axios.get(`${API_URL}/search?username=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      console.error('Search users error:', error);
      throw error;
    }
  }
};

export default userApi;

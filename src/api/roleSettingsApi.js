import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get all role settings
export const getAllRoleSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rolesettings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching role settings:', error);
    throw error;
  }
};

// Get role setting by ID
export const getRoleSettingById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rolesettings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching role setting:', error);
    throw error;
  }
};

// Create new role setting
export const createRoleSetting = async (roleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rolesettings`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error creating role setting:', error);
    throw error;
  }
};

// Update role setting
export const updateRoleSetting = async (id, roleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/rolesettings/${id}`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error updating role setting:', error);
    throw error;
  }
};

// Delete role setting
export const deleteRoleSetting = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/rolesettings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting role setting:', error);
    throw error;
  }
};
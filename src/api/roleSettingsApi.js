import axios from 'axios';
import { BASE_URL } from "./baseurl";
const API_BASE_URL = `${BASE_URL}/rolesettings`;

export const getAllRoleSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rolesettings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching role settings:', error);
    throw error;
  }
};

export const getRoleSettingById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rolesettings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching role setting:', error);
    throw error;
  }
};

export const createRoleSetting = async (roleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rolesettings`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error creating role setting:', error);
    throw error;
  }
};

export const updateRoleSetting = async (id, roleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/rolesettings/${id}`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error updating role setting:', error);
    throw error;
  }
};

export const deleteRoleSetting = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/rolesettings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting role setting:', error);
    throw error;
  }
};
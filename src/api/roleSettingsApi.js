import axios from 'axios';
import { BASE_URL } from "./baseurl";

// ✅ FIXED: API_BASE_URL should be just the base
const API_BASE_URL = `${BASE_URL}/rolesettings`;

// ✅ Get all role settings - backend includes Role model
export const getAllRoleSettings = async () => {
  try {
    console.log('📡 Fetching all role settings...');
    // ✅ FIXED: Don't add /rolesettings again, API_BASE_URL already has it
    const response = await axios.get(API_BASE_URL);
    console.log('📡 Role settings response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching role settings:', error);
    console.error('❌ Error details:', error.response?.data);
    throw error;
  }
};

// ✅ Get role setting by RoleSettingsId
export const getRoleSettingById = async (id) => {
  try {
    console.log('📡 Fetching role setting by ID:', id);
    // ✅ FIXED: Use API_BASE_URL directly
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    console.log('📡 Role setting response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching role setting:', error);
    console.error('❌ Error details:', error.response?.data);
    throw error;
  }
};

// ✅ Create new role setting - Transform frontend data to backend format
export const createRoleSetting = async (roleData) => {
  try {
    console.log('📡 Creating role setting with frontend data:', roleData);
    
    // ✅ Transform frontend data to backend expected format
    const backendPayload = {
      RoleId: roleData.roleId,
      CanAdd: roleData.isActive || false,
      CanDelete: roleData.canDelete || false,
      CanView: roleData.canView || false,
      CanPrint: roleData.canPrint || false,
      CanMenu: roleData.canMenu || false,
      CanOther: roleData.canOther || false
    };
    
    console.log('📡 Transformed backend payload:', backendPayload);
    // ✅ FIXED: Use API_BASE_URL directly
    const response = await axios.post(API_BASE_URL, backendPayload);
    console.log('✅ Create response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating role setting:', error);
    console.error('❌ Error details:', error.response?.data);
    throw error;
  }
};

// ✅ Update role setting - Uses RoleSettingsId (PRIMARY KEY)
export const updateRoleSetting = async (roleSettingsId, roleData) => {
  try {
    console.log('📡 Updating role setting with RoleSettingsId:', roleSettingsId);
    console.log('📡 Frontend data:', roleData);
    
    // ✅ Transform to backend format - only send the Can* fields
    const backendPayload = {
      CanAdd: roleData.CanAdd !== undefined ? roleData.CanAdd : roleData.isActive || false,
      CanDelete: roleData.CanDelete !== undefined ? roleData.CanDelete : roleData.canDelete || false,
      CanView: roleData.CanView !== undefined ? roleData.CanView : roleData.canView || false,
      CanPrint: roleData.CanPrint !== undefined ? roleData.CanPrint : roleData.canPrint || false,
      CanMenu: roleData.CanMenu !== undefined ? roleData.CanMenu : roleData.canMenu || false,
      CanOther: roleData.CanOther !== undefined ? roleData.CanOther : roleData.canOther || false
    };
    
    console.log('📡 Transformed backend payload:', backendPayload);
    console.log('📡 Update URL:', `${API_BASE_URL}/${roleSettingsId}`);
    
    // ✅ FIXED: Use API_BASE_URL directly
    const response = await axios.put(`${API_BASE_URL}/${roleSettingsId}`, backendPayload);
    console.log('✅ Update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error updating role setting:', error);
    console.error('❌ Error details:', error.response?.data);
    console.error('❌ Request URL:', `${API_BASE_URL}/${roleSettingsId}`);
    throw error;
  }
};

// ✅ Delete role setting - Uses RoleSettingsId (PRIMARY KEY)
export const deleteRoleSetting = async (roleSettingsId) => {
  try {
    console.log('📡 Deleting role setting with RoleSettingsId:', roleSettingsId);
    console.log('📡 Delete URL:', `${API_BASE_URL}/${roleSettingsId}`);
    
    // ✅ FIXED: Use API_BASE_URL directly
    const response = await axios.delete(`${API_BASE_URL}/${roleSettingsId}`);
    console.log('✅ Delete response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting role setting:', error);
    console.error('❌ Error details:', error.response?.data);
    console.error('❌ Request URL:', `${API_BASE_URL}/${roleSettingsId}`);
    console.error('❌ Status:', error.response?.status);
    throw error;
  }
};
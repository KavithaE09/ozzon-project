import axios from "axios";
import { BASE_URL } from "./baseurl";

const API_BASE_URL = `${BASE_URL}/api`;

const formApi = {
  // ================= FORM =================

  // CREATE FORM
  createForm: async (data) => {
    const res = await axios.post(`${API_BASE_URL}/form`, data);
    return res.data;
  },

  // GET ALL FORMS (with search)
  getAllForms: async (search = "") => {
    const res = await axios.get(`${API_BASE_URL}/form`, { params: { search } });
    return res.data;
  },

  // GET FORM BY ID
  getFormById: async (id) => {
    const res = await axios.get(`${API_BASE_URL}/form/${encodeURIComponent(id)}`);
    return res.data;
  },

  // UPDATE FORM
  updateForm: async (id, data) => {
    const res = await axios.put(`${API_BASE_URL}/form/${encodeURIComponent(id)}`, data);
    return res.data;
  },

  // DELETE FORM
  deleteForm: async (id) => {
    const res = await axios.delete(`${API_BASE_URL}/form/${encodeURIComponent(id)}`);
    return res.data;
  },

  // GET DEPARTMENTS
  getDepartments: async () => {
    const res = await axios.get(`${API_BASE_URL}/master/department`);
    return res.data;
  },
};

export default formApi;

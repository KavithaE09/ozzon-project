import axios from "axios";
import { BASE_URL } from "./baseurl";

const API_BASE = `${BASE_URL}/leads`;

// CREATE
export const createLead = (data) => axios.post(API_BASE, data);

// READ ALL
export const getAllLeads = () => axios.get(API_BASE);

// READ BY ID
export const getLeadById = (id) => axios.get(`${API_BASE}/${id}`);

// UPDATE
export const updateLead = (id, data) =>
  axios.put(`${API_BASE}/${id}`, data);

// DELETE
export const deleteLead = (id) =>
  axios.delete(`${API_BASE}/${id}`);

import axios from "axios";

/* ===========================
   AXIOS INSTANCE
=========================== */
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===========================
   AUTH INTERCEPTOR (OPTIONAL)
=========================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   TEMPLATE SPECIFICATION API
=========================== */
const tempSpecApi = {
  getAll: async () => {
    const res = await api.get("/template-specifications");
    return res.data;
  },

  create: async (data) => {
    const res = await api.post("/template-specifications", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/template-specifications/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/template-specifications/${id}`);
    return res.data;
  },

  search: async (searchTerm) => {
    const res = await api.get(
      `/template-specifications/search`,
      {
        params: { searchTerm },
      }
    );
    return res.data;
  },
};

export default tempSpecApi;

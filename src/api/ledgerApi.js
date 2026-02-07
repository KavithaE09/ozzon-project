import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const ledgerApi = {

  // ================= CREATE LEDGER =================
  createLedger: async (data) => {
    const response = await axios.post(
      `${API_BASE_URL}/ledgers`,
      data
    );
    return response.data;
  },

  // ================= GET ALL LEDGERS =================
  getAllLedgers: async (params = {}) => {
    const response = await axios.get(
      `${API_BASE_URL}/ledgers`,
      { params }
    );
    return response.data;
  },

  // ================= GET LEDGER BY ID =================
  getLedgerById: async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/ledgers/${id}`
    );
    return response.data;
  },

  // ================= UPDATE LEDGER =================
  updateLedger: async (id, data) => {
    const response = await axios.put(
      `${API_BASE_URL}/ledgers/${id}`,
      data
    );
    return response.data;
  },

  // ================= DELETE LEDGER =================
  deleteLedger: async (id) => {
    const response = await axios.delete(
      `${API_BASE_URL}/ledgers/${id}`
    );
    return response.data;
  },

  // ================= DROPDOWN =================
  getLedgersForDropdown: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/ledgers/dropdown`
    );
    return response.data;
  },
};

export default ledgerApi;

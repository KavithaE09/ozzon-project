import axios from "axios";

const API_BASE = "http://localhost:5000/api/master";
export const getAllDepartments = () => axios.get(`${API_BASE}/department`);
export const getDepartmentById = (id) => axios.get(`${API_BASE}/department/${id}`);
export const createDepartment = (data) => axios.post(`${API_BASE}/department`, data);
export const updateDepartment = (id, data) => axios.put(`${API_BASE}/department/${id}`, data);
export const deleteDepartment = (id) => axios.delete(`${API_BASE}/department/${id}`);

export const getAllGrades = () => axios.get(`${API_BASE}/grade`);
export const getGradeById = (id) => axios.get(`${API_BASE}/grade/${id}`);
export const createGrade = (data) => axios.post(`${API_BASE}/grade`, data);
export const updateGrade = (id, data) => axios.put(`${API_BASE}/grade/${id}`, data);
export const deleteGrade = (id) => axios.delete(`${API_BASE}/grade/${id}`);

export const getAllTempGroups = () => axios.get(`${API_BASE}/tempgroup`);
export const getTempGroupById = (id) => axios.get(`${API_BASE}/tempgroup/${id}`);
export const createTempGroup = (data) => axios.post(`${API_BASE}/tempgroup`, data);
export const updateTempGroup = (id, data) => axios.put(`${API_BASE}/tempgroup/${id}`, data);
export const deleteTempGroup = (id) => axios.delete(`${API_BASE}/tempgroup/${id}`);

export const getAllUnits = () => axios.get(`${API_BASE}/unit`);
export const getUnitById = (id) => axios.get(`${API_BASE}/unit/${id}`);
export const createUnit = (data) => axios.post(`${API_BASE}/unit`, data);
export const updateUnit = (id, data) => axios.put(`${API_BASE}/unit/${id}`, data);
export const deleteUnit = (id) => axios.delete(`${API_BASE}/unit/${id}`);

export const getAllYards = () => axios.get(`${API_BASE}/yard`);
export const getYardById = (id) => axios.get(`${API_BASE}/yard/${id}`);
export const createYard = (data) => axios.post(`${API_BASE}/yard`, data);
export const updateYard = (id, data) => axios.put(`${API_BASE}/yard/${id}`, data);
export const deleteYard = (id) => axios.delete(`${API_BASE}/yard/${id}`);

export const getAllLabours = () => axios.get(`${API_BASE}/labour`);
export const getLabourById = (id) => axios.get(`${API_BASE}/labour/${id}`);
export const createLabour = (data) => axios.post(`${API_BASE}/labour`, data);
export const updateLabour = (id, data) => axios.put(`${API_BASE}/labour/${id}`, data);
export const deleteLabour = (id) => axios.delete(`${API_BASE}/labour/${id}`);

export const getAllLeadOwners = () => axios.get(`${API_BASE}/leadowner`);
export const getLeadOwnerById = (id) => axios.get(`${API_BASE}/leadowner/${id}`);
export const createLeadOwner = (data) => axios.post(`${API_BASE}/leadowner`, data);
export const updateLeadOwner = (id, data) => axios.put(`${API_BASE}/leadowner/${id}`, data);
export const deleteLeadOwner = (id) => axios.delete(`${API_BASE}/leadowner/${id}`);

export const getAllLeadSources = () => axios.get(`${API_BASE}/leadsource`);
export const getLeadSourceById = (id) => axios.get(`${API_BASE}/leadsource/${id}`);
export const createLeadSource = (data) => axios.post(`${API_BASE}/leadsource`, data);
export const updateLeadSource = (id, data) => axios.put(`${API_BASE}/leadsource/${id}`, data);
export const deleteLeadSource = (id) => axios.delete(`${API_BASE}/leadsource/${id}`);

export const getAllLeadStatuses = () => axios.get(`${API_BASE}/leadstatus`);
export const getLeadStatusById = (id) => axios.get(`${API_BASE}/leadstatus/${id}`);
export const createLeadStatus = (data) => axios.post(`${API_BASE}/leadstatus`, data);
export const updateLeadStatus = (id, data) => axios.put(`${API_BASE}/leadstatus/${id}`, data);
export const deleteLeadStatus = (id) => axios.delete(`${API_BASE}/leadstatus/${id}`);

export const getAllMaterialGroups = () => axios.get(`${API_BASE}/materialgroup`);
export const getMaterialGroupById = (id) => axios.get(`${API_BASE}/materialgroup/${id}`);
export const createMaterialGroup = (data) => axios.post(`${API_BASE}/materialgroup`, data);
export const updateMaterialGroup = (id, data) => axios.put(`${API_BASE}/materialgroup/${id}`, data);
export const deleteMaterialGroup = (id) => axios.delete(`${API_BASE}/materialgroup/${id}`);

export const getAllRecGives = () => axios.get(`${API_BASE}/recgive`);
export const getRecGiveById = (id) => axios.get(`${API_BASE}/recgive/${id}`);
export const createRecGive = (data) => axios.post(`${API_BASE}/recgive`, data);
export const updateRecGive = (id, data) => axios.put(`${API_BASE}/recgive/${id}`, data);
export const deleteRecGive = (id) => axios.delete(`${API_BASE}/recgive/${id}`);

export const getAllRoles = () => axios.get(`${API_BASE}/role`);
export const getRoleById = (id) => axios.get(`${API_BASE}/role/${id}`);
export const createRole = (data) => axios.post(`${API_BASE}/role`, data);
export const updateRole = (id, data) => axios.put(`${API_BASE}/role/${id}`, data);
export const deleteRole = (id) => axios.delete(`${API_BASE}/role/${id}`);

export const getAllSizeTypes = () => axios.get(`${API_BASE}/sizetype`);
export const getSizeTypeById = (id) => axios.get(`${API_BASE}/sizetype/${id}`);
export const createSizeType = (data) => axios.post(`${API_BASE}/sizetype`, data);
export const updateSizeType = (id, data) => axios.put(`${API_BASE}/sizetype/${id}`, data);
export const deleteSizeType = (id) => axios.delete(`${API_BASE}/sizetype/${id}`);

export const getAllSupervisors = () => axios.get(`${API_BASE}/supervisor`);
export const getSupervisorById = (id) => axios.get(`${API_BASE}/supervisor/${id}`);
export const createSupervisor = (data) => axios.post(`${API_BASE}/supervisor`, data);
export const updateSupervisor = (id, data) => axios.put(`${API_BASE}/supervisor/${id}`, data);
export const deleteSupervisor = (id) => axios.delete(`${API_BASE}/supervisor/${id}`);

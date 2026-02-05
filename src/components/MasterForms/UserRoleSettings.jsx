import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Edit2, Trash2, ChevronLeft, Search, ChevronDown, Send, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllRoleSettings, 
  createRoleSetting, 
  updateRoleSetting, 
  deleteRoleSetting 
} from '../../api/roleSettingsApi';

export default function UserRoleSettings() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleSearch, setRoleSearch] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [displayRoles, setDisplayRoles] = useState([]);
  const [showRecordList, setShowRecordList] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 5;
  
  const roleDropdownRef = useRef(null);

  // Fetch all roles on component mount
  useEffect(() => {
    fetchAllRoles();
  }, []);

  const fetchAllRoles = async () => {
    try {
      setLoading(true);
      const data = await getAllRoleSettings();
      setRoles(data);
      setDisplayRoles(data);
      if (data.length > 0) {
        setShowRecordList(true);
      }
    } catch (error) {
      alert('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const filteredRoles = roles.filter(role =>
    role.RoleName?.toLowerCase().includes(roleSearch.toLowerCase())
  );

  const selectedRoleData = selectedRole 
    ? roles.find(r => r.RoleID === selectedRole.RoleID) 
    : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = displayRoles.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(displayRoles.length / rowsPerPage);

  /* ROLE INPUT CHANGE */
  const handleRoleInput = (e) => {
    setRoleSearch(e.target.value);
    setSelectedRole(null);
  };

  /* ROLE SELECT */
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setRoleSearch(role.RoleName);
    setIsRoleDropdownOpen(false);
  };

  /* CHECKBOX CHANGE */
  const handlePermissionChange = (field) => {
    if (!selectedRoleData) return;
    
    const updatedRoles = roles.map(role => {
      if (role.RoleID === selectedRoleData.RoleID) {
        return { ...role, [field]: !role[field] };
      }
      return role;
    });
    
    setRoles(updatedRoles);
  };

  /* SUBMIT - Create or Update */
  const handleSubmit = async () => {
    if (!selectedRoleData) {
      alert('Please select a role');
      return;
    }

    try {
      setLoading(true);
      
      if (selectedRoleData.RoleID) {
        // Update existing role
        await updateRoleSetting(selectedRoleData.RoleID, selectedRoleData);
        alert('Role updated successfully');
      } else {
        // Create new role
        await createRoleSetting(selectedRoleData);
        alert('Role created successfully');
      }
      
      // Refresh the list
      await fetchAllRoles();
      setSelectedRole(null);
      setRoleSearch('');
      
    } catch (error) {
      alert('Failed to save role');
    } finally {
      setLoading(false);
    }
  };

  /* SEARCH */
  const handleSearch = () => {
    if (searchText.trim() === '') {
      setDisplayRoles(roles);
    } else {
      const filtered = roles.filter(role =>
        role.RoleName?.toLowerCase().includes(searchText.toLowerCase())
      );
      setDisplayRoles(filtered);
    }
    setCurrentPage(1);
  };

  /* EDIT */
  const handleEdit = (role) => {
    setEditingRole(role.RoleID);
    setEditingData({ ...role });
  };

  /* UPDATE */
  const handleUpdate = async () => {
    if (!editingData || !editingData.RoleName?.trim()) {
      alert('Role name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      await updateRoleSetting(editingData.RoleID, editingData);
      alert('Role updated successfully');
      await fetchAllRoles();
      setEditingRole(null);
      setEditingData(null);
    } catch (error) {
      alert('Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  /* CANCEL EDIT */
  const handleCancelEdit = () => {
    setEditingRole(null);
    setEditingData(null);
  };

  /* DELETE */
  const handleDelete = async (role) => {
    if (window.confirm(`Are you sure you want to delete ${role.RoleName}?`)) {
      try {
        setLoading(true);
        await deleteRoleSetting(role.RoleID);
        alert('Role deleted successfully');
        await fetchAllRoles();
        
        // Adjust current page if needed
        const newTotalPages = Math.ceil((displayRoles.length - 1) / rowsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } catch (error) {
        alert('Failed to delete role');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <div className="page-header">
              <h1 className="page-title">User Role Settings</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2 className="page-back-icon" />
              </button>
            </div>

            {/* Role Select Section */}
            <div className="filter-grid">
              <div ref={roleDropdownRef} className="filter-grid-red">
                <label className="filter-label">Role Settings</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={roleSearch}
                    onChange={handleRoleInput}
                    onFocus={() => setIsRoleDropdownOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isRoleDropdownOpen && (
                  <div className="dropdown-menu">
                    {filteredRoles.length > 0 ? (
                      filteredRoles.map((role) => (
                        <div
                          key={role.RoleID}
                          onClick={() => handleRoleSelect(role)}
                          onMouseEnter={() => setHoveredRole(role.RoleID)}
                          onMouseLeave={() => setHoveredRole(null)}
                          className={`dropdown-item-option ${
                            hoveredRole === role.RoleID
                              ? 'dropdown-item-hovered'
                              : selectedRole?.RoleID === role.RoleID
                              ? 'dropdown-item-selected'
                              : 'dropdown-item-default'
                          }`}
                        >
                          {role.RoleName}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button 
                  onClick={handleSubmit} 
                  className="btn-search"
                  disabled={loading}
                >
                  <Send size={18} /> {loading ? 'Saving...' : 'Submit'}
                </button>
              </div>
              <div></div>
              <div></div>
            </div>

            {/* Permission Table */}
            {selectedRoleData && (
              <div className="table-container mt-5">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-th-center">Sl No</th>
                      <th className="table-th-center">Role Name</th>
                      <th className="table-th-center">Active</th>
                      <th className="table-th-center">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-cell-center">{selectedRoleData.RoleID}</td>
                      <td className="table-cell-center">{selectedRoleData.RoleName}</td>
                      <td className="table-cell-center">
                        <input
                          type="checkbox"
                          checked={selectedRoleData.IsActive || false}
                          onChange={() => handlePermissionChange('IsActive')}
                          className="radio-input"
                        />
                      </td>
                      <td className="table-cell-center">
                        {selectedRoleData.Description || '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Record List */}
            {showRecordList && (
              <>
                <h2 className="section-title mt-8">Record List</h2>

                <div className="filter-grid">
                  <div className="filter-grid-green w-[280px]">
                    <label className="filter-label">Search</label>
                    <input
                      type="text"
                      placeholder="Role Name"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="filter-input"
                    />
                  </div>
                  <button onClick={handleSearch} className="btn-search">
                    <Search size={18} /> Search
                  </button>
                </div>

                {/* Table with Edit and Delete Icons */}
                <div className="master-table-container">
                  <div className="master-table-header">
                    <span className="master-table-title">Role Settings Name</span>
                  </div>
                  <div className="master-table-body">
                    {loading ? (
                      <div className="no-data-cell">Loading...</div>
                    ) : paginatedData.length === 0 ? (
                      <div className="no-data-cell">No records found</div>
                    ) : (
                      paginatedData.map((role) => (
                        <div key={role.RoleID} className="master-table-row">
                          <div className="master-table-content">
                            <ChevronRight size={16} className="text-gray-700" />
                            {editingRole === role.RoleID ? (
                              <input
                                type="text"
                                value={editingData?.RoleName || ''}
                                onChange={(e) => setEditingData({
                                  ...editingData,
                                  RoleName: e.target.value
                                })}
                                className="master-edit-input"
                              />
                            ) : (
                              <span className="master-name-text">{role.RoleName}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {editingRole === role.RoleID ? (
                              <>
                                <button 
                                  onClick={handleUpdate} 
                                  className="btn-smallbtn"
                                  disabled={loading}
                                >
                                  {loading ? 'Updating...' : 'Update'}
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="btn-smallbtn"
                                  style={{ backgroundColor: '#6B7280' }}
                                  disabled={loading}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(role)}
                                  className="btn-action"
                                  disabled={loading}
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(role)}
                                  className="btn-action"
                                  disabled={loading}
                                >
                                  <Trash2 size={18} className="text-red-600" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Pagination */}
            {showRecordList && displayRoles.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className={`pagination-btn ${
                    currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-page-btn ${
                      currentPage === page ? 'pagination-page-active' : 'pagination-page-inactive'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className={`pagination-btn ${
                    currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
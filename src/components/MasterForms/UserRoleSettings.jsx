import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Edit2, Trash2, ChevronLeft, Search, ChevronDown, Send, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllRoleSettings,createRoleSetting,updateRoleSetting, deleteRoleSetting} from '../../api/roleSettingsApi';
import { getAllRoles } from "../../api/masterApi.js"; 

export default function UserRoleSettings() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [roleSettings, setRoleSettings] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(() => {
  const saved = localStorage.getItem('roleSettingsSelectedRoleId');
    return saved ? Number(saved) : null;
  });
  const [roleSearch, setRoleSearch] = useState(() => {
    return localStorage.getItem('roleSettingsRoleSearch') || '';
  });
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [displayRoles, setDisplayRoles] = useState([]);
  const [showRecordList, setShowRecordList] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Checkbox states
  const [canAdd, setCanAdd] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canView, setCanView] = useState(false);
  const [canPrint, setCanPrint] = useState(false);
  const [canMenu, setCanMenu] = useState(false);
  const [canOthers, setCanOthers] = useState(false);
  
  const rowsPerPage = 5;
  const roleDropdownRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('roleSettingsRoleSearch', roleSearch);
  }, [roleSearch]);

  useEffect(() => {
    if (selectedRoleId) {
      localStorage.setItem('roleSettingsSelectedRoleId', selectedRoleId.toString());
    }
  }, [selectedRoleId]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError('');

      const rolesRes = await getAllRoles();
      console.log('Roles from master:', rolesRes);
      if (rolesRes && rolesRes.data) {
        setRoles(rolesRes.data);
      }

      const settingsData = await getAllRoleSettings();
      console.log('Role settings data:', settingsData);
      console.log('First role setting:', settingsData[0]);
      console.log('Role setting keys:', settingsData[0] ? Object.keys(settingsData[0]) : 'No data');

      // ✅ TEMPORARY FIX: Merge role names from master roles
      const enrichedSettings = settingsData.map(setting => {
        const roleFromMaster = rolesRes?.data?.find(r => 
          Number(r.RoleId || r.roleId || r.id) === Number(setting.RoleId)
        );
        
        return {
          ...setting,
          RoleName: roleFromMaster?.RoleName || roleFromMaster?.roleName || 'Unknown Role'
        };
      });

      console.log('✅ Enriched settings with role names:', enrichedSettings);

      setRoleSettings(enrichedSettings);
      setDisplayRoles(enrichedSettings);
      if (enrichedSettings.length > 0) {
        setShowRecordList(true);
      }
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRoles = roles.filter((role) => {
    if (!role) return false;
    const roleName = role.RoleName || role.roleName || role.name || '';
    return String(roleName).toLowerCase().includes(roleSearch.toLowerCase());
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = displayRoles.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(displayRoles.length / rowsPerPage);

  const handleRoleInput = (e) => {
    setRoleSearch(e.target.value);
    setSelectedRoleId(null);
    setIsRoleDropdownOpen(true);
  };

  /* ROLE SELECT */
  const handleRoleSelect = (role) => {
    const displayName = role.RoleName || role.roleName || role.name || 'Unknown';
    const roleId = Number(role.RoleId || role.roleId || role.id);

    setRoleSearch(displayName);
    setSelectedRoleId(Number(roleId));
    setIsRoleDropdownOpen(false);

    const existingSetting = roleSettings.find(
      rs => Number(rs.RoleId) === Number(roleId)
    );

    if (existingSetting) {
      // ✅ Load existing settings
      setCanAdd(existingSetting.CanAdd || false);
      setCanDelete(existingSetting.CanDelete || false);
      setCanView(existingSetting.CanView || false);
      setCanPrint(existingSetting.CanPrint || false);
      setCanMenu(existingSetting.CanMenu || false);
      setCanOthers(existingSetting.CanOther || false);
    } else {
      // ✅ Reset for new role
      setCanAdd(false);
      setCanDelete(false);
      setCanView(false);
      setCanPrint(false);
      setCanMenu(false);
      setCanOthers(false);
    }
  };

  /* SUBMIT - Create or Update */
  const handleSubmit = async () => {
    try {
      // ✅ Validation
      if (!selectedRoleId) {
        setError('Please select a role');
        return;
      }

      setLoading(true);
      setError('');

      const existingSetting = roleSettings.find(
        rs => Number(rs.RoleId) === Number(selectedRoleId)
      );

      // ✅ Get role name from roles master
      const selectedRoleFromMaster = roles.find(r =>
        (r.RoleId || r.roleId || r.id) === selectedRoleId
      );
      const roleName = selectedRoleFromMaster
        ? (selectedRoleFromMaster.RoleName || selectedRoleFromMaster.roleName || selectedRoleFromMaster.name)
        : roleSearch;

      const roleSettingData = {
        roleId: selectedRoleId,
        RoleName: roleName,
        isActive: canAdd,
        canDelete: canDelete,
        canView: canView,
        canPrint: canPrint,
        canMenu: canMenu,
        canOther: canOthers
      };

      console.log('📤 Submitting role setting data:', roleSettingData);

      if (existingSetting) {
        // ✅ Update existing role setting using RoleSettingsId
        const updateData = {
          CanAdd: canAdd,
          CanDelete: canDelete,
          CanView: canView,
          CanPrint: canPrint,
          CanMenu: canMenu,
          CanOther: canOthers
        };
        await updateRoleSetting(existingSetting.RoleSettingsId, updateData);
        alert('Role setting updated successfully');
      } else {
        // ✅ Create new role setting
        await createRoleSetting(roleSettingData);
        alert('Role setting created successfully');
      }

      // ✅ Refresh the list to show new/updated record
      await fetchAllData();
      
      // ✅ Show record list
      setShowRecordList(true);
      
      // ✅ Reset form
      resetForm();

    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Failed to save role setting');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* RESET FORM */
  const resetForm = () => {
    setSelectedRoleId(null);
    setRoleSearch('');
    setCanAdd(false);
    setCanDelete(false);
    setCanView(false);
    setCanPrint(false);
    setCanMenu(false);
    setCanOthers(false);
    setError('');

    // Clear localStorage
    localStorage.removeItem('roleSettingsSelectedRoleId');
    localStorage.removeItem('roleSettingsRoleSearch');
  };

  /* SEARCH */
  const handleSearch = () => {
    if (searchText.trim() === '') {
      setDisplayRoles(roleSettings);
    } else {
      const filtered = roleSettings.filter(role => {
        const roleName = role.roleName || role.RoleName || role.Role?.RoleName || '';
        return roleName.toLowerCase().includes(searchText.toLowerCase());
      });
      setDisplayRoles(filtered);
    }
    setCurrentPage(1);
  };

  /* EDIT */
  const handleEdit = (role) => {
    const roleSettingsId = role.RoleSettingsId;
    const roleName = role.roleName || role.RoleName || role.Role?.RoleName || 'Unknown';

    console.log('Editing role:', role);
    console.log('RoleSettingsId:', roleSettingsId);
    console.log('Role name:', roleName);

    setEditingRole(roleSettingsId);
    setEditingData({
      ...role,
      RoleSettingsId: roleSettingsId,
      RoleName: roleName
    });
  };

  /* UPDATE */
  const handleUpdate = async () => {
    if (!editingData || !editingData.RoleName?.trim()) {
      setError('Role name cannot be empty');
      alert('Role name cannot be empty');
      return;
    }

    const roleSettingsId = editingData.RoleSettingsId;

    console.log('📝 Update clicked for:', editingData);
    console.log('📝 RoleSettingsId:', roleSettingsId);

    if (!roleSettingsId) {
      alert('Error: Role Settings ID not found');
      console.error('RoleSettingsId is undefined:', editingData);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const updatePayload = {
        CanAdd: editingData.CanAdd || false,
        CanDelete: editingData.CanDelete || false,
        CanView: editingData.CanView || false,
        CanPrint: editingData.CanPrint || false,
        CanMenu: editingData.CanMenu || false,
        CanOther: editingData.CanOther || false
      };

      console.log('📝 Update payload:', updatePayload);
      console.log('📝 Calling updateRoleSetting with RoleSettingsId:', roleSettingsId);

      const response = await updateRoleSetting(roleSettingsId, updatePayload);
      console.log('📝 Update response:', response);

      alert('Role setting updated successfully');
      await fetchAllData();
      setEditingRole(null);
      setEditingData(null);
    } catch (error) {
      console.error('📝 Update error:', error);
      console.error('📝 Error response:', error.response);

      const errorMsg = error.response?.data?.message || error.message || 'Failed to update role setting';
      setError(errorMsg);
      alert(`Update failed: ${errorMsg}`);
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
    const roleSettingsId = role.RoleSettingsId;
    const roleName = role.roleName || role.RoleName || role.Role?.RoleName || 'this role';

    console.log('🗑️ Delete clicked for role:', role);
    console.log('🗑️ RoleSettingsId (PRIMARY KEY):', roleSettingsId);
    console.log('🗑️ Role name:', roleName);

    if (!roleSettingsId) {
      alert('Error: Role Settings ID not found');
      console.error('RoleSettingsId is undefined:', role);
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${roleName}?`)) {
      try {
        setLoading(true);
        setError('');

        console.log('🗑️ Calling deleteRoleSetting with RoleSettingsId:', roleSettingsId);

        const response = await deleteRoleSetting(roleSettingsId);
        console.log('🗑️ Delete response:', response);

        alert('Role setting deleted successfully');

        await fetchAllData();

        const newTotalPages = Math.ceil((displayRoles.length - 1) / rowsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } catch (error) {
        console.error('🗑️ Delete error:', error);
        console.error('🗑️ Error response:', error.response);

        const errorMsg = error.response?.data?.message || error.message || 'Failed to delete role setting';
        setError(errorMsg);
        alert(`Delete failed: ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // ✅ Get selected role name for display
  const getSelectedRoleName = () => {
    if (!selectedRoleId) return '';
    const role = roles.find(
      r => Number(r.RoleId || r.roleId || r.id) === Number(selectedRoleId)
    );

    return role ? (role.RoleName || role.roleName || role.name) : roleSearch;
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

            {/* Error Message */}
            {error && (
              <div style={{
                padding: '10px',
                marginBottom: '15px',
                backgroundColor: '#fee',
                color: '#c00',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

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
                    disabled={loading}
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isRoleDropdownOpen && (
                  <div className="dropdown-menu">
                    {filteredRoles.length > 0 ? (
                      filteredRoles.map((role, index) => {
                        const displayName = role.RoleName || role.roleName || role.name || 'Unknown';
                        const roleId = role.RoleId || role.roleId || role.id;

                        return (
                          <div
                            key={roleId ?? `${displayName}-${index}`}
                            onClick={() => handleRoleSelect(role)}
                            onMouseEnter={() => setHoveredRole(roleId)}
                            onMouseLeave={() => setHoveredRole(null)}
                            className={`dropdown-item-option ${hoveredRole === roleId
                                ? 'dropdown-item-hovered'
                                : selectedRoleId === roleId
                                  ? 'dropdown-item-selected'
                                  : 'dropdown-item-default'
                              }`}
                          >
                            {displayName}
                          </div>
                        );
                      })
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
                  disabled={loading || !selectedRoleId}
                >
                  <Send size={18} /> {loading ? 'Saving...' : 'Submit'}
                </button>
              </div>
              <div></div>
              <div></div>
            </div>

            {/* Permission Table */}
            {selectedRoleId && (
              <div className="table-container mt-5">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-th-center">Role ID</th>
                      <th className="table-th-center">Role Name</th>
                      <th className="table-th-center">Add</th>
                      <th className="table-th-center">Delete</th>
                      <th className="table-th-center">View</th>
                      <th className="table-th-center">Print</th>
                      <th className="table-th-center">Menu</th>
                      <th className="table-th-center">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-cell-center">{selectedRoleId}</td>
                      <td className="table-cell-center">{getSelectedRoleName()}</td>
                      <td className="table-cell-center">
                        <input
                          type="checkbox"
                          checked={canAdd}
                          onChange={(e) => setCanAdd(e.target.checked)}
                          className="radio-input"
                        />
                      </td>
                      <td className="table-cell-center">
                        <input
                          type="checkbox"
                          checked={canDelete}
                          onChange={(e) => setCanDelete(e.target.checked)}
                          className="radio-input"
                        />
                      </td>
                      <td className="table-cell-center">
                        <input
                          type="checkbox"
                          checked={canView}
                          onChange={(e) => setCanView(e.target.checked)}
                          className="radio-input"
                        />
                      </td>
                      <td className="table-cell-center">
                        <input
                          type="checkbox"
                          checked={canPrint}
                          onChange={(e) => setCanPrint(e.target.checked)}
                          className="radio-input"
                        />
                      </td>
                      <td className="table-cell-center">
                        <input
                          type="checkbox"
                          checked={canMenu}
                          onChange={(e) => setCanMenu(e.target.checked)}
                          className="radio-input"
                        />
                      </td>
                      <td className="table-cell-center">
                        <input
                          type="checkbox"
                          checked={canOthers}
                          onChange={(e) => setCanOthers(e.target.checked)}
                          className="radio-input"
                        />
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
                      disabled={loading}
                    />
                  </div>
                  <button onClick={handleSearch} className="btn-search" disabled={loading}>
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
                      paginatedData.map((role, idx) => {
                        // ✅ Debug log for first item
                        if (idx === 0) {
                          console.log('📋 Sample role object:', role);
                          console.log('📋 Available keys:', Object.keys(role));
                        }

                        const roleSettingsId = Number(role.RoleSettingsId);
                        
                        // ✅ FIXED: Try multiple possible fields for role name
                        const roleName = role.RoleName || 
                                       role.roleName || 
                                       role.Role?.RoleName || 
                                       role.Role?.roleName ||
                                       role.name ||
                                       'Unknown Role';

                        return (
                          <div key={`role-${roleSettingsId}-${idx}`} className="master-table-row">
                            <div className="master-table-content">
                              <ChevronRight size={16} className="text-gray-700" />
                              {editingRole === roleSettingsId ? (
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
                                <span className="master-name-text">{roleName}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              {editingRole === roleSettingsId ? (
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
                        );
                      })
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Pagination */}
            {showRecordList && displayRoles.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1 || loading}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className={`pagination-btn ${currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                    }`}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    disabled={loading}
                    className={`pagination-page-btn ${currentPage === page ? 'pagination-page-active' : 'pagination-page-inactive'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages || loading}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className={`pagination-btn ${currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
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
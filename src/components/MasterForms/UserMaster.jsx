import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight, Edit2, Trash2, ChevronLeft, Send, Undo2, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import userApi from "../../api/userApi.js";
import { getAllDepartments } from "../../api/masterApi.js";
import { getAllRoleSettings } from "../../api/roleSettingsApi.js";

export default function UserMaster() {
  const navigate = useNavigate();
  
  // ✅ Initialize from localStorage
  const [groupName, setGroupName] = useState(() => {
    return localStorage.getItem('userMasterUsername') || '';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;
  
  const [password, setPassword] = useState(() => {
    return localStorage.getItem('userMasterPassword') || '';
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const [confirmPassword, setConfirmPassword] = useState(() => {
    return localStorage.getItem('userMasterConfirmPassword') || '';
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roleDropdownRef = useRef(null);
  const departmentDropdownRef = useRef(null);

  const [roleSearch, setRoleSearch] = useState(() => {
    return localStorage.getItem('userMasterRoleSearch') || '';
  });
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);
  
  const [departmentSearch, setDepartmentSearch] = useState(() => {
    return localStorage.getItem('userMasterDepartmentSearch') || '';
  });
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [hoveredDepartment, setHoveredDepartment] = useState(null);
  
  const [templateGroups, setTemplateGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);

  const [editingId, setEditingId] = useState(null);
  
  // ✅ State for storing selected IDs - Initialize from localStorage
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(() => {
    const saved = localStorage.getItem('userMasterDepartmentId');
    return saved ? Number(saved) : null;
  });
  const [selectedRoleId, setSelectedRoleId] = useState(() => {
    const saved = localStorage.getItem('userMasterRoleId');
    return saved ? Number(saved) : null;
  });
  
  // API states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  
  const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentGroups = filteredGroups.slice(indexOfFirst, indexOfLast);

  // ✅ Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('userMasterUsername', groupName);
  }, [groupName]);

  useEffect(() => {
    localStorage.setItem('userMasterPassword', password);
  }, [password]);

  useEffect(() => {
    localStorage.setItem('userMasterConfirmPassword', confirmPassword);
  }, [confirmPassword]);

  useEffect(() => {
    localStorage.setItem('userMasterDepartmentSearch', departmentSearch);
  }, [departmentSearch]);

  useEffect(() => {
    if (selectedDepartmentId) {
      localStorage.setItem('userMasterDepartmentId', selectedDepartmentId.toString());
    }
  }, [selectedDepartmentId]);

  useEffect(() => {
    localStorage.setItem('userMasterRoleSearch', roleSearch);
  }, [roleSearch]);

  useEffect(() => {
    if (selectedRoleId) {
      localStorage.setItem('userMasterRoleId', selectedRoleId.toString());
    }
  }, [selectedRoleId]);

  // ✅ Component mount - fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  // ✅ Fetch all data at once - Updated with Debug Logs
  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch users
      const usersRes = await userApi.getAllUsers();
      if (usersRes.success) {
        setTemplateGroups(usersRes.data);
        setFilteredGroups(usersRes.data);
      }

      // ✅ Fetch Departments
      const departmentsRes = await getAllDepartments();
      if (departmentsRes && departmentsRes.data) {
        setDepartmentOptions(departmentsRes.data);
      }

      // ✅ Fetch Roles from Role Settings API with Debug
      console.log('🔍 Starting to fetch RoleSettings...');
      const rolesRes = await getAllRoleSettings();
      console.log('📦 RoleSettings API Full Response:', rolesRes);
      
      if (rolesRes && rolesRes.data) {
        console.log('✅ RoleSettings Data exists, length:', rolesRes.data.length);
        console.log('📋 First RoleSetting:', rolesRes.data[0]);
        
        // Extract unique roles from RoleSettings
        const roleMap = new Map();
        
        rolesRes.data.forEach((roleSetting, index) => {
          console.log(`\n🔹 Processing RoleSetting #${index}:`, roleSetting);
          console.log(`   - RoleId:`, roleSetting.RoleId);
          console.log(`   - Role object:`, roleSetting.Role);
          
          if (roleSetting.Role && roleSetting.RoleId) {
            const roleName = roleSetting.Role.RoleName || roleSetting.Role.roleName;
            console.log(`   ✓ Valid! RoleName:`, roleName);
            
            if (!roleMap.has(roleSetting.RoleId)) {
              const roleData = {
                RoleId: roleSetting.RoleId,
                RoleName: roleName
              };
              console.log(`   ➕ Adding to map:`, roleData);
              roleMap.set(roleSetting.RoleId, roleData);
            } else {
              console.log(`   ⏭️ Already in map, skipping`);
            }
          } else {
            console.warn(`   ⚠️ Invalid - Missing Role or RoleId`);
          }
        });
        
        const rolesArray = Array.from(roleMap.values());
        console.log('\n🎯 Final Unique Roles Array:', rolesArray);
        console.log('📊 Total unique roles:', rolesArray.length);
        
        setRoleOptions(rolesArray);
      } else {
        console.error('❌ No data in RoleSettings response or response is null');
        console.log('Response structure:', rolesRes);
      }

    } catch (err) {
      console.error('💥 Error fetching data:', err);
      console.error('Error details:', err.response?.data);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter Departments with null checks
  const filteredDepartments = departmentOptions.filter((dept) => {
    if (!dept) return false;
    const deptName = dept.DepartmentName || dept.departmentName || dept.name || '';
    return String(deptName).toLowerCase().includes(departmentSearch.toLowerCase());
  });

  // ✅ Filter Roles with null checks and Debug
  const filteredRoles = roleOptions.filter((role) => {
    if (!role) return false;
    const roleName = role.RoleName || role.roleName || role.name || '';
    return String(roleName).toLowerCase().includes(roleSearch.toLowerCase());
  });

  // Debug log when role dropdown opens
  useEffect(() => {
    if (isRoleOpen) {
      console.log('🔽 Role Dropdown Opened');
      console.log('   - Total roleOptions:', roleOptions.length);
      console.log('   - roleOptions:', roleOptions);
      console.log('   - Current roleSearch:', roleSearch);
      console.log('   - Filtered Roles:', filteredRoles);
    }
  }, [isRoleOpen]);

  // ✅ Outside Click Close (both dropdowns)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target)) {
        setIsDepartmentOpen(false);
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setIsRoleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    try {
      // Validation
      if (!groupName.trim()) {
        setError('Username is required');
        return;
      }
      if (!selectedDepartmentId) {
        setError('Department is required');
        return;
      }
      if (!editingId && !password.trim()) {
        setError('Password is required');
        return;
      }
      if (!editingId && password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!selectedRoleId) {
        setError('Role is required');
        return;
      }

      setLoading(true);
      setError('');

      const userData = {
        username: groupName.trim(),
        departmentId: selectedDepartmentId,
        roleId: selectedRoleId
      };

      // Only include password if provided
      if (password.trim()) {
        userData.password = password;
        userData.confirmPassword = confirmPassword;
      }

      if (editingId) {
        const response = await userApi.updateUser(editingId, userData);
        if (response.success) {
          alert('User updated successfully!');
          await fetchAllData();
          resetForm();
        }
      } else {
        const response = await userApi.createUser(userData);
        if (response.success) {
          alert('User created successfully!');
          await fetchAllData();
          resetForm();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setGroupName('');
    setDepartmentSearch('');
    setSelectedDepartmentId(null);
    setPassword('');
    setConfirmPassword('');
    setRoleSearch('');
    setSelectedRoleId(null);
    setEditingId(null);
    setError('');
    setCurrentPage(1);
    
    // ✅ Clear localStorage
    localStorage.removeItem('userMasterUsername');
    localStorage.removeItem('userMasterPassword');
    localStorage.removeItem('userMasterConfirmPassword');
    localStorage.removeItem('userMasterDepartmentSearch');
    localStorage.removeItem('userMasterDepartmentId');
    localStorage.removeItem('userMasterRoleSearch');
    localStorage.removeItem('userMasterRoleId');
  };

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === '') {
        setFilteredGroups(templateGroups);
      } else {
        setLoading(true);
        const response = await userApi.searchUsers(searchTerm);
        if (response.success) {
          setFilteredGroups(response.data);
          setCurrentPage(1);
        }
      }
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.UserId);
    setGroupName(user.username);
    setDepartmentSearch(user.department || user.DepartmentName);
    setSelectedDepartmentId(user.departmentId || user.DepartmentId);
    setRoleSearch(user.role || user.RoleName);
    setSelectedRoleId(user.roleId || user.RoleId);
    setPassword('');
    setConfirmPassword('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await userApi.deleteUser(userId);
      if (response.success) {
        alert('User deleted successfully!');
        await fetchAllData();
        setCurrentPage(1);
      }
    } catch (err) {
      setError('Delete failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <div className="page-header">
              <h1 className="page-title">User Master</h1>
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
            
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-red">
                  <label className="filter-label">User name</label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter user name"
                    className="filter-input"
                    disabled={loading}
                  />
                </div>
                
                {/* ✅ Department Dropdown */}
                <div ref={departmentDropdownRef} className="filter-grid-red">
                  <label className="filter-label">Department</label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={departmentSearch}
                      onChange={(e) => {
                        setDepartmentSearch(e.target.value);
                        setIsDepartmentOpen(true);
                      }}
                      onFocus={() => setIsDepartmentOpen(true)}
                      placeholder="Type or select..."
                      className="dropdown-input"
                      disabled={loading}
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isDepartmentOpen && (
                    <div className="dropdown-menu">
                      {filteredDepartments.length > 0 ? (
                        filteredDepartments.map((dept, index) => {
                          const displayName = dept.DepartmentName || dept.departmentName || dept.name || 'Unknown';
                          const deptId = dept.DepartmentId || dept.departmentId || dept.id;
                          
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setDepartmentSearch(displayName);
                                setSelectedDepartmentId(deptId);
                                setIsDepartmentOpen(false);
                              }}
                              onMouseEnter={() => setHoveredDepartment(displayName)}
                              onMouseLeave={() => setHoveredDepartment(null)}
                              className={`dropdown-item-option ${
                                hoveredDepartment === displayName
                                  ? "dropdown-item-hovered"
                                  : "dropdown-item-default"
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
                
                {/* Password Field */}
                <div className="filter-grid-red">
                  <label className="filter-label">
                    Password {editingId && <span style={{fontSize: '11px', color: '#666'}}>(leave blank to keep)</span>}
                  </label>
                  <div className="dropdown-wrapper" style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="dropdown-input"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                {/* Confirm Password Field */}
                <div className="filter-grid-red">
                  <label className="filter-label">Confirm Password</label>
                  <div className="dropdown-wrapper" style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter confirm password"
                      className="dropdown-input"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                {/* ✅ Role Dropdown - Updated */}
                <div ref={roleDropdownRef} className="filter-grid-red">
                  <label className="filter-label">Role</label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={roleSearch}
                      onChange={(e) => {
                        setRoleSearch(e.target.value);
                        setIsRoleOpen(true);
                      }}
                      onFocus={() => setIsRoleOpen(true)}
                      placeholder="Type or select..."
                      className="dropdown-input"
                      disabled={loading}
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isRoleOpen && (
                    <div className="dropdown-menu">
                      {filteredRoles.length > 0 ? (
                        filteredRoles.map((role, index) => {
                          const displayName = role.RoleName || role.roleName || role.name || 'Unknown';
                          const roleId = role.RoleId || role.roleId || role.id;
                          
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setRoleSearch(displayName);
                                setSelectedRoleId(roleId);
                                setIsRoleOpen(false);
                              }}
                              onMouseEnter={() => setHoveredRole(displayName)}
                              onMouseLeave={() => setHoveredRole(null)}
                              className={`dropdown-item-option ${
                                hoveredRole === displayName
                                  ? "dropdown-item-hovered"
                                  : "dropdown-item-default"
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
                  <button onClick={handleSubmit} className="btn-all" disabled={loading}>
                    <Send size={18} /> {loading ? 'Processing...' : editingId ? 'Update' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>

            {/* Record List Section */}
            <h2 className="page-title">Record List</h2>
            
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-green">
                  <label className="filter-label">Search By</label>
                  <input
                    type="text"
                    placeholder="user name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="filter-input"
                    disabled={loading}
                  />
                </div>
                
                <div className="btn-container">
                  <button onClick={handleSearch} className="btn-all" disabled={loading}>
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="master-table-container">
              <div className="master-table-header">
                <span className="master-table-title">User name</span>
              </div>
              <div className="master-table-body">
                {loading ? (
                  <div className="no-data-cell">Loading...</div>
                ) : currentGroups.length > 0 ? (
                  currentGroups.map((user) => (
                    <div key={user.UserId} className="master-table-row">
                      <div className="master-table-content">
                        <ChevronRight size={16} style={{ color: '#374151' }} />
                        <span className="master-name-text">{user.username}</span>
                      </div>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn-action"
                          title="Edit"
                          disabled={loading}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.UserId)}
                          className="btn-action"
                          title="Delete"
                          disabled={loading}
                        >
                          <Trash2 size={18} className="text-[#dc2626]" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data-cell">
                    No records found
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {filteredGroups.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1 || loading}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className={`pagination-btn ${
                    currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    disabled={loading}
                    className={`pagination-page-btn ${
                      currentPage === page ? 'pagination-page-active' : 'pagination-page-inactive'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages || loading}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className={`pagination-btn ${
                    currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
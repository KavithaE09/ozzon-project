import React, { useState , useRef, useEffect } from 'react';
import { Search, ChevronRight, Edit2, Trash2, ChevronLeft ,Send,Undo2 , ChevronDown ,Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserMaster() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;
 const [password, setPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);
const [confirmPassword, setConfirmPassword] = useState("");
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const roleDropdownRef = useRef(null);

const [roleSearch, setRoleSearch] = useState("");
const [isRoleOpen, setIsRoleOpen] = useState(false);
const [hoveredRole, setHoveredRole] = useState(null);


 
  

  const [templateGroups, setTemplateGroups] = useState([
    { id: 1, name: 'ADMIN' }
  ]);
  const [filteredGroups, setFilteredGroups] = useState([
    { id: 1, name: 'ADMIN' }
  ]);
  const [editingId, setEditingId] = useState(null);
  
  const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentGroups = filteredGroups.slice(indexOfFirst, indexOfLast);

  const handleSubmit = () => {
    if (groupName.trim() !== '') {
      if (editingId) {
        // Update existing record
        const updatedGroups = templateGroups.map(group =>
          group.id === editingId ? { ...group, name: groupName.toUpperCase() } : group
        );
        setTemplateGroups(updatedGroups);
        setFilteredGroups(updatedGroups);
        setEditingId(null);
      } else {
        // Add new record
        const newGroup = {
          id: templateGroups.length > 0 ? Math.max(...templateGroups.map(g => g.id)) + 1 : 1,
          name: groupName.toUpperCase()
        };
        setTemplateGroups([...templateGroups, newGroup]);
        setFilteredGroups([...templateGroups, newGroup]);
      }
      setGroupName('');
      setCurrentPage(1);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredGroups(templateGroups);
    } else {
      const filtered = templateGroups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
      setCurrentPage(1);
    }
  };

  const handleEdit = (group) => {
    setEditingId(group.id);
    setGroupName(group.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (groupId) => {
    const updatedGroups = templateGroups.filter(group => group.id !== groupId);
    setTemplateGroups(updatedGroups);
    setFilteredGroups(updatedGroups);
    setCurrentPage(1);
  };


// Department Dropdown States
const departmentDropdownRef = useRef(null);

const [departmentSearch, setDepartmentSearch] = useState("");
const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
const [hoveredDepartment, setHoveredDepartment] = useState(null);

// Department Options
const departmentOptions = ["Department1", "Department2", "Department3", "Department4"];

// Filter Departments
const filteredDepartments = departmentOptions.filter((dept) =>
  dept.toLowerCase().includes(departmentSearch.toLowerCase())
);

// Input Handler
const handleDepartmentInput = (e) => {
  setDepartmentSearch(e.target.value);
  setIsDepartmentOpen(true);
};

// Select Handler
const handleDepartmentSelect = (dept) => {
  setDepartmentSearch(dept);
  setIsDepartmentOpen(false);
};

// Outside Click Close
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      departmentDropdownRef.current &&
      !departmentDropdownRef.current.contains(event.target)
    ) {
      setIsDepartmentOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

// ✅ Role Options (nee extra add pannalam)
const roleOptions = ["Admin", "Manager", "Staff", "User"];

// ✅ Filter Roles
const filteredRoles = roleOptions.filter((role) =>
  role.toLowerCase().includes(roleSearch.toLowerCase())
);
// ✅ Input Handler
const handleRoleInput = (e) => {
  setRoleSearch(e.target.value);
  setIsRoleOpen(true);
};

// ✅ Select Handler
const handleRoleSelect = (role) => {
  setRoleSearch(role);
  setIsRoleOpen(false);
};

// ✅ Outside Click Close for Role Dropdown
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      roleDropdownRef.current &&
      !roleDropdownRef.current.contains(event.target)
    ) {
      setIsRoleOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

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
                            <Undo2   className="page-back-icon" />
                          </button>
                        </div>
            
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
                  />
                </div>
                
                {/* ✅ Department Dropdown */}
<div ref={departmentDropdownRef} className="filter-grid-red">
  <label className="filter-label">Department</label>

  <div className="dropdown-wrapper">
    <input
      type="text"
      value={departmentSearch}
      onChange={handleDepartmentInput}
      onFocus={() => setIsDepartmentOpen(true)}
      placeholder="Type or select..."
      className="dropdown-input"
    />

    <ChevronDown size={20} className="dropdown-icon" />
  </div>

  {isDepartmentOpen && (
    <div className="dropdown-menu">
      {filteredDepartments.length > 0 ? (
        filteredDepartments.map((option, index) => (
          <div
            key={index}
            onClick={() => handleDepartmentSelect(option)}
            onMouseEnter={() => setHoveredDepartment(option)}
            onMouseLeave={() => setHoveredDepartment(null)}
            className={`dropdown-item-option ${
              hoveredDepartment === option
                ? "dropdown-item-hovered"
                : departmentSearch === option
                ? "dropdown-item-selected"
                : "dropdown-item-default"
            }`}
          >
            {option}
          </div>
        ))
      ) : (
        <div className="dropdown-no-matches">No matches found</div>
      )}
    </div>
  )}
</div>{/* Password Field */}
<div className="filter-grid-red">
  <label className="filter-label">Password</label>

  <div className="dropdown-wrapper" style={{ position: "relative" }}>
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter password"
      className="dropdown-input"
    />

    {/* Eye Button */}
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
{/* ✅ Role Settings Dropdown */}
<div ref={roleDropdownRef} className="filter-grid-red">
  <label className="filter-label">Role Settings</label>

  <div className="dropdown-wrapper">
    <input
      type="text"
      value={roleSearch}
      onChange={handleRoleInput}
      onFocus={() => setIsRoleOpen(true)}
      placeholder="Type or select..."
      className="dropdown-input"
    />

    <ChevronDown size={20} className="dropdown-icon" />
  </div>

  {isRoleOpen && (
    <div className="dropdown-menu">
      {filteredRoles.length > 0 ? (
        filteredRoles.map((option, index) => (
          <div
            key={index}
            onClick={() => handleRoleSelect(option)}
            onMouseEnter={() => setHoveredRole(option)}
            onMouseLeave={() => setHoveredRole(null)}
            className={`dropdown-item-option ${
              hoveredRole === option
                ? "dropdown-item-hovered"
                : roleSearch === option
                ? "dropdown-item-selected"
                : "dropdown-item-default"
            }`}
          >
            {option}
          </div>
        ))
      ) : (
        <div className="dropdown-no-matches">No matches found</div>
      )}
    </div>
  )}
</div>


                <div className="btn-container">
                  <button onClick={handleSubmit} className="btn-all">
                    <Send size={18} />  Submit
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
                    className="filter-input"
                  />
                </div>
                
                <div className="btn-container">
                  <button onClick={handleSearch} className="btn-all">
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
                {currentGroups.length > 0 ? (
                  currentGroups.map((group, idx) => (
                    <div key={group.id} className="master-table-row">
                      <div className="master-table-content">
                        <ChevronRight size={16} style={{ color: '#374151' }} />
                        <span className="master-name-text">{group.name}</span>
                      </div>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(group)}
                          className="btn-action"
                          title="Edit"
                        >
                          <Edit2 size={18}  />
                        </button>
                        <button
                          onClick={() => handleDelete(group.id)}
                          className="btn-action"
                          title="Delete"
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
                  disabled={currentPage === 1}
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
                    className={`pagination-page-btn ${
                      currentPage === page ? 'pagination-page-active' : 'pagination-page-inactive'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
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
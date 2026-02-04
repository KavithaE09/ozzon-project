import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Edit2, Trash2, ChevronLeft, Search, ChevronDown,Send,Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserRoleSettings() {
  const navigate = useNavigate();

  const initialRoles = [
    { id: 1, name: 'ADMIN', forms: true, add: true, delete: true, view: true, print: true, menu: true, others: true },
    { id: 2, name: 'RANEESH', forms: false, add: false, delete: false, view: false, print: false, menu: false, others: false },
    { id: 3, name: 'BALA', forms: false, add: false, delete: false, view: false, print: false, menu: false, others: false },
    { id: 4, name: 'NAVEEN', forms: false, add: false, delete: false, view: false, print: false, menu: false, others: false }
  ];

  const rolesList = ['ADMIN', 'RANEESH', 'BALA', 'NAVEEN'];

  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState('');
  const [roleSearch, setRoleSearch] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [submittedRoles, setSubmittedRoles] = useState([]);
  const [displayRoles, setDisplayRoles] = useState([]);
  const [showRecordList, setShowRecordList] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;
  
  const roleDropdownRef = useRef(null);

  const filteredRoles = rolesList.filter(role =>
    role.toLowerCase().includes(roleSearch.toLowerCase())
  );

  const selectedRoleIndex = roles.findIndex(r => r.name === selectedRole);
  const selectedRoleData = selectedRoleIndex !== -1 ? roles[selectedRoleIndex] : null;

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
    setSelectedRole('');
  };

  /* ROLE SELECT */
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setRoleSearch(role);
    setIsRoleDropdownOpen(false);
  };

  /* CHECKBOX CHANGE */
  const handlePermissionChange = (field) => {
    if (!selectedRoleData) return;
    const updatedRoles = [...roles];
    updatedRoles[selectedRoleIndex][field] = !updatedRoles[selectedRoleIndex][field];
    setRoles(updatedRoles);
  };

  /* SUBMIT */
  const handleSubmit = () => {
    if (!selectedRole) {
      alert('Please select a role');
      return;
    }
    if (!submittedRoles.includes(selectedRole)) {
      const updated = [...submittedRoles, selectedRole];
      setSubmittedRoles(updated);
      setDisplayRoles(updated);
    }
    setShowRecordList(true);
  };

  /* SEARCH */
  const handleSearch = () => {
    if (searchText.trim() === '') {
      setDisplayRoles(submittedRoles);
    } else {
      const filtered = submittedRoles.filter(role =>
        role.toLowerCase().includes(searchText.toLowerCase())
      );
      setDisplayRoles(filtered);
    }
    setCurrentPage(1);
  };

  /* EDIT */
  const handleEdit = (roleName) => {
    setEditingRole(roleName);
    setEditingName(roleName);
  };

  /* UPDATE */
  const handleUpdate = () => {
    if (editingName.trim() !== '') {
      const updatedSubmitted = submittedRoles.map(r => r === editingRole ? editingName.toUpperCase() : r);
      setSubmittedRoles(updatedSubmitted);
      setDisplayRoles(updatedSubmitted);
      setEditingRole(null);
      setEditingName('');
    }
  };

  /* CANCEL EDIT */
  const handleCancelEdit = () => {
    setEditingRole(null);
    setEditingName('');
  };

  /* DELETE */
  const handleDelete = (roleName) => {
    if (window.confirm(`Are you sure you want to delete ${roleName}?`)) {
      const updatedSubmitted = submittedRoles.filter(r => r !== roleName);
      setSubmittedRoles(updatedSubmitted);
      setDisplayRoles(updatedSubmitted);
      
      // Adjust current page if needed
      const newTotalPages = Math.ceil(updatedSubmitted.length / rowsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
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
                <Undo2   className="page-back-icon" />
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
                      filteredRoles.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleRoleSelect(option)}
                          onMouseEnter={() => setHoveredRole(option)}
                          onMouseLeave={() => setHoveredRole(null)}
                          className={`dropdown-item-option ${
                            hoveredRole === option
                              ? 'dropdown-item-hovered'
                              : selectedRole === option
                              ? 'dropdown-item-selected'
                              : 'dropdown-item-default'
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
                <button onClick={handleSubmit} className="btn-search">
                  <Send size={18} />  Submit
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
                      <th className="table-th-center">Forms</th>
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
                      <td className="table-cell-center">{selectedRoleData.id}</td>
                      <td className="table-cell-center">{selectedRoleData.name}</td>
                      {['add', 'delete', 'view', 'print', 'menu', 'others'].map(key => (
                        <td key={key} className="table-cell-center">
                          <input
                            type="checkbox"
                            checked={selectedRoleData[key]}
                            onChange={() => handlePermissionChange(key)}
                            className="radio-input "
                          />
                        </td>
                      ))}
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
                    {paginatedData.length === 0 ? (
                      <div className="no-data-cell">No records found</div>
                    ) : (
                      paginatedData.map((role, idx) => (
                        <div key={role} className="master-table-row">
                          <div className="master-table-content">
                            <ChevronRight size={16} className="text-gray-700" />
                            {editingRole === role ? (
                              <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="master-edit-input"
                              />
                            ) : (
                              <span className="master-name-text">{role}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {editingRole === role ? (
                              <>
                                <button onClick={handleUpdate} className="btn-smallbtn">
                                  Update
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="btn-smallbtn"
                                  style={{ backgroundColor: '#6B7280' }}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(role)}
                                  className="btn-action"
                                >
                                  <Edit2 size={18}  />
                                </button>
                                <button
                                  onClick={() => handleDelete(role)}
                                  className="btn-action"
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
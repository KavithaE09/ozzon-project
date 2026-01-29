import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Edit2, Trash2, ChevronLeft, Search, ChevronDown } from 'lucide-react';
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
  const rowsPerPage = 5;
  
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5e6e8' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '10px' }}>

            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>
              User Role Settings
            </h2>

            {/* Role Select Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '300px 160px 280px 280px', gap: '30px', marginBottom: '24px' }}>
              <div
                ref={roleDropdownRef}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #9CA3AF',
                  borderRight: '3px solid #DC2626',
                  position: 'relative'
                }}
              >
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>
                  Role Settings
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={roleSearch}
                    onChange={handleRoleInput}
                    onFocus={() => setIsRoleDropdownOpen(true)}
                    placeholder="Type or select..."
                    style={{ width: '100%', padding: '1px 1px', border: 'none', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                  />
                  <ChevronDown size={20} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} />
                </div>
                {isRoleDropdownOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: '180px', overflowY: 'auto', zIndex: 1000 }}>
                    {filteredRoles.length > 0 ? (
                      filteredRoles.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleRoleSelect(option)}
                          onMouseEnter={() => setHoveredRole(option)}
                          onMouseLeave={() => setHoveredRole(null)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: hoveredRole === option ? 'white' : '#374151',
                            backgroundColor: hoveredRole === option ? '#A63128' : selectedRole === option ? '#FEE2E2' : 'white',
                            borderBottom: index < filteredRoles.length - 1 ? '1px solid #E5E7EB' : 'none'
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', justifyContent: 'end', marginTop: '20px' }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    width: '150px',
                    height: '50px',
                    padding: '10px 24px',
                    backgroundColor: '#A63128',
                    color: 'white',
                    borderRadius: '15px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>✓</span>
                  <span>Submit</span>
                </button>
              </div>
              <div></div>
              <div></div>
            </div>

            {/* Permission Table */}
            {selectedRoleData && (
              <table
                style={{
                  width: '100%',
                  marginTop: '18px',
                  fontSize: '14px',
                  borderCollapse: 'collapse',
                  border: '1px solid #9CA3AF'
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2', textAlign: 'center' }}>
                    <th style={{ padding: '10px', border: '1px solid #9CA3AF' }}>Sl No</th>
                    <th style={{ padding: '10px', border: '1px solid #9CA3AF' }}>Forms</th>
                    <th style={{ padding: '10px', border: '1px solid #9CA3AF' }}>Add</th>
                    <th style={{ padding: '10px', border: '1px solid #9CA3AF' }}>Delete</th>
                    <th style={{ padding: '10px', border: '1px solid #9CA3AF' }}>View</th>
                    <th style={{ padding: '10px', border: '1px solid #9CA3AF' }}>Print</th>
                    <th style={{ padding: '10px', border: '1px solid #9CA3AF' }}>Menu</th>
                    <th style={{ padding: '10px', border: '1px solid #9CA3AF' }}>Others</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ textAlign: 'center' }}>
                    <td style={{ padding: '10px', border: '1px solid #9CA3AF' }}>{selectedRoleData.id}</td>
                    <td style={{ padding: '10px', border: '1px solid #9CA3AF' }}>{selectedRoleData.name}</td>
                    {['add','delete','view','print','menu','others'].map(key => (
                      <td key={key} style={{ padding: '10px', border: '1px solid #9CA3AF' }}>
                        <input
                          type="checkbox"
                          checked={selectedRoleData[key]}
                          onChange={() => handlePermissionChange(key)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}

            {/* Record List */}
            {showRecordList && (
              <>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>
                  Record List
                </h2>

                <div style={{
                  display: 'flex', 
                  alignItems: 'flex-end', 
                  justifyContent: 'flex-start',
                  gap: '40px',
                  marginBottom: '24px'
                }}>
                  <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #22C55E' }}>
                    <label style={{ display: 'block', fontSize: '16px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                      Search
                    </label>
                    <input
                      type="text"
                      placeholder="Role Name"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      style={{ width: '256px', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'white' }}
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    style={{ 
                      width: '150px', 
                      height: '50px', 
                      padding: '10px 24px', 
                      backgroundColor: '#A63128', 
                      color: 'white', 
                      borderRadius: '15px', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      border: 'none', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px' 
                    }}
                  >
                    <Search size={18} /> Search
                  </button>
                </div>

                {/* Table with Edit and Delete Icons */}
                <div style={{ border: '1px solid #9CA3AF', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: '#fde2e2', padding: '10px 16px', borderBottom: '1px solid #9CA3AF' }}>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000000' }}>
                      Role Settings Name
                    </span>
                  </div>
                  <div style={{ backgroundColor: 'white' }}>
                    {paginatedData.length === 0 ? (
                      <div style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6B7280' }}>
                        No records found
                      </div>
                    ) : (
                      paginatedData.map((role, idx) => (
                        <div
                          key={role}
                          style={{ 
                            padding: '10px 16px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'flex-start', 
                            gap: '40px', 
                            borderBottom: idx !== paginatedData.length - 1 ? '1px solid #f3f4f6' : 'none' 
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <ChevronRight size={16} style={{ color: '#374151' }} />
                            {editingRole === role ? (
                              <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                style={{
                                  flex: 1,
                                  padding: '4px 8px',
                                  border: '1px solid #9CA3AF',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  outline: 'none',
                                  backgroundColor: 'white',
                                }}
                              />
                            ) : (
                              <span style={{ fontSize: '14px', color: '#111827' }}>{role}</span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {editingRole === role ? (
                              <>
                                <button
                                  onClick={handleUpdate}
                                  style={{
                                    padding: '4px 12px',
                                    backgroundColor: '#A63128',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  style={{
                                    padding: '4px 12px',
                                    backgroundColor: '#6B7280',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                  }}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <Edit2
                                  size={18}
                                  style={{ color: '#6B7280', cursor: 'pointer' }}
                                  onClick={() => handleEdit(role)}
                                />
                                <Trash2
                                  size={18}
                                  style={{ color: '#DC2626', cursor: 'pointer' }}
                                  onClick={() => handleDelete(role)}
                                />
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
          </div>

          {/* Pagination */}
          {showRecordList && displayRoles.length > rowsPerPage && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              marginBottom: '12px'
            }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: currentPage === 1 ? '#e5e7eb' : '#ffffff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    backgroundColor: currentPage === page ? '#A63128' : '#ffffff',
                    color: currentPage === page ? '#ffffff' : '#000000',
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: currentPage === totalPages ? '#e5e7eb' : '#ffffff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
           <button 
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
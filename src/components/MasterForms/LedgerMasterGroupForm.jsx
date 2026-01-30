import React, { useState } from 'react';
import { ChevronDown, Edit2, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LedgerMasterGroupForm() {
  const navigate = useNavigate();
  const [accountsGroupName, setAccountsGroupName] = useState('');
  const [groupUnder, setGroupUnder] = useState('');
  const [selectedType, setSelectedType] = useState('None');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [savedRecords, setSavedRecords] = useState([
    { id: 1, accountsGroupName: 'Sundry Creditor', groupUnder: 'CAPITAL-AC', type: 'None' },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({
    accountsGroupName: '',
    groupUnder: '',
    type: ''
  });

  // Search states
  const [searchBy, setSearchBy] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(savedRecords);

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentGroups = filteredRecords.slice(indexOfFirst, indexOfLast);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = React.useRef(null);
  
  // For table edit dropdowns
  const [isEditGroupDropdownOpen, setIsEditGroupDropdownOpen] = useState(false);
  const [isEditTypeDropdownOpen, setIsEditTypeDropdownOpen] = useState(false);
  const [editGroupSearchTerm, setEditGroupSearchTerm] = useState('');
  const [editTypeSearchTerm, setEditTypeSearchTerm] = useState('');
  const [hoveredEditOption, setHoveredEditOption] = useState(null);
  const editGroupDropdownRef = React.useRef(null);
  const editTypeDropdownRef = React.useRef(null);

  const groupOptions = ['CAPITAL-AC', 'ASSETS', 'LIABILITY', 'INCOME', 'EXPENSE'];
  const typeOptions = ['None', 'Cash', 'Bank'];
  
  const filteredOptions = groupOptions.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredEditGroupOptions = groupOptions.filter(option => 
    option.toLowerCase().includes(editGroupSearchTerm.toLowerCase())
  );
  
  const filteredEditTypeOptions = typeOptions.filter(option => 
    option.toLowerCase().includes(editTypeSearchTerm.toLowerCase())
  );

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (editGroupDropdownRef.current && !editGroupDropdownRef.current.contains(event.target)) {
        setIsEditGroupDropdownOpen(false);
      }
      if (editTypeDropdownRef.current && !editTypeDropdownRef.current.contains(event.target)) {
        setIsEditTypeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    setFilteredRecords(savedRecords);
  }, [savedRecords]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSelectGroup = (option) => {
    setGroupUnder(option);
    setSearchTerm(option);
    setIsDropdownOpen(false);
  };

  React.useEffect(() => {
    setSearchTerm(groupUnder);
  }, [groupUnder]);

  const handleSave = () => {
    if (accountsGroupName.trim() !== '') {
      const newRecord = {
        id: savedRecords.length > 0 ? Math.max(...savedRecords.map(r => r.id)) + 1 : 1,
        accountsGroupName,
        groupUnder,
        type: selectedType
      };
      setSavedRecords([...savedRecords, newRecord]);
      // Reset form
      setAccountsGroupName('');
      setGroupUnder('');
      setSearchTerm('');
      setSelectedType('None');
    }
  };

  const handleSearch = () => {
    let filtered = savedRecords;

    if (searchBy.trim()) {
      filtered = filtered.filter(record => 
        record.accountsGroupName.toLowerCase().includes(searchBy.toLowerCase())
      );
    }

    setFilteredRecords(filtered);
    setCurrentPage(1);
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditingData({
      accountsGroupName: record.accountsGroupName,
      groupUnder: record.groupUnder,
      type: record.type
    });
    setEditGroupSearchTerm(record.groupUnder);
    setEditTypeSearchTerm(record.type);
  };

  const handleUpdate = (recordId) => {
    if (editingData.accountsGroupName.trim() !== '') {
      const updatedRecords = savedRecords.map(record =>
        record.id === recordId ? { ...record, ...editingData } : record
      );
      setSavedRecords(updatedRecords);
      setEditingId(null);
      setEditingData({ accountsGroupName: '', groupUnder: '', type: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData({ accountsGroupName: '', groupUnder: '', type: '' });
    setIsEditGroupDropdownOpen(false);
    setIsEditTypeDropdownOpen(false);
  };

  const handleDelete = (recordId) => {
    const updatedRecords = savedRecords.filter(record => record.id !== recordId);
    setSavedRecords(updatedRecords);
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Account Group Form</h2>

            {/* Form Section */}
            <div className="filter-section">
              <div className="filter-grid">
                {/* Accounts Group Name */}
                <div className="filter-grid-red">
                  <label className="filter-label">Accounts Group Name</label>
                  <input
                    type="text"
                    value={accountsGroupName}
                    onChange={(e) => setAccountsGroupName(e.target.value)}
                    className="filter-input"
                  />
                </div>

                {/* Group Under */}
                <div ref={dropdownRef} className="filter-grid-red">
                  <label className="filter-label">Group Under</label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleInputChange}
                      onFocus={() => setIsDropdownOpen(true)}
                      placeholder="Type or select..."
                      className="dropdown-input"
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handleSelectGroup(option)}
                            onMouseEnter={() => setHoveredOption(option)}
                            onMouseLeave={() => setHoveredOption(null)}
                            className={`dropdown-item-option ${
                              hoveredOption === option
                                ? 'dropdown-item-hovered'
                                : groupUnder === option
                                ? 'dropdown-item-selected'
                                : 'dropdown-item-default'
                            }`}
                          >
                            {option}
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-no-matches">
                          No matches found
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div></div>
                <div></div>
              </div>

              {/* Radio Buttons */}
              <div className="radio-group">
                <div className="radio-option" onClick={() => setSelectedType('None')}>
                  <input 
                    type="radio" 
                    checked={selectedType === 'None'} 
                    onChange={() => setSelectedType('None')}
                    className="radio-input accent-primary"
                  />
                  <span className="radio-label">None</span>
                </div>

                <div className="radio-option" onClick={() => setSelectedType('Cash')}>
                  <input 
                    type="radio" 
                    checked={selectedType === 'Cash'} 
                    onChange={() => setSelectedType('Cash')}
                    className="radio-input accent-primary"
                  />
                  <span className="radio-label">Cash</span>
                </div>

                <div className="radio-option" onClick={() => setSelectedType('Bank')}>
                  <input 
                    type="radio" 
                    checked={selectedType === 'Bank'} 
                    onChange={() => setSelectedType('Bank')}
                    className="radio-input accent-primary"
                  />
                  <span className="radio-label">Bank</span>
                </div>
            </div>
 
              {/* Submit Button */}
              <div className="btn-container">
                <button onClick={handleSave} className="btn-all">
                  <span>✓</span> Submit
                </button>
              </div>
            </div>
 
            {/* Record List Section */}
            <h2 className="page-title">
              Record List
            </h2>

            <div className="filter-section">
              <div className="filter-grid">
                {/* Search By */}
                <div className="filter-grid-green">
                  <label className="filter-label">Search By</label>
                  <input
                    type="text"
                    placeholder="Accounts Group Name"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="filter-input"
                  />
                </div>

                {/* Search Button */}
                <div className="btn-container">
                  <button onClick={handleSearch} className="btn-all">
                    <Search size={18} /> Search
                  </button>
                </div>
                
                <div></div>
                <div></div>
              </div>
            </div>

            {/* Saved Records Table */}
            {currentGroups.length > 0 && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr className="table-header">
                      <th className="table-th">S.No</th>
                      <th className="table-th">Accounts Group Name</th>
                      <th className="table-th">Group Under</th>
                      <th className="table-th">Type</th>
                      <th className="table-th-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentGroups.map((record, idx) => (
                      <tr key={record.id} className="table-row">
                        <td className="table-cell">{indexOfFirst + idx + 1}</td>
                        
                        {editingId === record.id ? (
                          <>
                            <td className="table-cell">
                              <input
                                type="text"
                                value={editingData.accountsGroupName}
                                onChange={(e) => setEditingData({ ...editingData, accountsGroupName: e.target.value })}
                                style={{
                                  padding: '4px 8px',
                                  border: '1px solid #9CA3AF',
                                  borderRadius: '4px',
                                  fontSize: '13px',
                                  outline: 'none',
                                  width: '100%'
                                }}
                              />
                            </td>
                            
                            {/* Group Under Dropdown in Edit Mode */}
                            <td className="table-cell">
                              <div ref={editGroupDropdownRef} style={{ position: 'relative' }}>
                                <div className="dropdown-wrapper">
                                  <input
                                    type="text"
                                    value={editGroupSearchTerm}
                                    onChange={(e) => {
                                      setEditGroupSearchTerm(e.target.value);
                                      setIsEditGroupDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsEditGroupDropdownOpen(true)}
                                    placeholder="Type or select..."
                                   className="dropdown-input"
                                  />
                                  <ChevronDown 
                                    size={16} 
                                    className="dropdown-icon"
                                  />
                                </div>
                                {isEditGroupDropdownOpen && (
                                  <div className="dropdown-menu" style={{ width: '100%' }}>
                                    {filteredEditGroupOptions.length > 0 ? (
                                      filteredEditGroupOptions.map((option, index) => (
                                        <div
                                          key={index}
                                          onClick={() => {
                                            setEditingData({ ...editingData, groupUnder: option });
                                            setEditGroupSearchTerm(option);
                                            setIsEditGroupDropdownOpen(false);
                                          }}
                                          onMouseEnter={() => setHoveredEditOption('group-' + option)}
                                          onMouseLeave={() => setHoveredEditOption(null)}
                                          className={`dropdown-item-option ${
                                            hoveredEditOption === 'group-' + option
                                              ? 'dropdown-item-hovered'
                                              : editingData.groupUnder === option
                                              ? 'dropdown-item-selected'
                                              : 'dropdown-item-default'
                                          }`}
                                        >
                                          {option}
                                        </div>
                                      ))
                                    ) : (
                                      <div className="dropdown-no-matches">
                                        No matches found
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Type Dropdown in Edit Mode */}
                            <td className="table-cell">
                              <div ref={editTypeDropdownRef} style={{ position: 'relative' }}>
                                <div  className="dropdown-wrapper">
                                  <input
                                    type="text"
                                    value={editTypeSearchTerm}
                                    onChange={(e) => {
                                      setEditTypeSearchTerm(e.target.value);
                                      setIsEditTypeDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsEditTypeDropdownOpen(true)}
                                    placeholder="Type or select..."
                                   className="dropdown-input"
                                  />
                                  <ChevronDown 
                                    size={16} 
                                    className="dropdown-icon" 
                                  />
                                </div>
                                {isEditTypeDropdownOpen && (
                                  <div className="dropdown-menu" style={{ width: '100%' }}>
                                    {filteredEditTypeOptions.length > 0 ? (
                                      filteredEditTypeOptions.map((option, index) => (
                                        <div
                                          key={index}
                                          onClick={() => {
                                            setEditingData({ ...editingData, type: option });
                                            setEditTypeSearchTerm(option);
                                            setIsEditTypeDropdownOpen(false);
                                          }}
                                          onMouseEnter={() => setHoveredEditOption('type-' + option)}
                                          onMouseLeave={() => setHoveredEditOption(null)}
                                          className={`dropdown-item-option ${
                                            hoveredEditOption === 'type-' + option
                                              ? 'dropdown-item-hovered'
                                              : editingData.type === option
                                              ? 'dropdown-item-selected'
                                              : 'dropdown-item-default'
                                          }`}
                                        >
                                          {option}
                                        </div>
                                      ))
                                    ) : (
                                      <div className="dropdown-no-matches">
                                        No matches found
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="table-cell">{record.accountsGroupName}</td>
                            <td className="table-cell">{record.groupUnder}</td>
                            <td className="table-cell">{record.type}</td>
                          </>
                        )}

                        <td className="table-cell-center">
                          {editingId === record.id ? (
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              <button
                                onClick={() => handleUpdate(record.id)}
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
                            </div>
                          ) : (
                            <div className="table-actions">
                              <button
                                onClick={() => handleEdit(record)}
                                className="btn-action"
                                title="Edit"
                              >
                                <Edit2 size={18} className="text-[#374151]" />
                              </button>
                              <button
                                onClick={() => handleDelete(record.id)}
                                className="btn-action"
                                title="Delete"
                              >
                                <Trash2 size={18} className="text-[#dc2626]" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {filteredRecords.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
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
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className={`pagination-btn ${
                    currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Back Button */}
            <div className="footer-container">
              <button onClick={() => navigate(-1)} className="btn-back">
                <span>←</span>
                <span>Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Edit2, Trash2, ChevronLeft, ChevronRight, Search, Send, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import accountGroupApi from '../../api/AccountgroupApi';

export default function LedgerMasterGroupForm() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState(() => localStorage.getItem('ledgerGroupName') || '');
  const [groupUnder, setGroupUnder] = useState(() => localStorage.getItem('ledgerGroupUnder') || '');
  const [selectedType, setSelectedType] = useState(() => localStorage.getItem('ledgerSelectedType') || 'None');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [savedRecords, setSavedRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Search states
  const [searchBy, setSearchBy] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

  // Dropdown states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('ledgerGroupUnderSearch') || '');
  const dropdownRef = useRef(null);

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentGroups = filteredRecords.slice(indexOfFirst, indexOfLast);

  // Dropdown options
  const dropdownOptions = savedRecords.filter(record => {
    if (!record || !record.GroupName) return false;
    if (editingId && Number(record.GroupCode) === Number(editingId)) return false;
    return true;
  });

  const filteredOptions = dropdownOptions.filter(option => {
    if (!option || !option.GroupName) return false;
    return option.GroupName.toLowerCase().includes((searchTerm || '').toLowerCase());
  });

  // Fetch account groups
  const fetchAccountGroups = async () => {
    try {
      setLoading(true);
      const response = await accountGroupApi.getAllAccountGroups({ searchBy: searchBy, page: 1, limit: 100 });
      if (response.success) {
        setSavedRecords(response.data);
        setFilteredRecords(response.data);
      }
    } catch (error) {
      console.error('Error fetching account groups:', error);
      alert('Failed to fetch account groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountGroups();
  }, []);

  // Persist form values to localStorage
  useEffect(() => localStorage.setItem('ledgerGroupName', groupName), [groupName]);
  useEffect(() => localStorage.setItem('ledgerGroupUnder', groupUnder), [groupUnder]);
  useEffect(() => localStorage.setItem('ledgerSelectedType', selectedType), [selectedType]);
  useEffect(() => localStorage.setItem('ledgerGroupUnderSearch', searchTerm), [searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => setFilteredRecords(savedRecords), [savedRecords]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSelectGroup = (option) => {
    setGroupUnder(Number(option.GroupCode));
    setSearchTerm(option.GroupName);
    setIsDropdownOpen(false);
  };

  const handleSave = async () => {
    if (!groupName.trim()) return alert('Please enter Group Name');

    try {
      setLoading(true);
      const payload = { GroupName: groupName, GroupUnder: groupUnder || null, Type: selectedType };
      let response;

      if (editingId) {
        response = await accountGroupApi.updateAccountGroup(editingId, payload);
        if (response.success) {
          alert('Account Group updated successfully');
          setEditingId(null);
        }
      } else {
        response = await accountGroupApi.createAccountGroup(payload);
        if (response.success) alert('Account Group created successfully');
      }

      setGroupName('');
      setGroupUnder('');
      setSearchTerm('');
      setSelectedType('None');
      setCurrentPage(1);

      localStorage.removeItem('ledgerGroupName');
      localStorage.removeItem('ledgerGroupUnder');
      localStorage.removeItem('ledgerSelectedType');
      localStorage.removeItem('ledgerGroupUnderSearch');

      await fetchAccountGroups();
    } catch (error) {
      console.error('Error saving account group:', error);
      alert(error.response?.data?.message || 'Failed to save Account Group');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = savedRecords;
    if (searchBy.trim()) {
      filtered = filtered.filter(record => record && record.GroupName && record.GroupName.toLowerCase().includes(searchBy.toLowerCase()));
    }
    setFilteredRecords(filtered);
    setCurrentPage(1);
  };

  const handleEdit = (record) => {
    setEditingId(record.GroupCode);
    setGroupName(record.GroupName);
    setGroupUnder(record.GroupUnder || '');

    const parentGroup = record.GroupUnder ? savedRecords.find(opt => Number(opt.GroupCode) === Number(record.GroupUnder)) : null;
    setSearchTerm(parentGroup ? parentGroup.GroupName : '');
    setSelectedType(record.Type || 'None');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (recordId) => {
    if (!window.confirm('Are you sure you want to delete this Account Group?')) return;

    try {
      setLoading(true);
      const response = await accountGroupApi.deleteAccountGroup(recordId);
      if (response.success) {
        alert('Account Group deleted successfully');
        await fetchAccountGroups();
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error deleting account group:', error);
      alert(error.response?.data?.message || 'Failed to delete Account Group');
    } finally {
      setLoading(false);
    }
  };

  const getGroupUnderName = (groupUnderCode) => {
    if (!groupUnderCode) return '-';
    const group = savedRecords.find(opt => Number(opt.GroupCode) === Number(groupUnderCode));
    return group ? group.GroupName : '-';
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setGroupName('');
    setGroupUnder('');
    setSearchTerm('');
    setSelectedType('None');

    localStorage.removeItem('ledgerGroupName');
    localStorage.removeItem('ledgerGroupUnder');
    localStorage.removeItem('ledgerSelectedType');
    localStorage.removeItem('ledgerGroupUnderSearch');
  };

  const handleClearDropdown = () => {
    setGroupUnder('');
    setSearchTerm('');
  };
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <div className="page-header">
              <h1 className="page-title">Account Group Form</h1>
              <button
                onClick={() => navigate(-1)}
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2 className="page-back-icon" />
              </button>
            </div>

            {/* Form Section */}
            <div className="filter-section">
              

              <div className="filter-grid">
                {/* Group Name */}
                <div className="filter-grid-red">
                  <label className="filter-label">Group Name</label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="filter-input"
                    disabled={loading}
                    placeholder="Enter group name"
                  />
                </div>

                {/* Group Under */}
                <div ref={dropdownRef} className="filter-grid-red">
                  <label className="filter-label">
                    Group Under 
                    
                  </label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleInputChange}
                      onFocus={() => setIsDropdownOpen(true)}
                      placeholder="Type or select.."
                      className="dropdown-input"
                      disabled={loading}
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                          <div
                            key={option.GroupCode}
                            onClick={() => handleSelectGroup(option)}
                            onMouseEnter={() => setHoveredOption(option.GroupCode)}
                            onMouseLeave={() => setHoveredOption(null)}
                            className={`dropdown-item-option ${
                              hoveredOption === option.GroupCode
                                ? 'dropdown-item-hovered'
                                : Number(groupUnder) === Number(option.GroupCode)
                                ? 'dropdown-item-selected'
                                : 'dropdown-item-default'
                            }`}
                          >
                            {option.GroupName}
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-no-matches">
                          {searchTerm ? 'No matching groups' : 'No groups available yet. Create your first group!'}
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
                <div className="radio-option" onClick={() => !loading && setSelectedType('None')}>
                  <input
                    type="radio"
                    checked={selectedType === 'None'}
                    onChange={() => setSelectedType('None')}
                    className="radio-input accent-primary"
                    disabled={loading}
                  />
                  <span className="radio-label">None</span>
                </div>

                <div className="radio-option" onClick={() => !loading && setSelectedType('Cash')}>
                  <input
                    type="radio"
                    checked={selectedType === 'Cash'}
                    onChange={() => setSelectedType('Cash')}
                    className="radio-input accent-primary"
                    disabled={loading}
                  />
                  <span className="radio-label">Cash</span>
                </div>

                <div className="radio-option" onClick={() => !loading && setSelectedType('Bank')}>
                  <input
                    type="radio"
                    checked={selectedType === 'Bank'}
                    onChange={() => setSelectedType('Bank')}
                    className="radio-input accent-primary"
                    disabled={loading}
                  />
                  <span className="radio-label">Bank</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="btn-container">
                <button onClick={handleSave} className="btn-all" disabled={loading}>
                  <Send size={18} /> {loading ? 'Submitting...' : editingId ? 'Update' : 'Submit'}
                </button>
              </div>
            </div>

            {/* Record List Section */}
            <h2 className="page-title">Record List</h2>

            <div className="filter-section">
              <div className="filter-grid">
                {/* Search By */}
                <div className="filter-grid-green">
                  <label className="filter-label">Search By</label>
                  <input
                    type="text"
                    placeholder="Group Name"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="filter-input"
                    disabled={loading}
                  />
                </div>

                {/* Search Button */}
                <div className="btn-container">
                  <button onClick={handleSearch} className="btn-all" disabled={loading}>
                    <Search size={18} /> Search
                  </button>
                </div>

                <div></div>
                <div></div>
              </div>
            </div>

            {/* Saved Records Table */}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr className="table-header">
                    <th className="table-th">S.No</th>
                    <th className="table-th">Group Code</th>
                    <th className="table-th">Group Name</th>
                    <th className="table-th">Group Under</th>
                    <th className="table-th">Type</th>
                    <th className="table-th-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="no-data-cell">
                        Loading...
                      </td>
                    </tr>
                  ) : currentGroups.length > 0 ? (
                    currentGroups.map((record, idx) => (
                      <tr key={record.GroupCode} className="table-row">
                        <td className="table-cell">{indexOfFirst + idx + 1}</td>
                        <td className="table-cell">{record.GroupCode}</td>
                        <td className="table-cell">{record.GroupName}</td>
                        <td className="table-cell">{getGroupUnderName(record.GroupUnder)}</td>
                        <td className="table-cell">{record.Type || 'None'}</td>
                        <td className="table-cell-center">
                          <div className="table-actions">
                            <button
                              onClick={() => handleEdit(record)}
                              className="btn-action"
                              title="Edit"
                              disabled={loading}
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(record.GroupCode)}
                              className="btn-action"
                              title="Delete"
                              disabled={loading}
                            >
                              <Trash2 size={18} className="text-[#dc2626]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data-cell">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredRecords.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1 || loading}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`pagination-btn ${
                    currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-page-btn ${
                      currentPage === page ? 'pagination-page-active' : 'pagination-page-inactive'
                    }`}
                    disabled={loading}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages || loading}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
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
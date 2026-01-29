import React, { useState } from 'react';
import { ChevronDown, Edit2, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LedgerMasterGroupForm() {
  const navigate = useNavigate();
  const [accountsGroupName, setAccountsGroupName] = useState('');
  const [groupUnder, setGroupUnder] = useState('');
  const [selectedType, setSelectedType] = useState('None');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

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
  const [searchGroupName, setSearchGroupName] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(savedRecords);

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;

  const currentGroups = filteredRecords.slice(
    indexOfFirst,
    indexOfLast
  );

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
      setGroupUnder('CAPITAL-AC');
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

    if (searchGroupName && searchGroupName !== 'Select group') {
      filtered = filtered.filter(record => 
        record.groupUnder === searchGroupName
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Main Content Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Form Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px', backgroundColor: '#f5e6e8' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '10px' }}>
            {/* Ledger Group Master Form Section */}
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>
              Account Group Form
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '280px 280px', gap: '16px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db',borderRight: '3px solid #DC2626' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Accounts Group Name
                </label>
                <input
                  type="text"
                  value={accountsGroupName}
                  onChange={(e) => setAccountsGroupName(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '4px 8px', 
                    border: 'none', 
                    borderRadius: '4px',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div ref={dropdownRef} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db',borderRight: '3px solid #DC2626', position: 'relative' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Group Under
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Type or select..."
                    style={{ 
                      width: '100%', 
                      padding: '4px 8px', 
                      border: 'none', 
                      borderRadius: '4px',
                      fontSize: '13px',
                      outline: 'none',
                      backgroundColor: 'white',
                      boxSizing: 'border-box',
                      cursor: 'text'
                    }}
                  />
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      position: 'absolute', 
                      right: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: '#000000',
                      pointerEvents: 'none'
                    }} 
                  />
                </div>
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    marginTop: '4px',
                    backgroundColor: 'white',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000
                  }}>
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectGroup(option)}
                          onMouseEnter={() => setHoveredOption(option)}
                          onMouseLeave={() => setHoveredOption(null)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: hoveredOption === option ? 'white' : '#374151',
                            backgroundColor: hoveredOption === option ? '#991b1b' : (groupUnder === option ? '#FEE2E2' : 'white'),
                            borderBottom: index < filteredOptions.length - 1 ? '1px solid #E5E7EB' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>
                        No matches found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Radio Buttons */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setSelectedType('None')}>
                <div style={{ 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  border: '2px solid #991b1b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white'
                }}>
                  {selectedType === 'None' && (
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: '#991b1b' 
                    }} />
                  )}
                </div>
                <span style={{ fontSize: '14px', color: '#374151' }}>None</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setSelectedType('Cash')}>
                <div style={{ 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  border: '2px solid #d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white'
                }}>
                  {selectedType === 'Cash' && (
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: '#991b1b' 
                    }} />
                  )}
                </div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Cash</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setSelectedType('Bank')}>
                <div style={{ 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  border: '2px solid #d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white'
                }}>
                  {selectedType === 'Bank' && (
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: '#991b1b' 
                    }} />
                  )}
                </div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Bank</span>
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
               <button 
                onClick={handleSave}
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

            {/* Record List Section */}
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
              Record List
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '15px' }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', borderRight: '3px solid #22C55E' }}>
                <label style={{  display: 'block',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '8px'}}>
                  Search By
                </label>
                <input
                  type="text"
                  placeholder="Accounts Group Name"
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1px 1px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    outline: 'none',
                    appearance: 'none',
                    backgroundColor: 'white'
                  }}
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
                                gap: '8px',
                                marginTop:'10px'
                              }}
                            >
                              <Search size={18} /> Search
                            </button>
            </div>

            {/* Saved Records Table */}
            {currentGroups.length > 0 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827'  }}>
                  Saved Records
                </h3>
                <div style={{ 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  overflow: 'visible' 
                }}>
                  <div style={{ 
                    backgroundColor: '#fde2e2', 
                    padding: '10px 16px', 
                    borderBottom: '1px solid #e5e7eb',
                    display: 'grid',
                    gridTemplateColumns: '50px 1fr 1fr 1fr 100px',
                    gap: '16px'
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000000' }}>S.No</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000000' }}>Accounts Group Name</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000000' }}>Group Under</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000000' }}>Type</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000000' }}>Actions</span>
                  </div>
                  <div style={{ backgroundColor: 'white', overflow: 'visible' }}>
                    {currentGroups.map((record, idx) => (
                      <div 
                        key={record.id}
                        style={{ 
                          padding: '10px 16px', 
                          display: 'grid',
                          gridTemplateColumns: '50px 1fr 1fr 1fr 100px',
                          gap: '16px',
                          alignItems: 'center',
                          borderBottom: idx !== currentGroups.length - 1 ? '1px solid #f3f4f6' : 'none'
                        }}
                      >
                        <span style={{ fontSize: '14px', color: '#111827' }}>{indexOfFirst + idx + 1}</span>
                        
                        {editingId === record.id ? (
                          <>
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
                                backgroundColor: 'white'
                              }}
                            />
                            
                            {/* Group Under Custom Dropdown */}
                            <div ref={editGroupDropdownRef} style={{ position: 'relative' }}>
                              <div style={{ position: 'relative' }}>
                                <input
                                  type="text"
                                  value={editGroupSearchTerm}
                                  onChange={(e) => {
                                    setEditGroupSearchTerm(e.target.value);
                                    setIsEditGroupDropdownOpen(true);
                                  }}
                                  onFocus={() => setIsEditGroupDropdownOpen(true)}
                                  placeholder="Type or select..."
                                  style={{
                                    padding: '4px 8px',
                                    border: '1px solid #9CA3AF',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    outline: 'none',
                                    backgroundColor: 'white',
                                    width: '100%',
                                    cursor: 'text',
                                    paddingRight: '30px'
                                  }}
                                />
                                <ChevronDown 
                                  size={16} 
                                  style={{ 
                                    position: 'absolute', 
                                    right: '8px', 
                                    top: '50%', 
                                    transform: 'translateY(-50%)',
                                    color: '#000000',
                                    pointerEvents: 'none'
                                  }} 
                                />
                              </div>
                              {isEditGroupDropdownOpen && (
                                <div style={{
                                  position: 'absolute',
                                  top: '100%',
                                  left: '0',
                                  width: '200px',
                                  marginTop: '4px',
                                  backgroundColor: 'white',
                                  border: '1px solid #D1D5DB',
                                  borderRadius: '4px',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  maxHeight: '200px',
                                  overflowY: 'auto',
                                  zIndex: 9999
                                }}>
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
                                        style={{
                                          padding: '8px 12px',
                                          cursor: 'pointer',
                                          fontSize: '13px',
                                          color: hoveredEditOption === 'group-' + option ? 'white' : '#374151',
                                          backgroundColor: hoveredEditOption === 'group-' + option ? '#991b1b' : (editingData.groupUnder === option ? '#FEE2E2' : 'white'),
                                          borderBottom: index < filteredEditGroupOptions.length - 1 ? '1px solid #E5E7EB' : 'none',
                                          transition: 'all 0.2s ease'
                                        }}
                                      >
                                        {option}
                                      </div>
                                    ))
                                  ) : (
                                    <div style={{ padding: '8px 12px', fontSize: '13px', color: '#9CA3AF' }}>
                                      No matches found
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Type Custom Dropdown */}
                            <div ref={editTypeDropdownRef} style={{ position: 'relative' }}>
                              <div style={{ position: 'relative' }}>
                                <input
                                  type="text"
                                  value={editTypeSearchTerm}
                                  onChange={(e) => {
                                    setEditTypeSearchTerm(e.target.value);
                                    setIsEditTypeDropdownOpen(true);
                                  }}
                                  onFocus={() => setIsEditTypeDropdownOpen(true)}
                                  placeholder="Type or select..."
                                  style={{
                                    padding: '4px 8px',
                                    border: '1px solid #9CA3AF',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    outline: 'none',
                                    backgroundColor: 'white',
                                    width: '100%',
                                    cursor: 'text',
                                    paddingRight: '30px'
                                  }}
                                />
                                <ChevronDown 
                                  size={16} 
                                  style={{ 
                                    position: 'absolute', 
                                    right: '8px', 
                                    top: '50%', 
                                    transform: 'translateY(-50%)',
                                    color: '#000000',
                                    pointerEvents: 'none'
                                  }} 
                                />
                              </div>
                              {isEditTypeDropdownOpen && (
                                <div style={{
                                  position: 'absolute',
                                  top: '100%',
                                  left: '0',
                                  width: '200px',
                                  marginTop: '4px',
                                  backgroundColor: 'white',
                                  border: '1px solid #D1D5DB',
                                  borderRadius: '4px',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  maxHeight: '200px',
                                  overflowY: 'auto',
                                  zIndex: 9999
                                }}>
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
                                        style={{
                                          padding: '8px 12px',
                                          cursor: 'pointer',
                                          fontSize: '13px',
                                          color: hoveredEditOption === 'type-' + option ? 'white' : '#374151',
                                          backgroundColor: hoveredEditOption === 'type-' + option ? '#991b1b' : (editingData.type === option ? '#FEE2E2' : 'white'),
                                          borderBottom: index < filteredEditTypeOptions.length - 1 ? '1px solid #E5E7EB' : 'none',
                                          transition: 'all 0.2s ease'
                                        }}
                                      >
                                        {option}
                                      </div>
                                    ))
                                  ) : (
                                    <div style={{ padding: '8px 12px', fontSize: '13px', color: '#9CA3AF' }}>
                                      No matches found
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: '14px', color: '#111827' }}>{record.accountsGroupName}</span>
                            <span style={{ fontSize: '14px', color: '#111827' }}>{record.groupUnder}</span>
                            <span style={{ fontSize: '14px', color: '#111827' }}>{record.type}</span>
                          </>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {editingId === record.id ? (
                            <>
                              <button
                                onClick={() => handleUpdate(record.id)}
                                style={{
                                  padding: '4px 12px',
                                  backgroundColor: '#991b1b',
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
                                onClick={() => handleEdit(record)}
                              />
                              <Trash2
                                size={18}
                                style={{ color: '#DC2626', cursor: 'pointer' }}
                                onClick={() => handleDelete(record.id)}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            marginTop: '12px'
          }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                backgroundColor: currentPage === 1 ? '#e5e7eb' : '#ffffff',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft />
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
              onClick={() => setCurrentPage(p => p + 1)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                backgroundColor: currentPage === totalPages ? '#e5e7eb' : '#ffffff',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronRight />
            </button>
          </div>
          
          <button 
            onClick={() => navigate(-1)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 20px', 
              fontSize: '13px', 
              fontWeight: '500', 
              color: '#B91C1C', 
              border: '2px solid #B91C1C', 
              borderRadius: '4px', 
              backgroundColor: 'white', 
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
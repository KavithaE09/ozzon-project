import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, Edit2, Trash2,ChevronLeft, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MaterialList() {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  const [groupName, setGroupName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  const groupOptions = ["Group 1", "Group 2", "Group 3"];
  const groupnameOptions = ["Group 1", "Group 2", "Group 3"];
  const unitOptions = ["Box", "Kg", "Liter"];
  
  const [formData, setFormData] = useState({
    productCode: '',
    productName: '',
    group: '',
    unit: '',
    sellingRate: '',
    maxStock: '',
    minStock: '',
    gst: '',
    hsnCode: '',
    reOrderLevel: ''
  });

  const [allRecords, setAllRecords] = useState([
    { id: 1, name: 'ADMIN', rate: '₹ 78962', group: 'Group 1' },
    { id: 2, name: 'RANEESH', rate: '₹ 78962', group: 'Group 2' },
    { id: 3, name: 'BALA', rate: '₹ 78962', group: 'Group 1' },
    { id: 4, name: 'NAVEEN', rate: '₹ 78962', group: 'Group 3' }
  ]);

  const [filteredRecords, setFilteredRecords] = useState([
    { id: 1, name: 'ADMIN', rate: '₹ 78962', group: 'Group 1' },
    { id: 2, name: 'RANEESH', rate: '₹ 78962', group: 'Group 2' },
    { id: 3, name: 'BALA', rate: '₹ 78962', group: 'Group 1' },
    { id: 4, name: 'NAVEEN', rate: '₹ 78962', group: 'Group 3' }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ name: '', rate: '' });
  const rowsPerPage = 2;
const totalPages = Math.max(
  1,
  Math.ceil(filteredRecords.length / rowsPerPage)
);


const indexOfLast = currentPage * rowsPerPage;
const indexOfFirst = indexOfLast - rowsPerPage;

const currentRecords = filteredRecords.slice(
  indexOfFirst,
  indexOfLast
);


  // Group dropdown state
  const [groupSearch, setGroupSearch] = useState('');
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const groupRef = useRef(null);
  
  // Group name dropdown state
  const [groupnameSearch, setGroupnameSearch] = useState('');
  const [isGroupnameOpen, setIsGroupnameOpen] = useState(false);
  const [hoveredGroupname, setHoveredGroupname] = useState(null);
  const groupnameRef = useRef(null);
  
  // Unit dropdown state
  const [unitSearch, setUnitSearch] = useState('');
  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const [hoveredUnit, setHoveredUnit] = useState(null);
  const unitRef = useRef(null);

  const filteredGroups = groupOptions.filter(opt =>
    opt.toLowerCase().includes(groupSearch.toLowerCase())
  );
  
  const filteredGroupsname = groupnameOptions.filter(opt =>
    opt.toLowerCase().includes(groupnameSearch.toLowerCase())
  );
  
  const filteredUnits = unitOptions.filter(opt =>
    opt.toLowerCase().includes(unitSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupRef.current && !groupRef.current.contains(event.target)) {
        setIsGroupOpen(false);
      }
      if (groupnameRef.current && !groupnameRef.current.contains(event.target)) {
        setIsGroupnameOpen(false);
      }
      if (unitRef.current && !unitRef.current.contains(event.target)) {
        setIsUnitOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    let filtered = allRecords;

    if (searchBy.trim()) {
      filtered = filtered.filter(record =>
        record.name.toLowerCase().includes(searchBy.toLowerCase())
      );
    }

    if (groupnameSearch && groupnameSearch !== 'Group Name') {
      filtered = filtered.filter(record =>
        record.group === groupnameSearch
      );
    }

    setFilteredRecords(filtered);
    setCurrentPage(1);
  };

  const handleSubmit = () => {
    if (formData.productName.trim() !== '') {
      const newRecord = {
        id: allRecords.length > 0 ? Math.max(...allRecords.map(r => r.id)) + 1 : 1,
        name: formData.productName.toUpperCase(),
        rate: formData.sellingRate ? `₹ ${formData.sellingRate}` : '₹ 0',
        group: formData.group || 'N/A'
      };
      setAllRecords([...allRecords, newRecord]);
      setFilteredRecords([...allRecords, newRecord]);
      
      // Reset form
      setFormData({
        productCode: '',
        productName: '',
        group: '',
        unit: '',
        sellingRate: '',
        maxStock: '',
        minStock: '',
        gst: '',
        hsnCode: '',
        reOrderLevel: ''
      });
      setGroupSearch('');
      setUnitSearch('');
      setCurrentPage(1);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditingData({ name: record.name, rate: record.rate.replace('₹ ', '') });
  };

  const handleUpdate = (recordId) => {
    if (editingData.name.trim() !== '') {
      const updatedRecords = allRecords.map(record =>
        record.id === recordId ? { 
          ...record, 
          name: editingData.name.toUpperCase(),
          rate: editingData.rate ? `₹ ${editingData.rate}` : record.rate
        } : record
      );
      setAllRecords(updatedRecords);
      setFilteredRecords(updatedRecords);
      setEditingId(null);
      setEditingData({ name: '', rate: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData({ name: '', rate: '' });
  };

  const handleDelete = (recordId) => {
    const updatedRecords = allRecords.filter(record => record.id !== recordId);
    setAllRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    setCurrentPage(1);
  };

  const inputContainerStyle = {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #9CA3AF',
    borderRight: '3px solid #DC2626'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '6px'
  };

  const inputStyle = {
    width: '100%',
    padding: '1px 1px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    outline: 'none',
    appearance: 'none',
    backgroundColor: 'white'
  };

  const dropdownStyle = {
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
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5e6e8' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '19px', marginTop: 0 }}>Material List</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '15px' }}>
              <div style={inputContainerStyle}>
                <label style={labelStyle}>Product Code</label>
                <input
                  type="text"
                  value={formData.productCode}
                  onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={inputContainerStyle}>
                <label style={labelStyle}>Product Name</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div ref={groupRef} style={{ ...inputContainerStyle, position: 'relative' }}>
                <label style={labelStyle}>Group</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={groupSearch}
                    onChange={(e) => {
                      setGroupSearch(e.target.value);
                      setIsGroupOpen(true);
                    }}
                    onFocus={() => setIsGroupOpen(true)}
                    placeholder="Type or select..."
                    style={{ ...inputStyle, cursor: 'text' }}
                  />
                  <ChevronDown
                    size={20}
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }}
                  />
                </div>
                {isGroupOpen && (
                  <div style={dropdownStyle}>
                    {filteredGroups.length > 0 ? (
                      filteredGroups.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFormData({ ...formData, group: option });
                            setGroupSearch(option);
                            setIsGroupOpen(false);
                          }}
                          onMouseEnter={() => setHoveredGroup(option)}
                          onMouseLeave={() => setHoveredGroup(null)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: hoveredGroup === option ? 'white' : '#374151',
                            backgroundColor: hoveredGroup === option ? '#A63128' : 'white',
                            borderBottom: index < filteredGroups.length - 1 ? '1px solid #E5E7EB' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div ref={unitRef} style={{ ...inputContainerStyle, position: 'relative' }}>
                <label style={labelStyle}>Unit</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={unitSearch}
                    onChange={(e) => {
                      setUnitSearch(e.target.value);
                      setIsUnitOpen(true);
                    }}
                    onFocus={() => setIsUnitOpen(true)}
                    placeholder="Type or select..."
                    style={{ ...inputStyle, cursor: 'text' }}
                  />
                  <ChevronDown
                    size={20}
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }}
                  />
                </div>
                {isUnitOpen && (
                  <div style={dropdownStyle}>
                    {filteredUnits.length > 0 ? (
                      filteredUnits.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFormData({ ...formData, unit: option });
                            setUnitSearch(option);
                            setIsUnitOpen(false);
                          }}
                          onMouseEnter={() => setHoveredUnit(option)}
                          onMouseLeave={() => setHoveredUnit(null)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: hoveredUnit === option ? 'white' : '#374151',
                            backgroundColor: hoveredUnit === option ? '#A63128' : 'white',
                            borderBottom: index < filteredUnits.length - 1 ? '1px solid #E5E7EB' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '15px' }}>
              <div style={inputContainerStyle}>
                <label style={labelStyle}>Selling Rate</label>
                <input
                  type="text"
                  value={formData.sellingRate}
                  onChange={(e) => setFormData({ ...formData, sellingRate: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={inputContainerStyle}>
                <label style={labelStyle}>Maximum Stock Quantity</label>
                <input
                  type="text"
                  value={formData.maxStock}
                  onChange={(e) => setFormData({ ...formData, maxStock: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={inputContainerStyle}>
                <label style={labelStyle}>Minimum Stock Quantity</label>
                <input
                  type="text"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={inputContainerStyle}>
                <label style={labelStyle}>GST %</label>
                <input
                  type="text"
                  value={formData.gst}
                  onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '15px' }}>
              <div style={inputContainerStyle}>
                <label style={labelStyle}>HSN Code</label>
                <input
                  type="text"
                  value={formData.hsnCode}
                  onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={inputContainerStyle}>
                <label style={labelStyle}>Re-Order Level</label>
                <input
                  type="text"
                  value={formData.reOrderLevel}
                  onChange={(e) => setFormData({ ...formData, reOrderLevel: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div></div>
            <div style={{ display: 'grid', justifyContent: 'flex-start', marginTop: '20px' }}>

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
            </div>

            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '19px', marginTop: 0 }}>Record List</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '15px' }}>
              <div style={inputContainerStyle}>
                <label style={labelStyle}>Search By</label>
                <input
                  type="text"
                  placeholder="Material List Name"
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div ref={groupnameRef} style={{ ...inputContainerStyle, position: 'relative' }}>
                <label style={labelStyle}>Group Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={groupnameSearch}
                    onChange={(e) => {
                      setGroupnameSearch(e.target.value);
                      setIsGroupnameOpen(true);
                    }}
                    onFocus={() => setIsGroupnameOpen(true)}
                    placeholder="Type or select..."
                    style={{ ...inputStyle, cursor: 'text' }}
                  />
                  <ChevronDown
                    size={20}
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }}
                  />
                </div>
                {isGroupnameOpen && (
                  <div style={dropdownStyle}>
                    {filteredGroupsname.length > 0 ? (
                      filteredGroupsname.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setGroupName(option);
                            setGroupnameSearch(option);
                            setIsGroupnameOpen(false);
                          }}
                          onMouseEnter={() => setHoveredGroupname(option)}
                          onMouseLeave={() => setHoveredGroupname(null)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: hoveredGroupname === option ? 'white' : '#374151',
                            backgroundColor: hoveredGroupname === option ? '#A63128' : 'white',
                            borderBottom: index < filteredGroupsname.length - 1 ? '1px solid #E5E7EB' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>
              
              <div style={{ display: 'grid', alignItems: 'end' }}></div>

             <div style={{ display: 'grid', justifyContent: 'flex-start', marginTop: '20px' }}>

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
            </div>

            <div style={{ border: '1px solid #9CA3AF', borderRadius: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2', borderBottom: '1px solid #9CA3AF' }}>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#000000', textTransform: 'uppercase', width: '50px' }}></th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '16px', fontWeight: 'bold', color: '#000000', textTransform: 'uppercase' }}>Material List Name</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '16px', fontWeight: 'bold', color: '#000000', textTransform: 'uppercase' }}>Selling Rate</th>
                    <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold', color: '#000000', textTransform: 'uppercase', width: '120px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length > 0 ? (
                  currentRecords.map((record, idx) => (


                      <tr
                        key={record.id}
                        style={{ borderTop: idx > 0 ? '1px solid #9CA3AF' : 'none', transition: 'background-color 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <td style={{ padding: '16px 24px' }}>
                          <button
                          onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}

                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                          >
                            {expandedRow === idx ?
                              <ChevronDown style={{ width: '16px', height: '16px' }} /> :
                              <ChevronRight style={{ width: '16px', height: '16px' }} />
                            }
                          </button>
                        </td>
                        <td style={{ padding: '8px 16px', fontSize: '11px', color: '#111827' }}>
                          {editingId === record.id ? (
                            <input
                              type="text"
                              value={editingData.name}
                              onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                              style={{
                                padding: '4px 8px',
                                border: '1px solid #9CA3AF',
                                borderRadius: '4px',
                                fontSize: '11px',
                                outline: 'none',
                                backgroundColor: 'white'
                              }}
                            />
                          ) : (
                            record.name
                          )}
                        </td>
                        <td style={{ padding: '8px 16px', fontSize: '11px', color: '#111827' }}>
                          {editingId === record.id ? (
                            <input
                              type="text"
                              value={editingData.rate}
                              onChange={(e) => setEditingData({ ...editingData, rate: e.target.value })}
                              placeholder="Enter amount"
                              style={{
                                padding: '4px 8px',
                                border: '1px solid #9CA3AF',
                                borderRadius: '4px',
                                fontSize: '11px',
                                outline: 'none',
                                backgroundColor: 'white',
                                width: '100px'
                              }}
                            />
                          ) : (
                            record.rate
                          )}
                        </td>
                        <td style={{ padding: '8px 16px', textAlign: 'center' }}>
                          {editingId === record.id ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                              <button
                                onClick={() => handleUpdate(record.id)}
                                style={{
                                  padding: '4px 12px',
                                  backgroundColor: '#A63128',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '11px',
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
                                  fontSize: '11px',
                                  cursor: 'pointer',
                                  fontWeight: '500'
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
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
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}
                      >
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
              cursor: 'pointer'
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
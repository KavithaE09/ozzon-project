
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function JobOrderStatus() {
  const navigate = useNavigate();
  const [jobOrderNo, setJobOrderNo] = useState('85127436');
  const [containerNo, setContainerNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedToSearch, setAssignedToSearch] = useState('');
  const [remark, setRemark] = useState('');
  const [showContainerDropdown, setShowContainerDropdown] = useState(false);
  const [showAssignedToDropdown, setShowAssignedToDropdown] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeTab, setActiveTab] = useState('material');
  const [hoveredContainer, setHoveredContainer] = useState(null);
  const [hoveredAssignedTo, setHoveredAssignedTo] = useState(null);
  const [currentPageJobReview, setCurrentPageJobReview] = useState(1);
  const [currentPageMaterial, setCurrentPageMaterial] = useState(1);
  const [isSearched, setIsSearched] = useState(false);
  const rowsPerPage = 5;

  const containerRef = useRef(null);
  const assignedToRef = useRef(null);
  const remarkRef = useRef(null);

  const containerOptions = ['85127436', '85127437', '85127438'];
  const assignedToOptions = ['Unit', 'Pending', 'Completed', 'In Progress'];

  const jobReviewData = [
    { id: 1, slNo: 1, jobOrderNo: 'TCKU 1524662', jobDate: '20-01-25', customerName: 'Raneesh', salesPerson: 'Ramesh', narration: 'Ramesh', status: 'Unit', remark: 'Unit' },
    { id: 2, slNo: 2, jobOrderNo: 'TCKU 1524662', jobDate: '20-01-25', customerName: 'Raneesh', salesPerson: 'Ramesh', narration: 'Ramesh', status: 'Unit', remark: 'Unit' },
    { id: 3, slNo: 3, jobOrderNo: 'TCKU 1524663', jobDate: '21-01-25', customerName: 'Bala', salesPerson: 'Suresh', narration: 'Suresh', status: 'Pending', remark: 'Pending' },
    { id: 4, slNo: 4, jobOrderNo: 'TCKU 1524664', jobDate: '22-01-25', customerName: 'Naveen', salesPerson: 'Kumar', narration: 'Kumar', status: 'Completed', remark: 'Done' },
    { id: 5, slNo: 5, jobOrderNo: 'TCKU 1524665', jobDate: '23-01-25', customerName: 'Raja', salesPerson: 'Vijay', narration: 'Vijay', status: 'In Progress', remark: 'Working' },
    { id: 6, slNo: 6, jobOrderNo: 'TCKU 1524666', jobDate: '24-01-25', customerName: 'Kumar', salesPerson: 'Anand', narration: 'Anand', status: 'Unit', remark: 'Unit' },
    { id: 7, slNo: 7, jobOrderNo: 'TCKU 1524667', jobDate: '25-01-25', customerName: 'Senthil', salesPerson: 'Prakash', narration: 'Prakash', status: 'Pending', remark: 'Review' }
  ];

  const [materialRows, setMaterialRows] = useState([
    { id: 1, slNo: 1, code: '101', product: 'TCKU 1524662', unit: 'Number', qty: 2, rate: 1000, amount: 2000 },
    { id: 2, slNo: 2, code: 'Code', product: 'Product', unit: 'Unit', qty: 2, rate: 10000, amount: 100000 },
    { id: 3, slNo: 3, code: '102', product: 'TCKU 1524663', unit: 'Piece', qty: 5, rate: 500, amount: 2500 },
    { id: 4, slNo: 4, code: '103', product: 'Product A', unit: 'Kg', qty: 10, rate: 200, amount: 2000 },
    { id: 5, slNo: 5, code: '104', product: 'Product B', unit: 'Liter', qty: 3, rate: 1500, amount: 4500 },
    { id: 6, slNo: 6, code: '105', product: 'TCKU 1524664', unit: 'Box', qty: 8, rate: 750, amount: 6000 },
    { id: 7, slNo: 7, code: '106', product: 'Product C', unit: 'Number', qty: 12, rate: 300, amount: 3600 }
  ]);

  const [filteredData, setFilteredData] = useState(jobReviewData);
  const [editingRow, setEditingRow] = useState(null);
  const [showProductDropdown, setShowProductDropdown] = useState(null);
  const [showUnitDropdown, setShowUnitDropdown] = useState(null);

  const productOptions = ['TCKU 1524662', 'TCKU 1524663', 'TCKU 1524664', 'Product A', 'Product B'];
  const unitOptions = ['Number', 'Piece', 'Kg', 'Liter', 'Box'];

  // Pagination for Job Review Table
  const indexOfLastJobReview = currentPageJobReview * rowsPerPage;
  const indexOfFirstJobReview = indexOfLastJobReview - rowsPerPage;
  const paginatedJobReview = filteredData.slice(indexOfFirstJobReview, indexOfLastJobReview);
  const totalPagesJobReview = Math.ceil(filteredData.length / rowsPerPage);

  // Pagination for Material Table
  const indexOfLastMaterial = currentPageMaterial * rowsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - rowsPerPage;
  const paginatedMaterialRows = materialRows.slice(indexOfFirstMaterial, indexOfLastMaterial);
  const totalPagesMaterial = Math.ceil(materialRows.length / rowsPerPage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowContainerDropdown(false);
      }
      if (assignedToRef.current && !assignedToRef.current.contains(event.target)) {
        setShowAssignedToDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (remarkRef.current) {
      remarkRef.current.style.height = 'auto';
      remarkRef.current.style.height = remarkRef.current.scrollHeight + 'px';
    }
  }, [remark]);

  const stopEditing = () => {
    setEditingRow(null);
    setShowProductDropdown(null);
    setShowUnitDropdown(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      stopEditing();
    }
  };

  const handleDropdownKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
   }
  };

  const handleAddRowAfter = (index) => {
    const actualIndex = indexOfFirstMaterial + index;
    const newRow = {
      id: Date.now(),
      slNo: materialRows.length + 1,
      code: '',
      product: '',
      unit: '',
      qty: 0,
      rate: 0,
      amount: 0
    };
    const newRows = [...materialRows];
    newRows.splice(actualIndex + 1, 0, newRow);
    newRows.forEach((row, idx) => { row.slNo = idx + 1; });
    setMaterialRows(newRows);
 };

  const handleEdit = (index) => {
    const actualIndex = indexOfFirstMaterial + index;
    setEditingRow(materialRows[actualIndex].id);
  };

  const handleDelete = (index) => {
    const actualIndex = indexOfFirstMaterial + index;
    const newRows = materialRows.filter((_, idx) => idx !== actualIndex);
    newRows.forEach((row, idx) => { row.slNo = idx + 1; });
    setMaterialRows(newRows);
};

  const handleFieldChange = (id, field, value) => {
    const newRows = materialRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    );
    if (field === 'qty' || field === 'rate') {
      const updatedRow = newRows.find(r => r.id === id);
      updatedRow.amount = (updatedRow.qty || 0) * (updatedRow.rate || 0);
    }
    setMaterialRows(newRows);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(row => row.id));
    }
  };

  const handleSearch = () => {
    let results = [...jobReviewData];

    if (customerName) {
      results = results.filter(
        item => item.customerName.toLowerCase().includes(customerName.toLowerCase())
      );
    }

    setFilteredData(results);
    setCurrentPageJobReview(1);
  };

  const calculateTotalAmount = () => {
    return materialRows.reduce((sum, row) => sum + (row.amount || 0), 0);
  };
 
  const handleSubmit = () => {
    alert('Form submitted!');
  };

  const filteredContainers = containerOptions.filter(opt => 
    opt.toLowerCase().includes(containerNo.toLowerCase())
  );

  const filteredAssignedTo = assignedToOptions.filter(opt => 
    opt.toLowerCase().includes(assignedToSearch.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '24px', backgroundColor: '#f9e6e8' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '32px', maxWidth: '1400px', margin: '0 auto', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>Job Order Status Update</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 200px', gap: '16px', marginBottom: '24px', alignItems: 'end' }}>
            <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #2c1eed' }}>
              <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Job Order No</label>
              <input
                type="text"
                value={jobOrderNo}
                onChange={(e) => setJobOrderNo(e.target.value)}
                style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div 
              ref={containerRef}
              style={{ backgroundColor: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', position: 'relative' }}
            >
              <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Container No</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={containerNo}
                  onChange={(e) => {
                    setContainerNo(e.target.value);
                    setShowContainerDropdown(true);
                  }}
                  onFocus={() => setShowContainerDropdown(true)}
                  placeholder="Type or select..."
                  style={{ 
                    width: '100%', 
                    padding: '1px 1px', 
                    border: 'none', 
                    borderRadius: '4px', 
                    fontSize: '14px', 
                    outline: 'none',
                    backgroundColor: 'white',
                    cursor: 'text'
                  }}
                />
                <ChevronDown 
                  size={20} 
                  style={{ 
                    position: 'absolute', 
                    right: '4px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#000000',
                    pointerEvents: 'none'
                  }} 
                />
              </div>
              {showContainerDropdown && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', marginTop: '4px', zIndex: 1000, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  {filteredContainers.length > 0 ? (
                    filteredContainers.map((option, idx) => (
                      <div
                        key={idx}
                        onClick={() => { 
                          setContainerNo(option);
                          setShowContainerDropdown(false);
                        }}
                        onMouseEnter={() => setHoveredContainer(option)}
                        onMouseLeave={() => setHoveredContainer(null)}
                        style={{ 
                          padding: '8px 12px', 
                          cursor: 'pointer', 
                          fontSize: '13px', 
                          backgroundColor: hoveredContainer === option ? '#A63128' : 'white',
                          color: hoveredContainer === option ? 'white' : '#374151'
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

            <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #22C55E' }}>
              <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>Job Review List</h3>
            <div style={{ border: '1px solid #9CA3AF', borderRadius: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #9CA3AF' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                        onChange={toggleSelectAll}
                        style={{ cursor: 'pointer', width: '16px', height: '16px' }} 
                      />
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #9CA3AF' }}>S/No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #9CA3AF' }}>Job Order No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #9CA3AF' }}>Job Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #9CA3AF' }}>Customer Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #9CA3AF' }}>Sales Person</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #9CA3AF' }}>Narration</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #9CA3AF' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #9CA3AF' }}>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobReview.map((row, index) => (
                    <tr key={row.id} style={{ backgroundColor: 'white', borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleRowSelection(row.id)}
                          style={{ cursor: 'pointer', width: '16px', height: '16px' }} 
                        />
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.slNo}.</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{row.jobOrderNo}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{row.jobDate}</td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.customerName}</td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.salesPerson}</td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.narration}</td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.status}</td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredData.length > rowsPerPage && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '24px' }}>
              <button
                disabled={currentPageJobReview === 1}
                onClick={() => setCurrentPageJobReview(prev => prev - 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: currentPageJobReview === 1 ? '#e5e7eb' : '#ffffff',
                  cursor: currentPageJobReview === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPagesJobReview }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPageJobReview(page)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    backgroundColor: currentPageJobReview === page ? '#A63128' : '#ffffff',
                    color: currentPageJobReview === page ? '#ffffff' : '#000000',
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPageJobReview === totalPagesJobReview}
                onClick={() => setCurrentPageJobReview(prev => prev + 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: currentPageJobReview === totalPagesJobReview ? '#e5e7eb' : '#ffffff',
                  cursor: currentPageJobReview === totalPagesJobReview ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px', marginBottom: '24px' }}>
            <div 
              ref={assignedToRef}
              style={{ backgroundColor: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', position: 'relative' }}
            >
              <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Assigned To</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={assignedToSearch}
                  onChange={(e) => {
                    setAssignedToSearch(e.target.value);
                    setShowAssignedToDropdown(true);
                  }}
                  onFocus={() => setShowAssignedToDropdown(true)}
                  placeholder="Type or select..."
                  style={{ 
                    width: '100%', 
                    padding: '1px', 
                    border: 'none', 
                    borderRadius: '4px', 
                    fontSize: '14px', 
                    outline: 'none',
                    backgroundColor: 'white',
                    cursor: 'text'
                  }}
                />
                <ChevronDown 
                  size={20} 
                  style={{ 
                    position: 'absolute', 
                    right: '4px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#000000',
                    pointerEvents: 'none'
                  }} 
                />
              </div>
              {showAssignedToDropdown && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', marginTop: '4px', zIndex: 1000, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxHeight: '200px', overflowY: 'auto' }}>
                  {filteredAssignedTo.length > 0 ? (
                    filteredAssignedTo.map((option, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setAssignedToSearch(option);
                          setAssignedTo(option);
                          setShowAssignedToDropdown(false);
                          setHoveredAssignedTo(null);
                        }}
                        onMouseEnter={() => setHoveredAssignedTo(option)}
                        onMouseLeave={() => setHoveredAssignedTo(null)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: hoveredAssignedTo === option ? 'white' : '#374151',
                          backgroundColor: hoveredAssignedTo === option ? '#A63128' : (assignedToSearch === option ? '#FEE2E2' : 'white'),
                          borderBottom: idx < filteredAssignedTo.length - 1 ? '1px solid #E5E7EB' : 'none',
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

            <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', minHeight: '60px' }}>
              <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Remark</label>
              <textarea
                ref={remarkRef}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                rows={1}
                style={{ 
                  width: '100%', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontSize: '13px', 
                  outline: 'none', 
                  resize: 'none',
                  overflow: 'hidden',
                  fontFamily: 'inherit',
                  lineHeight: '1.5',
                  minHeight: '20px'
                }}
                placeholder="Enter remarks here..."
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
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

            {/* Tabs */}
            <div style={{ marginBottom: '24px', border: '1px solid  #9CA3AF', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
              <button 
                onClick={() => setActiveTab('material')}
                style={{ flex: 1, padding: '14px 24px', border: 'none', borderRight: '1px solid  #9CA3AF', backgroundColor: activeTab === 'material' ? '#f9fafb' : 'white', color: '#374151', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                Material List
              </button>
              <button 
                onClick={() => setActiveTab('previous')}
                style={{ flex: 1, padding: '14px 24px', border: 'none', backgroundColor: activeTab === 'previous' ? '#f9fafb' : 'white', color: '#374151', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                Previous Material Issue List
              </button>
            </div>

            {/* Material Table */}
            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'separate', borderSpacing: 0, border: '1px solid  #9CA3AF', borderRadius: '6px' }}>
                <thead>
                   <tr style={{ backgroundColor: '#fde2e2' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid  #9CA3AF' }}>S/No</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid  #9CA3AF' }}>Code</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid  #9CA3AF' }}>Product</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid  #9CA3AF' }}>Unit</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid  #9CA3AF' }}>Qty</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid  #9CA3AF' }}>Rate</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid  #9CA3AF' }}>Amount</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600', color: '#374151', borderBottom: '1px solid  #9CA3AF' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMaterialRows.map((row, index) => (
                    <tr key={row.id} style={{ backgroundColor: 'white' }}>
                      <td style={{ padding: '14px 16px', color: '#374151', borderBottom: index === materialRows.length - 1 ? 'none' : '1px solid #f3f4f6' }}>{row.slNo}.</td>
                      <td style={{ padding: '14px 16px', color: '#374151', borderBottom: index === materialRows.length - 1 ? 'none' : '1px solid #f3f4f6' }}>
                        {editingRow === row.id ? (
                          <input
                            type="text"
                            value={row.code}
                            onChange={(e) => handleFieldChange(row.id, 'code', e.target.value)}
                            onBlur={stopEditing}
                            onKeyDown={handleKeyDown}
                            style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          />
                        ) : (
                          <span>{row.code}</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', borderBottom: index === materialRows.length - 1 ? 'none' : '1px solid #f3f4f6', position: 'relative' }}>
                        {editingRow === row.id ? (
                          <div>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowProductDropdown(showProductDropdown === row.id ? null : row.id);
                              }}
                              onKeyDown={handleDropdownKeyDown}
                              tabIndex={0}
                              style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}
                            >
                              <span>{row.product}</span>
                              <ChevronDown size={16} style={{ color: '#6b7280' }} />
                            </div>
                            {showProductDropdown === row.id && (
                              <div 
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    stopEditing();
                                  }
                                }}
                                style={{ position: 'absolute', top: '100%', left: '14px', right: '14px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', marginTop: '4px', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxHeight: '200px', overflowY: 'auto' }}>
                                {productOptions.map((option, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => {
                                      handleFieldChange(row.id, 'product', option);
                                      setShowProductDropdown(null);
                                      stopEditing();
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleFieldChange(row.id, 'product', option);
                                        stopEditing();
                                      }
                                    }}
                                    tabIndex={0}
                                    style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '13px', outline: 'none' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span>{row.product}</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', borderBottom: index === materialRows.length - 1 ? 'none' : '1px solid #f3f4f6', position: 'relative' }}>
                        {editingRow === row.id ? (
                          <div>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowUnitDropdown(showUnitDropdown === row.id ? null : row.id);
                              }}
                              onKeyDown={handleDropdownKeyDown}
                              tabIndex={0}
                              style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}
                            >
                              <span>{row.unit}</span>
                              <ChevronDown size={16} style={{ color: '#6b7280' }} />
                            </div>
                            {showUnitDropdown === row.id && (
                              <div 
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    stopEditing();
                                  }
                                }}
                                style={{ position: 'absolute', top: '100%', left: '14px', right: '14px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', marginTop: '4px', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                {unitOptions.map((option, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => {
                                      handleFieldChange(row.id, 'unit', option);
                                      setShowUnitDropdown(null);
                                      stopEditing();
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleFieldChange(row.id, 'unit', option);
                                        stopEditing();
                                      }
                                    }}
                                    tabIndex={0}
                                    style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '13px', outline: 'none' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span>{row.unit}</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', borderBottom: index === materialRows.length - 1 ? 'none' : '1px solid #f3f4f6' }}>
                        {editingRow === row.id ? (
                          <input
                            type="number"
                            value={row.qty}
                            onChange={(e) => handleFieldChange(row.id, 'qty', parseFloat(e.target.value) || 0)}
                            onBlur={stopEditing}
                            onKeyDown={handleKeyDown}
                            style={{ width: '80px', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          />
                        ) : (
                          <span>{row.qty}</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', borderBottom: index === materialRows.length - 1 ? 'none' : '1px solid #f3f4f6' }}>
                        {editingRow === row.id ? (
                          <input
                            type="number"
                            value={row.rate}
                            onChange={(e) => handleFieldChange(row.id, 'rate', parseFloat(e.target.value) || 0)}
                            onBlur={stopEditing}
                            onKeyDown={handleKeyDown}
                            style={{ width: '100px', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          />
                        ) : (
                          <span>₹ {row.rate.toFixed(2)}</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', borderBottom: index === materialRows.length - 1 ? 'none' : '1px solid #f3f4f6' }}>
                        {editingRow === row.id ? (
                          <input
                            type="number"
                            value={row.amount}
                            onChange={(e) => handleFieldChange(row.id, 'amount', parseFloat(e.target.value) || 0)}
                            onBlur={stopEditing}
                            onKeyDown={handleKeyDown}
                            style={{ width: '100px', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          />
                        ) : (
                          <span>₹ {row.amount.toFixed(2)}</span>
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', borderBottom: index === materialRows.length - 1 ? 'none' : '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', position: 'relative' }}>
                              <button
                                onClick={() => handleAddRowAfter(index)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                title="Insert Row"
                              >
                                <Plus size={18} style={{ color: '#000000' }} />
                              </button>
                              
                              <button
                                onClick={() => handleEdit(index)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                title="Edit"
                              >
                                <Edit2 size={18} style={{ color: '#374151' }} />
                              </button>
                              
                              <button
                                onClick={() => handleDelete(index)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                title="Delete"
                              >
                                <Trash2 size={18} style={{ color: '#dc2626' }} />
                              </button>
                            </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
         {materialRows.length > rowsPerPage && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '24px' }}>
              <button
                disabled={currentPageMaterial === 1}
                onClick={() => setCurrentPageMaterial(prev => prev - 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: currentPageMaterial === 1 ? '#e5e7eb' : '#ffffff',
                  cursor: currentPageMaterial === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPagesMaterial }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPageMaterial(page)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    backgroundColor: currentPageMaterial === page ? '#A63128' : '#ffffff',
                    color: currentPageMaterial === page ? '#ffffff' : '#000000',
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPageMaterial === totalPagesMaterial}
                onClick={() => setCurrentPageMaterial(prev => prev + 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: currentPageMaterial === totalPagesMaterial ? '#e5e7eb' : '#ffffff',
                  cursor: currentPageMaterial === totalPagesMaterial ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '13px',color: '#374151' }}>Total Amount</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>₹ {calculateTotalAmount().toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
              <span>←</span>
              <span>Back</span>
            </button>
        </div>
        </div>
  );
}
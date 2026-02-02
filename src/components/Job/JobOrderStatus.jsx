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

  const indexOfLastJobReview = currentPageJobReview * rowsPerPage;
  const indexOfFirstJobReview = indexOfLastJobReview - rowsPerPage;
  const paginatedJobReview = filteredData.slice(indexOfFirstJobReview, indexOfLastJobReview);
  const totalPagesJobReview = Math.ceil(filteredData.length / rowsPerPage);

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
    <div className="page-container">
      <div className="main-section bg-[#f9e6e8]">
        <div className="content-card">
          <h2 className="page-title">Job Order Status Update</h2>

          <div className="grid grid-cols-4 gap-4 mb-6 items-end">
            <div className="filter-grid-blue">
              <label className="filter-label">Job Order No</label>
              <input
                type="text"
                value={jobOrderNo}
                onChange={(e) => setJobOrderNo(e.target.value)}
                className="filter-input"
              />
            </div>

            <div ref={containerRef} className="filter-grid-red">
              <label className="filter-label">Container No</label>
              <div className="dropdown-wrapper">
                <input
                  type="text"
                  value={containerNo}
                  onChange={(e) => {
                    setContainerNo(e.target.value);
                    setShowContainerDropdown(true);
                  }}
                  onFocus={() => setShowContainerDropdown(true)}
                  placeholder="Type or select..."
                  className="dropdown-input"
                />
                <ChevronDown size={20} className="dropdown-icon" />
              </div>
              {showContainerDropdown && (
                <div className="dropdown-menu">
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
                        className={`dropdown-item-option ${
                          hoveredContainer === option 
                            ? 'bg-[#A63128] text-white' 
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

            <div className="filter-grid-green">
              <label className="filter-label">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="flex justify-end">
              <button onClick={handleSearch} className="btn-search">
                <Search size={18} /> Search
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="section-title">Job Review List</h3>
            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-th">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                        onChange={toggleSelectAll}
                        className="cursor-pointer w-4 h-4 accent-primary" 
                      />
                    </th>
                    <th className="table-th">S/No</th>
                    <th className="table-th">Job Order No</th>
                    <th className="table-th">Job Date</th>
                    <th className="table-th">Customer Name</th>
                    <th className="table-th">Sales Person</th>
                    <th className="table-th">Narration</th>
                    <th className="table-th">Status</th>
                    <th className="table-th">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobReview.map((row, index) => (
                    <tr key={row.id} className="table-row">
                      <td className="table-cell">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleRowSelection(row.id)}
                          className="cursor-pointer w-4 h-4 accent-primary" 
                        />
                      </td>
                      <td className="table-cell text-gray-500">{row.slNo}.</td>
                      <td className="table-cell">{row.jobOrderNo}</td>
                      <td className="table-cell">{row.jobDate}</td>
                      <td className="table-cell text-gray-500">{row.customerName}</td>
                      <td className="table-cell text-gray-500">{row.salesPerson}</td>
                      <td className="table-cell text-gray-500">{row.narration}</td>
                      <td className="table-cell text-gray-500">{row.status}</td>
                      <td className="table-cell text-gray-500">{row.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredData.length > rowsPerPage && (
            <div className="pagination-container">
              <button
                disabled={currentPageJobReview === 1}
                onClick={() => setCurrentPageJobReview(prev => prev - 1)}
                className={`pagination-btn ${
                  currentPageJobReview === 1 
                    ? 'pagination-btn-disabled' 
                    : 'pagination-btn-active'
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPagesJobReview }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPageJobReview(page)}
                  className={`pagination-page-btn ${
                    currentPageJobReview === page 
                      ? 'pagination-page-active' 
                      : 'pagination-page-inactive'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPageJobReview === totalPagesJobReview}
                onClick={() => setCurrentPageJobReview(prev => prev + 1)}
                className={`pagination-btn ${
                  currentPageJobReview === totalPagesJobReview 
                    ? 'pagination-btn-disabled' 
                    : 'pagination-btn-active'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-[200px_1fr] gap-4 mb-6">
            <div ref={assignedToRef} className="filter-grid-red">
              <label className="filter-label">Assigned To</label>
              <div className="dropdown-wrapper">
                <input
                  type="text"
                  value={assignedToSearch}
                  onChange={(e) => {
                    setAssignedToSearch(e.target.value);
                    setShowAssignedToDropdown(true);
                  }}
                  onFocus={() => setShowAssignedToDropdown(true)}
                  placeholder="Type or select..."
                  className="dropdown-input"
                />
                <ChevronDown size={20} className="dropdown-icon" />
              </div>
              {showAssignedToDropdown && (
                <div className="dropdown-menu">
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
                        className={`dropdown-item-option transition-all ${
                          hoveredAssignedTo === option 
                            ? 'dropdown-item-hovered' 
                            : assignedToSearch === option 
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

            <div className="filter-grid-red min-h-[60px]">
              <label className="filter-label">Remark</label>
              <textarea
                ref={remarkRef}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                rows={1}
                className="multiline-field"
                placeholder="Enter remarks here..."
              />
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <button onClick={handleSubmit} className="btn-search">
              <span>✓</span>
              <span>Submit</span>
            </button>
          </div>

          <div className="tabs-container">
            <button 
              onClick={() => setActiveTab('material')}
              className={`tab-button ${activeTab === 'material' ? 'tab-button-active' : ''}`}
            >
              Material List
            </button>
            <button 
              onClick={() => setActiveTab('previous')}
              className={`tab-button ${activeTab === 'previous' ? 'tab-button-active' : ''}`}
            >
              Previous Material Issue List
            </button>
          </div>

          <div className="table-container mb-5">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">S/No</th>
                  <th className="table-th">Code</th>
                  <th className="table-th">Product</th>
                  <th className="table-th">Unit</th>
                  <th className="table-th">Qty</th>
                  <th className="table-th">Rate</th>
                  <th className="table-th">Amount</th>
                  <th className="table-th-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMaterialRows.map((row, index) => (
                  <tr key={row.id} className="table-row">
                    <td className="table-cell">{row.slNo}.</td>
                    <td className="table-cell">
                      {editingRow === row.id ? (
                        <input
                          type="text"
                          value={row.code}
                          onChange={(e) => handleFieldChange(row.id, 'code', e.target.value)}
                          onBlur={stopEditing}
                          onKeyDown={handleKeyDown}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>{row.code}</span>
                      )}
                    </td>
                    <td className="table-cell relative">
                      {editingRow === row.id ? (
                        <div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowProductDropdown(showProductDropdown === row.id ? null : row.id);
                            }}
                            onKeyDown={handleDropdownKeyDown}
                            tabIndex={0}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm cursor-pointer flex justify-between items-center bg-white"
                          >
                            <span>{row.product}</span>
                            <ChevronDown size={16} className="text-gray-500" />
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
                              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-[200px] overflow-y-auto"
                            >
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
                                  className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-100"
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
                    <td className="table-cell relative">
                      {editingRow === row.id ? (
                        <div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowUnitDropdown(showUnitDropdown === row.id ? null : row.id);
                            }}
                            onKeyDown={handleDropdownKeyDown}
                            tabIndex={0}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm cursor-pointer flex justify-between items-center bg-white"
                          >
                            <span>{row.unit}</span>
                            <ChevronDown size={16} className="text-gray-500" />
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
                              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10"
                            >
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
                                  className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-100"
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
                    <td className="table-cell">
                      {editingRow === row.id ? (
                        <input
                          type="number"
                          value={row.qty}
                          onChange={(e) => handleFieldChange(row.id, 'qty', parseFloat(e.target.value) || 0)}
                          onBlur={stopEditing}
                          onKeyDown={handleKeyDown}
                          className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>{row.qty}</span>
                      )}
                    </td>
                    <td className="table-cell">
                      {editingRow === row.id ? (
                        <input
                          type="number"
                          value={row.rate}
                          onChange={(e) => handleFieldChange(row.id, 'rate', parseFloat(e.target.value) || 0)}
                          onBlur={stopEditing}
                          onKeyDown={handleKeyDown}
                          className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>₹ {row.rate.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="table-cell">
                      {editingRow === row.id ? (
                        <input
                          type="number"
                          value={row.amount}
                          onChange={(e) => handleFieldChange(row.id, 'amount', parseFloat(e.target.value) || 0)}
                          onBlur={stopEditing}
                          onKeyDown={handleKeyDown}
                          className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>₹ {row.amount.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="table-cell-center">
                      <div className="table-actions">
                        <button
                          onClick={() => handleAddRowAfter(index)}
                          className="btn-action"
                          title="Insert Row"
                        >
                          <Plus size={18}   style={{ color: '#0b9715', cursor: 'pointer' }} />
                        </button>
                        
                        <button
                          onClick={() => handleEdit(index)}
                          className="btn-action"
                          title="Edit"
                        >
                          <Edit2 size={18}  />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(index)}
                          className="btn-action"
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            
          {materialRows.length > rowsPerPage && (
            <div className="pagination-container">
              <button
                disabled={currentPageMaterial === 1}
                onClick={() => setCurrentPageMaterial(prev => prev - 1)}
                className={`pagination-btn ${
                  currentPageMaterial === 1 
                    ? 'pagination-btn-disabled' 
                    : 'pagination-btn-active'
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPagesMaterial }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPageMaterial(page)}
                  className={`pagination-page-btn ${
                    currentPageMaterial === page 
                      ? 'pagination-page-active' 
                      : 'pagination-page-inactive'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPageMaterial === totalPagesMaterial}
                onClick={() => setCurrentPageMaterial(prev => prev + 1)}
                className={`pagination-btn ${
                  currentPageMaterial === totalPagesMaterial 
                    ? 'pagination-btn-disabled' 
                    : 'pagination-btn-active'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <div className="flex justify-end">
            <div className="bg-gray-50 border border-gray-200 rounded-md px-6 py-3 flex items-center gap-4">
              <span className="text-sm text-gray-700">Total Amount</span>
              <span className="text-sm font-semibold text-gray-900">₹ {calculateTotalAmount().toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <button onClick={() => navigate(-1)} className="btn-back">
          <span>←</span>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
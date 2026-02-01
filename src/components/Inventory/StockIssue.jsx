import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StockIssue() {
  const navigate = useNavigate();
  
  // Tab state
  const [activeTab, setActiveTab] = React.useState('material');
  
  // Auto-populate today's date
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [issueDate, setIssueDate] = React.useState(getTodayDate());
  const [giver, setGiver] = React.useState('Sofi & Co');
  const [issueReturnNo, setIssueReturnNo] = React.useState('88447755127436');
  const [customerName, setCustomerName] = React.useState('Roneesh');
  const [remarks, setRemarks] = React.useState('Nathan');
  const [jobOrderNo, setJobOrderNo] = React.useState('');
  const [containerNo, setContainerNo] = React.useState('85127436');
  const [selectedJobRow, setSelectedJobRow] = React.useState(1);
  const [showGiverDropdown, setShowGiverDropdown] = React.useState(false);
  const [showContainerDropdown, setShowContainerDropdown] = React.useState(false);
  const [giverSearch, setGiverSearch] = React.useState('');
  const [containerSearch, setContainerSearch] = React.useState('');

  const [hoveredGiverOption, setHoveredGiverOption] = React.useState(null);
  const [hoveredContainerOption, setHoveredContainerOption] = React.useState(null);
  const [hoveredProductOption, setHoveredProductOption] = React.useState(null);
  const [hoveredUnitOption, setHoveredUnitOption] = React.useState(null);
  
  const giverOptions = ['Sofi & Co', 'ABC Corp', 'XYZ Ltd'];
  const containerOptions = ['85127436', '85127437', '85127438'];
  
  const allJobReviewData = [
    { slNo: 1, jobOrderNo: 'TCKU 1524662', jobDate: '20-01-25', customerName: 'Raneesh', salesPerson: 'Ramesh', narration: 'Ramesh' },
    { slNo: 2, jobOrderNo: 'TCKU 1524663', jobDate: '21-01-25', customerName: 'Raneesh', salesPerson: 'Ramesh', narration: 'Ramesh' },
    { slNo: 3, jobOrderNo: 'ABCD 1234567', jobDate: '22-01-25', customerName: 'Kumar', salesPerson: 'Suresh', narration: 'Suresh' },
    { slNo: 4, jobOrderNo: 'TCKU 1524664', jobDate: '23-01-25', customerName: 'Raja', salesPerson: 'Ramesh', narration: 'Ramesh' }
  ];

  const [jobReviewPage, setJobReviewPage] = React.useState(1);
  const jobReviewPerPage = 2;

  const filteredJobReviewData = React.useMemo(() => {
    if (!jobOrderNo.trim()) return allJobReviewData;
    return allJobReviewData.filter(job => 
      job.jobOrderNo.toLowerCase().includes(jobOrderNo.toLowerCase())
    );
  }, [jobOrderNo]);

  const paginatedJobReviewData = React.useMemo(() => {
    const start = (jobReviewPage - 1) * jobReviewPerPage;
    const end = start + jobReviewPerPage;
    return filteredJobReviewData.slice(start, end);
  }, [filteredJobReviewData, jobReviewPage]);

  const jobReviewTotalPages = Math.ceil(filteredJobReviewData.length / jobReviewPerPage);

  const [materialRows, setMaterialRows] = React.useState([
    { id: 1, slNo: 1, code: '101', product: 'TCKU 1524662', unit: 'Number', qty: 2, rate: 1000, amount: 2000 },
    { id: 2, slNo: 2, code: 'Code', product: 'Product', unit: 'Unit', qty: 2, rate: 10000, amount: 100000 },
    { id: 3, slNo: 3, code: '102', product: 'Product A', unit: 'Piece', qty: 5, rate: 500, amount: 2500 },
    { id: 4, slNo: 4, code: '103', product: 'Product B', unit: 'Box', qty: 10, rate: 200, amount: 2000 }
  ]);

  const [materialPage, setMaterialPage] = React.useState(1);
  const materialPerPage = 2;

  const paginatedMaterialRows = React.useMemo(() => {
    const start = (materialPage - 1) * materialPerPage;
    const end = start + materialPerPage;
    return materialRows.slice(start, end);
  }, [materialRows, materialPage]);

  const materialTotalPages = Math.ceil(materialRows.length / materialPerPage);

  const [editingRow, setEditingRow] = React.useState(null);
  const [showProductDropdown, setShowProductDropdown] = React.useState(null);
  const [showUnitDropdown, setShowUnitDropdown] = React.useState(null);
  const [productSearches, setProductSearches] = React.useState({});
  const [unitSearches, setUnitSearches] = React.useState({});
  
  const productOptions = ['TCKU 1524662', 'Product', 'Product A', 'Product B', 'Product C', 'Widget X', 'Widget Y'];
  const unitOptions = ['Number', 'Unit', 'Piece', 'Box', 'Kg', 'Liter', 'Meter'];

  // Refs for dropdown containers
  const productDropdownRefs = useRef({});
  const unitDropdownRefs = useRef({});

  // Previous data (sample)
  const previousData = [
    { slNo: 1, issueNo: 'ISS001', issueDate: '15-01-25', receiver: 'Sofi & Co', customer: 'Roneesh', totalAmount: 106500 },
    { slNo: 2, issueNo: 'ISS002', issueDate: '16-01-25', receiver: 'ABC Corp', customer: 'Kumar', totalAmount: 50000 },
    { slNo: 3, issueNo: 'ISS003', issueDate: '17-01-25', receiver: 'XYZ Ltd', customer: 'Raja', totalAmount: 75000 },
    { slNo: 4, issueNo: 'ISS004', issueDate: '18-01-25', receiver: 'Sofi & Co', customer: 'Raneesh', totalAmount: 120000 }
  ];

  const [previousPage, setPreviousPage] = React.useState(1);
  const previousPerPage = 3;

  const paginatedPreviousData = React.useMemo(() => {
    const start = (previousPage - 1) * previousPerPage;
    const end = start + previousPerPage;
    return previousData.slice(start, end);
  }, [previousPage]);

  const previousTotalPages = Math.ceil(previousData.length / previousPerPage);

  const filteredGiverOptions = giverOptions.filter(opt => 
    opt.toLowerCase().includes(giverSearch.toLowerCase())
  );

  const filteredContainerOptions = containerOptions.filter(opt => 
    opt.toLowerCase().startsWith(containerSearch.toLowerCase())
  );

  const getFilteredProductOptions = (rowId) => {
    const search = productSearches[rowId] || '';
    return productOptions.filter(opt => 
      opt.toLowerCase().includes(search.toLowerCase())
    );
  };

  const getFilteredUnitOptions = (rowId) => {
    const search = unitSearches[rowId] || '';
    return unitOptions.filter(opt => 
      opt.toLowerCase().includes(search.toLowerCase())
    );
  };

  const stopEditing = () => {
    setShowProductDropdown(null);
    setShowUnitDropdown(null);
    setProductSearches({});
    setUnitSearches({});
    setEditingRow(null);
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      slNo: materialRows.length + 1,
      code: 'Code',
      product: 'Product',
      unit: 'Unit',
      qty: 0,
      rate: 0,
      amount: 0
    };
    setMaterialRows([newRow, ...materialRows]);
    const totalPages = Math.ceil((materialRows.length + 1) / materialPerPage);
    setMaterialPage(1);
  };

  const handleAddRowAbove = (index) => {
    const newRow = {
      id: Date.now(),
      slNo: materialRows.length + 1,
      code: 'Code',
      product: 'Product',
      unit: 'Unit',
      qty: 0,
      rate: 0,
      amount: 0
    };
    const newRows = [...materialRows];
    newRows.splice(index, 0, newRow);
    newRows.forEach((row, idx) => { row.slNo = idx + 1; });
    setMaterialRows(newRows);
  };

  const handleSearch = () => {
    setJobReviewPage(1);
  };

  const handleEdit = (index) => {
    const actualIndex = (materialPage - 1) * materialPerPage + index;
    const row = materialRows[actualIndex];
    setEditingRow(row.id);
  };

  const handleDelete = (index) => {
    const actualIndex = (materialPage - 1) * materialPerPage + index;
    const id = materialRows[actualIndex].id;
    const newRows = materialRows.filter(row => row.id !== id);
    newRows.forEach((row, idx) => { row.slNo = idx + 1; });
    setMaterialRows(newRows);
    if (paginatedMaterialRows.length === 1 && materialPage > 1) {
      setMaterialPage(materialPage - 1);
    }
  };

  const handleFieldChange = (id, field, value) => {
    const newRows = materialRows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        if (field === 'qty' || field === 'rate') {
          updatedRow.amount = (updatedRow.qty || 0) * (updatedRow.rate || 0);
        }
        return updatedRow;
      }
      return row;
    });
    setMaterialRows(newRows);
  };

  const calculateTotalAmount = () => {
    return materialRows.reduce((sum, row) => sum + (row.amount || 0), 0);
  };

  const handleSubmit = () => {
    stopEditing();
    alert('Form submitted successfully!');
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProductDropdown !== null) {
        const ref = productDropdownRefs.current[showProductDropdown];
        if (ref && !ref.contains(event.target)) {
          setShowProductDropdown(null);
          const newSearches = { ...productSearches };
          delete newSearches[showProductDropdown];
          setProductSearches(newSearches);
        }
      }

      if (showUnitDropdown !== null) {
        const ref = unitDropdownRefs.current[showUnitDropdown];
        if (ref && !ref.contains(event.target)) {
          setShowUnitDropdown(null);
          const newSearches = { ...unitSearches };
          delete newSearches[showUnitDropdown];
          setUnitSearches(newSearches);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProductDropdown, showUnitDropdown, productSearches, unitSearches]);

  React.useEffect(() => {
    if (jobReviewPage > jobReviewTotalPages && jobReviewTotalPages > 0) {
      setJobReviewPage(jobReviewTotalPages);
    }
  }, [jobReviewTotalPages, jobReviewPage]);

  React.useEffect(() => {
    if (materialPage > materialTotalPages && materialTotalPages > 0) {
      setMaterialPage(materialTotalPages);
    }
  }, [materialTotalPages, materialPage]);

  return (
    <>
      <div className="content-card" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
        <h2 className="page-title">
          Stock Issue 
        </h2>

        <div className="filter-grid mb-4">
          <div className="filter-grid-red">
            <label className="filter-label">
              Issue Date
            </label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="filter-input cursor-pointer"
            />
          </div>

          <div className="filter-grid-red">
            <label className="filter-label">
              Receiver
            </label>
            <div className="dropdown-wrapper">
              <input
                type="text"
                value={showGiverDropdown ? giverSearch : giver}
                onChange={(e) => {
                  setGiverSearch(e.target.value);
                  setShowGiverDropdown(true);
                }}
                onFocus={() => {
                  setShowGiverDropdown(true);
                  setGiverSearch('');
                }}
                onBlur={() => {
                  setTimeout(() => {
                    if (!giverSearch) {
                      setShowGiverDropdown(false);
                    }
                  }, 200);
                }}
                placeholder="Type or select..."
                className="dropdown-input"
              />
              <ChevronDown size={16} className="dropdown-icon" />
            </div>
            {showGiverDropdown && (
              <div className="dropdown-menu">
                {filteredGiverOptions.length > 0 ? (
                  filteredGiverOptions.map((option, idx) => (
                    <div
                      key={idx}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setGiver(option);
                        setGiverSearch('');
                        setShowGiverDropdown(false);
                      }}
                      onMouseEnter={() => setHoveredGiverOption(option)}
                      onMouseLeave={() => setHoveredGiverOption(null)}
                      className={`dropdown-item-option ${
                        hoveredGiverOption === option 
                          ? 'dropdown-item-hovered' 
                          : giver === option 
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

          <div className="bg-white p-3 rounded border border-gray-300 mb-2">
            <label className="filter-label">
              Issue No
            </label>
            <input
              type="text"
              value={issueReturnNo}
              onChange={(e) => setIssueReturnNo(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-grid-red">
            <label className="filter-label">
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="filter-input"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="filter-grid-red">
            <label className="filter-label">
              Remarks
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="multiline-field"
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        </div>

        <div className="filter-grid mb-6">
          <div className="filter-grid-green">
            <label className="filter-label">
              Job Order No
            </label>
            <input
              type="text"
              value={jobOrderNo}
              onChange={(e) => {
                setJobOrderNo(e.target.value);
                setJobReviewPage(1);
              }}
              placeholder="Type to filter..."
              className="filter-input"
            />
          </div>

          <div className="filter-grid-green">
            <label className="filter-label">
              Container No
            </label>
            <div className="dropdown-wrapper">
              <input
                type="text"
                value={containerSearch || containerNo}
                onChange={(e) => {
                  setContainerSearch(e.target.value);
                  setShowContainerDropdown(true);
                }}
                onFocus={() => {
                  setShowContainerDropdown(true);
                  setContainerSearch('');
                }}
                onBlur={() => {
                  setTimeout(() => setShowContainerDropdown(false), 200);
                }}
                placeholder="Type or select..."
                className="dropdown-input"
              />
              <ChevronDown size={16} className="dropdown-icon" />
            </div>
            {showContainerDropdown && (
              <div className="dropdown-menu z-10">
                {filteredContainerOptions.length > 0 ? (
                  filteredContainerOptions.map((option, idx) => (
                    <div
                      key={idx}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setContainerNo(option);
                        setContainerSearch('');
                        setShowContainerDropdown(false);
                      }}
                      onMouseEnter={() => setHoveredContainerOption(option)}
                      onMouseLeave={() => setHoveredContainerOption(null)}
                      className={`dropdown-item-option ${
                        hoveredContainerOption === option 
                          ? 'dropdown-item-hovered' 
                          : containerNo === option 
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

          <div className="flex justify-end pt-5">
            <button onClick={handleSearch} className="btn-search">
              <Search size={18} /> Search
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="section-title">
            Job Review List
          </h3>
          <div className="table-container">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">Select</th>
                  <th className="table-th">S/No</th>
                  <th className="table-th">Job Order No</th>
                  <th className="table-th">Job Date</th>
                  <th className="table-th">Customer Name</th>
                  <th className="table-th">Sales Person</th>
                  <th className="table-th">Narration</th>
                </tr>
              </thead>
              <tbody>
                {paginatedJobReviewData.map((row, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell">
                      <input 
                        type="radio" 
                        name="jobSelect" 
                        checked={selectedJobRow === row.slNo} 
                        onChange={() => setSelectedJobRow(row.slNo)} 
                        className="cursor-pointer w-4 h-4"
                      />
                    </td>
                    <td className="table-cell text-gray-500">{row.slNo}.</td>
                    <td className="table-cell">{row.jobOrderNo}</td>
                    <td className="table-cell">{row.jobDate}</td>
                    <td className="table-cell text-gray-500">{row.customerName}</td>
                    <td className="table-cell text-gray-500">{row.salesPerson}</td>
                    <td className="table-cell text-gray-500">{row.narration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            
          {jobReviewTotalPages > 1 && (
            <div className="pagination-container">
              <button
                onClick={() => setJobReviewPage(Math.max(1, jobReviewPage - 1))}
                disabled={jobReviewPage === 1}
                className={`pagination-btn flex items-center gap-1 ${
                  jobReviewPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: jobReviewTotalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setJobReviewPage(page)}
                  className={`pagination-page-btn ${
                    jobReviewPage === page ? 'pagination-page-active' : 'pagination-page-inactive'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setJobReviewPage(Math.min(jobReviewTotalPages, jobReviewPage + 1))}
                disabled={jobReviewPage === jobReviewTotalPages}
                className={`pagination-btn flex items-center gap-1 ${
                  jobReviewPage === jobReviewTotalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Tab Container */}
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'material' ? 'tab-button-active' : ''}`}
            onClick={() => setActiveTab('material')}
          >
            Material List
          </button>
          <button 
            className={`tab-button ${activeTab === 'previous' ? 'tab-button-active' : ''}`}
            onClick={() => setActiveTab('previous')}
          >
            Previous Material List
          </button>
        </div>

        {/* Material List Tab Content */}
        {activeTab === 'material' && (
          <>
            <div className="overflow-x-auto mb-1">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#fef2f2]">
                    <th className="table-th border-t border-b border-l border-[#fecaca]">S/No</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Code</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Product</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Unit</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Qty</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Rate</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Amount</th>
                    <th className="table-th-center border-t border-b border-r border-[#fecaca]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMaterialRows.map((row, index) => {
                    const isLast = index === paginatedMaterialRows.length - 1;
                    return (
                      <tr key={row.id} className="bg-white">
                        <td className={`table-cell border-l border-[#fecaca] ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {row.slNo}.
                        </td>
                        <td className={`table-cell ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <input 
                              type="text" 
                              value={row.code} 
                              onChange={(e) => handleFieldChange(row.id, 'code', e.target.value)} 
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            row.code
                          )}
                        </td>
                        <td className={`table-cell relative ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <div ref={el => productDropdownRefs.current[row.id] = el} className="relative">
                              <input
                                type="text"
                                value={showProductDropdown === row.id && productSearches[row.id] !== undefined ? productSearches[row.id] : row.product}
                                onChange={(e) => {
                                  setProductSearches({ ...productSearches, [row.id]: e.target.value });
                                  setShowProductDropdown(row.id);
                                }}
                                onFocus={() => {
                                  setShowProductDropdown(row.id);
                                  setProductSearches({ ...productSearches, [row.id]: '' });
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setShowProductDropdown(null);
                                    const newSearches = { ...productSearches };
                                    delete newSearches[row.id];
                                    setProductSearches(newSearches);
                                    setTimeout(() => stopEditing(), 0);
                                  }
                                }}
                                placeholder="Type or select..."
                                className="w-full py-1.5 px-2 border border-gray-300 rounded text-sm cursor-text"
                              />
                              <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                              {showProductDropdown === row.id && (
                                <div className="dropdown-menu">
                                  {getFilteredProductOptions(row.id).length > 0 ? (
                                    getFilteredProductOptions(row.id).map((opt, i) => (
                                      <div
                                        key={i}
                                        onClick={() => {
                                          handleFieldChange(row.id, 'product', opt);
                                          const newSearches = { ...productSearches };
                                          delete newSearches[row.id];
                                          setProductSearches(newSearches);
                                          setShowProductDropdown(null);
                                        }}
                                        onMouseEnter={() => setHoveredProductOption(opt)}
                                        onMouseLeave={() => setHoveredProductOption(null)}
                                        className={`dropdown-item-option ${
                                          hoveredProductOption === opt 
                                            ? 'dropdown-item-hovered' 
                                            : row.product === opt 
                                            ? 'dropdown-item-selected' 
                                            : 'dropdown-item-default'
                                        }`}
                                      >
                                        {opt}
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
                          ) : (
                            row.product
                          )}
                        </td>
                        <td className={`table-cell relative ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <div ref={el => unitDropdownRefs.current[row.id] = el} className="relative">
                              <input
                                type="text"
                                value={showUnitDropdown === row.id && unitSearches[row.id] !== undefined ? unitSearches[row.id] : row.unit}
                                onChange={(e) => {
                                  setUnitSearches({ ...unitSearches, [row.id]: e.target.value });
                                  setShowUnitDropdown(row.id);
                                }}
                                onFocus={() => {
                                  setShowUnitDropdown(row.id);
                                  setUnitSearches({ ...unitSearches, [row.id]: '' });
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setShowUnitDropdown(null);
                                    const newSearches = { ...unitSearches };
                                    delete newSearches[row.id];
                                    setUnitSearches(newSearches);
                                    setTimeout(() => stopEditing(), 0);
                                  }
                                }}
                                placeholder="Type or select..."
                                className="w-full py-1.5 px-2 border border-gray-300 rounded text-sm cursor-text"
                              />
                              <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                              {showUnitDropdown === row.id && (
                                <div className="dropdown-menu">
                                  {getFilteredUnitOptions(row.id).length > 0 ? (
                                    getFilteredUnitOptions(row.id).map((opt, i) => (
                                      <div
                                        key={i}
                                        onClick={() => {
                                          handleFieldChange(row.id, 'unit', opt);
                                          const newSearches = { ...unitSearches };
                                          delete newSearches[row.id];
                                          setUnitSearches(newSearches);
                                          setShowUnitDropdown(null);
                                        }}
                                        onMouseEnter={() => setHoveredUnitOption(opt)}
                                        onMouseLeave={() => setHoveredUnitOption(null)}
                                        className={`dropdown-item-option ${
                                          hoveredUnitOption === opt 
                                            ? 'dropdown-item-hovered' 
                                            : row.unit === opt 
                                            ? 'dropdown-item-selected' 
                                            : 'dropdown-item-default'
                                        }`}
                                      >
                                        {opt}
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
                          ) : (
                            row.unit
                          )}
                        </td>
                        <td className={`table-cell ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <input 
                              type="number" 
                              value={row.qty} 
                              onChange={(e) => handleFieldChange(row.id, 'qty', Number(e.target.value))} 
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            row.qty
                          )}
                        </td>
                        <td className={`table-cell ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <input 
                              type="number" 
                              value={row.rate} 
                              onChange={(e) => handleFieldChange(row.id, 'rate', Number(e.target.value))} 
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            `₹ ${row.rate.toLocaleString()}`
                          )}
                        </td>
                        <td className={`table-cell ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          ₹ {row.amount.toLocaleString()}
                        </td>
                        <td className={`table-cell-center border-r border-[#fecaca] ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          <div className="table-actions">
                            <button onClick={() => handleAddRowAbove((materialPage - 1) * materialPerPage + index)} className="btn-action" title="Add Row">
                              <Plus size={18} className="add-primary" />
                            </button>
                            <button onClick={() => handleEdit(index)} className="btn-action" title="Edit">
                              <Edit2 size={18}  />
                            </button>
                            <button onClick={() => handleDelete(index)} className="btn-action" title="Delete">
                              <Trash2 size={18} className="text-primary" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-end items-center border-l border-r border-b border-[#fecaca] bg-white py-2 px-4">
                <button 
                  onClick={() => handleAddRowAbove(materialRows.length)} 
                  className="btn-all"
                >
                  <Plus size={16} />
                  <span>Row</span>
                </button>
              </div>
            </div>

            {materialTotalPages > 1 && (
              <div className="pagination-container">
                <button
                  disabled={materialPage === 1}
                  onClick={() => setMaterialPage(prev => prev - 1)}
                  className={`pagination-btn ${materialPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: materialTotalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setMaterialPage(page)}
                    className={`pagination-page-btn ${materialPage === page ? 'pagination-page-active' : 'pagination-page-inactive'}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={materialPage === materialTotalPages}
                  onClick={() => setMaterialPage(prev => prev + 1)}
                  className={`pagination-btn ${materialPage === materialTotalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <div className="flex justify-end mt-3">
              <div className="border border-gray-200 rounded-lg py-3 px-5 bg-gray-50 flex gap-3 items-center">
                <span className="text-sm text-gray-600">
                  Total Amount :
                </span>
                <span className="text-sm text-gray-900 font-semibold">
                  ₹ {calculateTotalAmount().toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-5">
              <button onClick={handleSubmit} className="btn-search">
                <span>✓</span>
                <span>Submit</span>
              </button>
            </div>
          </>
        )}

         {/* Material List Tab Content */}
        {activeTab === 'previous' && (
          <>
            <div className="overflow-x-auto mb-1">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#fef2f2]">
                    <th className="table-th border-t border-b border-l border-[#fecaca]">S/No</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Code</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Product</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Unit</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Qty</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Rate</th>
                    <th className="table-th border-t border-b border-[#fecaca]">Amount</th>
                    <th className="table-th-center border-t border-b border-r border-[#fecaca]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMaterialRows.map((row, index) => {
                    const isLast = index === paginatedMaterialRows.length - 1;
                    return (
                      <tr key={row.id} className="bg-white">
                        <td className={`table-cell border-l border-[#fecaca] ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {row.slNo}.
                        </td>
                        <td className={`table-cell ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <input 
                              type="text" 
                              value={row.code} 
                              onChange={(e) => handleFieldChange(row.id, 'code', e.target.value)} 
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            row.code
                          )}
                        </td>
                        <td className={`table-cell relative ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <div ref={el => productDropdownRefs.current[row.id] = el} className="relative">
                              <input
                                type="text"
                                value={showProductDropdown === row.id && productSearches[row.id] !== undefined ? productSearches[row.id] : row.product}
                                onChange={(e) => {
                                  setProductSearches({ ...productSearches, [row.id]: e.target.value });
                                  setShowProductDropdown(row.id);
                                }}
                                onFocus={() => {
                                  setShowProductDropdown(row.id);
                                  setProductSearches({ ...productSearches, [row.id]: '' });
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setShowProductDropdown(null);
                                    const newSearches = { ...productSearches };
                                    delete newSearches[row.id];
                                    setProductSearches(newSearches);
                                    setTimeout(() => stopEditing(), 0);
                                  }
                                }}
                                placeholder="Type or select..."
                                className="w-full py-1.5 px-2 border border-gray-300 rounded text-sm cursor-text"
                              />
                              <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                              {showProductDropdown === row.id && (
                                <div className="dropdown-menu">
                                  {getFilteredProductOptions(row.id).length > 0 ? (
                                    getFilteredProductOptions(row.id).map((opt, i) => (
                                      <div
                                        key={i}
                                        onClick={() => {
                                          handleFieldChange(row.id, 'product', opt);
                                          const newSearches = { ...productSearches };
                                          delete newSearches[row.id];
                                          setProductSearches(newSearches);
                                          setShowProductDropdown(null);
                                        }}
                                        onMouseEnter={() => setHoveredProductOption(opt)}
                                        onMouseLeave={() => setHoveredProductOption(null)}
                                        className={`dropdown-item-option ${
                                          hoveredProductOption === opt 
                                            ? 'dropdown-item-hovered' 
                                            : row.product === opt 
                                            ? 'dropdown-item-selected' 
                                            : 'dropdown-item-default'
                                        }`}
                                      >
                                        {opt}
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
                          ) : (
                            row.product
                          )}
                        </td>
                        <td className={`table-cell relative ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <div ref={el => unitDropdownRefs.current[row.id] = el} className="relative">
                              <input
                                type="text"
                                value={showUnitDropdown === row.id && unitSearches[row.id] !== undefined ? unitSearches[row.id] : row.unit}
                                onChange={(e) => {
                                  setUnitSearches({ ...unitSearches, [row.id]: e.target.value });
                                  setShowUnitDropdown(row.id);
                                }}
                                onFocus={() => {
                                  setShowUnitDropdown(row.id);
                                  setUnitSearches({ ...unitSearches, [row.id]: '' });
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setShowUnitDropdown(null);
                                    const newSearches = { ...unitSearches };
                                    delete newSearches[row.id];
                                    setUnitSearches(newSearches);
                                    setTimeout(() => stopEditing(), 0);
                                  }
                                }}
                                placeholder="Type or select..."
                                className="w-full py-1.5 px-2 border border-gray-300 rounded text-sm cursor-text"
                              />
                              <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                              {showUnitDropdown === row.id && (
                                <div className="dropdown-menu">
                                  {getFilteredUnitOptions(row.id).length > 0 ? (
                                    getFilteredUnitOptions(row.id).map((opt, i) => (
                                      <div
                                        key={i}
                                        onClick={() => {
                                          handleFieldChange(row.id, 'unit', opt);
                                          const newSearches = { ...unitSearches };
                                          delete newSearches[row.id];
                                          setUnitSearches(newSearches);
                                          setShowUnitDropdown(null);
                                        }}
                                        onMouseEnter={() => setHoveredUnitOption(opt)}
                                        onMouseLeave={() => setHoveredUnitOption(null)}
                                        className={`dropdown-item-option ${
                                          hoveredUnitOption === opt 
                                            ? 'dropdown-item-hovered' 
                                            : row.unit === opt 
                                            ? 'dropdown-item-selected' 
                                            : 'dropdown-item-default'
                                        }`}
                                      >
                                        {opt}
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
                          ) : (
                            row.unit
                          )}
                        </td>
                        <td className={`table-cell ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <input 
                              type="number" 
                              value={row.qty} 
                              onChange={(e) => handleFieldChange(row.id, 'qty', Number(e.target.value))} 
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            row.qty
                          )}
                        </td>
                        <td className={`table-cell ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          {editingRow === row.id ? (
                            <input 
                              type="number" 
                              value={row.rate} 
                              onChange={(e) => handleFieldChange(row.id, 'rate', Number(e.target.value))} 
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            `₹ ${row.rate.toLocaleString()}`
                          )}
                        </td>
                        <td className={`table-cell ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          ₹ {row.amount.toLocaleString()}
                        </td>
                        <td className={`table-cell-center border-r border-[#fecaca] ${isLast ? 'border-b border-[#fecaca]' : ''}`}>
                          <div className="table-actions">
                            <button onClick={() => handleAddRowAbove((materialPage - 1) * materialPerPage + index)} className="btn-action" title="Add Row">
                              <Plus size={18} className="add-primary" />
                            </button>
                            <button onClick={() => handleEdit(index)} className="btn-action" title="Edit">
                              <Edit2 size={18}  />
                            </button>
                            <button onClick={() => handleDelete(index)} className="btn-action" title="Delete">
                              <Trash2 size={18} className="text-primary" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-end items-center border-l border-r border-b border-[#fecaca] bg-white py-2 px-4">
                <button 
                  onClick={() => handleAddRowAbove(materialRows.length)} 
                  className="btn-all"
                >
                  <Plus size={16} />
                  <span>Row</span>
                </button>
              </div>
            </div>

            {previousTotalPages > 1 && (
              <div className="pagination-container">
                <button
                  disabled={materialPage === 1}
                  onClick={() => setMaterialPage(prev => prev - 1)}
                  className={`pagination-btn ${materialPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: materialTotalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setMaterialPage(page)}
                    className={`pagination-page-btn ${materialPage === page ? 'pagination-page-active' : 'pagination-page-inactive'}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={materialPage === materialTotalPages}
                  onClick={() => setMaterialPage(prev => prev + 1)}
                  className={`pagination-btn ${materialPage === materialTotalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <div className="flex justify-end mt-3">
              <div className="border border-gray-200 rounded-lg py-3 px-5 bg-gray-50 flex gap-3 items-center">
                <span className="text-sm text-gray-600">
                  Total Amount :
                </span>
                <span className="text-sm text-gray-900 font-semibold">
                  ₹ {calculateTotalAmount().toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-5">
              <button onClick={handleSubmit} className="btn-search">
                <span>✓</span>
                <span>Submit</span>
              </button>
            </div>
          </>
        )}
      </div>
      
      <button onClick={() => navigate(-1)} className="btn-back">
        <span>←</span>
        <span>Back</span>
      </button>
    </>
  );
}
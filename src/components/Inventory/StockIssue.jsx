import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function StockIssue() {
    const navigate = useNavigate();
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
    // Close dropdowns first
    setShowProductDropdown(null);
    setShowUnitDropdown(null);
    
    // Clear search states
    setProductSearches({});
    setUnitSearches({});
    
    // Finally close edit mode
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
      // Check product dropdowns
      if (showProductDropdown !== null) {
        const ref = productDropdownRefs.current[showProductDropdown];
        if (ref && !ref.contains(event.target)) {
          setShowProductDropdown(null);
          const newSearches = { ...productSearches };
          delete newSearches[showProductDropdown];
          setProductSearches(newSearches);
        }
      }

      // Check unit dropdowns
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
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fce7e9', 
      padding: '24px' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '32px', 
        maxWidth: '1400px', 
        margin: '0 auto' ,
        marginBottom: '10px'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          marginBottom: '24px', 
          color: '#111827' 
        }}>
          Stock Issue 
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px', 
          marginBottom: '16px' 
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '12px', 
            borderRadius: '4px', 
            border: '1px solid #d1d5db' ,
             borderRight: '3px solid #DC2626'
          }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              color: '#4b5563', 
              marginBottom: '8px', 
              fontWeight: '600' 
            }}>
             Issue Date
            </label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '2px 4px', 
                border: '0', 
                borderRadius: '4px', 
                fontSize: '14px', 
                outline: 'none', 
                cursor: 'pointer' 
              }}
            />
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '12px', 
            borderRadius: '4px', 
            border: '1px solid #d1d5db', 
            position: 'relative' ,
            borderRight: '3px solid #DC2626'
          }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              color: '#4b5563', 
              marginBottom: '8px', 
              fontWeight: '600' 
            }}>
              Receiver
            </label>
            <div style={{ position: 'relative' }}>
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
                style={{ 
                  width: '100%', 
                  padding: '2px 2px 2px 4px', 
                  border: '0',
                  borderRadius: '4px', 
                  fontSize: '14px', 
                  outline: 'none',
                  cursor: 'text'
                }}
              />
              <ChevronDown
                size={16}
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280',
                  pointerEvents: 'none'
                }}
              />
            </div>
            {showGiverDropdown && (
              <div style={{ 
                position: 'absolute', 
                top: '100%', 
                left: '0', 
                right: '0', 
                backgroundColor: 'white', 
                border: '1px solid #d1d5db', 
                borderRadius: '4px', 
                marginTop: '4px', 
                zIndex: '1000', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
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
                      style={{ 
                        padding: '8px 12px', 
                        cursor: 'pointer', 
                        fontSize: '14px',
                        color: hoveredGiverOption === option ? 'white' : '#374151',
                        backgroundColor: hoveredGiverOption === option ? '#A63128' : (giver === option ? '#FEE2E2' : 'white'),
                        borderBottom: idx < filteredGiverOptions.length - 1 ? '1px solid #E5E7EB' : 'none',
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

          <div style={{ 
            backgroundColor: 'white', 
            padding: '12px', 
            borderRadius: '4px', 
            border: '1px solid #d1d5db' 
          }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              color: '#4b5563', 
              marginBottom: '8px', 
              fontWeight: '600' 
            }}>
              Issue No
            </label>
            <input
              type="text"
              value={issueReturnNo}
              onChange={(e) => setIssueReturnNo(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '2px 4px', 
                border: '0', 
                borderRadius: '4px', 
                fontSize: '14px', 
                outline: 'none' 
              }}
            />
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '12px', 
            borderRadius: '4px', 
            border: '1px solid #d1d5db' ,
            borderRight: '3px solid #DC2626'
          }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              color: '#4b5563', 
              marginBottom: '8px', 
              fontWeight: '600' 
            }}>
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '2px 4px', 
                border: '0', 
                borderRadius: '4px', 
                fontSize: '14px', 
                outline: 'none' 
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '12px', 
            borderRadius: '4px', 
            border: '1px solid #d1d5db',
            borderRight: '3px solid #DC2626' 
          }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              color: '#4b5563', 
              marginBottom: '8px', 
              fontWeight: '600' 
            }}>
              Remarks
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '4px', 
                border: '0', 
                borderRadius: '4px', 
                fontSize: '14px', 
                outline: 'none',
                resize: 'none',
                minHeight: '40px',
                maxHeight: '200px',
                overflow: 'hidden',
                fontFamily: 'inherit'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px', 
          marginBottom: '24px' 
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '12px', 
            borderRadius: '4px', 
            border: '1px solid #d1d5db' ,
             borderRight: '3px solid #22C55E'
          }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              color: '#4b5563', 
              marginBottom: '8px', 
              fontWeight: '600' 
            }}>
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
              style={{ 
                width: '100%', 
                padding: '2px 4px', 
                border: '0', 
                borderRadius: '4px', 
                fontSize: '14px', 
                outline: 'none' 
              }}
            />
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '12px', 
            borderRadius: '4px', 
            border: '1px solid #d1d5db', 
            position: 'relative' ,
             borderRight: '3px solid #22C55E'
          }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              color: '#4b5563', 
              marginBottom: '8px', 
              fontWeight: '600' 
            }}>
              Container No
            </label>
            <div style={{ position: 'relative' }}>
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
                style={{ 
                  width: '100%', 
                  padding: '2px 2px 2px 4px', 
                  border: '0',
                  borderRadius: '4px', 
                  fontSize: '14px', 
                  outline: 'none',
                  cursor: 'text'
                }}
              />
              <ChevronDown
                size={16}
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280',
                  pointerEvents: 'none'
                }}
              />
            </div>
            {showContainerDropdown && (
              <div style={{ 
                position: 'absolute', 
                top: '100%', 
                left: '0', 
                right: '0', 
                backgroundColor: 'white', 
                border: '1px solid #d1d5db', 
                borderRadius: '4px', 
                marginTop: '4px', 
                zIndex: '10', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
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
                      style={{ 
                        padding: '8px 12px', 
                        cursor: 'pointer', 
                        fontSize: '14px',
                        color: hoveredContainerOption === option ? 'white' : '#374151',
                        backgroundColor: hoveredContainerOption === option ? '#A63128' : (containerNo === option ? '#FEE2E2' : 'white'),
                        borderBottom: idx < filteredContainerOptions.length - 1 ? '1px solid #E5E7EB' : 'none',
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

          <div></div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px' }}>
            <button
              onClick={handleSearch}
              style={{
                width: '150px',
                height: '50px',
                padding: '10px 24px',
                marginLeft: '40px',
                backgroundColor: '#A63128',
                color: 'white',
                borderRadius: '15px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <Search size={18} /> Search
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            marginBottom: '12px', 
            color: '#111827' 
          }}>
            Job Review List
          </h3>
          <div style={{ 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px', 
            overflow: 'hidden' 
          }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              fontSize: '14px' 
            }}>
              <thead>
                <tr style={{ backgroundColor: '#fef2f2' }}>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: '#374151', 
                    borderBottom: '1px solid #fecaca' 
                  }}>
                    Select
                  </th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: '#374151', 
                    borderBottom: '1px solid #fecaca' 
                  }}>
                    S/No
                  </th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: '#374151', 
                    borderBottom: '1px solid #fecaca' 
                  }}>
                    Job Order No
                  </th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: '#374151', 
                    borderBottom: '1px solid #fecaca' 
                  }}>
                    Job Date
                  </th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: '#374151', 
                    borderBottom: '1px solid #fecaca' 
                  }}>
                    Customer Name
                  </th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: '#374151', 
                    borderBottom: '1px solid #fecaca' 
                  }}>
                    Sales Person
                  </th>
                  <th style={{ 
                    padding: '12px 16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: '#374151', 
                    borderBottom: '1px solid #fecaca' 
                  }}>
                    Narration
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedJobReviewData.map((row, index) => (
                  <tr key={index} style={{ backgroundColor: 'white' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <input 
                        type="radio" 
                        name="jobSelect" 
                        checked={selectedJobRow === row.slNo} 
                        onChange={() => setSelectedJobRow(row.slNo)} 
                        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                      />
                    </td>
                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.slNo}.</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{row.jobOrderNo}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{row.jobDate}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.customerName}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.salesPerson}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.narration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            
            {jobReviewTotalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                padding: '12px 16px',
                borderTop: '1px solid #e5e7eb',
                backgroundColor: 'white'
              }}>
                <button
                  onClick={() => setJobReviewPage(Math.max(1, jobReviewPage - 1))}
                  disabled={jobReviewPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    backgroundColor: jobReviewPage === 1 ? '#e5e7eb' : 'white',
                    cursor: jobReviewPage === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: jobReviewTotalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setJobReviewPage(page)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: '1px solid #d1d5db',
                      backgroundColor: jobReviewPage === page ? '#A63128' : '#ffffff',
                      color: jobReviewPage === page ? '#ffffff' : '#000000',
                      cursor: 'pointer'
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setJobReviewPage(Math.min(jobReviewTotalPages, jobReviewPage + 1))}
                  disabled={jobReviewPage === jobReviewTotalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    backgroundColor: jobReviewPage === jobReviewTotalPages ? '#e5e7eb' : 'white',
                    cursor: jobReviewPage === jobReviewTotalPages ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        

        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            marginBottom: '12px', 
            color: '#111827' 
          }}>
            Material List
          </h3>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '4px' }}>
          <table style={{ width: '100%', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fef2f2' }}>
                <th style={{ 
                  padding: '14px 16px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: '#111827', 
                  borderTop: '1px solid #fecaca', 
                  borderBottom: '1px solid #fecaca', 
                  borderLeft: '1px solid #fecaca' 
                }}>
                  S/No
                </th>
                <th style={{ 
                  padding: '14px 16px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: '#111827', 
                  borderTop: '1px solid #fecaca', 
                  borderBottom: '1px solid #fecaca' 
                }}>
                  Code
                </th>
                <th style={{ 
                  padding: '14px 16px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: '#111827', 
                  borderTop: '1px solid #fecaca', 
                  borderBottom: '1px solid #fecaca' 
                }}>
                  Product
                </th>
                <th style={{ 
                  padding: '14px 16px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: '#111827', 
                  borderTop: '1px solid #fecaca', 
                  borderBottom: '1px solid #fecaca' 
                }}>
                  Unit
                </th>
                <th style={{ 
                  padding: '14px 16px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: '#111827', 
                  borderTop: '1px solid #fecaca', 
                  borderBottom: '1px solid #fecaca' 
                }}>
                  Qty
                </th>
                <th style={{ 
                  padding: '14px 16px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: '#111827', 
                  borderTop: '1px solid #fecaca', 
                  borderBottom: '1px solid #fecaca' 
                }}>
                  Rate
                </th>
                <th style={{ 
                  padding: '14px 16px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: '#111827', 
                  borderTop: '1px solid #fecaca', 
                  borderBottom: '1px solid #fecaca' 
                }}>
                  Amount
                </th>
                <th style={{ 
                  padding: '14px 16px', 
                  textAlign: 'center', 
                  fontWeight: '600', 
                  color: '#111827', 
                  borderTop: '1px solid #fecaca', 
                  borderBottom: '1px solid #fecaca', 
                  borderRight: '1px solid #fecaca' 
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedMaterialRows.map((row, index) => {
                const isLast = index === paginatedMaterialRows.length - 1;
                return (
                  <tr key={row.id} style={{ backgroundColor: 'white' }}>
                    <td style={{ 
                      padding: '14px 16px', 
                      color: '#374151', 
                      borderLeft: '1px solid #fecaca',
                      borderBottom: isLast ? '1px solid #fecaca' : 'none'
                    }}>
                      {row.slNo}.
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      color: '#374151',
                      borderBottom: isLast ? '1px solid #fecaca' : 'none'
                    }}>
                      {editingRow === row.id ? (
                        <input 
                          type="text" 
                          value={row.code} 
                          onChange={(e) => handleFieldChange(row.id, 'code', e.target.value)} 
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      ) : (
                        row.code
                      )}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      color: '#374151',
                      position: 'relative',
                      borderBottom: isLast ? '1px solid #fecaca' : 'none'
                    }}>
                      {editingRow === row.id ? (
                        <div 
                          ref={el => productDropdownRefs.current[row.id] = el}
                          style={{ position: 'relative' }}
                        >
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
                                // Close dropdown and clear search
                                setShowProductDropdown(null);
                                const newSearches = { ...productSearches };
                                delete newSearches[row.id];
                                setProductSearches(newSearches);
                                // Close edit mode
                                setTimeout(() => {
                                  stopEditing();
                                }, 0);
                              }
                            }}
                            placeholder="Type or select..."
                            style={{
                              width: '100%',
                              padding: '6px 2px 6px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '14px',
                              cursor: 'text'
                            }}
                          />
                          <ChevronDown
                            size={16}
                            style={{
                              position: 'absolute',
                              right: '8px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              color: '#6b7280',
                              pointerEvents: 'none'
                            }}
                          />
                          {showProductDropdown === row.id && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '0',
                              right: '0',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              marginTop: '4px',
                              zIndex: 1000,
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                              maxHeight: '200px',
                              overflowY: 'auto'
                            }}>
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
                                    style={{
                                      padding: '8px 12px',
                                      cursor: 'pointer',
                                      fontSize: '14px',
                                      color: hoveredProductOption === opt ? 'white' : '#374151',
                                      backgroundColor: hoveredProductOption === opt ? '#A63128' : (row.product === opt ? '#FEE2E2' : 'white'),
                                      borderBottom: i < getFilteredProductOptions(row.id).length - 1 ? '1px solid #E5E7EB' : 'none',
                                      transition: 'all 0.2s ease'
                                    }}
                                  >
                                    {opt}
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
                      ) : (
                        row.product
                      )}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      color: '#374151',
                      position: 'relative',
                      borderBottom: isLast ? '1px solid #fecaca' : 'none'
                    }}>
                      {editingRow === row.id ? (
                        <div 
                          ref={el => unitDropdownRefs.current[row.id] = el}
                          style={{ position: 'relative' }}
                        >
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
                                // Close dropdown and clear search
                                setShowUnitDropdown(null);
                                const newSearches = { ...unitSearches };
                                delete newSearches[row.id];
                                setUnitSearches(newSearches);
                                // Close edit mode
                                setTimeout(() => {
                                  stopEditing();
                                }, 0);
                              }
                            }}
                            placeholder="Type or select..."
                            style={{
                              width: '100%',
                              padding: '6px 2px 6px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '14px',
                              cursor: 'text'
                            }}
                          />
                          <ChevronDown
                            size={16}
                            style={{
                              position: 'absolute',
                              right: '8px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              color: '#6b7280',
                              pointerEvents: 'none'
                            }}
                          />
                          {showUnitDropdown === row.id && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '0',
                              right: '0',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              marginTop: '4px',
                              zIndex: 1000,
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                              maxHeight: '200px',
                              overflowY: 'auto'
                            }}>
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
                                    style={{
                                      padding: '8px 12px',
                                      cursor: 'pointer',
                                      fontSize: '14px',
                                      color: hoveredUnitOption === opt ? 'white' : '#374151',
                                      backgroundColor: hoveredUnitOption === opt ? '#A63128' : (row.unit === opt ? '#FEE2E2' : 'white'),
                                      borderBottom: i < getFilteredUnitOptions(row.id).length - 1 ? '1px solid #E5E7EB' : 'none',
                                      transition: 'all 0.2s ease'
                                    }}
                                  >
                                    {opt}
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
                      ) : (
                        row.unit
                      )}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      color: '#374151',
                      borderBottom: isLast ? '1px solid #fecaca' : 'none'
                    }}>
                      {editingRow === row.id ? (
                        <input 
                          type="number" 
                          value={row.qty} 
                          onChange={(e) => handleFieldChange(row.id, 'qty', Number(e.target.value))} 
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      ) : (
                        row.qty
                      )}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      color: '#374151',
                      borderBottom: isLast ? '1px solid #fecaca' : 'none'
                    }}>
                      {editingRow === row.id ? (
                        <input 
                          type="number" 
                          value={row.rate} 
                          onChange={(e) => handleFieldChange(row.id, 'rate', Number(e.target.value))} 
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      ) : (
                        `₹ ${row.rate.toLocaleString()}`
                      )}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      color: '#374151',
                      borderBottom: isLast ? '1px solid #fecaca' : 'none'
                    }}>
                      ₹ {row.amount.toLocaleString()}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      textAlign: 'center',
                      borderRight: '1px solid #fecaca',
                      borderBottom: isLast ? '1px solid #fecaca' : 'none'
                    }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                          onClick={() => handleAddRowAbove((materialPage - 1) * materialPerPage + index)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          title="Add Row"
                        >
                          <Plus size={18} style={{ color: '#374151' }} />
                        </button>
                        <button
                          onClick={() => handleEdit(index)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          title="Edit"
                        >
                          <Edit2 size={18} style={{ color: '#374151' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          title="Delete"
                        >
                          <Trash2 size={18} style={{ color: '#dc2626' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderLeft: '1px solid #fecaca',
            borderRight: '1px solid #fecaca',
            borderBottom: '1px solid #fecaca',
            backgroundColor: 'white',
            padding: '8px 16px'
          }}>
            <button 
              onClick={() => handleAddRowAbove(materialRows.length)} 
              style={{
                backgroundColor: 'white',
                color: '#374151',
                border: '1px solid #d1d5db',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              <Plus size={16} />
              <span>Row</span>
            </button>
          </div>
        </div>

        {materialTotalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            marginTop: '12px'
          }}>
            <button
              disabled={materialPage === 1}
              onClick={() => setMaterialPage(prev => prev - 1)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                backgroundColor: materialPage === 1 ? '#e5e7eb' : '#ffffff',
                cursor: materialPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: materialTotalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setMaterialPage(page)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: materialPage === page ? '#A63128' : '#ffffff',
                  color: materialPage === page ? '#ffffff' : '#000000',
                  cursor: 'pointer'
                }}
              >
                {page}
              </button>
            ))}

            <button
              disabled={materialPage === materialTotalPages}
              onClick={() => setMaterialPage(prev => prev + 1)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                backgroundColor: materialPage === materialTotalPages ? '#e5e7eb' : '#ffffff',
                cursor: materialPage === materialTotalPages ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '12px'
        }}>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px 20px',
            backgroundColor: '#f9fafb',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '14px',
              color: '#4b5563'
            }}>
              Total Amount :
            </span>
            <span style={{
              fontSize: '14px',
              color: '#111827',
              fontWeight: '600'
            }}>
              ₹ {calculateTotalAmount().toLocaleString()}
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '20px'
        }}>
          <button
            onClick={handleSubmit}
            style={{
              width: '150px',
              height: '50px',
              padding: '10px 30px',
              marginLeft: '40px',
              backgroundColor: '#A63128',
              color: 'white',
              borderRadius: '15px',
              fontSize: '14px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <span>✓</span>
            <span>Submit</span>
          </button>
        </div>
      </div>
       <button
              onClick={() => navigate(-1)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
              <span>←</span>
              <span>Back</span>
            </button>
    </div>
  );
}
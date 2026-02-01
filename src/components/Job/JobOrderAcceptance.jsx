import React, { useState, useRef, useEffect } from 'react';
import {  CheckCircle, XCircle, ChevronDown, Plus, Edit2, Trash2 , ChevronLeft , ChevronRight} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function JobOrderAcceptance() {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(2);
  const [showAddSpecDropdown, setShowAddSpecDropdown] = useState(false);

  const [jobOrders, setJobOrders] = useState([
    {
      id: 1,
      sno: 1,
      leadNo: 'L-1',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh',
      advanceAmount: '₹ 10,00,000',
      status: null
    },
    {
      id: 2,
      sno: 2,
      leadNo: 'L-2',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh',
      advanceAmount: '₹ 10,00,000',
      status: null
    },
     {
      id: 3,
      sno: 1,
      leadNo: 'L-1',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh',
      advanceAmount: '₹ 10,00,000',
      status: null
    },
    {
      id: 4,
      sno: 2,
      leadNo: 'L-2',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh',
      advanceAmount: '₹ 10,00,000',
      status: null
    },
     {
      id: 5,
      sno: 1,
      leadNo: 'L-1',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh',
      advanceAmount: '₹ 10,00,000',
      status: null
    },
    {
      id: 6,
      sno: 2,
      leadNo: 'L-2',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh',
      advanceAmount: '₹ 10,00,000',
      status: null
    }
  ]);
  
  // Job Orders Pagination
  const [jobPage, setJobPage] = useState(1);
  const jobPerPage = 5;

  const jobTotalPages = Math.ceil(jobOrders.length / jobPerPage);

  const [rows, setRows] = useState([
    { id: 1, slNo: 1, description: 'Door - MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000 },
    { id: 2, slNo: 2, description: 'Window - UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 3, slNo: 3, description: 'Flooring - Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 4, slNo: 4, description: 'Roofing - MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 5, slNo: 1, description: 'Door - MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000 },
    { id: 6, slNo: 2, description: 'Window - UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 7, slNo: 3, description: 'Flooring - Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 8, slNo: 4, description: 'Roofing - MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 }
  ]);
  
  // Job Review Pagination
  const [reviewPage, setReviewPage] = useState(1);
  const reviewPerPage = 5;
  const reviewTotalPages = Math.ceil(rows.length / reviewPerPage);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [currentRowForModal, setCurrentRowForModal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [insertAfterRowId, setInsertAfterRowId] = useState(null);
  const [showSpecDropdown, setShowSpecDropdown] = useState(null);
  
  const specMasters = [
    'Door - (7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door',
    'Window - UPVC sliding window with mesh',
    'Flooring - Vitrified tiles 2x2 feet',
    'Roofing - MS sheet roofing with insulation'
  ];

  const [newRowData, setNewRowData] = useState({
    slNo: '',
    description: '',
    dimension: '',
    noOfUnit: '',
    amount: '',
    hiddenAmount: ''
  });

  const [discount, setDiscount] = useState(10000);
  const [gstPercentage, setGstPercentage] = useState(18);
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  
  const handleAddButtonClick = () => {
    setShowAddForm(true);
    setInsertAfterRowId(null);
  };

  const handleInsertRow = (afterRowId) => {
    setShowAddForm(true);
    setInsertAfterRowId(afterRowId);
  };

  const handleSaveNewRow = () => {
    const row = {
      id: Date.now(),
      slNo: newRowData.slNo || rows.length + 1,
      description: newRowData.description,
      dimension: newRowData.dimension,
      noOfUnit: parseFloat(newRowData.noOfUnit) || 0,
      amount: parseFloat(newRowData.amount) || 0,
      hiddenAmount: parseFloat(newRowData.hiddenAmount) || 0
    };

    if (insertAfterRowId) {
      const index = rows.findIndex(r => r.id === insertAfterRowId);
      const newRows = [...rows];
      newRows.splice(index + 1, 0, row);
      setRows(newRows);
    } else {
      setRows([...rows, row]);
    }

    setShowAddForm(false);
    setInsertAfterRowId(null);
    setNewRowData({
      slNo: '',
      description: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
  };
  
  const stopEditing = () => {
    setEditingRow(null);
    setShowSpecDropdown(null);
  };

  const handleDropdownKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      stopEditing();
    }
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(prev => (prev === index ? null : index));
  };

  const handleEdit = (index) => {
    setEditingRow(rows[index].id);
    setOpenMenuIndex(null);
  };

  const handleDelete = (index) => {
    setRows(prev => {
      const newData = prev.filter((_, i) => i !== index);

      if ((reviewPage - 1) * reviewPerPage >= newData.length) {
        setReviewPage(p => Math.max(p - 1, 1));
      }

      return newData;
    });

    setOpenMenuIndex(null);
  };

  const updateRow = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };
  
  const selectFromMaster = (type, value) => {
    if (currentRowForModal === 'newRow') {
      setNewRowData({ ...newRowData, description: value });
    } else {
      updateRow(currentRowForModal, 'description', value);
    }
    setShowSpecModal(false);
    setCurrentRowForModal(null);
  };

  const handleStatusChange = (orderId, status) => {
    setJobOrders(jobOrders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handleJobOrderSelect = (id) => {
    setJobOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, selected: order.id === id} : { ...order, selected: false }
      )
    );
  };

  const handleAcceptJob = () => {
    console.log('Accept Job clicked');
  };

  // Job Orders Slice
  const jobLast = jobPage * jobPerPage;
  const jobFirst = jobLast - jobPerPage;
  const currentJobOrders = jobOrders.slice(jobFirst, jobLast);

  // Job Review Slice
  const reviewLast = reviewPage * reviewPerPage;
  const reviewFirst = reviewLast - reviewPerPage;
  const currentRows = rows.slice(reviewFirst, reviewLast);

  return (
    <div className="page-container">

      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h3 className="page-title">Job Order Acceptance</h3>

        {/* Job Orders Table */}
        <div className="table-container">
                <table className="data-table">
                  <thead className="table-header">
              <tr>
                <th className="table-th">Select</th>
                <th className="table-th">S/No</th>
                <th className="table-th">Lead No</th>
                <th className="table-th">Quotation No</th>
                <th className="table-th">PI No</th>
                <th className="table-th">Sales Person</th>
                <th className="table-th">Customer Name</th>
                <th className="table-th">Advance Amount</th>
                <th className="table-th-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentJobOrders.map((order) => (
                <tr key={order.id} className="table-row">
                  <td className="table-cell">
                    <input
                      type="radio"
                      checked={order.selected}
                      onChange={() => handleJobOrderSelect(order.id)}
                      className="radio-input accent-primary"
                    />
                  </td>
                  <td className="table-cell">{order.sno}.</td>
                  <td className="table-cell">{order.leadNo}</td>
                  <td className="table-cell">{order.quotationNo}</td>
                  <td className="table-cell">{order.piNo}</td>
                  <td className="table-cell">{order.salesPerson}</td>
                  <td className="table-cell">{order.customerName}</td>
                  <td className="table-cell">{order.advanceAmount}</td>
                  <td className="table-cell-center">
                    <div className="table-actions">
                      {order.status === null ? (
                        <>
                          <button 
                            onClick={() => handleStatusChange(order.id, 'accepted')}
                            className="btn-action"
                            title="Accept"
                          >
                            <CheckCircle size={20} color="#10B981" strokeWidth={2.5} />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(order.id, 'rejected')}
                            className="btn-action"
                            title="Reject"
                          >
                            <XCircle size={20} color="#EF4444" strokeWidth={2.5} />
                          </button>
                        </>
                      ) : (
                        <div style={{ fontSize: '14px', fontWeight: '600', color: order.status === 'accepted' ? '#10B981' : '#EF4444' }}>
                          {order.status === 'accepted' ? 'Accept' : 'Reject'}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Job Orders Pagination */}
        <div className="pagination-container">
          <button
            disabled={jobPage === 1}
            onClick={() => setJobPage(jobPage - 1)}
            className={jobPage === 1 ? 'pagination-btn pagination-btn-disabled' : 'pagination-btn pagination-btn-active'}
          >
            <ChevronLeft />
          </button>

          {Array.from({ length: jobTotalPages }, (_, i) => i + 1).map(p => (
            <button 
              key={p} 
              onClick={() => setJobPage(p)}
              className={jobPage === p ? 'pagination-page-btn pagination-page-active' : 'pagination-page-btn pagination-page-inactive'}
            >
              {p}
            </button>
          ))}

          <button
            disabled={jobLast >= jobOrders.length}
            onClick={() => setJobPage(jobPage + 1)}
            className={jobLast >= jobOrders.length ? 'pagination-btn pagination-btn-disabled' : 'pagination-btn pagination-btn-active'}
          >
            <ChevronRight />
          </button>
        </div>
     

      {/* Job Review List - Second Card */}
      <div className="content-card">
        <h3 className="section-title">Job Review List</h3>
          
           <div className="table-container">
                <table className="data-table">
                  <thead className="table-header">
                <tr>
                  <th className="table-th">Sl No</th>
                  <th className="table-th">Description</th>
                  <th className="table-th">Dimension</th>
                  <th className="table-th">No. of Unit</th>
                  <th className="table-th">Amount</th>
                  <th className="table-th">Hidden Amount</th>
                  <th className="table-th-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={row.id} className="table-row">
                    <td className="table-cell">{row.slNo}</td>

                    {/* Description */}
                    <td className="table-cell" style={{ position: 'relative' }}>
                      {editingRow === row.id ? (
                        <div className="dropdown-wrapper">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowSpecDropdown(showSpecDropdown === row.id ? null : row.id);
                            }}
                            onKeyDown={handleDropdownKeyDown}
                            tabIndex={0}
                            style={{
                              width: '100%',
                              minHeight: '34px',
                              padding: '6px 8px',
                              border: '1px solid #D1D5DB',
                              borderRadius: '4px',
                              fontSize: '14px',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              backgroundColor: '#fff'
                            }}
                          >
                            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {row.description}
                            </span>
                            <ChevronDown size={20} style={{ color: '#000000', flexShrink: 0, marginLeft: '8px' }} />
                          </div>

                          {showSpecDropdown === row.id && (
                            <div className="dropdown-menu">
                              {specMasters.map((option, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    updateRow(row.id, "description", option);
                                    setShowSpecDropdown(null);
                                    stopEditing();
                                  }}
                                  tabIndex={0}
                                  className={`dropdown-item-option ${
                                    row.description === option 
                                      ? 'dropdown-item-selected' 
                                      : 'dropdown-item-default'
                                  }`}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.classList.add('dropdown-item-hovered');
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.classList.remove('dropdown-item-hovered');
                                  }}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span>{row.description}</span>
                      )}
                    </td>

                    {/* DIMENSION */}
                    <td className="table-cell">
                      {editingRow === row.id ? (
                        <input
                          type="text"
                          value={row.dimension}
                          onChange={(e) => updateRow(row.id, "dimension", e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && stopEditing()}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      ) : (
                        <span>{row.dimension}</span>
                      )}
                    </td>

                    {/* NO OF UNIT */}
                    <td className="table-cell">
                      {editingRow === row.id ? (
                        <input
                          type="number"
                          value={row.noOfUnit}
                          onChange={(e) =>
                            updateRow(row.id, "noOfUnit", parseInt(e.target.value))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                          style={{
                            width: '80px',
                            padding: '6px 8px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      ) : (
                        <span>{row.noOfUnit}</span>
                      )}
                    </td>

                    {/* AMOUNT */}
                    <td className="table-cell">
                      {editingRow === row.id ? (
                        <input
                          type="number"
                          value={row.amount}
                          onChange={(e) =>
                            updateRow(row.id, "amount", parseFloat(e.target.value))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                          style={{
                            width: '96px',
                            padding: '6px 8px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      ) : (
                        <span>₹ {row.amount.toFixed(2)}</span>
                      )}
                    </td>

                    {/* HIDDEN AMOUNT */}
                    <td className="table-cell">
                      {editingRow === row.id ? (
                        <input
                          type="number"
                          value={row.hiddenAmount}
                          onChange={(e) =>
                            updateRow(row.id, "hiddenAmount", parseFloat(e.target.value))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                          style={{
                            width: '96px',
                            padding: '6px 8px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      ) : (
                        <span>₹ {row.hiddenAmount.toFixed(2)}</span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="table-cell-center">
                      <div className="table-actions">
                        <Plus 
                          size={18} 
                          style={{ color: '#0b9715', cursor: 'pointer' }}
                          onClick={() => {
                            handleInsertRow(row.id);
                            setOpenMenuIndex(null);
                          }}
                        />
                        <Edit2 
                          size={18} 
                          style={{ color: '#000000', cursor: 'pointer' }}
                          onClick={() => {
                            handleEdit(rows.findIndex(r => r.id === row.id));
                            setOpenMenuIndex(null);
                          }} 
                        />
                        <Trash2 
                          size={18} 
                          style={{ color: '#DC2626', cursor: 'pointer' }}
                          onClick={() => {
                            handleDelete(rows.findIndex(r => r.id === row.id));
                            setOpenMenuIndex(null);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          

          {/* Add Form */}
          {showAddForm && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '12px',
              alignItems: 'flex-end',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              {/* SL NO */}
              <div style={{
                backgroundColor: '#F9FAFB',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB'
              }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '6px' }}>
                  Sl No
                </label>
                <input
                  type="text"
                  placeholder="Input"
                  value={newRowData.slNo}
                  onChange={(e) =>
                    setNewRowData({ ...newRowData, slNo: e.target.value })
                  }
                  className="filter-input"
                  style={{ padding: '2px 4px' }}
                />
              </div>

              {/* DESCRIPTION */}
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                position: 'relative',
                gridColumn: 'span 2'
              }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '6px' }}>
                  Description
                </label>
                <div
                  onClick={() => setShowAddSpecDropdown(!showAddSpecDropdown)}
                  style={{
                    width: '100%',
                    minHeight: '34px',
                    padding: '6px 8px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff'
                  }}
                >
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {newRowData.description || "Select description"}
                  </span>
                  <ChevronDown size={16} style={{ color: '#6B7280', flexShrink: 0, marginLeft: '8px' }} />
                </div>
                {showAddSpecDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '10px',
                    right: '10px',
                    backgroundColor: '#fff',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    marginTop: '4px',
                    zIndex: 20,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}>
                    {specMasters.map((spec, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setNewRowData({ ...newRowData, description: spec });
                          setShowAddSpecDropdown(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: '#374151',
                          backgroundColor: newRowData.description === spec ? '#FEE2E2' : 'white',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#A63128';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = newRowData.description === spec ? '#FEE2E2' : 'white';
                          e.currentTarget.style.color = '#374151';
                        }}
                      >
                        {spec}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DIMENSION */}
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB'
              }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '6px' }}>
                  Dimension
                </label>
                <input
                  type="text"
                  placeholder="Input"
                  value={newRowData.dimension}
                  onChange={(e) =>
                    setNewRowData({ ...newRowData, dimension: e.target.value })
                  }
                  className="filter-input"
                  style={{ padding: '2px 4px' }}
                />
              </div>

              {/* NO OF UNIT */}
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB'
              }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '6px' }}>
                  No. of Unit
                </label>
                <input
                  type="text"
                  placeholder="20*8*8.6"
                  value={newRowData.noOfUnit}
                  onChange={(e) =>
                    setNewRowData({ ...newRowData, noOfUnit: e.target.value })
                  }
                  className="filter-input"
                  style={{ padding: '2px 4px' }}
                />
              </div>

              {/* AMOUNT */}
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB'
              }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '6px' }}>
                  Amount
                </label>
                <input
                  type="text"
                  placeholder="₹ 10,00,000"
                  value={newRowData.amount}
                  onChange={(e) =>
                    setNewRowData({ ...newRowData, amount: e.target.value })
                  }
                  className="filter-input"
                  style={{ padding: '2px 4px' }}
                />
              </div>

              {/* HIDDEN AMOUNT */}
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB'
              }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '6px' }}>
                  Hidden Amount
                </label>
                <input
                  type="text"
                  placeholder="₹ 10,00,000"
                  value={newRowData.hiddenAmount}
                  onChange={(e) =>
                    setNewRowData({
                      ...newRowData,
                      hiddenAmount: e.target.value
                    })
                  }
                  className="filter-input"
                  style={{ padding: '2px 4px' }}
                />
              </div>

              {/* SAVE BUTTON */}
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  onClick={handleSaveNewRow}
                  style={{
                    width: '100%',
                    padding: '8px 14px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: '#22C55E',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Review Pagination */}
          <div className="pagination-container">
            <button
              disabled={reviewPage === 1}
              onClick={() => setReviewPage(reviewPage - 1)}
              className={reviewPage === 1 ? 'pagination-btn pagination-btn-disabled' : 'pagination-btn pagination-btn-active'}
            >
              <ChevronLeft /> 
            </button>

            {Array.from({ length: reviewTotalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setReviewPage(p)}
                className={reviewPage === p ? 'pagination-page-btn pagination-page-active' : 'pagination-page-btn pagination-page-inactive'}
              >
                {p}
              </button>
            ))}

            <button
              disabled={reviewLast >= rows.length}
              onClick={() => setReviewPage(reviewPage + 1)}
              className={reviewLast >= rows.length ? 'pagination-btn pagination-btn-disabled' : 'pagination-btn pagination-btn-active'}
            >
              <ChevronRight />
            </button>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              onClick={handleAcceptJob}
              type="button"
              className="btn-search"
            >
              <span>✓</span>
              Accept Job
            </button>
          </div>
      

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn-back">
        <span>←</span>
        <span>Back</span>
      </button>
      </div>
    </div>
    </div>
     </div>
    
  );
}

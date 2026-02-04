import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, ChevronDown, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Menu, ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function JobOrderAcceptance() {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(2);
  const [showAddSpecDropdown, setShowAddSpecDropdown] = useState(false);
  const rowsPerPage = 5;

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
      sno: 3,
      leadNo: 'L-3',
      quotationNo: 'Q-2',
      piNo: 'P-2',
      salesPerson: 'Kumar',
      customerName: 'Kumar',
      advanceAmount: '₹ 15,00,000',
      status: null
    }
  ]);

  // Job Orders Pagination
  const [jobPage, setJobPage] = useState(1);
  const jobTotalPages = Math.ceil(jobOrders.length / rowsPerPage);
  const jobIndexOfLastRow = jobPage * rowsPerPage;
  const jobIndexOfFirstRow = jobIndexOfLastRow - rowsPerPage;
  const currentJobOrders = jobOrders.slice(jobIndexOfFirstRow, jobIndexOfLastRow);

  const [rows, setRows] = useState([
    { id: 1, slNo: 1, description: 'Door - MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000 },
    { id: 2, slNo: 2, description: 'Window - UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 3, slNo: 3, description: 'Flooring - Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 }
  ]);

  // Job Review Pagination
  const [reviewPage, setReviewPage] = useState(1);
  const reviewTotalPages = Math.ceil(rows.length / rowsPerPage);
  const reviewIndexOfLastRow = reviewPage * rowsPerPage;
  const reviewIndexOfFirstRow = reviewIndexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(reviewIndexOfFirstRow, reviewIndexOfLastRow);
  const indexOfFirstRow = reviewIndexOfFirstRow;

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [currentRowForModal, setCurrentRowForModal] = useState(null);
  const [addingRow, setAddingRow] = useState(false);
  const [newRowPosition, setNewRowPosition] = useState(null);
  const [showSpecDropdown, setShowSpecDropdown] = useState(null);

  // Dropdown states
  const [descDropdownOpen, setDescDropdownOpen] = useState(false);
  const [descSearchTerm, setDescSearchTerm] = useState('');
  const [hoveredDesc, setHoveredDesc] = useState(null);

  const descDropdownRef = useRef(null);

  const specMasters = [
    'Door - (7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door',
    'Door - MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW',
    'Window - UPVC sliding window with mesh',
    'Flooring - Vitrified tiles 2x2 feet',
    'Roofing - MS sheet roofing with insulation'
  ].sort();

  const [newRowData, setNewRowData] = useState({
    description: '', 
    dimension: '',
    noOfUnit: '',
    amount: '',
    hiddenAmount: ''
  });

  const [discount, setDiscount] = useState(10000);
  const [gstPercentage, setGstPercentage] = useState(18);
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (descDropdownRef.current && !descDropdownRef.current.contains(event.target)) {
        setDescDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredDescOptions = specMasters.filter(option =>
    option.toLowerCase().includes(descSearchTerm.toLowerCase())
  );

  // Recalculate serial numbers
  const recalculateSerialNumbers = (rowsArray) => {
    return rowsArray.map((row, index) => ({
      ...row,
      slNo: index + 1
    }));
  };

  const handleAddButtonClick = () => {
    setAddingRow(true);
    setNewRowPosition('bottom');
    setNewRowData({
      description: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
    setDescSearchTerm('');
  };

  const handleInsertRow = (afterRowId) => {
    setAddingRow(true);
    setNewRowPosition(afterRowId);
    setOpenMenuIndex(null);
    setNewRowData({
      description: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
    setDescSearchTerm('');
  };

  const handleSaveNewRow = () => {
    const row = {
      id: Date.now(),
      slNo: 0,
      description: newRowData.description,
      dimension: newRowData.dimension,
      noOfUnit: parseFloat(newRowData.noOfUnit) || 0,
      amount: parseFloat(newRowData.amount) || 0,
      hiddenAmount: parseFloat(newRowData.hiddenAmount) || 0
    };

    let newRows;
    if (newRowPosition === 'bottom') {
      newRows = [...rows, row];
    } else {
      const index = rows.findIndex(r => r.id === newRowPosition);
      newRows = [...rows];
      newRows.splice(index + 1, 0, row);
    }

    setRows(recalculateSerialNumbers(newRows));
    setAddingRow(false);
    setNewRowPosition(null);
    setReviewPage(1);
    setNewRowData({ 
      description: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
    setDescSearchTerm('');
  };

  const handleCancelNewRow = () => {
    setAddingRow(false);
    setNewRowPosition(null);
    setNewRowData({
      description: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
    setDescSearchTerm('');
  };

  const stopEditing = () => {
    setEditingRow(null);
    setEditedData({});
    setDescSearchTerm('');
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

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditedData({ ...row });
    setDescSearchTerm(row.description);
    setOpenMenuIndex(null);
  };

  const handleSaveEdit = () => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === editingRow ? { ...editedData } : row
      )
    );
    setEditingRow(null);
    setEditedData({});
    setDescSearchTerm('');
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedData({});
    setDescSearchTerm('');
  };

  const handleDelete = (rowId) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      const newRows = rows.filter(row => row.id !== rowId);
      setRows(recalculateSerialNumbers(newRows));
      setOpenMenuIndex(null);
      setReviewPage(1);
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const actualIndex = indexOfFirstRow + index;
    const newRows = [...rows];
    [newRows[actualIndex - 1], newRows[actualIndex]] = [newRows[actualIndex], newRows[actualIndex - 1]];
    setRows(recalculateSerialNumbers(newRows));
    setOpenMenuIndex(null);
  };

  const handleMoveDown = (index) => {
    const actualIndex = indexOfFirstRow + index;
    if (actualIndex === rows.length - 1) return;
    const newRows = [...rows];
    [newRows[actualIndex], newRows[actualIndex + 1]] = [newRows[actualIndex + 1], newRows[actualIndex]];
    setRows(recalculateSerialNumbers(newRows));
    setOpenMenuIndex(null);
  };

  const updateEditedData = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectDesc = (option, isEdit = false) => {
    if (isEdit) {
      updateEditedData('description', option);
      setDescSearchTerm(option);
    } else {
      setNewRowData({ ...newRowData, description: option });
      setDescSearchTerm(option);
    }
    setDescDropdownOpen(false);
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
        order.id === id ? { ...order, selected: order.id === id } : { ...order, selected: false }
      )
    );
  };

  const handleAcceptJob = () => {
    console.log('Accept Job clicked');
  }; 

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

            {/* Job Orders Pagination */}
            {jobOrders.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={jobPage === 1}
                  onClick={() => setJobPage(p => p - 1)}
                  className={`pagination-btn ${jobPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: jobTotalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setJobPage(page)}
                    className={`pagination-page-btn ${jobPage === page ? 'pagination-page-active' : 'pagination-page-inactive'}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={jobPage === jobTotalPages}
                  onClick={() => setJobPage(p => p + 1)}
                  className={`pagination-btn ${jobPage === jobTotalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Job Review List - Second Card */}
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
                      <React.Fragment key={row.id}>
                        <tr className="table-row">
                          <td className="table-cell">{row.slNo}</td>

                          {/* Description */}
                          <td className="table-cell spec-column">
                            {editingRow === row.id ? (
                              <div ref={descDropdownRef} className="relative">
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={descSearchTerm}
                                    onChange={(e) => {
                                      setDescSearchTerm(e.target.value);
                                      setDescDropdownOpen(true);
                                    }}
                                    onFocus={() => setDescDropdownOpen(true)}
                                    placeholder="Type or select..."
                                    className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                                  />
                                  <ChevronDown
                                    size={16}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                  />
                                </div>
                                {descDropdownOpen && (
                                  <div className="dropdown-menu max-w-[200px]">
                                    {filteredDescOptions.length > 0 ? (
                                      filteredDescOptions.map((option, idx) => (
                                        <div
                                          key={idx}
                                          onClick={() => handleSelectDesc(option, true)}
                                          onMouseEnter={() => setHoveredDesc(option)}
                                          onMouseLeave={() => setHoveredDesc(null)}
                                          className={`dropdown-item-option ${hoveredDesc === option
                                              ? 'dropdown-item-hovered'
                                              : editedData.description === option
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
                            ) : (
                              <span>{row.description}</span>
                            )}
                          </td>

                          {/* Dimension */}
                          <td className="table-cell">
                            {editingRow === row.id ? (
                              <input
                                type="text"
                                value={editedData.dimension}
                                onChange={(e) => updateEditedData('dimension', e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            ) : (
                              <span>{row.dimension}</span>
                            )}
                          </td>

                          {/* No of Unit */}
                          <td className="table-cell">
                            {editingRow === row.id ? (
                              <input
                                type="number"
                                value={editedData.noOfUnit}
                                onChange={(e) => updateEditedData('noOfUnit', parseFloat(e.target.value))}
                                className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            ) : (
                              <span>{row.noOfUnit}</span>
                            )}
                          </td>

                          {/* Amount */}
                          <td className="table-cell">
                            {editingRow === row.id ? (
                              <input
                                type="number"
                                value={editedData.amount}
                                onChange={(e) => updateEditedData('amount', parseFloat(e.target.value))}
                                className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            ) : (
                              <span>₹ {row.amount.toFixed(2)}</span>
                            )}
                          </td>

                          {/* Hidden Amount */}
                          <td className="table-cell">
                            {editingRow === row.id ? (
                              <input
                                type="number"
                                value={editedData.hiddenAmount}
                                onChange={(e) => updateEditedData('hiddenAmount', parseFloat(e.target.value))}
                                className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            ) : (
                              <span>₹ {row.hiddenAmount.toFixed(2)}</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="table-cell-center">
                            {editingRow === row.id ? (
                              <div className="flex gap-2 justify-center">
                                <button onClick={handleSaveEdit} title="Save">
                                  <CheckCircle size={18} className="cursor-pointer text-green-600 hover:opacity-70" />
                                </button>
                                <button onClick={handleCancelEdit} title="Cancel">
                                  <XCircle size={18} className="cursor-pointer text-red-600 hover:opacity-70" />
                                </button>
                              </div>
                            ) : (
                              <div className="table-actions relative">
                                <button onClick={() => toggleMenu(index)} className="btn-action">
                                  <Menu size={18} className="text-gray-700" />
                                </button>

                                {openMenuIndex === index && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-md shadow-md flex gap-2 p-2 z-10">
                                    <ArrowUp
                                      size={18}
                                      className={`${indexOfFirstRow + index === 0
                                          ? 'text-gray-300 cursor-not-allowed'
                                          : 'text-blue-600 cursor-pointer hover:text-blue-800'
                                        }`}
                                      onClick={() => {
                                        if (indexOfFirstRow + index !== 0) {
                                          handleMoveUp(index);
                                        }
                                      }}
                                      title={indexOfFirstRow + index === 0 ? 'Already at top' : 'Move up'}
                                    />
                                    <ArrowDown
                                      size={18}
                                      className={`${indexOfFirstRow + index === rows.length - 1
                                          ? 'text-gray-300 cursor-not-allowed'
                                          : 'text-blue-600 cursor-pointer hover:text-blue-800'
                                        }`}
                                      onClick={() => {
                                        if (indexOfFirstRow + index !== rows.length - 1) {
                                          handleMoveDown(index);
                                        }
                                      }}
                                      title={
                                        indexOfFirstRow + index === rows.length - 1
                                          ? 'Already at bottom'
                                          : 'Move down'
                                      }
                                    />
                                    <Plus
                                      size={18}
                                      className="text-green-600 cursor-pointer"
                                      onClick={() => handleInsertRow(row.id)}
                                      title="Insert Row"
                                    />
                                    <Edit2
                                      size={18}
                                      className="text-gray-700 cursor-pointer"
                                      onClick={() => handleEdit(row)}
                                      title="Edit"
                                    />
                                    <Trash2
                                      size={18}
                                      className="text-red-600 cursor-pointer"
                                      onClick={() => handleDelete(row.id)}
                                      title="Delete"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>

                        {/* Insert new row */}
                        {addingRow && newRowPosition === row.id && (
                          <tr className="table-row bg-blue-50">
                            <td className="table-cell font-bold text-blue-600">
                              {rows.findIndex(r => r.id === row.id) + 2}
                            </td>

                            {/* Description */}
                            <td className="table-cell">
                              <div ref={descDropdownRef} className="relative">
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={descSearchTerm}
                                    onChange={(e) => {
                                      setDescSearchTerm(e.target.value);
                                      setDescDropdownOpen(true);
                                    }}
                                    onFocus={() => setDescDropdownOpen(true)}
                                    placeholder="Type or select..."
                                    className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                                  />
                                  <ChevronDown
                                    size={16}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                  />
                                </div>
                                {descDropdownOpen && (
                                  <div className="dropdown-menu">
                                    {filteredDescOptions.length > 0 ? (
                                      filteredDescOptions.map((option, idx) => (
                                        <div
                                          key={idx}
                                          onClick={() => handleSelectDesc(option, false)}
                                          onMouseEnter={() => setHoveredDesc(option)}
                                          onMouseLeave={() => setHoveredDesc(null)}
                                          className={`dropdown-item-option ${hoveredDesc === option
                                              ? 'dropdown-item-hovered'
                                              : newRowData.description === option
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
                            </td>

                            <td className="table-cell">
                              <input
                                type="text"
                                placeholder="20*8*8.6"
                                value={newRowData.dimension}
                                onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            </td>

                            <td className="table-cell">
                              <input
                                type="number"
                                placeholder="1"
                                value={newRowData.noOfUnit}
                                onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                                className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            </td>

                            <td className="table-cell">
                              <input
                                type="number"
                                placeholder="10000"
                                value={newRowData.amount}
                                onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                                className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            </td>

                            <td className="table-cell">
                              <input
                                type="number"
                                placeholder="10000"
                                value={newRowData.hiddenAmount}
                                onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                                className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            </td>

                            <td className="table-cell-center">
                              <div className="flex gap-2 justify-center">
                                <button onClick={handleSaveNewRow} title="Save">
                                  <CheckCircle size={18} className="cursor-pointer text-green-600 hover:opacity-70" />
                                </button>
                                <button onClick={handleCancelNewRow} title="Cancel">
                                  <XCircle size={18} className="cursor-pointer text-red-600 hover:opacity-70" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}

                    {/* Add row at bottom */}
                    {addingRow && newRowPosition === 'bottom' && (
                      <tr className="table-row bg-blue-50">
                        <td className="table-cell font-bold text-blue-600">{rows.length + 1}</td>

                        <td className="table-cell">
                          <div ref={descDropdownRef} className="relative">
                            <div className="relative">
                              <input
                                type="text"
                                value={descSearchTerm}
                                onChange={(e) => {
                                  setDescSearchTerm(e.target.value);
                                  setDescDropdownOpen(true);
                                }}
                                onFocus={() => setDescDropdownOpen(true)}
                                placeholder="Type or select..."
                                className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                              />
                              <ChevronDown
                                size={16}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                              />
                            </div>
                            {descDropdownOpen && (
                              <div className="dropdown-menu">
                                {filteredDescOptions.length > 0 ? (
                                  filteredDescOptions.map((option, idx) => (
                                    <div
                                      key={idx}
                                      onClick={() => handleSelectDesc(option, false)}
                                      onMouseEnter={() => setHoveredDesc(option)}
                                      onMouseLeave={() => setHoveredDesc(null)}
                                      className={`dropdown-item-option ${hoveredDesc === option
                                          ? 'dropdown-item-hovered'
                                          : newRowData.description === option
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
                        </td>

                        <td className="table-cell">
                          <input
                            type="text"
                            placeholder="20*8*8.6"
                            value={newRowData.dimension}
                            onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            type="number"
                            placeholder="1"
                            value={newRowData.noOfUnit}
                            onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                            className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            type="number"
                            placeholder="10000"
                            value={newRowData.amount}
                            onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                            className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            type="number"
                            placeholder="10000"
                            value={newRowData.hiddenAmount}
                            onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                            className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                          />
                        </td>

                        <td className="table-cell-center">
                          <div className="flex gap-2 justify-center">
                            <button onClick={handleSaveNewRow} title="Save">
                              <CheckCircle size={18} className="cursor-pointer text-green-600 hover:opacity-70" />
                            </button>
                            <button onClick={handleCancelNewRow} title="Cancel">
                              <XCircle size={18} className="cursor-pointer text-red-600 hover:opacity-70" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Add Row Button */}
              <div className="flex justify-end mb-2 mt-2">
                <button
                  onClick={handleAddButtonClick}
                  className="btn-all flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Row
                </button>
              </div> 

              {/* Job Review List Pagination */}
              {rows.length > rowsPerPage && (
                <div className="pagination-container">
                  <button
                    disabled={reviewPage === 1}
                    onClick={() => setReviewPage(p => p - 1)}
                    className={`pagination-btn ${reviewPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: reviewTotalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setReviewPage(page)}
                      className={`pagination-page-btn ${reviewPage === page ? 'pagination-page-active' : 'pagination-page-inactive'}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={reviewPage === reviewTotalPages}
                    onClick={() => setReviewPage(p => p + 1)}
                    className={`pagination-btn ${reviewPage === reviewTotalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

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
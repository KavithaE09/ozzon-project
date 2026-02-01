import React, { useState, useRef, useEffect } from 'react';
import {  Plus,ChevronDown, Printer, Edit2, Trash2 ,ChevronLeft, ChevronRight} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssignTask() {
  const navigate = useNavigate();
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const [selectedRow, setSelectedRow] = useState(2);
  const [showAddSpecDropdown, setShowAddSpecDropdown] = useState(false);
  const [showAddlabourDropdown, setShowAddlabourDropdown] = useState(false);
  const [jobPage, setJobPage] = useState(1);
  const [containerPage, setContainerPage] = useState(1);
  const [rowPage, setRowPage] = useState(1);
  const [jobOrders, setJobOrders] = useState([
    {
      id: 1,
      sno: 1,
      leadNo: 'L-1',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      joborderNo:'J-1',
      joborderDate:'01-01-2026',
      assignDate:'01-01-2026',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh',
      advanceAmount: '₹ 10,00,000'
    },
    {
      id: 2,
      sno: 2,
      leadNo: 'L-2',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      joborderNo:'J-1',
      joborderDate:'01-01-2026',
      assignDate:'01-01-2026',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh',
      advanceAmount: '₹ 10,00,000'
    }
  ]);
  const jobPerPage = 5;
  // Job Orders
  const jobTotalPages = Math.ceil(jobOrders.length / jobPerPage);
  const jobStart = (jobPage - 1) * jobPerPage;
  const jobData = jobOrders.slice(jobStart, jobStart + jobPerPage);

  const [formData, setformData] = useState({
    expecteddate: getTodayDate(),
  });
  const [rows, setRows] = useState([
    { id: 1, slNo: 1, description: 'Door - MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000, assignLabour: 'Kumar',expecteddate: '28-01-2026' ,remark:'kumar'},
    { id: 2, slNo: 2, description: 'Window - UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000, assignLabour: 'Raneesh',expecteddate: '28-01-2026' ,remark:'kumar' },
    { id: 3, slNo: 3, description: 'Flooring - Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000, assignLabour: 'Varshini' ,expecteddate: '28-01-2026',remark:'kumar' },
    { id: 4, slNo: 4, description: 'Roofing - MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000, assignLabour: 'Sasi',expecteddate: '28-01-2026',remark:'kumar'  }
  ]);
  const rowPerPage = 5;
  // Rows
  const rowTotalPages = Math.ceil(rows.length / rowPerPage);
  const rowStart = (rowPage - 1) * rowPerPage;
  const rowData = rows.slice(rowStart, rowStart + rowPerPage);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [currentRowForModal, setCurrentRowForModal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [insertAfterRowId, setInsertAfterRowId] = useState(null);
  const [showSpecDropdown, setShowSpecDropdown] = useState(null);
  const [showlabourDropdown, setShowlabourDropdown] = useState(null);
  const [showlabourModal, setshowlabourModal] = useState(false);
  
  const specMasters = [
    'Door - (7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door',
    'Window - UPVC sliding window with mesh',
    'Flooring - Vitrified tiles 2x2 feet',
    'Roofing - MS sheet roofing with insulation'
  ];
  const specLabour = [
    'Kumar',
    'Raneesh',
    'Varshini',
    'Sasi'
  ];
  const [containers, setContainers] = useState([
    { id: 1, selected: false, sNo: 1, containerNo: 'TCKU 1524662', partyName: 'Christine Brooks', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04-09-2019', photo: '', status: '' },
    { id: 2, selected: false, sNo: 2, containerNo: 'TCKU 1524662', partyName: 'Rosie Pearson', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04 Sep 2019', photo: '', status: '' }
  ]);
  const containerPerPage = 5;
  // Containers
  const containerTotalPages = Math.ceil(containers.length / containerPerPage);
  const containerStart = (containerPage - 1) * containerPerPage;
  const containerData = containers.slice(containerStart, containerStart + containerPerPage);

  const [newRowData, setNewRowData] = useState({
    slNo: '',
    description: '',
    dimension: '',
    noOfUnit: '',
    amount: '',
    hiddenAmount: '',
    assignLabour:'',
    expecteddate:getTodayDate(),
    remark:''
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
      hiddenAmount: parseFloat(newRowData.hiddenAmount) || 0,
      assignLabour: newRowData.assignLabour,
      expecteddate: newRowData.expecteddate,
      remark: newRowData.remark
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
      hiddenAmount: '',
      assignLabour:'',
      expecteddate:getTodayDate(),
      remark:''
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
    setRows(prevRows => prevRows.filter((_, i) => i !== index));
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

  const selectMaster = (type, value) => {
    if (currentRowForModal === 'newRow') {
      setNewRowData({ ...newRowData, assignLabour: value });
    } else {
      updateRow(currentRowForModal, 'assignLabour', value);
    }
    setshowlabourModal(false);
    setCurrentRowForModal(null);
  };

  const handleStatusChange = (orderId, status) => {
    setJobOrders(jobData.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handleContainerSelect = (id) => {
    setContainers(prev =>
      prev.map(container =>
        container.id === id
          ? { ...container, selected: true }
          : { ...container, selected: false }
      )
    );
  };

  const handleJobOrderSelect = (id) => {
    setJobOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, selected: !order.selected } : { ...order, selected: false }
      )
    );
  };

  const handlePrintJobOrder = (index, e) => {
    e.stopPropagation();
    const row = jobOrders[index];
    alert(`Print Job Order: ${row.leadNo}`);
  };

  const handleEditJobOrder = (index, e) => {
    e.stopPropagation();
    setJobOrders(prev =>
      prev.map((order, i) => 
        i === index ? { ...order, isEditing: true } : order
      )
    );
  };

  const handleSaveJobOrder = (index, e) => {
    e.stopPropagation();
    setJobOrders(prev =>
      prev.map((order, i) => 
        i === index ? { ...order, isEditing: false } : order
      )
    );
  };

  const handleJobOrderFieldChange = (index, field, value) => {
    setJobOrders(prev =>
      prev.map((order, i) => 
        i === index ? { ...order, [field]: value } : order
      )
    );
  };

  const handleAcceptJob = () => {
    console.log('Accept Job clicked');
  };

  const handleDeleteJobOrder = (index, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this job order?')) {
      const updatedData = jobOrders.filter((_, i) => i !== index);
      setJobOrders(updatedData);
    }
  };

  const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(p => p - 1)}
        className={`pagination-btn ${currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
      >
        <ChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`pagination-page-btn ${currentPage === page ? 'pagination-page-active' : 'pagination-page-inactive'}`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(p => p + 1)}
        className={`pagination-btn ${currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
      >
        <ChevronRight />
      </button>
    </div>
  );

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Assign Task</h2>
            <h4 className="section-title" style={{ marginLeft: '20px' }}>Accepted Job List</h4>
            
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
                    <th className="table-th">Job Order No</th>
                    <th className="table-th">Job Order Date</th>
                    <th className="table-th">Assign Date</th>
                    <th className="table-th">Sales Person</th>
                    <th className="table-th">Customer Name</th>
                    <th className="table-th-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobOrders.map((order, index) => (
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
                      <td className="table-cell">
                        {order.isEditing ? (
                          <input
                            type="text"
                            value={order.leadNo}
                            onChange={(e) => handleJobOrderFieldChange(index, 'leadNo', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          order.leadNo
                        )}
                      </td>
                      <td className="table-cell">
                        {order.isEditing ? (
                          <input
                            type="text"
                            value={order.quotationNo}
                            onChange={(e) => handleJobOrderFieldChange(index, 'quotationNo', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          order.quotationNo
                        )}
                      </td>
                      <td className="table-cell">
                        {order.isEditing ? (
                          <input
                            type="text"
                            value={order.piNo}
                            onChange={(e) => handleJobOrderFieldChange(index, 'piNo', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          order.piNo
                        )}
                      </td>
                      <td className="table-cell">
                        {order.isEditing ? (
                          <input
                            type="text"
                            value={order.joborderNo}
                            onChange={(e) => handleJobOrderFieldChange(index, 'joborderNo', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          order.joborderNo
                        )}
                      </td>
                      <td className="table-cell">
                        {order.isEditing ? (
                          <input
                            type="text"
                            value={order.joborderDate}
                            onChange={(e) => handleJobOrderFieldChange(index, 'joborderDate', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          order.joborderDate
                        )}
                      </td>
                      <td className="table-cell">
                        {order.isEditing ? (
                          <input
                            type="text"
                            value={order.assignDate}
                            onChange={(e) => handleJobOrderFieldChange(index, 'assignDate', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          order.assignDate
                        )}
                      </td>
                      <td className="table-cell">
                        {order.isEditing ? (
                          <input
                            type="text"
                            value={order.salesPerson}
                            onChange={(e) => handleJobOrderFieldChange(index, 'salesPerson', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          order.salesPerson
                        )}
                      </td>
                      <td className="table-cell">
                        {order.isEditing ? (
                          <input
                            type="text"
                            value={order.customerName}
                            onChange={(e) => handleJobOrderFieldChange(index, 'customerName', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          order.customerName
                        )}
                      </td>
                      <td className="table-cell-center">
                        <div className="table-actions">
                          {order.isEditing ? (
                            <button onClick={(e) => handleSaveJobOrder(index, e)} className="btn-smallbtn">
                              Save
                            </button>
                          ) : (
                            <>
                              <button onClick={(e) => handlePrintJobOrder(index, e)} className="btn-action" title="Print">
                              <Printer size={18}className="print-primary"/>
                              </button>
                              <button onClick={(e) => handleEditJobOrder(index, e)} className="btn-action" title="Edit">
                                <Edit2 size={18} />
                              </button>
                              <button onClick={(e) => handleDeleteJobOrder(index, e)} className="btn-action" title="Delete">
                                <Trash2 size={18} className="text-primary" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={jobPage} totalPages={jobTotalPages} setCurrentPage={setJobPage} />

            {/* Container List */}
            <div className="filter-section">
              <h3 className="section-title">Container List</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-th">Select</th>
                      <th className="table-th">S/No</th>
                      <th className="table-th">Container No</th>
                      <th className="table-th">Party Name</th>
                      <th className="table-th">Sz/Type</th>
                      <th className="table-th">Grade</th>
                      <th className="table-th">Liner</th>
                      <th className="table-th">Yard</th>
                      <th className="table-th">MFG Date</th>
                      <th className="table-th">In Date</th>
                      <th className="table-th">Delivery Date</th>
                      <th className="table-th">Photo</th>
                      <th className="table-th">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {containerData.map((container) => (
                      <tr key={container.id} className="table-row">
                        <td className="table-cell">
                          <input
                            type="radio"
                            checked={container.selected}
                            onChange={() => handleContainerSelect(container.id)}
                            className="radio-input accent-primary"
                          />
                        </td>
                        <td className="table-cell">{container.sNo}.</td>
                        <td className="table-cell">{container.containerNo}</td>
                        <td className="table-cell">{container.partyName}</td>
                        <td className="table-cell">{container.szType}</td>
                        <td className="table-cell">{container.grade}</td>
                        <td className="table-cell">{container.liner}</td>
                        <td className="table-cell">{container.yard}</td>
                        <td className="table-cell">{container.mfgDate}</td>
                        <td className="table-cell">{container.inDate}</td>
                        <td className="table-cell">{container.deliveryDate}</td>
                        <td className="table-cell">{container.photo}</td>
                        <td className="table-cell">{container.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination currentPage={containerPage} totalPages={containerTotalPages} setCurrentPage={setContainerPage} />

            {/* Job Review List */}
            <div className="filter-section">
              <h3 className="section-title">Job Review List</h3>
              <div className="table-container">
                <table className="data-table" style={{ minWidth: '1100px' }}>
                  <thead className="table-header">
                    <tr>
                      <th className="table-th">Sl No</th>
                      <th className="table-th">Description</th>
                      <th className="table-th">Dimension</th>
                      <th className="table-th">No. of Unit</th>
                      <th className="table-th">Amount</th>
                      <th className="table-th">Hidden Amount</th>
                      <th className="table-th">Assign Labour</th>
                      <th className="table-th">Expected Date</th>
                      <th className="table-th">Remark</th>
                      <th className="table-th-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowData.map((row, index) => (
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
                                className="dropdown-input"
                                style={{
                                  minHeight: '34px',
                                  padding: '6px 8px',
                                  border: '1px solid #D1D5DB',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.description}</span>
                                <ChevronDown size={16} className="dropdown-icon" />
                              </div>

                              {showSpecDropdown === row.id && (
                                <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                  {specMasters.map((option, idx) => (
                                    <div
                                      key={idx}
                                      onClick={() => {
                                        updateRow(row.id, 'description', option);
                                        setShowSpecDropdown(null);
                                        stopEditing();
                                      }}
                                      className={`dropdown-item-option ${row.description === option ? 'dropdown-item-selected' : 'dropdown-item-default'}`}
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

                        {/* Dimension */}
                        <td className="table-cell">
                          {editingRow === row.id ? (
                            <input
                              type="text"
                              value={row.dimension}
                              onChange={(e) => updateRow(row.id, 'dimension', e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="master-edit-input"
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
                              value={row.noOfUnit}
                              onChange={(e) => updateRow(row.id, 'noOfUnit', parseInt(e.target.value))}
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="master-edit-input"
                              style={{ width: '80px' }}
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
                              value={row.amount}
                              onChange={(e) => updateRow(row.id, 'amount', parseFloat(e.target.value))}
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="master-edit-input"
                              style={{ width: '96px' }}
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
                              value={row.hiddenAmount}
                              onChange={(e) => updateRow(row.id, 'hiddenAmount', parseFloat(e.target.value))}
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="master-edit-input"
                              style={{ width: '96px' }}
                            />
                          ) : (
                            <span>₹ {row.hiddenAmount.toFixed(2)}</span>
                          )}
                        </td>

                        {/* Assign Labour */}
                        <td className="table-cell" style={{ position: 'relative' }}>
                          {editingRow === row.id ? (
                            <div className="dropdown-wrapper">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowlabourDropdown(showlabourDropdown === row.id ? null : row.id);
                                }}
                                onKeyDown={handleDropdownKeyDown}
                                tabIndex={0}
                                className="dropdown-input"
                                style={{
                                  minHeight: '34px',
                                  padding: '6px 8px',
                                  border: '1px solid #D1D5DB',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.assignLabour}</span>
                                <ChevronDown size={16} className="dropdown-icon" />
                              </div>

                              {showlabourDropdown === row.id && (
                                <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                  {specLabour.map((option, idx) => (
                                    <div
                                      key={idx}
                                      onClick={() => {
                                        updateRow(row.id, 'assignLabour', option);
                                        setShowlabourDropdown(null);
                                        stopEditing();
                                      }}
                                      className={`dropdown-item-option ${row.assignLabour === option ? 'dropdown-item-selected' : 'dropdown-item-default'}`}
                                    >
                                      {option}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span>{row.assignLabour}</span>
                          )}
                        </td>

                        {/* Expected Date */}
                        <td className="table-cell">
                          {editingRow === row.id ? (
                            <input
                              type="date"
                              value={row.expecteddate}
                              onChange={(e) => updateRow(row.id, 'expecteddate', e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="master-edit-input"
                              style={{ width: '120px' }}
                            />
                          ) : (
                            <span>{row.expecteddate}</span>
                          )}
                        </td>

                        {/* Remark */}
                        <td className="table-cell">
                          {editingRow === row.id ? (
                            <input
                              type="text"
                              value={row.remark}
                              onChange={(e) => updateRow(row.id, 'remark', e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                              className="master-edit-input"
                              style={{ width: '100px' }}
                            />
                          ) : (
                            <span>{row.remark}</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="table-cell-center">
                          <div className="table-actions">
                            <Plus
                              size={18}
                              className="add-primary"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                handleInsertRow(row.id);
                                setOpenMenuIndex(null);
                              }}
                            />
                            <Edit2
                              size={18}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                handleEdit(index);
                                setOpenMenuIndex(null);
                              }}
                            />
                            <Trash2
                              size={18}
                              className="text-primary"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                handleDelete(index);
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
              <Pagination currentPage={rowPage} totalPages={rowTotalPages} setCurrentPage={setRowPage} />
              
          {/* Back Button */}
          <div className="filter-grid" >

            <div className="btn-container">
          <button onClick={() => navigate(-1)} className="btn-back">
            <span>←</span>
            <span>Back</span>
          </button>
          </div>
          <div></div>
          <div></div>
              {/* Submit Button */}
              <div className="btn-container">
                <button onClick={handleAcceptJob} className="btn-search">
                  <span>✓</span>
                  Assign Task
                </button>
                </div>
              </div>
              </div>

              {showAddForm && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(10, 1fr)',
                    gap: '12px',
                    alignItems: 'flex-end',
                    paddingBottom: '8px',
                    marginBottom: '20px'
                  }}
                >
                  {/* Sl No */}
                  <div className="filter-grid-red">
                    <label className="filter-label" style={{ fontSize: '12px' }}>Sl No</label>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.slNo}
                      onChange={(e) => setNewRowData({ ...newRowData, slNo: e.target.value })}
                      className="filter-input"
                    />
                  </div>

                  {/* Description */}
                  <div className="filter-grid-red" style={{ gridColumn: 'span 2', position: 'relative' }}>
                    <label className="filter-label" style={{ fontSize: '12px' }}>Description</label>
                    <div className="dropdown-wrapper">
                      <div
                        onClick={() => setShowAddSpecDropdown(!showAddSpecDropdown)}
                        className="dropdown-input"
                        style={{
                          minHeight: '34px',
                          padding: '6px 8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {newRowData.description || 'Select description'}
                        </span>
                        <ChevronDown size={16} className="dropdown-icon" />
                      </div>
                      {showAddSpecDropdown && (
                        <div className="dropdown-menu" style={{ zIndex: 20 }}>
                          {specMasters.map((spec, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setNewRowData({ ...newRowData, description: spec });
                                setShowAddSpecDropdown(false);
                              }}
                              className={`dropdown-item-option ${newRowData.description === spec ? 'dropdown-item-selected' : 'dropdown-item-default'}`}
                            >
                              {spec}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dimension */}
                  <div className="filter-grid-red">
                    <label className="filter-label" style={{ fontSize: '12px' }}>Dimension</label>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.dimension}
                      onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                      className="filter-input"
                    />
                  </div>

                  {/* No of Unit */}
                  <div className="filter-grid-red">
                    <label className="filter-label" style={{ fontSize: '12px' }}>No. of Unit</label>
                    <input
                      type="text"
                      placeholder="20*8*8.6"
                      value={newRowData.noOfUnit}
                      onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                      className="filter-input"
                    />
                  </div>

                  {/* Amount */}
                  <div className="filter-grid-red">
                    <label className="filter-label" style={{ fontSize: '12px' }}>Amount</label>
                    <input
                      type="text"
                      placeholder="₹ 10,00,000"
                      value={newRowData.amount}
                      onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                      className="filter-input"
                    />
                  </div>

                  {/* Hidden Amount */}
                  <div className="filter-grid-red">
                    <label className="filter-label" style={{ fontSize: '12px' }}>Hidden Amount</label>
                    <input
                      type="text"
                      placeholder="₹ 10,00,000"
                      value={newRowData.hiddenAmount}
                      onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                      className="filter-input"
                    />
                  </div>

                  {/* Assign Labour */}
                  <div className="filter-grid-red" style={{ gridColumn: 'span 2', position: 'relative' }}>
                    <label className="filter-label" style={{ fontSize: '12px' }}>Assign Labour</label>
                    <div className="dropdown-wrapper">
                      <div
                        onClick={() => setShowAddlabourDropdown(!showAddlabourDropdown)}
                        className="dropdown-input"
                        style={{
                          minHeight: '34px',
                          padding: '6px 8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {newRowData.assignLabour || 'Select labour'}
                        </span>
                        <ChevronDown size={16} className="dropdown-icon" />
                      </div>
                      {showAddlabourDropdown && (
                        <div className="dropdown-menu" style={{ zIndex: 20 }}>
                          {specLabour.map((labour, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setNewRowData({ ...newRowData, assignLabour: labour });
                                setShowAddlabourDropdown(false);
                              }}
                              className={`dropdown-item-option ${newRowData.assignLabour === labour ? 'dropdown-item-selected' : 'dropdown-item-default'}`}
                            >
                              {labour}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expected Date */}
                  <div className="filter-grid-red">
                    <label className="filter-label" style={{ fontSize: '12px' }}>Expected Date</label>
                    <input
                      type="date"
                      value={newRowData.expecteddate}
                      onChange={(e) => setNewRowData({ ...newRowData, expecteddate: e.target.value })}
                      className="filter-input"
                    />
                  </div>

                  {/* Remark */}
                  <div className="filter-grid-red">
                    <label className="filter-label" style={{ fontSize: '12px' }}>Remark</label>
                    <input
                      type="text"
                      placeholder="kumar"
                      value={newRowData.remark}
                      onChange={(e) => setNewRowData({ ...newRowData, remark: e.target.value })}
                      className="filter-input"
                    />
                  </div>

                  {/* Save Button */}
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button onClick={handleSaveNewRow} className="btn-smallbtn" style={{ width: '100%', padding: '8px 14px' }}>
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
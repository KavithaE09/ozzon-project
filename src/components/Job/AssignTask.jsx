import React, { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown, Printer, Edit2, Trash2, ChevronLeft, ChevronRight, ArrowUp, ArrowDown,Undo2, Menu, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssignTask() {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState(null);
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedRow, setSelectedRow] = useState(2); 
  const [jobPage, setJobPage] = useState(1);
  const [containerPage, setContainerPage] = useState(1);
  const [rowPage, setRowPage] = useState(1);
  
  const rowsPerPage = 5; // Changed from different names to consistent name
  
  const [jobOrders, setJobOrders] = useState([
    {
      id: 1,
      sno: 1,
      leadNo: 'L-1',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      joborderNo: 'J-1',
      joborderDate: '01-01-2026',
      assignDate: '01-01-2026',
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
      joborderNo: 'J-1',
      joborderDate: '01-01-2026',
      assignDate: '01-01-2026',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh',
      advanceAmount: '₹ 10,00,000'
    }
  ]);
  
  // Job Orders Pagination
  const jobTotalPages = Math.ceil(jobOrders.length / rowsPerPage); 
  const jobIndexOfLastRow = jobPage * rowsPerPage;
  const jobIndexOfFirstRow = jobIndexOfLastRow - rowsPerPage;
  const jobData = jobOrders.slice(jobIndexOfFirstRow, jobIndexOfLastRow);
 
  const [rows, setRows] = useState([
    { id: 1, slNo: 1, description: 'Door - (7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000, assignLabour: 'Kumar', expecteddate: getTodayDate(), remark: 'kumar' },
    { id: 2, slNo: 2, description: 'Window - UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000, assignLabour: 'Raneesh', expecteddate: getTodayDate(), remark: 'kumar' },
    { id: 3, slNo: 3, description: 'Flooring - Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000, assignLabour: 'Varshini', expecteddate: getTodayDate(), remark: 'kumar' }
  ]);

  // Job Review List Pagination
  const rowTotalPages = Math.ceil(rows.length / rowsPerPage); 
  const rowIndexOfLastRow = rowPage * rowsPerPage;
  const rowIndexOfFirstRow = rowIndexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(rowIndexOfFirstRow, rowIndexOfLastRow);
  const indexOfFirstRow = rowIndexOfFirstRow;

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [addingRow, setAddingRow] = useState(false);
  const [newRowPosition, setNewRowPosition] = useState(null);

  // Dropdown states
  const [descDropdownOpen, setDescDropdownOpen] = useState(false);
  const [labourDropdownOpen, setLabourDropdownOpen] = useState(false);
  const [descSearchTerm, setDescSearchTerm] = useState('');
  const [labourSearchTerm, setLabourSearchTerm] = useState('');
  const [hoveredDesc, setHoveredDesc] = useState(null);
  const [hoveredLabour, setHoveredLabour] = useState(null);
  
  const descDropdownRef = useRef(null);
  const labourDropdownRef = useRef(null);

  const specMasters = [
    'Door - (7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door',
    'Window - UPVC sliding window with mesh',
    'Flooring - Vitrified tiles 2x2 feet',
    'Roofing - MS sheet roofing with insulation'
  ].sort();

  const specLabour = ['Kumar', 'Raneesh', 'Varshini', 'Sasi'].sort();

  const [containers, setContainers] = useState([
    { id: 1, selected: false, sNo: 1, containerNo: 'TCKU 1524662', partyName: 'Christine Brooks', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04-09-2019', photo: '', status: '' },
    { id: 2, selected: false, sNo: 2, containerNo: 'TCKU 1524662', partyName: 'Rosie Pearson', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04 Sep 2019', photo: '', status: '' },
    { id: 3, selected: false, sNo: 3, containerNo: 'TCKU 1524663', partyName: 'John Doe', szType: '40"', grade: 'A', liner: 'Yes', yard: 'Global', mfgDate: '05-09-2019', inDate: '05-09-2019', deliveryDate: '05 Sep 2019', photo: '', status: 'Active' },
  ])
  
  // Container List Pagination
  const containerTotalPages = Math.ceil(containers.length / rowsPerPage);
  const containerIndexOfLastRow = containerPage * rowsPerPage;
  const containerIndexOfFirstRow = containerIndexOfLastRow - rowsPerPage;
  const containerData = containers.slice(containerIndexOfFirstRow, containerIndexOfLastRow);

  const [newRowData, setNewRowData] = useState({ 
    description: '',
    dimension: '',
    noOfUnit: '',
    amount: '',
    hiddenAmount: '',
    assignLabour: '',
    expecteddate: getTodayDate(),
    remark: ''
  }); 

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (descDropdownRef.current && !descDropdownRef.current.contains(event.target)) {
        setDescDropdownOpen(false);
      }
      if (labourDropdownRef.current && !labourDropdownRef.current.contains(event.target)) {
        setLabourDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside); 
  }, []); 

  // Filter options based on search term
  const filteredDescOptions = specMasters.filter(option =>
    option.toLowerCase().includes(descSearchTerm.toLowerCase())
  );

  const filteredLabourOptions = specLabour.filter(option =>
    option.toLowerCase().includes(labourSearchTerm.toLowerCase())
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
      hiddenAmount: '',
      assignLabour: '',
      expecteddate: getTodayDate(),
      remark: ''
    });
    setDescSearchTerm('');
    setLabourSearchTerm('');
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
      hiddenAmount: '',
      assignLabour: '',
      expecteddate: getTodayDate(),
      remark: ''
    });
    setDescSearchTerm('');
    setLabourSearchTerm('');
  };

  const handleSaveNewRow = () => {
    const row = {
      id: Date.now(),
      slNo: 0,
      description: newRowData.description,
      dimension: newRowData.dimension,
      noOfUnit: parseFloat(newRowData.noOfUnit) || 0,
      amount: parseFloat(newRowData.amount) || 0,
      hiddenAmount: parseFloat(newRowData.hiddenAmount) || 0,
      assignLabour: newRowData.assignLabour,
      expecteddate: newRowData.expecteddate,
      remark: newRowData.remark
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
    setRowPage(1);
    setNewRowData({ 
      description: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: '',
      assignLabour: '',
      expecteddate: getTodayDate(),
      remark: ''
    });
    setDescSearchTerm('');
    setLabourSearchTerm('');
  };

  const handleCancelNewRow = () => {
    setAddingRow(false);
    setNewRowPosition(null);
    setNewRowData({
      description: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: '',
      assignLabour: '',
      expecteddate: getTodayDate(),
      remark: ''
    });
    setDescSearchTerm('');
    setLabourSearchTerm('');
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(prev => (prev === index ? null : index));
  };

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditedData({ ...row });
    setDescSearchTerm(row.description);
    setLabourSearchTerm(row.assignLabour);
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
    setLabourSearchTerm('');
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedData({});
    setDescSearchTerm('');
    setLabourSearchTerm('');
  };

  const handleDelete = (rowId) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      const newRows = rows.filter(row => row.id !== rowId);
      setRows(recalculateSerialNumbers(newRows));
      setOpenMenuIndex(null);
      setRowPage(1);
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

  const handleSelectLabour = (option, isEdit = false) => {
    if (isEdit) {
      updateEditedData('assignLabour', option);
      setLabourSearchTerm(option);
    } else {
      setNewRowData({ ...newRowData, assignLabour: option });
      setLabourSearchTerm(option);
    }
    setLabourDropdownOpen(false);
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
    console.log('Assign Task clicked');
  };

  const handleDeleteJobOrder = (index, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this job order?')) {
      const updatedData = jobOrders.filter((_, i) => i !== index);
      setJobOrders(updatedData);
    }
  };
 
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <div className="page-header">
              <h1 className="page-title">Assign Task</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2   className="page-back-icon" />
              </button>
            </div>
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
                  {jobData.map((order, index) => (
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
                            onChange={(e) => handleJobOrderFieldChange(jobIndexOfFirstRow + index, 'leadNo', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                            onChange={(e) => handleJobOrderFieldChange(jobIndexOfFirstRow + index, 'quotationNo', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                            onChange={(e) => handleJobOrderFieldChange(jobIndexOfFirstRow + index, 'piNo', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                            onChange={(e) => handleJobOrderFieldChange(jobIndexOfFirstRow + index, 'joborderNo', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                            onChange={(e) => handleJobOrderFieldChange(jobIndexOfFirstRow + index, 'joborderDate', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                            onChange={(e) => handleJobOrderFieldChange(jobIndexOfFirstRow + index, 'assignDate', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                            onChange={(e) => handleJobOrderFieldChange(jobIndexOfFirstRow + index, 'salesPerson', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                            onChange={(e) => handleJobOrderFieldChange(jobIndexOfFirstRow + index, 'customerName', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                          />
                        ) : (
                          order.customerName
                        )}
                      </td>
                      <td className="table-cell-center">
                        <div className="table-actions">
                          {order.isEditing ? (
                            <button onClick={(e) => handleSaveJobOrder(jobIndexOfFirstRow + index, e)} className="btn-smallbtn">
                              Save
                            </button>
                          ) : (
                            <>
                              <button onClick={(e) => handlePrintJobOrder(jobIndexOfFirstRow + index, e)} className="btn-action" title="Print">
                                <Printer size={18} className="print-primary" />
                              </button>
                              <button onClick={(e) => handleEditJobOrder(jobIndexOfFirstRow + index, e)} className="btn-action" title="Edit">
                                <Edit2 size={18} />
                              </button>
                              <button onClick={(e) => handleDeleteJobOrder(jobIndexOfFirstRow + index, e)} className="btn-action" title="Delete">
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
            
            {/* Container Pagination */}
            {containers.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={containerPage === 1}
                  onClick={() => setContainerPage(p => p - 1)}
                  className={`pagination-btn ${containerPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: containerTotalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setContainerPage(page)}
                    className={`pagination-page-btn ${containerPage === page ? 'pagination-page-active' : 'pagination-page-inactive'}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={containerPage === containerTotalPages}
                  onClick={() => setContainerPage(p => p + 1)}
                  className={`pagination-btn ${containerPage === containerTotalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Job Review List */}
            <div className="filter-section">
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
                      <th className="table-th">Assign Labour</th>
                      <th className="table-th">Expected Date</th>
                      <th className="table-th">Remark</th>
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
                                          className={`dropdown-item-option ${
                                            hoveredDesc === option
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

                          {/* Assign Labour */}
                          <td className="table-cell">
                            {editingRow === row.id ? (
                              <div ref={labourDropdownRef} className="relative">
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={labourSearchTerm}
                                    onChange={(e) => {
                                      setLabourSearchTerm(e.target.value);
                                      setLabourDropdownOpen(true);
                                    }}
                                    onFocus={() => setLabourDropdownOpen(true)}
                                    placeholder="Type or select..."
                                    className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                                  />
                                  <ChevronDown
                                    size={16}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                  />
                                </div>
                                {labourDropdownOpen && (
                                  <div className="dropdown-menu">
                                    {filteredLabourOptions.length > 0 ? (
                                      filteredLabourOptions.map((option, idx) => (
                                        <div
                                          key={idx}
                                          onClick={() => handleSelectLabour(option, true)}
                                          onMouseEnter={() => setHoveredLabour(option)}
                                          onMouseLeave={() => setHoveredLabour(null)}
                                          className={`dropdown-item-option ${
                                            hoveredLabour === option
                                              ? 'dropdown-item-hovered'
                                              : editedData.assignLabour === option
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
                              <span>{row.assignLabour}</span>
                            )}
                          </td>

                          {/* Expected Date */}
                          <td className="table-cell">
                            {editingRow === row.id ? (
                              <input
                                type="date"
                                value={editedData.expecteddate}
                                onChange={(e) => updateEditedData('expecteddate', e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                                value={editedData.remark}
                                onChange={(e) => updateEditedData('remark', e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            ) : (
                              <span>{row.remark}</span>
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
                                      className={`${
                                        indexOfFirstRow + index === 0
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
                                      className={`${
                                        indexOfFirstRow + index === rows.length - 1
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
                                          className={`dropdown-item-option ${
                                            hoveredDesc === option
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

                            {/* Assign Labour */}
                            <td className="table-cell">
                              <div ref={labourDropdownRef} className="relative">
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={labourSearchTerm}
                                    onChange={(e) => {
                                      setLabourSearchTerm(e.target.value);
                                      setLabourDropdownOpen(true);
                                    }}
                                    onFocus={() => setLabourDropdownOpen(true)}
                                    placeholder="Type or select..."
                                    className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                                  />
                                  <ChevronDown
                                    size={16}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                  />
                                </div>
                                {labourDropdownOpen && (
                                  <div className="dropdown-menu">
                                    {filteredLabourOptions.length > 0 ? (
                                      filteredLabourOptions.map((option, idx) => (
                                        <div
                                          key={idx}
                                          onClick={() => handleSelectLabour(option, false)}
                                          onMouseEnter={() => setHoveredLabour(option)}
                                          onMouseLeave={() => setHoveredLabour(null)}
                                          className={`dropdown-item-option ${
                                            hoveredLabour === option
                                              ? 'dropdown-item-hovered'
                                              : newRowData.assignLabour === option
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
                                type="date"
                                value={newRowData.expecteddate}
                                onChange={(e) => setNewRowData({ ...newRowData, expecteddate: e.target.value })}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                              />
                            </td>

                            <td className="table-cell">
                              <input
                                type="text"
                                placeholder="Remark"
                                value={newRowData.remark}
                                onChange={(e) => setNewRowData({ ...newRowData, remark: e.target.value })}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                                      className={`dropdown-item-option ${
                                        hoveredDesc === option
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

                        <td className="table-cell">
                          <div ref={labourDropdownRef} className="relative">
                            <div className="relative">
                              <input
                                type="text"
                                value={labourSearchTerm}
                                onChange={(e) => {
                                  setLabourSearchTerm(e.target.value);
                                  setLabourDropdownOpen(true);
                                }}
                                onFocus={() => setLabourDropdownOpen(true)}
                                placeholder="Type or select..."
                                className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                              />
                              <ChevronDown
                                size={16}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                              />
                            </div>
                            {labourDropdownOpen && (
                              <div className="dropdown-menu">
                                {filteredLabourOptions.length > 0 ? (
                                  filteredLabourOptions.map((option, idx) => (
                                    <div
                                      key={idx}
                                      onClick={() => handleSelectLabour(option, false)}
                                      onMouseEnter={() => setHoveredLabour(option)}
                                      onMouseLeave={() => setHoveredLabour(null)}
                                      className={`dropdown-item-option ${
                                        hoveredLabour === option
                                          ? 'dropdown-item-hovered'
                                          : newRowData.assignLabour === option
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
                            type="date"
                            value={newRowData.expecteddate}
                            onChange={(e) => setNewRowData({ ...newRowData, expecteddate: e.target.value })}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            type="text"
                            placeholder="Remark"
                            value={newRowData.remark}
                            onChange={(e) => setNewRowData({ ...newRowData, remark: e.target.value })}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                    disabled={rowPage === 1}
                    onClick={() => setRowPage(p => p - 1)}
                    className={`pagination-btn ${rowPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: rowTotalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setRowPage(page)}
                      className={`pagination-page-btn ${rowPage === page ? 'pagination-page-active' : 'pagination-page-inactive'}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={rowPage === rowTotalPages}
                    onClick={() => setRowPage(p => p + 1)}
                    className={`pagination-btn ${rowPage === rowTotalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="footer-container">
              

                <button onClick={handleAcceptJob} className="btn-search">
                  <span>✓</span>
                  <span>Assign Task</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
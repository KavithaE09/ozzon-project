import React, { useState, useRef, useEffect } from 'react';
import { Check, X, ChevronDown, Printer, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TaskCompletion() {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(2);
  const [showAddSpecDropdown, setShowAddSpecDropdown] = useState(false);
  const itemsPerPage = 5;
  const [jobPage, setJobPage] = useState(1);
  const [containerPage, setContainerPage] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);

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
      advanceAmount: '₹ 10,00,000',
      status: null
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
      advanceAmount: '₹ 10,00,000',
      status: null
    }
  ]);

  const jobTotalPages = Math.ceil(jobOrders.length / itemsPerPage);
  const paginatedJobOrders = jobOrders.slice(
    (jobPage - 1) * itemsPerPage,
    jobPage * itemsPerPage
  );

  const [rows, setRows] = useState([
    { id: 1, slNo: 1, description: 'Door - MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000 },
    { id: 2, slNo: 2, description: 'Window - UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 3, slNo: 3, description: 'Flooring - Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 4, slNo: 4, description: 'Roofing - MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 }
  ]);

  const reviewTotalPages = Math.ceil(rows.length / itemsPerPage);
  const paginatedRows = rows.slice(
    (reviewPage - 1) * itemsPerPage,
    reviewPage * itemsPerPage
  );

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

  const [containers, setContainers] = useState([
    { id: 1, selected: false, sNo: 1, containerNo: 'TCKU 1524662', partyName: 'Christine Brooks', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04-09-2019', photo: '', status: '' },
    { id: 2, selected: false, sNo: 2, containerNo: 'TCKU 1524662', partyName: 'Rosie Pearson', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04 Sep 2019', photo: '', status: '' }
  ]);

  const containerTotalPages = Math.ceil(containers.length / itemsPerPage);
  const paginatedContainers = containers.slice(
    (containerPage - 1) * itemsPerPage,
    containerPage * itemsPerPage
  );

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

  const handleDeleteJobOrder = (index, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this job order?')) {
      const updatedData = jobOrders.filter((_, i) => i !== index);
      setJobOrders(updatedData);
    }
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

  const handleStatusChange = (orderId, status) => {
    setJobOrders(jobOrders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handleJobOrderSelect = (id) => {
    setJobOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, selected: !order.selected } : { ...order, selected: false }
      )
    );
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

  const handleAcceptJob = () => {
    console.log('Accept Job clicked');
  };

  const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(p => p - 1)}
        className={`pagination-btn ${
          currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
        }`}
      >
        <ChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`pagination-page-btn ${
            currentPage === page ? 'pagination-page-active' : 'pagination-page-inactive'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(p => p + 1)}
        className={`pagination-btn ${
          currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
        }`}
      >
        <ChevronRight />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F3E8E8] p-6">
      <div className="content-card">
        <h2 className="page-title">Task Completion</h2>
        <h4 className="text-xl font-bold ml-5 mb-6 text-gray-800">Accepted Job List</h4>

        {/* Job Orders Table */}
        <div className="table-container">
          <div className="overflow-x-auto">
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
                {paginatedJobOrders.map((order, index) => (
                  <tr key={order.id} className="table-row">
                    <td className="table-cell">
                      <input
                        type="radio"
                        checked={order.selected}
                        onChange={() => handleJobOrderSelect(order.id)}
                        className="w-4 h-4 cursor-pointer accent-primary"
                      />
                    </td>
                    <td className="table-cell">{order.sno}.</td>
                    <td className="table-cell">
                      {order.isEditing ? (
                        <input
                          type="text"
                          value={order.leadNo}
                          onChange={(e) => handleJobOrderFieldChange(index, 'leadNo', e.target.value)}
                          className="w-20 px-1 py-1 border border-gray-300 rounded text-sm"
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
                          className="w-20 px-1 py-1 border border-gray-300 rounded text-sm"
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
                          className="w-20 px-1 py-1 border border-gray-300 rounded text-sm outline-none"
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
                          className="w-20 px-1 py-1 border border-gray-300 rounded text-sm outline-none"
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
                          className="w-20 px-1 py-1 border border-gray-300 rounded text-sm outline-none"
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
                          className="w-20 px-1 py-1 border border-gray-300 rounded text-sm outline-none"
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
                          className="w-24 px-1 py-1 border border-gray-300 rounded text-sm outline-none"
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
                          className="w-24 px-1 py-1 pr-5 border border-gray-300 rounded text-sm outline-none"
                        />
                      ) : (
                        order.customerName
                      )}
                    </td>
                    <td className="table-cell-center">
                      <div className="table-actions">
                        {order.isEditing ? (
                          <button
                            onClick={(e) => handleSaveJobOrder(index, e)}
                            className="px-3 py-1 bg-green-500 text-white border-none rounded text-xs cursor-pointer font-medium hover:bg-green-600"
                          >
                            Save
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={(e) => handlePrintJobOrder(index, e)}
                              className="btn-action"
                              title="Print"
                            >
                              <Printer size={18} className="text-gray-700" />
                            </button>
                            <button
                              onClick={(e) => handleEditJobOrder(index, e)}
                              className="btn-action"
                              title="Edit"
                            >
                              <Edit2 size={18} className="text-gray-700" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteJobOrder(index, e)}
                              className="btn-action"
                              title="Delete"
                            >
                              <Trash2 size={18} className="text-red-600" />
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
        </div>

        <Pagination
          currentPage={jobPage}
          totalPages={jobTotalPages}
          setCurrentPage={setJobPage}
        />

        {/* Container List */}
        <div className="mt-8">
          <h3 className="section-title">Container List</h3>
          <div className="table-container">
            <div className="overflow-x-auto">
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
                  {paginatedContainers.map((container) => (
                    <tr key={container.id} className="table-row">
                      <td className="table-cell">
                        <input
                          type="radio"
                          checked={container.selected}
                          onChange={() => handleContainerSelect(container.id)}
                          className="w-4 h-4 cursor-pointer accent-primary"
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
        </div>

        <Pagination
          currentPage={containerPage}
          totalPages={containerTotalPages}
          setCurrentPage={setContainerPage}
        />

        {/* Job Review List */}
        <div className="mt-8">
          <h3 className="section-title">Job Review List</h3>
          <div className="overflow-x-auto mb-5 border border-gray-400 rounded-lg">
            <table className="data-table min-w-[1100px]">
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
                {paginatedRows.map((row, index) => (
                  <tr key={row.id} className="table-row">
                    <td className="table-cell">{row.slNo}</td>

                    {/* Description */}
                    <td className="table-cell relative">
                      {editingRow === row.id ? (
                        <div className="relative">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowSpecDropdown(showSpecDropdown === row.id ? null : row.id);
                            }}
                            onKeyDown={handleDropdownKeyDown}
                            tabIndex={0}
                            className="w-full min-h-[34px] px-2 py-1.5 border border-gray-300 rounded text-sm cursor-pointer flex justify-between items-center bg-white"
                          >
                            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{row.description}</span>
                            <ChevronDown size={16} className="text-gray-500 flex-shrink-0 ml-2" />
                          </div>

                          {showSpecDropdown === row.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 z-10 shadow-lg max-h-[200px] overflow-y-auto"
                            >
                              {specMasters.map((option, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    updateRow(row.id, "description", option);
                                    setShowSpecDropdown(null);
                                    stopEditing();
                                  }}
                                  tabIndex={0}
                                  className={`px-3 py-2 cursor-pointer text-sm transition-all ${
                                    row.description === option ? 'bg-red-100' : 'hover:bg-[#A63128] hover:text-white'
                                  }`}
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
                          onChange={(e) => updateRow(row.id, "dimension", e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && stopEditing()}
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
                          value={row.noOfUnit}
                          onChange={(e) => updateRow(row.id, "noOfUnit", parseInt(e.target.value))}
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
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
                          value={row.amount}
                          onChange={(e) => updateRow(row.id, "amount", parseFloat(e.target.value))}
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
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
                          value={row.hiddenAmount}
                          onChange={(e) => updateRow(row.id, "hiddenAmount", parseFloat(e.target.value))}
                          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                          className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>₹ {row.hiddenAmount.toFixed(2)}</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="table-cell-center">
                      <div className="table-actions relative">
                        <Plus
                          size={18}
                          className="text-black cursor-pointer"
                          onClick={() => {
                            handleInsertRow(row.id);
                            setOpenMenuIndex(null);
                          }}
                        />
                        <Edit2
                          size={18}
                          className="text-gray-700 cursor-pointer"
                          onClick={() => {
                            handleEdit(index);
                            setOpenMenuIndex(null);
                          }}
                        />
                        <Trash2
                          size={18}
                          className="text-red-600 cursor-pointer"
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

          {/* Add Form */}
          {showAddForm && (
            <div className="grid grid-cols-8 gap-3 items-end pb-2 mb-5">
              {/* Sl No */}
              <div className="bg-gray-50 p-2.5 rounded-md border border-gray-300">
                <label className="block text-xs text-gray-600 mb-1.5 font-bold">
                  Sl No
                </label>
                <input
                  type="text"
                  placeholder="Input"
                  value={newRowData.slNo}
                  onChange={(e) => setNewRowData({ ...newRowData, slNo: e.target.value })}
                  className="w-full px-1 py-0.5 border-none rounded text-sm outline-none"
                />
              </div>

              {/* Description */}
              <div className="bg-white p-2.5 rounded-md border border-gray-300 relative col-span-2">
                <label className="block text-xs text-gray-600 mb-1.5 font-bold">
                  Description
                </label>
                <div
                  onClick={() => setShowAddSpecDropdown(!showAddSpecDropdown)}
                  className="w-full min-h-[34px] px-0.5 py-0.5 border-none rounded text-sm cursor-pointer flex justify-between items-center bg-white"
                >
                  <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {newRowData.description || "Select description"}
                  </span>
                  <ChevronDown size={16} className="text-gray-500 flex-shrink-0 ml-2" />
                </div>
                {showAddSpecDropdown && (
                  <div className="absolute top-full left-2.5 right-2.5 bg-white border border-gray-300 rounded mt-1 z-20 shadow-lg max-h-[200px] overflow-y-auto">
                    {specMasters.map((spec, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setNewRowData({ ...newRowData, description: spec });
                          setShowAddSpecDropdown(false);
                        }}
                        className={`px-3 py-2 cursor-pointer text-sm transition-all ${
                          newRowData.description === spec 
                            ? 'bg-red-100' 
                            : 'hover:bg-[#A63128] hover:text-white'
                        }`}
                      >
                        {spec}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dimension */}
              <div className="bg-white p-2.5 rounded-md border border-gray-300">
                <label className="block text-xs text-gray-600 mb-1.5 font-bold">
                  Dimension
                </label>
                <input
                  type="text"
                  placeholder="Input"
                  value={newRowData.dimension}
                  onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                  className="w-full px-1 py-0.5 border-none rounded text-sm outline-none"
                />
              </div>

              {/* No of Unit */}
              <div className="bg-white p-2.5 rounded-md border border-gray-300">
                <label className="block text-xs text-gray-600 mb-1.5 font-bold">
                  No. of Unit
                </label>
                <input
                  type="text"
                  placeholder="20*8*8.6"
                  value={newRowData.noOfUnit}
                  onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                  className="w-full px-1 py-0.5 border-none rounded text-sm outline-none"
                />
              </div>

              {/* Amount */}
              <div className="bg-white p-2.5 rounded-md border border-gray-300">
                <label className="block text-xs text-gray-600 mb-1.5 font-bold">
                  Amount
                </label>
                <input
                  type="text"
                  placeholder="₹ 10,00,000"
                  value={newRowData.amount}
                  onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                  className="w-full px-1 py-0.5 border-none rounded text-sm outline-none"
                />
              </div>

              {/* Hidden Amount */}
              <div className="bg-white p-2.5 rounded-md border border-gray-300">
                <label className="block text-xs text-gray-600 mb-1.5 font-bold">
                  Hidden Amount
                </label>
                <input
                  type="text"
                  placeholder="₹ 10,00,000"
                  value={newRowData.hiddenAmount}
                  onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                  className="w-full px-1 py-0.5 border-none rounded text-sm outline-none"
                />
              </div>

              {/* Save Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSaveNewRow}
                  className="w-full px-3.5 py-2 border-none rounded-md bg-green-500 text-white text-sm font-medium cursor-pointer hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          <Pagination
            currentPage={reviewPage}
            totalPages={reviewTotalPages}
            setCurrentPage={setReviewPage}
          />

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleAcceptJob}
              type="button"
              className="btn-search"
            >
              <span>✓</span>
              Submit
            </button>
          </div>
        </div>
      </div>

      <button onClick={() => navigate(-1)} className="btn-back">
        <span>←</span>
        <span>Back</span>
      </button>
    </div>
  );
}
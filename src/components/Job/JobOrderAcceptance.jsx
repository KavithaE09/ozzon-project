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
    <div style={{ minHeight: '100vh', backgroundColor: '#F3E8E8', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', marginBottom: '10px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>Job Order Acceptance</h2>

        {/* Job Orders Table */}
    <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #d1d5db' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
               <tr style={{ backgroundColor: '#fde2e2' }}>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Select</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>S/No</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Lead No</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Quotation No</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>PI No</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Sales Person</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Customer Name</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Advance Amount</th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: '600' }}>Action</th>
                </tr>
              </thead>
              <tbody>
               
                {currentJobOrders.map((order) => (
                  <tr key={order.id} style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 8px' }}>
                      <input
                        type="radio"
                        checked={order.selected}
                        onChange={() => handleJobOrderSelect(order.id)}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ padding: '12px 8px' }}>{order.sno}.</td>
                    <td style={{ padding: '12px 8px' }}>{order.leadNo}</td>
                    <td style={{ padding: '12px 8px' }}>{order.quotationNo}</td>
                    <td style={{ padding: '12px 8px' }}>{order.piNo}</td>
                    <td style={{ padding: '12px 8px' }}>{order.salesPerson}</td>
                    <td style={{ padding: '12px 8px' }}>{order.customerName}</td>
                    <td style={{ padding: '12px 8px' }}>{order.advanceAmount}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {order.status === null ? (
                          <>
                            <button 
                              onClick={() => handleStatusChange(order.id, 'accepted')}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
                              title="Accept"
                            >
                              <CheckCircle size={20} color="#10B981" strokeWidth={2.5} />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(order.id, 'rejected')}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
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
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
  <button
    disabled={jobPage === 1}
    onClick={() => setJobPage(jobPage - 1)}
  >
   <ChevronLeft />
  </button>

  {Array.from({ length: jobTotalPages }, (_, i) => i + 1).map(p => (
  <button key={p} onClick={() => setJobPage(p)}
        style={{
          background: jobPage === p ? '#A63128' : '#fff',
          color: jobPage === p ? '#fff' : '#000',
          border: '1px solid #D1D5DB',
          padding: '6px 12px',
          borderRadius: '4px'
        }}
      >
        {p}
      </button>
    ))}

  <button
    disabled={jobLast >= jobOrders.length}
    onClick={() => setJobPage(jobPage + 1)}
  >
    <ChevronRight />
  </button>
</div>


        {/* Job Review List */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Job Review List</h3>
           <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #d1d5db' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1100px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2', borderBottom: '2px solid #E5E7EB' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Sl No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Description</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Dimension</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>No. of Unit</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Amount</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Hidden Amount</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: '600', color: '#1F2937' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, index) => (
  <tr
    key={row.id}
    style={{
      borderBottom: "1px solid #E5E7EB"
    }}
  >
    <td style={{ padding: "12px 8px" }}>{row.slNo}</td>


    {/* Description */}
     <td style={{ padding: "12px 8px", position: "relative" }}>
      {editingRow === row.id ? (
        <div style={{ position: "relative" }}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowSpecDropdown(showSpecDropdown === row.id ? null : row.id);
            }}
            onKeyDown={handleDropdownKeyDown}
            tabIndex={0}
            style={{
              width: "100%",
              minHeight: "34px",
              padding: "6px 8px",
              border: "1px solid #D1D5DB",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff"
            }}
          >
            <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.description}</span>
            <ChevronDown size={20} style={{ color: "#000000", flexShrink: 0, marginLeft: "8px" }} />
          </div>

          {showSpecDropdown === row.id && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                right: "0",
                backgroundColor: "#fff",
                border: "1px solid #D1D5DB",
                borderRadius: "4px",
                marginTop: "4px",
                zIndex: 10,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                maxHeight: "200px",
                overflowY: "auto"
              }}
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
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#374151",
                    backgroundColor: row.description === option ? "#FEE2E2" : "white",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#A63128";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = row.description === option ? "#FEE2E2" : "white";
                    e.currentTarget.style.color = "#374151";
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
    <td style={{ padding: "12px 8px" }}>
      {editingRow === row.id ? (
        <input
          type="text"
          value={row.dimension}
          onChange={(e) => updateRow(row.id, "dimension", e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && stopEditing()}
          style={{
            width: "100%",
            padding: "6px 8px",
            border: "1px solid #D1D5DB",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
      ) : (
        <span>{row.dimension}</span>
      )}
    </td>

    {/* NO OF UNIT */}
    <td style={{ padding: "12px 8px" }}>
      {editingRow === row.id ? (
        <input
          type="number"
          value={row.noOfUnit}
          onChange={(e) =>
            updateRow(row.id, "noOfUnit", parseInt(e.target.value))
          }
          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
          style={{
            width: "80px",
            padding: "6px 8px",
            border: "1px solid #D1D5DB",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
      ) : (
        <span>{row.noOfUnit}</span>
      )}
    </td>

    {/* AMOUNT */}
    <td style={{ padding: "12px 8px" }}>
      {editingRow === row.id ? (
        <input
          type="number"
          value={row.amount}
          onChange={(e) =>
            updateRow(row.id, "amount", parseFloat(e.target.value))
          }
          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
          style={{
            width: "96px",
            padding: "6px 8px",
            border: "1px solid #D1D5DB",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
      ) : (
        <span>₹ {row.amount.toFixed(2)}</span>
      )}
    </td>

    {/* HIDDEN AMOUNT */}
    <td style={{ padding: "12px 8px" }}>
      {editingRow === row.id ? (
        <input
          type="number"
          value={row.hiddenAmount}
          onChange={(e) =>
            updateRow(row.id, "hiddenAmount", parseFloat(e.target.value))
          }
          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
          style={{
            width: "96px",
            padding: "6px 8px",
            border: "1px solid #D1D5DB",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
      ) : (
        <span>₹ {row.hiddenAmount.toFixed(2)}</span>
      )}
    </td>

    {/* ACTIONS */}
    <td style={{ padding: "12px 8px" }}>
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          position: "relative"
        }}
      >
            <Plus size={18} 
            style={{ color: "#000000", cursor: "pointer"  }} 
             onClick={() => {
             handleInsertRow(row.id);
             setOpenMenuIndex(null);
             }}
            />
            <Edit2 size={18} 
            style={{ color: "#000000", cursor: "pointer" }}
             onClick={() => {
             handleEdit(rows.findIndex(r => r.id === row.id));
             setOpenMenuIndex(null);
             }} />
            <Trash2 size={18} 
            style={{ color: "#DC2626", cursor: "pointer" }} 
            onClick={() => {
            handleDelete(rows.findIndex(r => r.id === row.id));
            setOpenMenuIndex(null);
            }}/>
            </div>
    </td>
  </tr>
))}

                </tbody>
              </table>
            </div>

        {showAddForm && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "12px",
              alignItems: "flex-end",
              paddingBottom: "8px",
              marginBottom: "20px"
            }}
          >
            {/* SL NO */}
            <div
              style={{
                backgroundColor: "#F9FAFB",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB"
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#4B5563",
                  marginBottom: "6px",
                  fontWeight: "700"
                }}
              >
                Sl No
              </label>
              <input
                type="text"
                placeholder="Input"
                value={newRowData.slNo}
                onChange={(e) =>
                  setNewRowData({ ...newRowData, slNo: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2px 4px",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
        
        {/* DESCRIPTION */}
<div
  style={{
    backgroundColor: "#FFFFFF",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #D1D5DB",
    position: "relative",
    gridColumn: "span 2"
  }}
>
  <label
    style={{
      display: "block",
      fontSize: "12px",
      color: "#4B5563",
      marginBottom: "6px",
      fontWeight: "700"
    }}
  >
    Description
  </label>
  <div
    onClick={() => setShowAddSpecDropdown(!showAddSpecDropdown)}
    style={{
      width: "100%",
      minHeight: "34px",
      padding: "6px 8px",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff"
    }}
  >
    <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
      {newRowData.description || "Select description"}
    </span>
    <ChevronDown size={16} style={{ color: "#6B7280", flexShrink: 0, marginLeft: "8px" }} />
  </div>
  {showAddSpecDropdown && (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "10px",
        right: "10px",
        backgroundColor: "#fff",
        border: "1px solid #D1D5DB",
        borderRadius: "4px",
        marginTop: "4px",
        zIndex: 20,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        maxHeight: "200px",
        overflowY: "auto"
      }}
    >
      {specMasters.map((spec, idx) => (
        <div
          key={idx}
          onClick={() => {
            setNewRowData({ ...newRowData, description: spec });
            setShowAddSpecDropdown(false);
          }}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151",
            backgroundColor: newRowData.description === spec ? "#FEE2E2" : "white",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#A63128";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = newRowData.description === spec ? "#FEE2E2" : "white";
            e.currentTarget.style.color = "#374151";
          }}
        >
          {spec}
        </div>
      ))}
    </div>
  )}
</div>

        
            {/* DIMENSION */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB"
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#4B5563",
                  marginBottom: "6px",
                  fontWeight: "700"
                }}
              >
                Dimension
              </label>
              <input
                type="text"
                placeholder="Input"
                value={newRowData.dimension}
                onChange={(e) =>
                  setNewRowData({ ...newRowData, dimension: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2px 4px",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
        
            {/* NO OF UNIT */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB"
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#4B5563",
                  marginBottom: "6px",
                  fontWeight: "700"
                }}
              >
                No. of Unit
              </label>
              <input
                type="text"
                placeholder="20*8*8.6"
                value={newRowData.noOfUnit}
                onChange={(e) =>
                  setNewRowData({ ...newRowData, noOfUnit: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2px 4px",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
        
            {/* AMOUNT */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB"
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#4B5563",
                  marginBottom: "6px",
                  fontWeight: "700"
                }}
              >
                Amount
              </label>
              <input
                type="text"
                placeholder="₹ 10,00,000"
                value={newRowData.amount}
                onChange={(e) =>
                  setNewRowData({ ...newRowData, amount: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "2px 4px",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
        
            {/* HIDDEN AMOUNT */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB"
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#4B5563",
                  marginBottom: "6px",
                  fontWeight: "700"
                }}
              >
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
                style={{
                  width: "100%",
                  padding: "2px 4px",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>
        
            {/* SAVE BUTTON */}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                onClick={handleSaveNewRow}
                style={{
                  width: "100%",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "#22C55E",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
  <button
    disabled={reviewPage === 1}
    onClick={() => setReviewPage(reviewPage - 1)}
  >
    <ChevronLeft /> 
  </button>

   {Array.from({ length: reviewTotalPages }, (_, i) => i + 1).map(p => (
      <button
        key={p}
        onClick={() => setReviewPage(p)}
        style={{
          background: reviewPage === p ? '#A63128' : '#fff',
          color: reviewPage === p ? '#fff' : '#000',
          border: '1px solid #D1D5DB',
          padding: '6px 12px',
          borderRadius: '4px'
        }}
      >
        {p}
      </button>
    ))}

  <button
    disabled={reviewLast >= rows.length}
    onClick={() => setReviewPage(reviewPage + 1)}
  >
     <ChevronRight />
  </button>
</div>
        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button
            onClick={handleAcceptJob}
            type="button"
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
              gap: '8px',
              transition: 'background-color 0.2s ease'
            }}
          >
            <span>✓</span>
            Accept Job
          </button>
        </div>
      </div>
      

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
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <span>←</span>
        <span>Back</span>
      </button>
    </div>
  );
}
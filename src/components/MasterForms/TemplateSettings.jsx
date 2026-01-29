import React, { useState } from 'react';
import { Menu, Bell, User, ChevronDown, Home, FileText, List, Plus, Edit2, Trash2, X, MoreVertical, Printer, ChevronRight, ChevronLeft, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TemplateSettings() {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState('Office Container');
 const [currentPage, setCurrentPage] = useState(1);
 const rowsPerPage = 5;


  const [rows, setRows] = useState([
    { id: 1, slNo: 1, group: 'Door', specification: '(7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door', dimension: "20*8*8.6", noOfUnit: 1, amount: 10000.00, hiddenAmount: 10000.00 },
     { id: 2, slNo: 2, group: 'Window', specification: 'UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 3, slNo: 3, group: 'Flooring', specification: 'Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 4, slNo: 4, group: 'Roofing', specification: 'MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
     { id: 5, slNo: 5, group: 'Door', specification: '(7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door', dimension: "20*8*8.6", noOfUnit: 1, amount: 10000.00, hiddenAmount: 10000.00 },
     { id: 6, slNo: 6, group: 'Window', specification: 'UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 7, slNo: 7, group: 'Flooring', specification: 'Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 8, slNo: 8, group: 'Roofing', specification: 'MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
  ])
  
const totalPages = Math.ceil(rows.length / rowsPerPage);

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const currentRows = rows.slice(
  indexOfFirstRow,
  indexOfLastRow
);

  const [editingRow, setEditingRow] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [currentRowForModal, setCurrentRowForModal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [insertAfterRowId, setInsertAfterRowId] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showGroupDropdown, setShowGroupDropdown] = useState(null);
  const [showSpecDropdown, setShowSpecDropdown] = useState(null);


  const groupMasters = ['Door', 'Window', 'Flooring', 'Roofing', 'Electrical'];
  const specMasters = [
    '(7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door',
    'UPVC sliding window with mesh',
    'Vitrified tiles 2x2 feet',
    'MS sheet roofing with insulation'
  ];

  const [newRowData, setNewRowData] = useState({
    slNo: '',
    group: '',
    specification: '',
    dimension: '',
    noOfUnit: '',
    amount: '',
    hiddenAmount: ''
  });

  const [discount, setDiscount] = useState(10000);
  const [gstPercentage, setGstPercentage] = useState(18);


  const handleAddButtonClick = () => {
    setShowAddForm(true);
    setInsertAfterRowId(null);
  };

  const handleInsertRow = (afterRowId) => {
    setShowAddForm(true);
    setInsertAfterRowId(afterRowId);
  };

  const handleDropdownKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      stopEditing();
    }
  };

  const handleSaveNewRow = () => {
    const row = {
      id: Date.now(),
      slNo: newRowData.slNo || rows.length + 1,
      group: newRowData.group,
      specification: newRowData.specification,
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
    setCurrentPage(1);

    setNewRowData({
      slNo: '',
      group: '',
      specification: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
  };

  const toggleMenu = (index) => {
  setOpenMenuIndex(prev => (prev === index ? null : index));
  };

  const handleEdit = (index) => {
  setEditingRow(rows[index].id);
  setOpenMenuIndex(null);
};
const handleSubmit = () => {
     if (!formData.pino || !formData.pino.trim()) {
      alert('Please fill PI NO');
      return;
    }
    if (!formData.pidate) {
      alert('Please select PI Date');
      return;
    }
    if (!formData.quotationno || !formData.quotationno.trim()) {
      alert('Please fill Quotation No');
      return;
    }
    if (!formData.quotationdate) {
      alert('Please select Quotation Date');
      return;
    }
    if (!formData.customerName) {
      alert('Please select Customer Name');
      return;
    }
    if (!formData.address || !formData.address.trim()) {
      alert('Please fill Address');
      return;
    }
    
    setShowSubmitMessage(true);
    setTimeout(() => setShowSubmitMessage(false), 3000);
  };

const handleDelete = (index) => {
     setRows(prevRows => prevRows.filter((_, i) => i !== index));
    setOpenMenuIndex(null);
    setCurrentPage(1);

};

const stopEditing = () => {
    setEditingRow(null);
    setShowGroupDropdown(null);
    setShowSpecDropdown(null);
  };


  const updateRow = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const selectFromMaster = (type, value) => {
    if (type === 'group') {
      if (currentRowForModal === 'newRow') {
        setNewRowData({ ...newRowData, group: value });
      } else {
        updateRow(currentRowForModal, 'group', value);
      }
      setShowGroupModal(false);
    } else {
      if (currentRowForModal === 'newRow') {
        setNewRowData({ ...newRowData, specification: value });
      } else {
        updateRow(currentRowForModal, 'specification', value);
      }
      setShowSpecModal(false);
    }
    setCurrentRowForModal(null);
  };

  const calculateTotal = () => {
    return rows.reduce((sum, row) => sum + row.amount, 0);
  };

  const calculateGST = () => {
    const taxableValue = calculateTaxableValue();
    return taxableValue * (gstPercentage / 100);
  };

  const calculateTaxableValue = () => {
    return calculateTotal() - discount;
  };

  const calculateNetAmount = () => {
    return calculateTaxableValue() + calculateGST();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5'}}>
     

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
    
        <div style={{ flex: 1, overflow: 'auto', padding: '20px', backgroundColor: '#f5e6e8' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px',marginBottom:'10px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>Template Settings</h2>

            <div style={{ marginBottom: '24px',  border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626', padding: '8px' }}>
              <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Template Name</label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                style={{ width: '300px', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px'}}
              />
            </div>

            {/* Table */}
                       <div style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid #9CA3AF', borderRadius: '8px' }}>
                         <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1200px' }}>
                           <thead>
                             <tr style={{ backgroundColor: '#fde2e2', borderBottom: '2px solid #E5E7EB' }}>
                               <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000' ,fontSize:'14px'}}>Sl No</th>
                               <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000',fontSize:'14px' }}>Template Group</th>
                               <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000',fontSize:'14px' }}>Template Specification</th>
                               <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000',fontSize:'14px' }}>Dimension</th>
                               <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000' ,fontSize:'14px'}}>No. of Unit</th>
                               <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000',fontSize:'14px' }}>Amount</th>
                               <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000',fontSize:'14px' }}>Hidden Amount</th>
                               <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: '600', color: '#000000',fontSize:'14px' }}>Actions</th>
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
           
               {/* GROUP */}
               <td style={{ padding: "12px 8px", position: "relative" }}>
                 {editingRow === row.id ? (
                   <div>
                     <div
                       onClick={(e) => {
                         e.stopPropagation();
                         setShowGroupDropdown(showGroupDropdown === row.id ? null : row.id);
                       }}
                       onKeyDown={handleDropdownKeyDown}
                       tabIndex={0}
                       style={{
                         width: "100%",
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
                       <span>{row.group}</span>
                       <ChevronDown size={20} style={{ color: "#000000" }} />
                     </div>
           
                     {showGroupDropdown === row.id && (
                       <div
                         onClick={(e) => e.stopPropagation()}
                         style={{
                           position: "absolute",
                           top: "100%",
                           left: "8px",
                           right: "8px",
                           backgroundColor: "#fff",
                           border: "1px solid #D1D5DB",
                           borderRadius: "4px",
                           marginTop: "4px",
                           zIndex: 10,
                           boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                         }}
                       >
                         {groupMasters.map((option, idx) => (
                           <div
                             key={idx}
                             onClick={() => {
                               updateRow(row.id, "group", option);
                               setShowGroupDropdown(null);
                               stopEditing();
                             }}
                             tabIndex={0}
                             style={{
                               padding: "8px 12px",
                               cursor: "pointer",
                               fontSize: "14px"
                             }}
                             onMouseEnter={(e) =>
                               (e.currentTarget.style.backgroundColor = "#F9FAFB")
                             }
                             onMouseLeave={(e) =>
                               (e.currentTarget.style.backgroundColor = "transparent")
                             }
                           >
                             {option}
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
                 ) : (
                   <span>{row.group}</span>
                 )}
               </td>
           
               {/* SPECIFICATION */}
               <td style={{ padding: "12px 8px", position: "relative" }}>
                 {editingRow === row.id ? (
                   <div>
                     <div
                       onClick={(e) => {
                         e.stopPropagation();
                         setShowSpecDropdown(showSpecDropdown === row.id ? null : row.id);
                       }}
                       onKeyDown={handleDropdownKeyDown}
                       tabIndex={0}
                       style={{
                         width: "100%",
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
                       <span>{row.specification}</span>
                       <ChevronDown size={20} style={{ color: "#000000" }} />
                     </div>
           
                     {showSpecDropdown === row.id && (
                       <div
                         onClick={(e) => e.stopPropagation()}
                         style={{
                           position: "absolute",
                           top: "100%",
                           left: "8px",
                           right: "8px",
                           backgroundColor: "#fff",
                           border: "1px solid #D1D5DB",
                           borderRadius: "4px",
                           marginTop: "4px",
                           zIndex: 10,
                           boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                         }}
                       >
                         {specMasters.map((option, idx) => (
                           <div
                             key={idx}
                             onClick={() => {
                               updateRow(row.id, "specification", option);
                               setShowSpecDropdown(null);
                               stopEditing();
                             }}
                             tabIndex={0}
                             style={{
                               padding: "8px 12px",
                               cursor: "pointer",
                               fontSize: "14px"
                             }}
                             onMouseEnter={(e) =>
                               (e.currentTarget.style.backgroundColor = "#F9FAFB")
                             }
                             onMouseLeave={(e) =>
                               (e.currentTarget.style.backgroundColor = "transparent")
                             }
                           >
                             {option}
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
                 ) : (
                   <span>{row.specification}</span>
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
                   <button
                     onClick={() => toggleMenu(index)}
                     style={{
                       background: "transparent",
                       border: "none",
                       cursor: "pointer",
                       padding: "4px"
                     }}
                   >
                     <Menu size={18} style={{ color: "#374151" }} />
                   </button>
           
                   {openMenuIndex === index && (
                     <div
                       style={{
                         position: "absolute",
                         right: "16px",
                         top: "50%",
                         transform: "translateY(-50%)",
                         backgroundColor: "#fff",
                         border: "1px solid #E5E7EB",
                         borderRadius: "6px",
                         boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                         display: "flex",
                         gap: "8px",
                         padding: "8px",
                         zIndex: 10
                       }}
                     >
                       <Plus size={18} 
                       style={{ color: "#16A34A", cursor: "pointer"  }} 
                        onClick={() => {
                        handleInsertRow(row.id);
                        setOpenMenuIndex(null);
                        }}
                       />
                       <Edit2 size={18} 
                       style={{ color: "#374151", cursor: "pointer" }}
                        onClick={() => {
                        handleEdit(index);
                        setOpenMenuIndex(null);
                        }} />
                       <Trash2 size={18} 
                       style={{ color: "#DC2626", cursor: "pointer" }} 
                       onClick={() => {
                       handleDelete(index);
                       setOpenMenuIndex(null);
                       }}/>
                     </div>
                   )}
                 </div>
               </td>
             </tr>
           ))}
           
                           </tbody>
                         </table>
                       </div>
            <div style={{
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginBottom: '20px'
}}>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(p => p - 1)}
    style={{
      padding: '6px 12px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      backgroundColor: currentPage === 1 ? '#e5e7eb' : '#ffffff',
      cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
    }}
  >
                <ChevronLeft />

  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      style={{
        padding: '6px 12px',
        borderRadius: '4px',
        border: '1px solid #d1d5db',
        backgroundColor: currentPage === page ? '#A63128' : '#ffffff',
        color: currentPage === page ? '#ffffff' : '#000000',
        cursor: 'pointer'
      }}
    >
      {page}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(p => p + 1)}
    style={{
      padding: '6px 12px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      backgroundColor: currentPage === totalPages ? '#e5e7eb' : '#ffffff',
      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
    }}
  >
     <ChevronRight />
  </button>
</div>


           
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <button
                onClick={handleAddButtonClick}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: 'none', borderRadius: '6px', backgroundColor: '#991b1b', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
              >
                <Plus size={18} />
                Add Row
              </button>
            </div>

            {showAddForm && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '12px', alignItems: 'end', paddingBottom: '8px' }}>
                  <div style={{backgroundcolor: '#fde2e2',padding:'10px', borderRadius:'4px',border: '1px solid #d1d5db'}}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: 'bold' }}>Sl No</label>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.slNo}
                      onChange={(e) => setNewRowData({ ...newRowData, slNo: e.target.value })}
                      style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none'  }}
                    />
                  </div>

                  <div style={{backgroundcolor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #d1d5db'}}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <label style={{ fontSize: '11px', color: '#6b7280', fontWeight: 'bold', margin: 0 }}>Template Group</label>
                      <button
                        onClick={() => { setCurrentRowForModal('newRow'); setShowGroupModal(true); }}
                        style={{ padding: '0', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <ChevronDown size={14} style={{ color: '#6b7280' }} />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.group}
                      onChange={(e) => setNewRowData({ ...newRowData, group: e.target.value })}
                      style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none'  }}
                    />
                  </div>

                  <div style={{backgroundcolor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #d1d5db'}}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <label style={{ fontSize: '11px', color: '#6b7280', fontWeight: 'bold', margin: 0 }}>Template Specification</label>
                      <button
                        onClick={() => { setCurrentRowForModal('newRow'); setShowSpecModal(true); }}
                        style={{ padding: '0', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <ChevronDown size={14} style={{ color: '#6b7280' }} />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.specification}
                      onChange={(e) => setNewRowData({ ...newRowData, specification: e.target.value })}
                      style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none'  }}
                    />
                  </div>

                  <div style={{backgroundcolor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #d1d5db'}}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: 'bold' }}>Dimension</label>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.dimension}
                      onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                      style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px',outline: 'none'  }}
                    />
                  </div>

                  <div style={{backgroundcolor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #d1d5db'}}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: 'bold' }}>No. of Unit</label>
                    <input
                      type="text"
                      placeholder="20*8*8.6"
                      value={newRowData.noOfUnit}
                      onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                      style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none'  }}
                    />
                  </div>

                  <div style={{backgroundcolor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #d1d5db'}}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: 'bold' }}>Amount</label>
                    <input
                      type="text"
                      placeholder="₹ 10,00,000"
                      value={newRowData.amount}
                      onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                      style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none'  }}
                    />
                  </div>

                  <div style={{backgroundcolor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #d1d5db'}}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: 'bold' }}>Hidden Amount</label>
                    <input
                      type="text"
                      placeholder="₹ 10,00,000"
                      value={newRowData.hiddenAmount}
                      onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                      style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none'  }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button
                      onClick={handleSaveNewRow}
                      style={{ width: '100%', padding: '8px 24px', border: 'none', borderRadius: '4px', backgroundColor: '#991b1b', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
                    >
                      Save
                    </button>
                  </div>
                </div>
            )}
      

            <div style={{ marginBottom: '20px', border: '1px solid#9CA3AF', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#f3f4f6', padding: '12px 16px', borderBottom: '1px solid #9CA3AF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>Terms And Conditions</h3>
                <button style={{ padding: '4px', border: 'none', backgroundColor: 'transparent', color: '#6b7280', cursor: 'pointer' }}>
                  <Edit2 size={16} />
                </button>
              </div>
              <div style={{ padding: '16px', fontSize: '12px', color: '#4b5563', lineHeight: '1.8' }}>
                <p style={{ margin: '0 0 8px 0' }}>1. This rate is valid for 2 weeks from the quotation date</p>
                <p style={{ margin: '0 0 8px 0' }}>2. Delivery: Fabrication will take a minimum of 21 days to complete.</p>
                <p style={{ margin: '0 0 8px 0' }}>3. Payment Terms: 50% advance & balance 40% on completion and before loading</p>
                <p style={{ margin: '0 0 8px 0' }}>4. Transportation & Unloading: To be arranged by the customer at site.</p>
                <p style={{ margin: '0 0 8px 0' }}>5. Warranty: Seller has a buy-back policy once the container or cabin duration expires.</p>
                <p style={{ margin: '0 0 8px 0' }}>6. Warranty: Six months from the date of delivery. Warranty excludes physical damage, misuse and unauthorised alterations.</p>
                <p style={{ margin: '0' }}>7. Transit Insurance: Transit insurance can be arranged on request and will be billed separately, subject to customer acceptance.</p>
              </div>
            </div>

            <div style={{ marginBottom: '20px', border: '1px solid #9CA3AF', borderRadius: '6px', padding: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Total Amount</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', paddingBottom: '5px' }}>
                <div style={{ padding: '8px 12px', backgroundColor: '#f9fafb', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Total</div>
                   <input
                           readOnly
                            value={`₹ ${calculateTotal().toFixed(2)}`}
                             style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'transparent'  }}
                        />
                </div>
                
                <div style={{ padding: '8px 12px', backgroundColor: '#f9fafb', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Discount</div>
                  <input
        type="number"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value) || 0)}
         style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'transparent'  }}
      />
                </div>
                
                <div style={{ padding: '8px 12px', backgroundColor: '#f9fafb', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Taxable Value</div>
                    <input
        readOnly
        value={`₹ ${calculateTaxableValue().toFixed(2)}`}
         style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'transparent'  }}
      />
                  </div>
                
                <div style={{ padding: '8px 12px', backgroundColor: '#f9fafb', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>GST 18%</div>
                    <input
        type="number"
        value={gstPercentage}
        onChange={(e) => setGstPercentage(Number(e.target.value) || 0)}
        style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'transparent'  }}
      />
                  </div>
              </div>

              <div style={{ padding: '8px 12px', backgroundColor: '#f9fafb', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '14px', fontWeight: '500' }}>
                <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Net Amount</div>
                <input
      readOnly
      value={`₹ ${calculateNetAmount().toFixed(2)}`}
       style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'transparent'  }}
    />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <button 
            onclick={{handleSubmit}}
                    style={{ 
                      width: '150px',
                      height:'50px',
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
          </div>
           <button 
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
              <span>←</span>
              <span>Back</span>
            </button>
        </div>
      </div>

      {showGroupModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', width: '400px', maxHeight: '500px', overflow: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Select Group</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {groupMasters.map((group, idx) => (
                <button
                  key={idx}
                  onClick={() => selectFromMaster('group', group)}
                  style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '4px', cursor: 'pointer', textAlign: 'left', backgroundColor: 'white', fontSize: '14px' }}
                >
                  {group}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowGroupModal(false)}
              style={{ marginTop: '16px', padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#6b7280', color: 'white', cursor: 'pointer', width: '100%' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSpecModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', width: '500px', maxHeight: '500px', overflow: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Select Specification</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {specMasters.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => selectFromMaster('spec', spec)}
                  style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '4px', cursor: 'pointer', textAlign: 'left', backgroundColor: 'white', fontSize: '13px' }}
                >
                  {spec}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSpecModal(false)}
              style={{ marginTop: '16px', padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#6b7280', color: 'white', cursor: 'pointer', width: '100%' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
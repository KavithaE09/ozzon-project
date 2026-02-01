import React, { useState } from 'react';
import { Menu, ChevronDown, Edit2, Trash2, Plus, Check, X, ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProformaInvoiceForm() {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState(null);
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    pino: 'Prefix/financial Year/0001',
    pidate: getTodayDate(),
    quotationno: '26-01-2025',
    quotationdate: getTodayDate(),
    customerName: '',
    address: '',
    templateName: 'Template Office Container'
  });

  const customerOptions = ['Admin', 'Customer A', 'Customer B', 'Customer C', 'Customer D'];
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('customer-dropdown-container');
      if (dropdown && !dropdown.contains(event.target)) {
        setShowCustomerDropdown(false);
      }
      
      // Close all dropdowns when clicking outside
      const dropdownMenus = document.querySelectorAll('.dropdown-wrapper');
      let clickedInside = false;
      
      dropdownMenus.forEach((menu) => {
        if (menu.contains(event.target)) {
          clickedInside = true;
        }
      });
      
      if (!clickedInside) {
        setShowGroupDropdown(null);
        setShowSpecDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // First Table State
  const [rows1, setRows1] = useState([
    { id: 1, slNo: 1, group: 'Door', specification: 'MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000 },
    { id: 2, slNo: 2, group: 'Window', specification: 'UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 3, slNo: 3, group: 'Flooring', specification: 'Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 4, slNo: 4, group: 'Roofing', specification: 'MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 }
  ]);

  // Second Table State
  const [rows2, setRows2] = useState([
    { id: 5, slNo: 1, group: 'Electrical', specification: 'Wiring and fixtures', dimension: '20*8*8.6', noOfUnit: 1, amount: 50000, hiddenAmount: 50000 },
    { id: 6, slNo: 2, group: 'Plumbing', specification: 'Water supply system', dimension: '20*8*8.6', noOfUnit: 1, amount: 75000, hiddenAmount: 75000 }
  ]);

  const [openMenuIndex1, setOpenMenuIndex1] = useState(null);
  const [openMenuIndex2, setOpenMenuIndex2] = useState(null);
  const [editingRow1, setEditingRow1] = useState(null);
  const [editingRow2, setEditingRow2] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [currentRowForModal, setCurrentRowForModal] = useState(null);
  const [showAddForm1, setShowAddForm1] = useState(false);
  const [showAddForm2, setShowAddForm2] = useState(false);
  const [insertAfterRowId, setInsertAfterRowId] = useState(null);
  const [showGroupDropdown, setShowGroupDropdown] = useState(null);
  const [showSpecDropdown, setShowSpecDropdown] = useState(null);
  const [currentTable, setCurrentTable] = useState(null);

  const groupMasters = ['Door', 'Window', 'Flooring', 'Roofing', 'Electrical', 'Plumbing'];
  const specMasters = [
    '(7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door',
    'UPVC sliding window with mesh',
    'Vitrified tiles 2x2 feet',
    'MS sheet roofing with insulation',
    'Wiring and fixtures',
    'Water supply system'
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

  // Terms and Conditions State
  const [termsConditions, setTermsConditions] = useState([
    '1. This rate is valid for 2 weeks from the quotation date',
    '2. Delivery: Fabrication will take a minimum of 21 days to complete.',
    '3. Payment Terms: 50% advance & balance 40% on completion and before loading',
    '4. Transportation & Unloading: To be arranged by the customer at site.',
    '5. Warranty: Seller has a buy-back policy once the container or cabin duration expires.',
    '6. Warranty: Six months from the date of delivery. Warranty excludes physical damage, misuse and unauthorised alterations.',
    '7. Transit Insurance: Transit insurance can be arranged on request and will be billed separately, subject to customer acceptance.'
  ]);
  const [isEditingTerms, setIsEditingTerms] = useState(false);
  const [editingTermIndex, setEditingTermIndex] = useState(null);
  const [editTermText, setEditTermText] = useState('');

  const [discount, setDiscount] = useState(10000);
  const [gstPercentage, setGstPercentage] = useState(18);
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  
  const handleAddButtonClick = (tableNum) => {
    if (tableNum === 1) {
      setShowAddForm1(true);
      setCurrentTable(1);
    } else {
      setShowAddForm2(true);
      setCurrentTable(2);
    }
    setInsertAfterRowId(null);
  };

  const handleInsertRow = (afterRowId, tableNum) => {
    if (tableNum === 1) {
      setShowAddForm1(true);
    } else {
      setShowAddForm2(true);
    }
    setCurrentTable(tableNum);
    setInsertAfterRowId(afterRowId);
  };

  const handleSaveNewRow = () => {
    const row = {
      id: Date.now(),
      slNo: newRowData.slNo || (currentTable === 1 ? rows1.length + 1 : rows2.length + 1),
      group: newRowData.group,
      specification: newRowData.specification,
      dimension: newRowData.dimension,
      noOfUnit: parseFloat(newRowData.noOfUnit) || 0,
      amount: parseFloat(newRowData.amount) || 0,
      hiddenAmount: parseFloat(newRowData.hiddenAmount) || 0
    };

    if (currentTable === 1) {
      let newRows;
      if (insertAfterRowId) {
        const index = rows1.findIndex(r => r.id === insertAfterRowId);
        newRows = [...rows1];
        newRows.splice(index, 0, row); // Insert BEFORE the clicked row
      } else {
        newRows = [...rows1, row];
      }
      // Recalculate serial numbers
      newRows = newRows.map((r, idx) => ({ ...r, slNo: idx + 1 }));
      setRows1(newRows);
      setShowAddForm1(false);
    } else {
      let newRows;
      if (insertAfterRowId) {
        const index = rows2.findIndex(r => r.id === insertAfterRowId);
        newRows = [...rows2];
        newRows.splice(index, 0, row); // Insert BEFORE the clicked row
      } else {
        newRows = [...rows2, row];
      }
      // Recalculate serial numbers
      newRows = newRows.map((r, idx) => ({ ...r, slNo: idx + 1 }));
      setRows2(newRows);
      setShowAddForm2(false);
    }

    setInsertAfterRowId(null);
    setCurrentTable(null);
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
  
  const stopEditing = () => {
    setEditingRow1(null);
    setEditingRow2(null);
    setShowGroupDropdown(null);
    setShowSpecDropdown(null);
  };

  const handleDropdownKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      stopEditing();
    }
  };

  const toggleMenu = (index, tableNum) => {
    if (tableNum === 1) {
      setOpenMenuIndex1(prev => (prev === index ? null : index));
      setOpenMenuIndex2(null);
    } else {
      setOpenMenuIndex2(prev => (prev === index ? null : index));
      setOpenMenuIndex1(null);
    }
  };

  const handleEdit = (index, tableNum) => {
    if (tableNum === 1) {
      setEditingRow1(rows1[index].id);
      setOpenMenuIndex1(null);
    } else {
      setEditingRow2(rows2[index].id);
      setOpenMenuIndex2(null);
    }
  };

  const handleDelete = (index, tableNum) => {
    if (tableNum === 1) {
      const newRows = rows1.filter((_, i) => i !== index);
      // Recalculate serial numbers
      const updatedRows = newRows.map((r, idx) => ({ ...r, slNo: idx + 1 }));
      setRows1(updatedRows);
      setOpenMenuIndex1(null);
    } else {
      const newRows = rows2.filter((_, i) => i !== index);
      // Recalculate serial numbers
      const updatedRows = newRows.map((r, idx) => ({ ...r, slNo: idx + 1 }));
      setRows2(updatedRows);
      setOpenMenuIndex2(null);
    }
  };

  const handleMoveUp = (index, tableNum) => {
    if (index === 0) return; // Cannot move up if it's the first row
    
    if (tableNum === 1) {
      const newRows = [...rows1];
      // Swap with previous row
      [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
      // Recalculate serial numbers
      const updatedRows = newRows.map((r, idx) => ({ ...r, slNo: idx + 1 }));
      setRows1(updatedRows);
      setOpenMenuIndex1(null);
    } else {
      const newRows = [...rows2];
      // Swap with previous row
      [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
      // Recalculate serial numbers
      const updatedRows = newRows.map((r, idx) => ({ ...r, slNo: idx + 1 }));
      setRows2(updatedRows);
      setOpenMenuIndex2(null);
    }
  };

  const handleMoveDown = (index, tableNum) => {
    if (tableNum === 1) {
      if (index === rows1.length - 1) return; // Cannot move down if it's the last row
      const newRows = [...rows1];
      // Swap with next row
      [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
      // Recalculate serial numbers
      const updatedRows = newRows.map((r, idx) => ({ ...r, slNo: idx + 1 }));
      setRows1(updatedRows);
      setOpenMenuIndex1(null);
    } else {
      if (index === rows2.length - 1) return; // Cannot move down if it's the last row
      const newRows = [...rows2];
      // Swap with next row
      [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
      // Recalculate serial numbers
      const updatedRows = newRows.map((r, idx) => ({ ...r, slNo: idx + 1 }));
      setRows2(updatedRows);
      setOpenMenuIndex2(null);
    }
  };

  const updateRow = (id, field, value, tableNum) => {
    if (tableNum === 1) {
      setRows1(rows1.map(row => 
        row.id === id ? { ...row, [field]: value } : row
      ));
    } else {
      setRows2(rows2.map(row => 
        row.id === id ? { ...row, [field]: value } : row
      ));
    }
  };
  
  const selectFromMaster = (type, value) => {
    if (type === 'group') {
      if (currentRowForModal === 'newRow') {
        setNewRowData({ ...newRowData, group: value });
      } else {
        updateRow(currentRowForModal.id, 'group', value, currentRowForModal.table);
      }
      setShowGroupModal(false);
    } else {
      if (currentRowForModal === 'newRow') {
        setNewRowData({ ...newRowData, specification: value });
      } else {
        updateRow(currentRowForModal.id, 'specification', value, currentRowForModal.table);
      }
      setShowSpecModal(false);
    }
    setCurrentRowForModal(null);
  };

  // Terms and Conditions Functions
  const handleEditTerm = (index) => {
    setEditingTermIndex(index);
    setEditTermText(termsConditions[index]);
  };

  const handleSaveTerm = () => {
    const updatedTerms = [...termsConditions];
    updatedTerms[editingTermIndex] = editTermText;
    setTermsConditions(updatedTerms);
    setEditingTermIndex(null);
    setEditTermText('');
  };

  const handleCancelEditTerm = () => {
    setEditingTermIndex(null);
    setEditTermText('');
  };

  const handleDeleteTerm = (index) => {
    if (window.confirm('Are you sure you want to delete this term?')) {
      setTermsConditions(termsConditions.filter((_, i) => i !== index));
    }
  };

  const handleAddTerm = () => {
    const newTermNumber = termsConditions.length + 1;
    setTermsConditions([...termsConditions, `${newTermNumber}. New term`]);
  };

  const calculateTotal = () => {
    const total1 = rows1.reduce((sum, row) => sum + row.amount, 0);
    const total2 = rows2.reduce((sum, row) => sum + row.amount, 0);
    return total1 + total2;
  };

  const calculateTaxableValue = () => {
    return calculateTotal() - discount;
  };

  const calculateGSTAmount = () => {
    return calculateTaxableValue() * (gstPercentage / 100);
  };

  const calculateNetAmount = () => {
    return calculateTaxableValue() + calculateGSTAmount();
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

  const handlePrint = () => {
    if (!formData.pino || !formData.pino.trim()) {
      alert('Please fill PI NO before printing');
      return;
    }
    if (!formData.pidate) {
      alert('Please select PI Date before printing');
      return;
    }
    if (!formData.quotationno || !formData.quotationno.trim()) {
      alert('Please fill Quotation No before printing');
      return;
    }
    if (!formData.quotationdate) {
      alert('Please select Quotation Date before printing');
      return;
    }
    if (!formData.customerName) {
      alert('Please select Customer Name before printing');
      return;
    }
    if (!formData.address || !formData.address.trim()) {
      alert('Please fill Address before printing');
      return;
    }
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!formData.pino || !formData.pino.trim()) {
      alert('Please fill PI NO before downloading PDF');
      return;
    }
    if (!formData.pidate) {
      alert('Please select PI Date before downloading PDF');
      return;
    }
    if (!formData.quotationno || !formData.quotationno.trim()) {
      alert('Please fill Quotation No before downloading PDF');
      return;
    }
    if (!formData.quotationdate) {
      alert('Please select Quotation Date before downloading PDF');
      return;
    }
    if (!formData.customerName) {
      alert('Please select Customer Name before downloading PDF');
      return;
    }
    if (!formData.address || !formData.address.trim()) {
      alert('Please fill Address before downloading PDF');
      return;
    }
    window.print();
  };

  const handleDownloadExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Proforma Invoice\n";
    csvContent += `PI No:,${formData.pino}\n`;
    csvContent += `PI Date:,${formData.pidate}\n`;
    csvContent += "Sl No,Template Group,Template Specification,Dimension,No. of Unit,Amount,Hidden Amount\n";
    rows1.forEach(row => {
      csvContent += `${row.slNo},"${row.group}","${row.specification}",${row.dimension},${row.noOfUnit},${row.amount},${row.hiddenAmount}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `proforma_invoice_${formData.pino.replace(/\//g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: e.target.value
    }); 
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // Render Table Row function to avoid repetition
  const renderTableRow = (row, index, rows, tableNum) => {
    const editingRow = tableNum === 1 ? editingRow1 : editingRow2;
    const openMenuIndex = tableNum === 1 ? openMenuIndex1 : openMenuIndex2;

    return (
      <tr key={row.id} className="table-row">
        <td className="table-cell">{row.slNo}</td>

        {/* GROUP */}
        <td className="table-cell relative">
          {editingRow === row.id ? (
            <div className="dropdown-wrapper">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGroupDropdown(showGroupDropdown === row.id ? null : row.id);
                }}
                onKeyDown={handleDropdownKeyDown}
                tabIndex={0}
                className="dropdown-input"
              >
                <span>{row.group}</span>
                <ChevronDown size={16} className="dropdown-icon" />
              </div>

              {showGroupDropdown === row.id && (
                <div className="dropdown-menu">
                  {groupMasters.map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        updateRow(row.id, 'group', option, tableNum);
                        setShowGroupDropdown(null);
                        stopEditing();
                      }}
                      onMouseEnter={() => setHoveredOption(option)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className={`dropdown-item-option ${
                        hoveredOption === option 
                          ? 'dropdown-item-hovered' 
                          : row.group === option 
                          ? 'dropdown-item-selected' 
                          : 'dropdown-item-default'
                      }`}
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
        <td className="table-cell relative">
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
              >
                <span>{row.specification}</span>
                <ChevronDown size={16} className="dropdown-icon" />
              </div>

              {showSpecDropdown === row.id && (
                <div className="dropdown-menu">
                  {specMasters.map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        updateRow(row.id, 'specification', option, tableNum);
                        setShowSpecDropdown(null);
                        stopEditing();
                      }}
                      onMouseEnter={() => setHoveredOption(option)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className={`dropdown-item-option ${
                        hoveredOption === option 
                          ? 'dropdown-item-hovered' 
                          : row.specification === option 
                          ? 'dropdown-item-selected' 
                          : 'dropdown-item-default'
                      }`}
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
        <td className="table-cell">
          {editingRow === row.id ? (
            <input
              type="text"
              className="filter-input"
              value={row.dimension}
              onChange={(e) => updateRow(row.id, 'dimension', e.target.value, tableNum)}
              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
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
              className="filter-input"
              value={row.noOfUnit}
              onChange={(e) => updateRow(row.id, 'noOfUnit', parseInt(e.target.value), tableNum)}
              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
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
              className="filter-input "
              value={row.amount}
              onChange={(e) => updateRow(row.id, 'amount', parseFloat(e.target.value), tableNum)}
              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
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
              className="filter-input"
              value={row.hiddenAmount}
              onChange={(e) => updateRow(row.id, 'hiddenAmount', parseFloat(e.target.value), tableNum)}
              onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
            />
          ) : (
            <span>₹ {row.hiddenAmount.toFixed(2)}</span>
          )}
        </td>

        {/* ACTIONS */}
        <td className="table-cell-center">
          <div className="table-actions relative">
            <button onClick={() => toggleMenu(index, tableNum)} className="btn-action">
              <Menu size={18} />
            </button>

            {openMenuIndex === index && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-md flex gap-2 p-2 z-10">
                <ArrowUp 
                  size={18} 
                  className={`${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 cursor-pointer hover:text-blue-800'}`}
                  onClick={() => {
                    if (index !== 0) {
                      handleMoveUp(index, tableNum);
                    }
                  }}
                  title={index === 0 ? 'Already at top' : 'Move up'}
                />
                <ArrowDown 
                  size={18} 
                  className={`${
                    (tableNum === 1 && index === rows1.length - 1) || (tableNum === 2 && index === rows2.length - 1)
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-blue-600 cursor-pointer hover:text-blue-800'
                  }`}
                  onClick={() => {
                    if ((tableNum === 1 && index !== rows1.length - 1) || (tableNum === 2 && index !== rows2.length - 1)) {
                      handleMoveDown(index, tableNum);
                    }
                  }}
                  title={
                    (tableNum === 1 && index === rows1.length - 1) || (tableNum === 2 && index === rows2.length - 1)
                      ? 'Already at bottom' 
                      : 'Move down'
                  }
                />
                <Plus 
                  size={18} 
                  className="add-primary cursor-pointer"
                  onClick={() => {
                    handleInsertRow(row.id, tableNum);
                    tableNum === 1 ? setOpenMenuIndex1(null) : setOpenMenuIndex2(null);
                  }}
                  title="Insert row above"
                />
                <Edit2 
                  size={18} 
                  className="cursor-pointer hover:text-gray-700"
                  onClick={() => handleEdit(index, tableNum)}
                  title="Edit row"
                />
                <Trash2 
                  size={18} 
                  className="text-primary cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(index, tableNum)}
                  title="Delete row"
                />
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="page-container">
      {showSubmitMessage && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span className="font-semibold">Form submitted successfully!</span>
        </div>
      )}

      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Proforma Invoice Form</h2>

            {/* Form Fields - First Row */}
            <div className="filter-grid">
              <div className="filter-grid-red">
                <label className="filter-label">PI NO</label>
                <input
                  type="text"
                  className="filter-input"
                  value={formData.pino}
                  onChange={(e) => setFormData({...formData, pino: e.target.value})}
                />
              </div>
              
              <div className="filter-grid-red">
                <label className="filter-label">PI Date</label>
                <input
                  type="date"
                  className="filter-input"
                  value={formData.pidate}
                  onChange={(e) => setFormData({...formData, pidate: e.target.value})}
                />
              </div>
                
              <div className="filter-grid-red">
                <label className="filter-label">Quotation No</label>
                <input
                  type="text"
                  className="filter-input"
                  value={formData.quotationno}
                  onChange={(e) => setFormData({...formData, quotationno: e.target.value})}
                />
              </div>
              
              <div className="filter-grid-red">
                <label className="filter-label">Quotation Date</label>
                <input
                  type="date"
                  className="filter-input"
                  value={formData.quotationdate}
                  onChange={(e) => setFormData({...formData, quotationdate: e.target.value})}
                />
              </div>
            </div>

            {/* Customer Dropdown */}
            <div className="grid grid-cols-2 gap-4 mb-0.5">
              <div id="customer-dropdown-container" className="filter-grid-red">
                <label className="filter-label">Customer Name</label>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCustomerDropdown(!showCustomerDropdown);
                  }}
                  className="dropdown-input"
                >
                  <span>{formData.customerName || 'Select customer'}</span>
                  <ChevronDown size={16} className="dropdown-icon" />
                </div>
                {showCustomerDropdown && (
                  <div className="dropdown-menu">
                    {customerOptions.map((customer, idx) => (
                      <div
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData({...formData, customerName: customer});
                          setShowCustomerDropdown(false);
                        }}
                        onMouseEnter={() => setHoveredOption(customer)}
                        onMouseLeave={() => setHoveredOption(null)}
                        className={`dropdown-item-option ${
                          hoveredOption === customer 
                            ? 'dropdown-item-hovered' 
                            : formData.customerName === customer 
                            ? 'dropdown-item-selected' 
                            : 'dropdown-item-default'
                        }`}
                      >
                        {customer}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-0.5">
              <div className="filter-grid-red">
                <label className="filter-label">Address</label>
                <textarea 
                  className="multiline-field"
                  value={formData.address} 
                  onChange={handleAddressChange} 
                  rows="1" 
                />
              </div>
            </div>

            {/* Template Name */}
            <div className="grid grid-cols-2 gap-4 mb-0.5">
              <div className="filter-grid-red">
                <label className="filter-label">Template Name</label>
                <div className="dropdown-input">
                  <span>{formData.templateName}</span>
                  <ChevronDown size={16} className="dropdown-icon"/>
                </div>
              </div>
            </div>
            
            {/* First Table */}
            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-th">Sl No</th>
                    <th className="table-th">Template Group</th>
                    <th className="table-th">Template Specification</th>
                    <th className="table-th">Dimension</th>
                    <th className="table-th">No. of Unit</th>
                    <th className="table-th">Amount</th>
                    <th className="table-th">Hidden Amount</th>
                    <th className="table-th-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows1.map((row, index) => renderTableRow(row, index, rows1, 1))}
                </tbody>
              </table>

              {/* Add Row Button for Table 1 */}
              <div className="flex justify-end m-5">
                <button onClick={() => handleAddButtonClick(1)} className="btn-smallbtn">
                  <span>+</span> Add Row
                </button>
              </div>
              
              {showAddForm1 && (
                <div className="grid grid-cols-8 gap-3 items-end pb-2 mb-5">
                  <div className="filter-grid-blue">
                    <label className="filter-label">Sl No</label>
                    <div className="filter-input" style={{fontWeight: 'bold', color: '#2f22c3'}}>
                      {insertAfterRowId 
                        ? rows1.findIndex(r => r.id === insertAfterRowId) + 1
                        : rows1.length + 1
                      }
                    </div>
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Template Group</label>
                    <div className="dropdown-wrapper">
                      <div
                        onClick={() => {
                          setShowGroupDropdown(showGroupDropdown === 'newRow1' ? null : 'newRow1');
                        }}
                        className="dropdown-input"
                      >
                        <span>{newRowData.group || 'Select'}</span>
                        <ChevronDown size={16} className="dropdown-icon" />
                      </div>
                      
                      {showGroupDropdown === 'newRow1' && (
                        <div className="dropdown-menu">
                          {groupMasters.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setNewRowData({ ...newRowData, group: option });
                                setShowGroupDropdown(null);
                              }}
                              onMouseEnter={() => setHoveredOption(option)}
                              onMouseLeave={() => setHoveredOption(null)}
                              className={`dropdown-item-option ${
                                hoveredOption === option 
                                  ? 'dropdown-item-hovered' 
                                  : newRowData.group === option 
                                  ? 'dropdown-item-selected' 
                                  : 'dropdown-item-default'
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Template Specification</label>
                    <div className="dropdown-wrapper">
                      <div
                        onClick={() => {
                          setShowSpecDropdown(showSpecDropdown === 'newRow1' ? null : 'newRow1');
                        }}
                        className="dropdown-input"
                      >
                        <span>{newRowData.specification || 'Select'}</span>
                        <ChevronDown size={16} className="dropdown-icon" />
                      </div>
                      
                      {showSpecDropdown === 'newRow1' && (
                        <div className="dropdown-menu">
                          {specMasters.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setNewRowData({ ...newRowData, specification: option });
                                setShowSpecDropdown(null);
                              }}
                              onMouseEnter={() => setHoveredOption(option)}
                              onMouseLeave={() => setHoveredOption(null)}
                              className={`dropdown-item-option ${
                                hoveredOption === option 
                                  ? 'dropdown-item-hovered' 
                                  : newRowData.specification === option 
                                  ? 'dropdown-item-selected' 
                                  : 'dropdown-item-default'
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Dimension</label>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="Input"
                      value={newRowData.dimension}
                      onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                    />
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">No. of Unit</label>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="20*8*8.6"
                      value={newRowData.noOfUnit}
                      onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                    />
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Amount</label>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="₹ 10,00,000"
                      value={newRowData.amount}
                      onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                    />
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Hidden Amount</label>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="₹ 10,00,000"
                      value={newRowData.hiddenAmount}
                      onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                    />
                  </div>

                  <div className="flex items-end">
                    <button onClick={handleSaveNewRow} className="btn-smallbtn">
                      Save
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-3 mb-1.5">
                <div className="px-5 py-3 bg-gray-50 flex gap-3 items-center">
                  <span className="filter-label">Quotation Charges :</span>
                  <span className="filter-label">₹ {rows1.reduce((sum, row) => sum + row.amount, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <h2 className="page-title">Additional Charges</h2>
            
            {/* Second Table */}
            <div className="table-container mb-5">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-th">Sl No</th>
                    <th className="table-th">Template Group</th>
                    <th className="table-th">Template Specification</th>
                    <th className="table-th">Dimension</th>
                    <th className="table-th">No. of Unit</th>
                    <th className="table-th">Amount</th>
                    <th className="table-th">Hidden Amount</th>
                    <th className="table-th-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows2.map((row, index) => renderTableRow(row, index, rows2, 2))}
                </tbody>
              </table>

              {/* Add Row Button for Table 2 */}
              <div className="flex justify-end m-5">
                <button onClick={() => handleAddButtonClick(2)} className="btn-smallbtn">
                  <span>+</span> Add Row
                </button>
              </div>
              
              {showAddForm2 && (
                <div className="grid grid-cols-8 gap-3 items-end pb-2 mb-5">
                  <div className="filter-grid-blue">
                    <label className="filter-label">Sl No</label>
                    <div className="filter-input" style={{fontWeight: 'bold', color: '#2f22c3'}}>
                      {insertAfterRowId 
                        ? rows2.findIndex(r => r.id === insertAfterRowId) + 1
                        : rows2.length + 1
                      }
                    </div>
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Template Group</label>
                    <div className="dropdown-wrapper">
                      <div
                        onClick={() => {
                          setShowGroupDropdown(showGroupDropdown === 'newRow2' ? null : 'newRow2');
                        }}
                        className="dropdown-input"
                      >
                        <span>{newRowData.group || 'Select'}</span>
                        <ChevronDown size={16} className="dropdown-icon" />
                      </div>
                      
                      {showGroupDropdown === 'newRow2' && (
                        <div className="dropdown-menu">
                          {groupMasters.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setNewRowData({ ...newRowData, group: option });
                                setShowGroupDropdown(null);
                              }}
                              onMouseEnter={() => setHoveredOption(option)}
                              onMouseLeave={() => setHoveredOption(null)}
                              className={`dropdown-item-option ${
                                hoveredOption === option 
                                  ? 'dropdown-item-hovered' 
                                  : newRowData.group === option 
                                  ? 'dropdown-item-selected' 
                                  : 'dropdown-item-default'
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Template Specification</label>
                    <div className="dropdown-wrapper">
                      <div
                        onClick={() => {
                          setShowSpecDropdown(showSpecDropdown === 'newRow2' ? null : 'newRow2');
                        }}
                        className="dropdown-input"
                      >
                        <span>{newRowData.specification || 'Select'}</span>
                        <ChevronDown size={16} className="dropdown-icon" />
                      </div>
                      
                      {showSpecDropdown === 'newRow2' && (
                        <div className="dropdown-menu">
                          {specMasters.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setNewRowData({ ...newRowData, specification: option });
                                setShowSpecDropdown(null);
                              }}
                              onMouseEnter={() => setHoveredOption(option)}
                              onMouseLeave={() => setHoveredOption(null)}
                              className={`dropdown-item-option ${
                                hoveredOption === option 
                                  ? 'dropdown-item-hovered' 
                                  : newRowData.specification === option 
                                  ? 'dropdown-item-selected' 
                                  : 'dropdown-item-default'
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Dimension</label>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="Input"
                      value={newRowData.dimension}
                      onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                    />
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">No. of Unit</label>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="20*8*8.6"
                      value={newRowData.noOfUnit}
                      onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                    />
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Amount</label>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="₹ 10,00,000"
                      value={newRowData.amount}
                      onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                    />
                  </div>

                  <div className="filter-grid-green">
                    <label className="filter-label">Hidden Amount</label>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="₹ 10,00,000"
                      value={newRowData.hiddenAmount}
                      onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                    />
                  </div>

                  <div className="flex items-end">
                    <button onClick={handleSaveNewRow} className="btn-smallbtn w-full">
                      Save
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-3 mb-1.5">
                <div className="px-5 py-3 bg-gray-50 flex gap-3 items-center">
                  <span className="filter-label">Additional Charges :</span>
                  <span className="filter-label">₹ {rows2.reduce((sum, row) => sum + row.amount, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-3 mb-3">
              <div className="border border-gray-400 rounded-md px-5 py-3 bg-gray-50 flex gap-3 items-center">
                <span className="filter-label">Net Amount :</span>
                <span className="filter-label">₹ {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
 
            {/* Total Amount */}
            <div className="mb-5 border border-gray-400 rounded-lg p-4">
              <h3 className="section-title">Total Amount</h3>
              
              <div className="filter-grid pb-2">
                <div className="p-3 bg-gray-50 border border-gray-400 rounded-md text-sm font-medium">
                  <div className="filter-label">Total</div>
                  <div>₹ {calculateTotal().toLocaleString()}</div>
                </div>
                
                <div className="p-3 bg-gray-50 border border-gray-400 rounded-md text-sm font-medium">
                  <div className="filter-label">Discount</div>
                  <input
                    type="number"
                    className="filter-input"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                  /> 
                </div>
                
                <div className="p-3 bg-gray-50 border border-gray-400 rounded-md text-sm font-medium">
                  <div className="filter-label">Taxable Value</div>
                  <div>₹ {calculateTaxableValue().toLocaleString()}</div>
                </div>
                
                <div className="p-3 bg-gray-50 border border-gray-400 rounded-md text-sm font-medium">
                  <div className="filter-label">GST 18%</div>
                  <input
                    type="number"
                    className="filter-input"
                    value={gstPercentage}
                    onChange={(e) => setGstPercentage(Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-400 rounded-md text-sm font-medium mt-4">
                <div className="filter-label">Net Amount</div>
                <div className="text-base font-bold">₹ {calculateNetAmount().toLocaleString()}</div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-5 border border-gray-400 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="section-title m-0">Terms And Conditions</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditingTerms(!isEditingTerms)}
                    className="btn-action"
                    title="Toggle Edit Mode"
                  >
                    <Edit2 size={18} />
                  </button>
                  {isEditingTerms && (
                    <button
                      onClick={handleAddTerm}
                      className="btn-action"
                      title="Add New Term"
                    >
                      <Plus size={18} className="add-primary"/>
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4 text-xs text-gray-500 leading-relaxed">
                {termsConditions.map((term, index) => (
                  <div key={index} className="mb-2 flex items-start gap-2">
                    {editingTermIndex === index ? (
                      <>
                        <textarea
                          value={editTermText}
                          onChange={(e) => setEditTermText(e.target.value)}
                          className="multiline-field"
                          rows="2"
                        />
                        <button onClick={handleSaveTerm} className="btn-action" title="Save">
                          <Check size={16} className="add-primary" />
                        </button>
                        <button onClick={handleCancelEditTerm} className="btn-action" title="Cancel">
                          <X size={16} className="text-primary" />
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="flex-1 m-0">{term}</p>
                        {isEditingTerms && (
                          <div className="flex gap-1">
                            <button onClick={() => handleEditTerm(index)} className="btn-action" title="Edit">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDeleteTerm(index)} className="btn-action" title="Delete">
                              <Trash2 size={16} className="text-primary" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="filter-grid mb-4">
              <button onClick={handleSubmit} className="btn-smallbtn">Submit</button>
              <button onClick={handlePrint} className="btn-smallbtn">Print</button>
              <button onClick={handleDownloadPDF} className="btn-smallbtn">PDF</button>
              <button onClick={handleDownloadExcel} className="btn-smallbtn">Excel</button>
            </div>
          </div>
                  
          <button onClick={() => navigate(-1)} className="btn-back">
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[500px] overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Select Group</h3>
            <div className="flex flex-col gap-2">
              {groupMasters.map((group, idx) => (
                <button
                  key={idx}
                  onClick={() => selectFromMaster('group', group)}
                  className="p-3 border border-gray-200 rounded cursor-pointer text-left bg-white text-sm"
                >
                  {group}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowGroupModal(false)}
              className="mt-4 px-5 py-2.5 border-0 rounded bg-gray-600 text-white cursor-pointer w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSpecModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[500px] overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Select Specification</h3>
            <div className="flex flex-col gap-2">
              {specMasters.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => selectFromMaster('spec', spec)}
                  className="p-3 border border-gray-200 rounded cursor-pointer text-left bg-white text-[13px]"
                >
                  {spec}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSpecModal(false)}
              className="mt-4 px-5 py-2.5 border-0 rounded bg-gray-600 text-white cursor-pointer w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
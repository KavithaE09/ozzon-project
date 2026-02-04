import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Plus, Edit2, Trash2, XCircle, ChevronRight, ChevronLeft, CheckCircle, ArrowUp, ArrowDown, Printer, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProformaInvoiceForm() {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState(null);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const rowsPerPage = 5;
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    pino: '',
    pidate: getTodayDate(),
    quotationno: '26-01-2025', 
    quotationdate: getTodayDate(),
    customerName: '',
    address: '',
    templateName: 'Template Office Container',
    images: [],
    imagePreviews: []
  });

  const [selectedImage, setSelectedImage] = useState(null);
  
  const removeImage = (index) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      const newPreviews = [...prev.imagePreviews];
      newImages.splice(index, 1);
      newPreviews.splice(index, 1);
      return {
        ...prev,
        images: newImages,
        imagePreviews: newPreviews
      };
    });
  };

  const customerOptions = ['Admin', 'Customer A', 'Customer B', 'Customer C', 'Customer D'];
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
 
  // First Table State
  const [rows1, setRows1] = useState([
    { id: 1, slNo: 1, group: 'Door', specification: '(7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000 },
    { id: 2, slNo: 2, group: 'Window', specification: 'UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 3, slNo: 3, group: 'Flooring', specification: 'Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
  ]); 

  // Second Table State
  const [rows2, setRows2] = useState([
    { id: 7, slNo: 1, group: 'Electrical', specification: 'Wiring and fixtures', dimension: '20*8*8.6', noOfUnit: 1, amount: 50000, hiddenAmount: 50000 },
    { id: 8, slNo: 2, group: 'Plumbing', specification: 'Water supply system', dimension: '20*8*8.6', noOfUnit: 1, amount: 75000, hiddenAmount: 75000 }
  ]);

  // Pagination calculations
  const totalPages1 = Math.ceil(rows1.length / rowsPerPage);
  const indexOfLastRow1 = currentPage1 * rowsPerPage;
  const indexOfFirstRow1 = indexOfLastRow1 - rowsPerPage;
  const currentRows1 = rows1.slice(indexOfFirstRow1, indexOfLastRow1);

  const totalPages2 = Math.ceil(rows2.length / rowsPerPage);
  const indexOfLastRow2 = currentPage2 * rowsPerPage;
  const indexOfFirstRow2 = indexOfLastRow2 - rowsPerPage;
  const currentRows2 = rows2.slice(indexOfFirstRow2, indexOfLastRow2);

  const [openMenuIndex1, setOpenMenuIndex1] = useState(null);
  const [openMenuIndex2, setOpenMenuIndex2] = useState(null);
  const [editingRow1, setEditingRow1] = useState(null);
  const [editingRow2, setEditingRow2] = useState(null);
  const [editedData1, setEditedData1] = useState({});
  const [editedData2, setEditedData2] = useState({});
  const [addingRow1, setAddingRow1] = useState(false);
  const [addingRow2, setAddingRow2] = useState(false);
  const [newRowPosition1, setNewRowPosition1] = useState(null);
  const [newRowPosition2, setNewRowPosition2] = useState(null);

  // Dropdown states
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const [specDropdownOpen, setSpecDropdownOpen] = useState(false);
  const [groupSearchTerm, setGroupSearchTerm] = useState('');
  const [specSearchTerm, setSpecSearchTerm] = useState('');
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [hoveredSpec, setHoveredSpec] = useState(null);
  
  const groupDropdownRef = useRef(null);
  const specDropdownRef = useRef(null);

  const groupMasters = ['Door', 'Window', 'Flooring', 'Roofing', 'Electrical', 'Plumbing'].sort();
  const specMasters = [
    '(7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door',
    'UPVC sliding window with mesh',
    'Vitrified tiles 2x2 feet',
    'MS sheet roofing with insulation',
    'Wiring and fixtures',
    'Water supply system'
  ].sort();

  const [newRowData, setNewRowData] = useState({
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target)) {
        setGroupDropdownOpen(false);
      }
      if (specDropdownRef.current && !specDropdownRef.current.contains(event.target)) {
        setSpecDropdownOpen(false);
      }
      
      const dropdown = document.getElementById('customer-dropdown-container');
      if (dropdown && !dropdown.contains(event.target)) {
        setShowCustomerDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredGroupOptions = groupMasters.filter(option =>
    option.toLowerCase().includes(groupSearchTerm.toLowerCase())
  );

  const filteredSpecOptions = specMasters.filter(option =>
    option.toLowerCase().includes(specSearchTerm.toLowerCase())
  );

  // Recalculate serial numbers
  const recalculateSerialNumbers = (rowsArray) => {
    return rowsArray.map((row, index) => ({
      ...row,
      slNo: index + 1
    }));
  };

  const handleAddButtonClick = (tableNum) => {
    if (tableNum === 1) {
      setAddingRow1(true);
      setNewRowPosition1('bottom');
    } else {
      setAddingRow2(true);
      setNewRowPosition2('bottom');
    }
    setNewRowData({
      group: '',
      specification: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
    setGroupSearchTerm('');
    setSpecSearchTerm('');
  };

  const handleInsertRow = (afterRowId, tableNum) => {
    if (tableNum === 1) {
      setAddingRow1(true);
      setNewRowPosition1(afterRowId);
      setOpenMenuIndex1(null);
    } else {
      setAddingRow2(true);
      setNewRowPosition2(afterRowId);
      setOpenMenuIndex2(null);
    }
    setNewRowData({
      group: '',
      specification: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
    setGroupSearchTerm('');
    setSpecSearchTerm('');
  };

  const handleSaveNewRow = (tableNum) => {
    const row = {
      id: Date.now(),
      slNo: 0,
      group: newRowData.group,
      specification: newRowData.specification,
      dimension: newRowData.dimension,
      noOfUnit: parseFloat(newRowData.noOfUnit) || 0,
      amount: parseFloat(newRowData.amount) || 0,
      hiddenAmount: parseFloat(newRowData.hiddenAmount) || 0
    };

    if (tableNum === 1) {
      let newRows;
      if (newRowPosition1 === 'bottom') {
        newRows = [...rows1, row];
      } else {
        const index = rows1.findIndex(r => r.id === newRowPosition1);
        newRows = [...rows1];
        newRows.splice(index + 1, 0, row);
      }
      setRows1(recalculateSerialNumbers(newRows));
      setAddingRow1(false);
      setNewRowPosition1(null);
      setCurrentPage1(1);
    } else {
      let newRows;
      if (newRowPosition2 === 'bottom') {
        newRows = [...rows2, row];
      } else {
        const index = rows2.findIndex(r => r.id === newRowPosition2);
        newRows = [...rows2];
        newRows.splice(index + 1, 0, row);
      }
      setRows2(recalculateSerialNumbers(newRows));
      setAddingRow2(false);
      setNewRowPosition2(null);
      setCurrentPage2(1);
    }

    setNewRowData({ 
      group: '',
      specification: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
    setGroupSearchTerm('');
    setSpecSearchTerm('');
  };

  const handleCancelNewRow = (tableNum) => {
    if (tableNum === 1) {
      setAddingRow1(false);
      setNewRowPosition1(null);
    } else {
      setAddingRow2(false);
      setNewRowPosition2(null);
    }
    setNewRowData({
      group: '',
      specification: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
    setGroupSearchTerm('');
    setSpecSearchTerm('');
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

  const handleEdit = (row, tableNum) => {
    if (tableNum === 1) {
      setEditingRow1(row.id);
      setEditedData1({ ...row });
      setGroupSearchTerm(row.group);
      setSpecSearchTerm(row.specification);
      setOpenMenuIndex1(null);
    } else {
      setEditingRow2(row.id);
      setEditedData2({ ...row });
      setGroupSearchTerm(row.group);
      setSpecSearchTerm(row.specification);
      setOpenMenuIndex2(null);
    }
  };

  const handleSaveEdit = (tableNum) => {
    if (tableNum === 1) {
      setRows1(prevRows =>
        prevRows.map(row =>
          row.id === editingRow1 ? { ...editedData1 } : row
        )
      );
      setEditingRow1(null);
      setEditedData1({});
    } else {
      setRows2(prevRows =>
        prevRows.map(row =>
          row.id === editingRow2 ? { ...editedData2 } : row
        )
      );
      setEditingRow2(null);
      setEditedData2({});
    }
    setGroupSearchTerm('');
    setSpecSearchTerm('');
  };

  const handleCancelEdit = (tableNum) => {
    if (tableNum === 1) {
      setEditingRow1(null);
      setEditedData1({});
    } else {
      setEditingRow2(null);
      setEditedData2({});
    }
    setGroupSearchTerm('');
    setSpecSearchTerm('');
  };

  const handleDelete = (rowId, tableNum) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      if (tableNum === 1) {
        const newRows = rows1.filter(row => row.id !== rowId);
        setRows1(recalculateSerialNumbers(newRows));
        setOpenMenuIndex1(null);
        setCurrentPage1(1);
      } else {
        const newRows = rows2.filter(row => row.id !== rowId);
        setRows2(recalculateSerialNumbers(newRows));
        setOpenMenuIndex2(null);
        setCurrentPage2(1);
      }
    }
  };

  const handleMoveUp = (index, tableNum) => {
    if (tableNum === 1) { 
      if (index === 0) return;
      const actualIndex = indexOfFirstRow1 + index;
      const newRows = [...rows1];
      [newRows[actualIndex - 1], newRows[actualIndex]] = [newRows[actualIndex], newRows[actualIndex - 1]];
      setRows1(recalculateSerialNumbers(newRows));
      setOpenMenuIndex1(null);
    } else {
      if (index === 0) return;
      const actualIndex = indexOfFirstRow2 + index;
      const newRows = [...rows2];
      [newRows[actualIndex - 1], newRows[actualIndex]] = [newRows[actualIndex], newRows[actualIndex - 1]];
      setRows2(recalculateSerialNumbers(newRows));
      setOpenMenuIndex2(null);
    }
  };

  const handleMoveDown = (index, tableNum) => {
    if (tableNum === 1) {
      const actualIndex = indexOfFirstRow1 + index;
      if (actualIndex === rows1.length - 1) return;
      const newRows = [...rows1];
      [newRows[actualIndex], newRows[actualIndex + 1]] = [newRows[actualIndex + 1], newRows[actualIndex]];
      setRows1(recalculateSerialNumbers(newRows));
      setOpenMenuIndex1(null);
    } else {
      const actualIndex = indexOfFirstRow2 + index;
      if (actualIndex === rows2.length - 1) return;
      const newRows = [...rows2];
      [newRows[actualIndex], newRows[actualIndex + 1]] = [newRows[actualIndex + 1], newRows[actualIndex]];
      setRows2(recalculateSerialNumbers(newRows));
      setOpenMenuIndex2(null);
    }
  };

  const updateEditedData = (field, value, tableNum) => {
    if (tableNum === 1) {
      setEditedData1(prev => ({ ...prev, [field]: value }));
    } else {
      setEditedData2(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSelectGroup = (option, isEdit = false, tableNum = null) => {
    if (isEdit && tableNum) {
      updateEditedData('group', option, tableNum);
      setGroupSearchTerm(option);
    } else {
      setNewRowData({ ...newRowData, group: option });
      setGroupSearchTerm(option);
    }
    setGroupDropdownOpen(false);
  };

  const handleSelectSpec = (option, isEdit = false, tableNum = null) => {
    if (isEdit && tableNum) {
      updateEditedData('specification', option, tableNum);
      setSpecSearchTerm(option);
    } else {
      setNewRowData({ ...newRowData, specification: option });
      setSpecSearchTerm(option);
    }
    setSpecDropdownOpen(false);
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

  // Render Table function - EXACT COPY FROM QUOTATION
  const renderTable = (currentRows, rows, tableNum, editingRow, editedData, openMenuIndex, indexOfFirstRow) => {
    return (
      <tbody>
        {currentRows.map((row, index) => (
          <React.Fragment key={row.id}>
            <tr className="table-row">
              <td className="table-cell">{row.slNo}</td>

              {/* GROUP */}
              <td className="table-cell">
                {editingRow === row.id ? (
                  <div ref={groupDropdownRef} className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={groupSearchTerm}
                        onChange={(e) => {
                          setGroupSearchTerm(e.target.value);
                          setGroupDropdownOpen(true);
                        }}
                        onFocus={() => setGroupDropdownOpen(true)}
                        placeholder="Type or select..."
                        className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                      />
                      <ChevronDown
                        size={16}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                    {groupDropdownOpen && (
                      <div className="dropdown-menu">
                        {filteredGroupOptions.length > 0 ? (
                          filteredGroupOptions.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSelectGroup(option, true, tableNum)}
                              onMouseEnter={() => setHoveredGroup(option)}
                              onMouseLeave={() => setHoveredGroup(null)}
                              className={`dropdown-item-option ${
                                hoveredGroup === option
                                  ? 'dropdown-item-hovered'
                                  : editedData.group === option
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
                  <span>{row.group}</span>
                )}
              </td>

              {/* SPECIFICATION */}
              <td className="table-cell spec-column">
                {editingRow === row.id ? (
                  <div ref={specDropdownRef} className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={specSearchTerm}
                        onChange={(e) => {
                          setSpecSearchTerm(e.target.value);
                          setSpecDropdownOpen(true);
                        }}
                        onFocus={() => setSpecDropdownOpen(true)}
                        placeholder="Type or select..."
                        className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                      />
                      <ChevronDown
                        size={16}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                    {specDropdownOpen && (
                      <div className="dropdown-menu max-w-[200px]">
                        {filteredSpecOptions.length > 0 ? (
                          filteredSpecOptions.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSelectSpec(option, true, tableNum)}
                              onMouseEnter={() => setHoveredSpec(option)}
                              onMouseLeave={() => setHoveredSpec(null)}
                              className={`dropdown-item-option ${
                                hoveredSpec === option
                                  ? 'dropdown-item-hovered'
                                  : editedData.specification === option
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
                  <span>{row.specification}</span>
                )}
              </td>

              {/* DIMENSION */}
              <td className="table-cell">
                {editingRow === row.id ? (
                  <input
                    type="text"
                    value={editedData.dimension}
                    onChange={(e) => updateEditedData('dimension', e.target.value, tableNum)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                    value={editedData.noOfUnit}
                    onChange={(e) => updateEditedData('noOfUnit', parseFloat(e.target.value), tableNum)}
                    className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                    value={editedData.amount}
                    onChange={(e) => updateEditedData('amount', parseFloat(e.target.value), tableNum)}
                    className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
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
                    value={editedData.hiddenAmount}
                    onChange={(e) => updateEditedData('hiddenAmount', parseFloat(e.target.value), tableNum)}
                    className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                  />
                ) : (
                  <span>₹ {row.hiddenAmount.toFixed(2)}</span>
                )}
              </td>

              {/* ACTIONS */}
              <td className="table-cell-center">
                {editingRow === row.id ? (
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => handleSaveEdit(tableNum)} title="Save">
                      <CheckCircle size={18} className="cursor-pointer text-green-600 hover:opacity-70" />
                    </button>
                    <button onClick={() => handleCancelEdit(tableNum)} title="Cancel">
                      <XCircle size={18} className="cursor-pointer text-red-600 hover:opacity-70" />
                    </button>
                  </div>
                ) : (
                  <div className="table-actions relative">
                    <button onClick={() => toggleMenu(index, tableNum)} className="btn-action">
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
                              handleMoveUp(index, tableNum);
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
                              handleMoveDown(index, tableNum);
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
                          onClick={() => handleInsertRow(row.id, tableNum)}
                          title="Insert Row"
                        />
                        <Edit2
                          size={18}
                          className="text-gray-700 cursor-pointer"
                          onClick={() => handleEdit(row, tableNum)}
                          title="Edit"
                        />
                        <Trash2
                          size={18}
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleDelete(row.id, tableNum)}
                          title="Delete"
                        />
                      </div>
                    )}
                  </div>
                )}
              </td>
            </tr>

            {/* Insert new row */}
            {((tableNum === 1 && addingRow1 && newRowPosition1 === row.id) ||
              (tableNum === 2 && addingRow2 && newRowPosition2 === row.id)) && (
              <tr className="table-row bg-blue-50">
                <td className="table-cell font-bold text-blue-600">
                  {rows.findIndex(r => r.id === row.id) + 2}
                </td>

                {/* GROUP */}
                <td className="table-cell">
                  <div ref={groupDropdownRef} className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={groupSearchTerm}
                        onChange={(e) => {
                          setGroupSearchTerm(e.target.value);
                          setGroupDropdownOpen(true);
                        }}
                        onFocus={() => setGroupDropdownOpen(true)}
                        placeholder="Type or select..."
                        className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                      />
                      <ChevronDown
                        size={16}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                    {groupDropdownOpen && (
                      <div className="dropdown-menu">
                        {filteredGroupOptions.length > 0 ? (
                          filteredGroupOptions.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSelectGroup(option, false)}
                              onMouseEnter={() => setHoveredGroup(option)}
                              onMouseLeave={() => setHoveredGroup(null)}
                              className={`dropdown-item-option ${
                                hoveredGroup === option
                                  ? 'dropdown-item-hovered'
                                  : newRowData.group === option
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

                {/* SPECIFICATION */}
                <td className="table-cell">
                  <div ref={specDropdownRef} className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={specSearchTerm}
                        onChange={(e) => {
                          setSpecSearchTerm(e.target.value);
                          setSpecDropdownOpen(true);
                        }}
                        onFocus={() => setSpecDropdownOpen(true)}
                        placeholder="Type or select..."
                        className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                      />
                      <ChevronDown
                        size={16}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                    {specDropdownOpen && (
                      <div className="dropdown-menu">
                        {filteredSpecOptions.length > 0 ? (
                          filteredSpecOptions.map((option, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSelectSpec(option, false)}
                              onMouseEnter={() => setHoveredSpec(option)}
                              onMouseLeave={() => setHoveredSpec(null)}
                              className={`dropdown-item-option ${
                                hoveredSpec === option
                                  ? 'dropdown-item-hovered'
                                  : newRowData.specification === option
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
                    <button onClick={() => handleSaveNewRow(tableNum)} title="Save">
                      <CheckCircle size={18} className="cursor-pointer text-green-600 hover:opacity-70" />
                    </button>
                    <button onClick={() => handleCancelNewRow(tableNum)} title="Cancel">
                      <XCircle size={18} className="cursor-pointer text-red-600 hover:opacity-70" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}

        {/* Add row at bottom */}
        {((tableNum === 1 && addingRow1 && newRowPosition1 === 'bottom') ||
          (tableNum === 2 && addingRow2 && newRowPosition2 === 'bottom')) && (
          <tr className="table-row bg-blue-50">
            <td className="table-cell font-bold text-blue-600">{rows.length + 1}</td>

            <td className="table-cell">
              <div ref={groupDropdownRef} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={groupSearchTerm}
                    onChange={(e) => {
                      setGroupSearchTerm(e.target.value);
                      setGroupDropdownOpen(true);
                    }}
                    onFocus={() => setGroupDropdownOpen(true)}
                    placeholder="Type or select..."
                    className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
                {groupDropdownOpen && (
                  <div className="dropdown-menu">
                    {filteredGroupOptions.length > 0 ? (
                      filteredGroupOptions.map((option, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectGroup(option, false)}
                          onMouseEnter={() => setHoveredGroup(option)}
                          onMouseLeave={() => setHoveredGroup(null)}
                          className={`dropdown-item-option ${
                            hoveredGroup === option
                              ? 'dropdown-item-hovered'
                              : newRowData.group === option
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
              <div ref={specDropdownRef} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={specSearchTerm}
                    onChange={(e) => {
                      setSpecSearchTerm(e.target.value);
                      setSpecDropdownOpen(true);
                    }}
                    onFocus={() => setSpecDropdownOpen(true)}
                    placeholder="Type or select..."
                    className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
                {specDropdownOpen && (
                  <div className="dropdown-menu">
                    {filteredSpecOptions.length > 0 ? (
                      filteredSpecOptions.map((option, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectSpec(option, false)}
                          onMouseEnter={() => setHoveredSpec(option)}
                          onMouseLeave={() => setHoveredSpec(null)}
                          className={`dropdown-item-option ${
                            hoveredSpec === option
                              ? 'dropdown-item-hovered'
                              : newRowData.specification === option
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
                <button onClick={() => handleSaveNewRow(tableNum)} title="Save">
                  <CheckCircle size={18} className="cursor-pointer text-green-600 hover:opacity-70" />
                </button>
                <button onClick={() => handleCancelNewRow(tableNum)} title="Cancel">
                  <XCircle size={18} className="cursor-pointer text-red-600 hover:opacity-70" />
                </button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
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

            {/* Form Fields */}
            <div className="filter-grid">
              <div className="filter-grid-red">
                <label className="filter-label">PI NO</label>
                <input
                  type="text"
                  className="filter-input"
                  value={formData.pino}
                  onChange={(e) => setFormData({ ...formData, pino: e.target.value })}
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">PI Date</label>
                <input
                  type="date"
                  className="filter-input"
                  value={formData.pidate}
                  onChange={(e) => setFormData({ ...formData, pidate: e.target.value })}
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Quotation No</label>
                <input
                  type="text"
                  className="filter-input"
                  value={formData.quotationno}
                  onChange={(e) => setFormData({ ...formData, quotationno: e.target.value })}
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Quotation Date</label>
                <input
                  type="date"
                  className="filter-input"
                  value={formData.quotationdate}
                  onChange={(e) => setFormData({ ...formData, quotationdate: e.target.value })}
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
                          setFormData({ ...formData, customerName: customer });
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

              {/* Template Name */}
              <div className="filter-grid-red">
                <label className="filter-label">Template Name</label>
                <div className="dropdown-input">
                  <span>{formData.templateName}</span>
                  <ChevronDown size={16} className="dropdown-icon" />
                </div>
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

              {/* Upload Photos */}
              <div className="filter-grid-red">
                <label className="filter-label">Upload Photos</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const newPreviews = files.map(file => URL.createObjectURL(file));
                    setFormData(prev => ({
                      ...prev,
                      images: [...prev.images, ...files],
                      imagePreviews: [...prev.imagePreviews, ...newPreviews]
                    }));
                    e.target.value = null;
                  }}
                  className="file-input"
                />
                {formData.imagePreviews && formData.imagePreviews.length > 0 && (
                  <div className="image-preview-container">
                    {formData.imagePreviews.map((img, index) => (
                      <div key={index} className="image-preview-wrapper">
                        <img
                          src={img}
                          alt={`preview-${index}`}
                          onClick={() => setSelectedImage(img)}
                          className="image-preview"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="image-remove-btn"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
              <div onClick={() => setSelectedImage(null)} className="image-modal-overlay">
                <div onClick={(e) => e.stopPropagation()} className="image-modal-content">
                  <img src={selectedImage} alt="view" className="image-modal-img" />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="image-modal-close"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

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
                {renderTable(currentRows1, rows1, 1, editingRow1, editedData1, openMenuIndex1, indexOfFirstRow1)}
              </table>
            </div>

            {/* Add Row Button Table 1 */}
            <div className="flex justify-end mb-2 mt-2">
              <button
                onClick={() => handleAddButtonClick(1)}
                className="btn-all flex items-center gap-2"
              >
                <Plus size={18} />
                Add Row
              </button>
            </div>

            {/* Pagination Table 1 */}
            {rows1.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage1 === 1}
                  onClick={() => setCurrentPage1(p => p - 1)}
                  className={`pagination-btn ${
                    currentPage1 === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages1 }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage1(page)}
                    className={`pagination-page-btn ${
                      currentPage1 === page ? 'pagination-page-active' : 'pagination-page-inactive'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage1 === totalPages1}
                  onClick={() => setCurrentPage1(p => p + 1)}
                  className={`pagination-btn ${
                    currentPage1 === totalPages1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            <div className="flex justify-end mt-3 mb-1.5">
              <div className="px-5 py-3 bg-gray-50 flex gap-3 items-center">
                <span className="filter-label">Quotation Charges:</span>
                <span className="filter-label">₹ {rows1.reduce((sum, row) => sum + row.amount, 0).toFixed(2)}</span>
              </div>
            </div>

            <h2 className="page-title">Additional Charges</h2>

            {/* Second Table */}
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
                {renderTable(currentRows2, rows2, 2, editingRow2, editedData2, openMenuIndex2, indexOfFirstRow2)}
              </table>
            </div>

            {/* Add Row Button Table 2 */}
            <div className="flex justify-end mb-2 mt-2">
              <button
                onClick={() => handleAddButtonClick(2)}
                className="btn-all flex items-center gap-2"
              >
                <Plus size={18} />
                Add Row
              </button>
            </div>

            {/* Pagination Table 2 */}
            {rows2.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage2 === 1}
                  onClick={() => setCurrentPage2(p => p - 1)}
                  className={`pagination-btn ${
                    currentPage2 === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages2 }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage2(page)}
                    className={`pagination-page-btn ${
                      currentPage2 === page ? 'pagination-page-active' : 'pagination-page-inactive'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage2 === totalPages2}
                  onClick={() => setCurrentPage2(p => p + 1)}
                  className={`pagination-btn ${
                    currentPage2 === totalPages2 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            <div className="flex justify-end mt-3 mb-1.5">
              <div className="px-5 py-3 bg-gray-50 flex gap-3 items-center">
                <span className="filter-label">Additional Charges:</span>
                <span className="filter-label">₹ {rows2.reduce((sum, row) => sum + row.amount, 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end mt-3 mb-3">
              <div className="border border-gray-400 rounded-md px-5 py-3 bg-gray-50 flex gap-3 items-center">
                <span className="filter-label">Net Amount:</span>
                <span className="filter-label">₹ {calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Total Amount */}
            <div className="mb-5 border border-gray-400 rounded-md p-3">
              <h3 className="section-title">Total Amount</h3>

              <div className="grid grid-cols-4 gap-4 pb-1.5">
                <div className="filter-grid-gray">
                  <div className="filter-label">Total</div>
                  <input
                    readOnly
                    value={`₹ ${calculateTotal().toFixed(2)}`}
                    className="filter-input bg-transparent"
                  />
                </div>

                <div className="filter-grid-red">
                  <div className="filter-label">Discount</div>
                  <input
                    type="number" 
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                    className="filter-input bg-transparent"
                  />
                </div>

                <div className="filter-grid-gray">
                  <div className="filter-label">Taxable Value</div>
                  <input
                    readOnly
                    value={`₹ ${calculateTaxableValue().toFixed(2)}`}
                    className="filter-input bg-transparent"
                  />
                </div>

                <div className="filter-grid-red">
                  <div className="filter-label">GST 18%</div>
                  <input
                    type="number" 
                    value={gstPercentage}
                    onChange={(e) => setGstPercentage(Number(e.target.value) || 0)}
                    className="filter-input bg-transparent"
                  />
                </div>
              </div>

              <div className="filter-grid-gray">
                <div className="filter-label">Net Amount</div>
                <input
                  readOnly
                  value={`₹ ${calculateNetAmount().toFixed(2)}`}
                  className="filter-input bg-transparent"
                />
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
                      <Plus size={18} className="add-primary" />
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
                          className="multiline-field flex-1"
                          rows="2"
                        />
                        <button onClick={handleSaveTerm} className="btn-action" title="Save">
                          <CheckCircle size={16} className="text-green-600" />
                        </button>
                        <button onClick={handleCancelEditTerm} className="btn-action" title="Cancel">
                          <XCircle size={16} className="text-red-600" />
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
                              <Trash2 size={16} className="text-red-600" />
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
            <div className="filter-grid action-buttons">
              <button onClick={handlePrint} className="btn-smallbtn flex items-center justify-center gap-2">
                <Printer size={16} />
                Print
              </button>
              <button onClick={handleDownloadExcel} className="btn-smallbtn flex items-center justify-center gap-2">
                <FileSpreadsheet size={16} />
                Excel
              </button>
              <button onClick={handleSubmit} className="btn-smallbtn">
                Submit
              </button>
            </div>

            {/* Back Button */}
            <div className="footer-container">
              <button onClick={() => navigate(-1)} className="btn-back">
                <span>←</span>
                <span>Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
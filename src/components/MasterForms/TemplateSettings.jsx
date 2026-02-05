import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Plus, Edit2, Trash2, XCircle, ChevronRight, ChevronLeft, CheckCircle, ArrowUp, ArrowDown,Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import templateSettingsApi from "../../api/templateSettingsApi";



export default function TemplateSettings() {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState('Office Container');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Initialize with no rows, but set addingRow to true for default row
  const [rows, setRows] = useState([])  
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [addingRow, setAddingRow] = useState(true); // Start with adding mode
  const [insertAfterRowId, setInsertAfterRowId] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [newRowPosition, setNewRowPosition] = useState('bottom'); // Default position

  // Dropdown states
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const [specDropdownOpen, setSpecDropdownOpen] = useState(false);
  const [groupSearchTerm, setGroupSearchTerm] = useState('');
  const [specSearchTerm, setSpecSearchTerm] = useState('');
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [hoveredSpec, setHoveredSpec] = useState(null);
  
  const groupDropdownRef = useRef(null);
  const specDropdownRef = useRef(null);

const [groupMasters, setGroupMasters] = useState([]);
const [specMasters, setSpecMasters] = useState([]);


  const [newRowData, setNewRowData] = useState({
    group: '', 
    specification: '',
    dimension: '',
    noOfUnit: 0,
    amount: 0,
    hiddenAmount: 0
  });

  const [discount, setDiscount] = useState(10000);
  const [gstPercentage, setGstPercentage] = useState(18);

  // Terms and Conditions State
  const [termsConditions, setTermsConditions] = useState([]);
  const [isEditingTerms, setIsEditingTerms] = useState(false);
  const [editingTermIndex, setEditingTermIndex] = useState(null);
  const [editTermText, setEditTermText] = useState('');

useEffect(() => {
  loadMasters();
  loadTemplateSettings();
}, []);

const loadMasters = async () => {
  try {
    const res = await templateSettingsApi.getTempGroups();
    console.log("Raw backend response:", res);

    // Convert object with numeric keys to array
    const groupsArray = Array.isArray(res) ? res : Object.values(res);
    setGroupMasters(groupsArray);

    console.log("groupMasters after setState:", groupsArray);
  } catch (err) {
    console.error("Error loading groups:", err);
  }
};


useEffect(() => {
  const handleClickOutside = (event) => {
    if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target)) {
      setGroupDropdownOpen(false);
    }
    if (specDropdownRef.current && !specDropdownRef.current.contains(event.target)) {
      setSpecDropdownOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);


const loadTemplateSettings = async () => {
  try {
    const res = await templateSettingsApi.getAllTemplates();

    if (res.success && res.data.length > 0) {
      const t = res.data[0];

      setTemplateName(t.TempName);
      setDiscount(t.DisAmount || 0);
      setGstPercentage(18);

      // ❗ Populate rows from backend - only if data exists
      if (t.Rows && t.Rows.length > 0) {
        setRows(
          t.Rows.map((r, index) => ({
            id: r.TempGroupId + '-' + index, // unique id
            slNo: index + 1,
            group: r.TempGroupName || '',    // use TempGroupName
            specification: r.TempSpecName || '', 
            dimension: r.Dimension || '',
            noOfUnit: r.NoUnit || 0,
            amount: r.Amount || 0,
            hiddenAmount: r.HiddenAmount || 0
          }))
        );
        // Disable adding mode when data is loaded
        setAddingRow(false);
        setNewRowPosition(null);
      }

      setTermsConditions(
        t.TermsAndConditions
          ? t.TermsAndConditions.split("\n")
          : []
      );
    }
  } catch (err) {
    console.error("Template load failed", err);
  }
};



const filteredGroupOptions = groupMasters.filter(g =>
  !groupSearchTerm || g.TempGroupName.toLowerCase().includes(groupSearchTerm.trim().toLowerCase())
);



const filteredSpecOptions = specMasters.filter(s =>
  (s || '').toLowerCase().includes((specSearchTerm || '').trim().toLowerCase())
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
    group: '',
    specification: '',
    dimension: '',
    noOfUnit: 0,
    amount: 0,
    hiddenAmount: 0
  });

  setGroupSearchTerm('');
  setSpecSearchTerm('');

  setOpenMenuIndex(null);
};

 const handleInsertRow = (afterRowId) => {
  setAddingRow(true);
  setNewRowPosition(afterRowId);
  setOpenMenuIndex(null);
  setNewRowData({
    group: '',
    specification: '',
    dimension: '',
    noOfUnit: 0,
    amount: 0,
    hiddenAmount: 0
  });
  setGroupSearchTerm('');
  setSpecSearchTerm('');

  setOpenMenuIndex(null);
};


  const handleSaveNewRow = () => {
    const row = {
    id: Date.now(),
    slNo: 0,
    group: newRowData.group.trim(),
    specification: newRowData.specification.trim(),
    dimension: newRowData.dimension.trim(),
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
    setCurrentPage(1);
  };

  const handleCancelNewRow = () => {
    setAddingRow(false);
    setNewRowPosition(null);
    setNewRowData({ 
      group: '',
      specification: '',
      dimension: '',
      noOfUnit: 0,
      amount: 0,
      hiddenAmount: 0
    });
    setGroupSearchTerm('');
    setSpecSearchTerm('');
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex(prev => (prev === index ? null : index));
  };

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditedData({ ...row });
    setGroupSearchTerm(row.group);
    setSpecSearchTerm(row.specification);
    
    setOpenMenuIndex(null);
  };

  const handleSaveEdit = () => {
  setRows(prevRows =>
    prevRows.map(row =>
      row.id === editingRow
        ? { ...editedData, group: editedData.group.trim(), specification: editedData.specification.trim() }
        : row
    )
  );
  setEditingRow(null);
  setEditedData({});
};

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedData({});
    setGroupSearchTerm('');
    setSpecSearchTerm('');
  };

  const handleDelete = (rowId) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      const newRows = rows.filter(row => row.id !== rowId);
      setRows(recalculateSerialNumbers(newRows));
      setOpenMenuIndex(null);
      setCurrentPage(1);
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

 const handleSelectGroup = (option, isEdit = false) => {
  if (isEdit) {
    updateEditedData('group', option);  // update row data
    setGroupSearchTerm(option);         // update input value
  } else {
    setNewRowData({ ...newRowData, group: option });
    setGroupSearchTerm(option);
  }
  setGroupDropdownOpen(false);  // close dropdown
};


  const handleSelectSpec = (option, isEdit = false) => {
    if (isEdit) {
      updateEditedData('specification', option);
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
const handleSubmit = async () => {
  try {
    const payload = {
      TempName: templateName,
      TotalAmount: calculateTotal(),
      DisAmount: discount,
      TaxableValue: calculateTaxableValue(),
      GSTAmount: calculateGST(),
      NetAmount: calculateNetAmount(),
      TermsAndConditions: termsConditions, // 👈 ARRAY (backend joins)

      rows: rows.map(r => ({
        TempGroupId: groupMasters.find(g => g.TempGroupName === r.group)?.TempGroupId || null,
        TempSpecId: null, // spec later
        Dimension: r.dimension,
        NoUnit: r.noOfUnit,
        Amount: r.amount,
        HiddenAmount: r.hiddenAmount
      }))
    };

    await templateSettingsApi.createTemplate(payload);

    alert("Template saved successfully ✅"); 
  } catch (err) {
    console.error(err);
    alert("Save failed ❌");
  }
};



  return (
    <div className="page-container">
      <div className="content-wrapper"> 
        <div className="main-section">
          <div className="content-card">
           <div className="page-header">
              <h1 className="page-title">Template Settings</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2   className="page-back-icon" />
              </button>
            </div>

            <div className="filter-grid-red mb-6">
              <label className="filter-label">Template Name</label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="filter-input"
              />
            </div>

            {/* Table */}
            <div className="table-container" style={{ overflow: 'visible' }}>
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
                                value={editingRow === row.id ? groupSearchTerm : row.group}
                                onChange={(e) => {
                                  setGroupSearchTerm(e.target.value);
                                  setGroupDropdownOpen(true); // show filtered options
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
                                <div className="dropdown-menu" style={{ zIndex: 9999 }}>
                                  {filteredGroupOptions.length > 0 ? (
                                    filteredGroupOptions.map((option, idx) => (
                                    <div
                                      key={option.TempGroupId}
                                      onClick={() => handleSelectGroup(option.TempGroupName, true)}
                                      onMouseEnter={() => setHoveredGroup(option.TempGroupName)}
                                      onMouseLeave={() => setHoveredGroup(null)}
                                      className={`dropdown-item-option ${
                                        hoveredGroup === option.TempGroupName
                                          ? 'dropdown-item-hovered'
                                          : editedData.group === option.TempGroupName
                                          ? 'dropdown-item-selected'
                                          : 'dropdown-item-default'
                                      }`}
                                    >
                                      {option.TempGroupName}
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
                                <div className="dropdown-menu max-w-[200px]" style={{ zIndex: 9999 }}>
                                  {filteredSpecOptions.length > 0 ? (
                                    filteredSpecOptions.map((option, idx) => (
                                      <div
                                        key={idx}
                                        onClick={() => handleSelectSpec(option, true)}
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
                              onChange={(e) => updateEditedData('dimension', e.target.value)}
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
                              onChange={(e) => updateEditedData('noOfUnit', parseFloat(e.target.value) || 0)}
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
                              onChange={(e) => updateEditedData('amount', parseFloat(e.target.value) || 0)}
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
                              onChange={(e) => updateEditedData('hiddenAmount', parseFloat(e.target.value) || 0)}
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
                              <button
                                onClick={handleSaveEdit}
                                title="Save"
                              >
                                <CheckCircle size={18}  className="cursor-pointer text-green-600 hover:opacity-70"/>
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                 title="Cancel"
                              >
                                <XCircle size={18} className="cursor-pointer text-red-600 hover:opacity-70"/>
                              </button>
                            </div>
                          ) : (
                            <div className="table-actions relative">
                              <button
                                onClick={() => toggleMenu(index)}
                                className="btn-action"
                              >
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

                      {/* Insert new row after this row if + icon was clicked */}
                      {addingRow && newRowPosition === row.id && (
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
                                <div className="dropdown-menu" style={{ zIndex: 9999 }}>
                                  {filteredGroupOptions.length > 0 ? (
                                    filteredGroupOptions.map((option, idx) => (
                                      <div
                                       key={option.TempGroupId} 
                                        onClick={() => handleSelectGroup(option.TempGroupName, false)}
                                        onMouseEnter={() => setHoveredGroup(option.TempGroupName)}
                                        onMouseLeave={() => setHoveredGroup(null)}
                                        className={`dropdown-item-option ${
                                            hoveredGroup === option.TempGroupName
                                              ? 'dropdown-item-hovered'
                                              : newRowData.group === option.TempGroupName
                                              ? 'dropdown-item-selected'
                                              : 'dropdown-item-default'

                                        }`}
                                      >
                                        {option.TempGroupName}
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
                                <div className="dropdown-menu" style={{ zIndex: 9999 }}>
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

                          {/* DIMENSION */}
                          <td className="table-cell">
                            <input
                              type="text"
                              placeholder="20*8*8.6"
                              value={newRowData.dimension}
                              onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          </td>

                          {/* NO OF UNIT */}
                          <td className="table-cell">
                            <input
                              type="number"
                              placeholder="1"
                              value={newRowData.noOfUnit}
                              onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                              className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          </td>

                          {/* AMOUNT */}
                          <td className="table-cell">
                            <input
                              type="number"
                              placeholder="10000"
                              value={newRowData.amount}
                              onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                              className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          </td>

                          {/* HIDDEN AMOUNT */}
                          <td className="table-cell">
                            <input
                              type="number"
                              placeholder="10000"
                              value={newRowData.hiddenAmount}
                              onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                              className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          </td>

                          {/* ACTIONS */}
                          <td className="table-cell-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={handleSaveNewRow}
                                title="Save"
                              >
                                <CheckCircle size={18}  className="cursor-pointer text-green-600 hover:opacity-70"/>
                              </button>
                              <button
                                onClick={handleCancelNewRow}
                                title="Cancel"
                              >
                                <XCircle size={18} className="cursor-pointer text-red-600 hover:opacity-70" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}

                  {/* Add row at bottom when "Add Row" button is clicked */}
                  {addingRow && newRowPosition === 'bottom' && (
                    <tr className="table-row bg-blue-50">
                      <td className="table-cell font-bold text-blue-600">
                        {rows.length + 1}
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
                              onFocus={(e) => {
                                  e.stopPropagation();
                                  setGroupDropdownOpen(true);
                                }}

                              placeholder="Type or select..."
                              className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded text-sm"
                            />
                            <ChevronDown 
                              size={16} 
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                          </div>
                          {groupDropdownOpen && (
                            <div className="dropdown-menu" style={{ zIndex: 9999 }}>
                              {filteredGroupOptions.length > 0 ? (
                                filteredGroupOptions.map((option) => (
                                  <div
                                    key={option.TempGroupId}
                                    onClick={() => handleSelectGroup(option.TempGroupName, false)}
                                    onMouseEnter={() => setHoveredGroup(option.TempGroupName)}
                                    onMouseLeave={() => setHoveredGroup(null)}
                                    className={`dropdown-item-option ${
                                      hoveredGroup === option.TempGroupName
                                        ? 'dropdown-item-hovered'
                                        : newRowData.group === option.TempGroupName
                                        ? 'dropdown-item-selected'
                                        : 'dropdown-item-default'
                                    }`}
                                  >
                                    {option.TempGroupName}
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
                            <div className="dropdown-menu" style={{ zIndex: 9999 }}>
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

                      {/* DIMENSION */}
                      <td className="table-cell">
                        <input
                          type="text"
                          placeholder="20*8*8.6"
                          value={newRowData.dimension}
                          onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      </td>

                      {/* NO OF UNIT */}
                      <td className="table-cell">
                        <input
                          type="number"
                          placeholder="1"
                          value={newRowData.noOfUnit}
                          onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                          className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      </td>

                      {/* AMOUNT */}
                      <td className="table-cell">
                        <input
                          type="number"
                          placeholder="10000"
                          value={newRowData.amount}
                          onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                          className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      </td>

                      {/* HIDDEN AMOUNT */}
                      <td className="table-cell">
                        <input
                          type="number"
                          placeholder="10000"
                          value={newRowData.hiddenAmount}
                          onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                          className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      </td>

                      {/* ACTIONS */}
                      <td className="table-cell-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={handleSaveNewRow}
                            title="Save"
                          >
                            <CheckCircle size={18}  className="cursor-pointer text-green-600 hover:opacity-70" />
                          </button>
                          <button
                            onClick={handleCancelNewRow}
                            title="Cancel"
                          >
                            <XCircle size={18} className="cursor-pointer text-red-600 hover:opacity-70"/>
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

            {/* Pagination - LeadOwner style */}
            {rows.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className={`pagination-btn ${
                    currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronLeft size={18} />
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
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

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

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="btn-all"
              >
                <span>✓</span>
                <span>Submit</span>
              </button>
            </div> 
          </div>
        </div> 
      </div>
    </div>
  );
}
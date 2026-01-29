import React, { useState } from 'react';
import { Menu, ChevronDown, Home, FileText, List, Plus, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function ProformaInvoiceForm() {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState(null);
   const [customerName, setCustomerName] = useState('');
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
    };
    
    if (showCustomerDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCustomerDropdown]);

  const [rows, setRows] = useState([
    { id: 1, slNo: 1, group: 'Door', specification: 'MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000 },
    { id: 2, slNo: 2, group: 'Window', specification: 'UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 3, slNo: 3, group: 'Flooring', specification: 'Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 4, slNo: 4, group: 'Roofing', specification: 'MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 }
  ]);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [currentRowForModal, setCurrentRowForModal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [insertAfterRowId, setInsertAfterRowId] = useState(null);
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
    setEditingRow(null);
    setShowGroupDropdown(null);
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
    rows.forEach(row => {
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
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {showSubmitMessage && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#10B981', color: 'white', padding: '16px 24px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 50, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style={{ fontWeight: '600' }}>Form submitted successfully!</span>
        </div>
      )}

      <div style={{ display: 'flex', height: '100%' }}>
        <main style={{ flex: 1, backgroundColor: '#F6EAEA', padding: '24px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', maxWidth: '1400px', margin: '0 auto',marginBottom:'10px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#1F2937' }}>Proforma Invoice Form</h2>

            {/* Form Fields - First Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>PI NO</label>
                <input
                  type="text"
                  value={formData.pino}
                  onChange={(e) => setFormData({...formData, pino: e.target.value})}
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>PI Date</label>
                <input
                  type="date"
                  value={formData.pidate}
                  onChange={(e) => setFormData({...formData, pidate: e.target.value})}
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
                />
              </div>
                
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Quotation No</label>
                <input
                  type="text"
                  value={formData.quotationno}
                  onChange={(e) => setFormData({...formData, quotationno: e.target.value})}
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Quotation Date</label>
                <input
                  type="date"
                  value={formData.quotationdate}
                  onChange={(e) => setFormData({...formData, quotationdate: e.target.value})}
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Customer Dropdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
  <div id="customer-dropdown-container" style={{ position: 'relative', backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Customer Name</label>
    <div 
      onClick={(e) => {
        e.stopPropagation();
        setShowCustomerDropdown(!showCustomerDropdown);
      }}
      style={{ position: 'relative', width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}
    >
      <span>{formData.customerName || 'Select customer'}</span>
      <ChevronDown size={16} style={{ color: '#6b7280' }}/>
    </div>
    {showCustomerDropdown && (
      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '6px', marginTop: '4px', zIndex: 10, maxHeight: '160px', overflowY: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
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
            style={{ 
              padding: '10px 12px', 
              cursor: 'pointer', 
              fontSize: '14px', 
              borderBottom: idx < customerOptions.length - 1 ? '1px solid #F3F4F6' : 'none',
              backgroundColor: hoveredOption === customer ? '#A63128' : (formData.customerName === customer ? '#FEE2E2' : 'white'),
              color: hoveredOption === customer ? 'white' : '#374151'
            }}
          >
            {customer}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
                 <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Address</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleAddressChange} 
                rows="1" 
                style={{ 
                  width: '100%', 
                  padding: '1px 1px', 
                  fontSize: '16px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  outline: 'none', 
                  fontFamily: 'inherit',
                  resize: 'none',
                  minHeight: '24px',
                  lineHeight: '20px',
                  overflow: 'hidden'
                }} 
              />
              </div>
             </div>
            {/* Template Name */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{  position: 'relative', backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Template Name</label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '14px' }}>{formData.templateName}</span>
                   <ChevronDown size={16} style={{ position: 'absolute', 
                      right: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: '#6b7280',
                      pointerEvents: 'none' }}/>
                </div>
              </div>
            </div>
            
            {/* Table */}
            <div style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid #9CA3AF', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1200px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Sl No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Template Group</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Template Specification</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Dimension</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>No. of Unit</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Amount</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Hidden Amount</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: '600', color: '#1F2937' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
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
            <ChevronDown size={16} style={{ color: "#6B7280" }} />
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
            <ChevronDown size={16} style={{ color: "#6B7280" }} />
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


            {/* Add Row Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <button
                onClick={handleAddButtonClick}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: 'none', borderRadius: '6px', backgroundColor: '#7F1D1D', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#991B1B'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#7F1D1D'}
              >
                <span>+</span> Add Row
              </button>
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

    {/* TEMPLATE GROUP */}
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #D1D5DB"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "6px"
        }}
      >
        <label
          style={{
            fontSize: "12px",
            color: "#4B5563",
            fontWeight: "700",
            margin: 0
          }}
        >
          Template Group
        </label>
        <button
          onClick={() => {
            setCurrentRowForModal("newRow");
            setShowGroupModal(true);
          }}
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <ChevronDown size={14} style={{ color: "#6B7280" }} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Input"
        value={newRowData.group}
        onChange={(e) =>
          setNewRowData({ ...newRowData, group: e.target.value })
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

    {/* TEMPLATE SPECIFICATION */}
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #D1D5DB"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "6px"
        }}
      >
        <label
          style={{
            fontSize: "12px",
            color: "#4B5563",
            fontWeight: "700",
            margin: 0
          }}
        >
          Template Specification
        </label>
        <button
          onClick={() => {
            setCurrentRowForModal("newRow");
            setShowSpecModal(true);
          }}
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <ChevronDown size={14} style={{ color: "#6B7280" }} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Input"
        value={newRowData.specification}
        onChange={(e) =>
          setNewRowData({
            ...newRowData,
            specification: e.target.value
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
          padding: "8px 24px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#7F1D1D",
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

 <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '12px',
              marginBottom: '5px'
            }}>
              <div style={{ 
                padding: '12px 20px',
                backgroundColor: '#f9fafb',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Quotation Charges :</span>
                <span style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>₹ 1,00,000</span>
              </div>
              </div>
            </div>
            
             <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1F2937' }}>Additional Charges</h2>
 {/* Table */}
            <div style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid #9CA3AF', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1200px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Sl No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Template Group</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Template Specification</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Dimension</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>No. of Unit</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Amount</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937' }}>Hidden Amount</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: '600', color: '#1F2937' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
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
            <ChevronDown size={16} style={{ color: "#6B7280" }} />
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
            <ChevronDown size={16} style={{ color: "#6B7280" }} />
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
            

            {/* Add Row Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <button
                onClick={handleAddButtonClick}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: 'none', borderRadius: '6px', backgroundColor: '#7F1D1D', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#991B1B'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#7F1D1D'}
              >
                <span>+</span> Add Row
              </button>
            </div>
                {/* Additional Charges */}
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', marginBottom: '5px' }}>
      <div style={{ padding: '12px 20px', backgroundColor: '#f9fafb', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>Additional Charges :</span>
        <span style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>₹ 2,00,000</span>
      </div>
    </div>
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

    {/* TEMPLATE GROUP */}
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #D1D5DB"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "6px"
        }}
      >
        <label
          style={{
            fontSize: "12px",
            color: "#4B5563",
            fontWeight: "700",
            margin: 0
          }}
        >
          Template Group
        </label>
        <button
          onClick={() => {
            setCurrentRowForModal("newRow");
            setShowGroupModal(true);
          }}
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <ChevronDown size={14} style={{ color: "#6B7280" }} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Input"
        value={newRowData.group}
        onChange={(e) =>
          setNewRowData({ ...newRowData, group: e.target.value })
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

    {/* TEMPLATE SPECIFICATION */}
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #D1D5DB"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "6px"
        }}
      >
        <label
          style={{
            fontSize: "12px",
            color: "#4B5563",
            fontWeight: "700",
            margin: 0
          }}
        >
          Template Specification
        </label>
        <button
          onClick={() => {
            setCurrentRowForModal("newRow");
            setShowSpecModal(true);
          }}
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <ChevronDown size={14} style={{ color: "#6B7280" }} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Input"
        value={newRowData.specification}
        onChange={(e) =>
          setNewRowData({
            ...newRowData,
            specification: e.target.value
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
          padding: "8px 24px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#7F1D1D",
          color: "#FFFFFF",
          fontSize: "14px",
          fontWeight: 500,
          cursor: "pointer"
        }}
      >
        Save
      </button>
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', marginBottom: '5px' }}>
      <div style={{ padding: '12px 20px', backgroundColor: '#f9fafb', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>Additional Charges :</span>
        <span style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>₹ 2,00,000</span>
      </div>
    </div>
  </div>
)}

<div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '12px',
              marginBottom: '12px'
            }}>
              <div style={{ 
                border: '1px solid #9CA3AF', 
                borderRadius: '6px', 
                padding: '12px 20px',
                backgroundColor: '#f9fafb',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Net Amount :</span>
                <span style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>₹ 3,00,000</span>
              </div>
            </div>
          

            {/* Total Amount */}
            <div style={{ marginBottom: '20px', border: '1px solid #9CA3AF', borderRadius: '8px', padding: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#1F2937' }}>Total Amount</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', paddingBottom: '8px' }}>
                <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Total</div>
                  <div>₹ {calculateTotal().toLocaleString()}</div>
                </div>
                
                <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Discount</div>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                    style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: 'transparent' }}
                  />
                </div>
                
                <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Taxable Value</div>
                  <div>₹ {calculateTaxableValue().toLocaleString()}</div>
                </div>
                
                <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>GST 18%</div>
                  <input
                    type="number"
                    value={gstPercentage}
                    onChange={(e) => setGstPercentage(Number(e.target.value) || 0)}
                    style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: 'transparent' }}
                  />
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500', marginTop: '16px' }}>
                <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Net Amount</div>
                <div style={{ fontSize: '16px', fontWeight: '700' }}>₹ {calculateNetAmount().toLocaleString()}</div>
              </div>
            </div>

             {/* Terms and Conditions */}
            <div style={{ marginBottom: '20px', border: '1px solid #9CA3AF', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#F3F4F6', padding: '12px 16px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', margin: 0 }}>Terms And Conditions</h3>
              </div>
              <div style={{ padding: '16px', fontSize: '12px', color: '#6B7280', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '8px' }}>1. This rate is valid for 2 weeks from the quotation date</p>
                <p style={{ marginBottom: '8px' }}>2. Delivery: Fabrication will take a minimum of 21 days to complete.</p>
                <p style={{ marginBottom: '8px' }}>3. Payment Terms: 50% advance & balance 40% on completion and before loading</p>
                <p style={{ marginBottom: '8px' }}>4. Transportation & Unloading: To be arranged by the customer at site.</p>
                <p style={{ marginBottom: '8px' }}>5. Warranty: Seller has a buy-back policy once the container or cabin duration expires.</p>
                <p style={{ marginBottom: '8px' }}>6. Warranty: Six months from the date of delivery. Warranty excludes physical damage, misuse and unauthorised alterations.</p>
                <p style={{ margin: 0 }}>7. Transit Insurance: Transit insurance can be arranged on request and will be billed separately, subject to customer acceptance.</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <button 
                onClick={handleSubmit}
                style={{ padding: '12px 40px', border: 'none', borderRadius: '6px', backgroundColor: '#7F1D1D', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#991B1B'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#7F1D1D'}
              >
                Submit
              </button>
              <button 
                onClick={handlePrint}
                style={{ padding: '12px 40px', border: 'none', borderRadius: '6px', backgroundColor: '#3B82F6', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
              >
                Print
              </button>
              <button 
                onClick={handleDownloadPDF}
                style={{ padding: '12px 40px', border: 'none', borderRadius: '6px', backgroundColor: '#6B7280', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                 onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
                > PDF</button>
                 <button 
                    onClick={handleDownloadExcel}
                    style={{ backgroundColor: '#059669', color: 'white', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', border: 'none', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
                  >
                    Excel
                  </button>
                </div>
              
           
          </div>
                  <button 
          onClick={() =>  navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}
        >
          <span>←</span>
          <span>Back</span>
        </button>
        </main>
      </div>
 {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Select Group</h3>
            <div className="flex flex-col gap-2">
              {groupMasters.map((group, idx) => (
                <button
                  key={idx}
                  onClick={() => selectFromMaster('group', group)}
                  className="px-3 py-3 border border-gray-200 rounded cursor-pointer text-left bg-white text-sm hover:bg-gray-50"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-125 max-h-96 overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Select Specification</h3>
            <div className="flex flex-col gap-2">
              {specMasters.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => selectFromMaster('spec', spec)}
                  className="px-3 py-3 border border-gray-200 rounded cursor-pointer text-left bg-white text-sm hover:bg-gray-50"
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


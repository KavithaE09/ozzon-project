import React, { useState ,  useRef, useEffect } from 'react';
import { Menu, ChevronDown,Plus, Edit2, Trash2, Search} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function QuotationForm() {
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
    quotationdate: getTodayDate(),
    customerName: "",
    address: ""
  });
   const [terms, setTerms] = useState([
    "This rate is valid for 2 weeks from the quotation date",
    "Delivery: Fabrication will take a minimum of 21 days to complete.",
    "Payment Terms: 50% advance & balance 40% on completion and before loading",
    "Transportation & Unloading: To be arranged by the customer at site.",
    "Warranty: Seller has a buy-back policy once the container or cabin duration expires.",
    "Warranty: Six months from the date of delivery. Warranty excludes physical damage, misuse and unauthorised alterations.",
    "Transit Insurance: Transit insurance can be arranged on request and will be billed separately, subject to customer acceptance."
  ]);

  const [newTerm, setNewTerm] = useState("");

  const updateTerm = (index, value) => {
    const updated = [...terms];
    updated[index] = value;
    setTerms(updated);
  };

  const addTerm = () => {
    if (!newTerm.trim()) return;
    setTerms([...terms, newTerm]);
    setNewTerm("");
  };

  const customerOptions = [
    { name: "Customer A", address: "Chennai" },
    { name: "Customer B", address: "Madurai" },
    { name: "Customer C", address: "Coimbatore" },
    { name: "Customer D", address: "Trichy" }
  ];
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
    { id: 1, slNo: 1, description: 'Door - MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW', dimension: '20*8*8.6', noOfUnit: 1, amount: 1000000, hiddenAmount: 1000000 },
    { id: 2, slNo: 2, description: 'Window - UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 3, slNo: 3, description: 'Flooring - Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 4, slNo: 4, description: 'Roofing - MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 }
  ]);
  

  const menuRef = useRef(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editingRow, setEditingRow] = useState(null); 
  const [editingCell, setEditingCell] = useState({ rowId: null, field: null });
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [discount, setDiscount] = useState(10000);
  const [gstPercentage, setGstPercentage] = useState(18);
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  
  const handleAddButtonClick = () => {
    setShowAddForm(true);
    setInsertAfterRowId(null);
  };

  const handleInsertRow = (id) => {
    const newRow = { id: Date.now(), slNo: "", description: "", dimension: "", noOfUnit: 0, amount: 0, hiddenAmount: 0 };
    const index = rows.findIndex(r => r.id === id);
    const updated = [...rows];
    updated.splice(index + 1, 0, newRow);
    setRows(updated);
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

  const toggleMenu = (index) => setOpenMenuIndex(openMenuIndex === index ? null : index);

  const handleEdit = (index) => {
    setEditingRow(rows[index].id);
    setOpenMenuIndex(null);
  };

  const handleDelete = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };
 const updateRow = (id, field, value) => {
    const updatedRows = rows.map(row => row.id === id ? { ...row, [field]: value } : row);
    setRows(updatedRows);
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

    const validateRequiredFields = () => {
    if (!formData.quotationno || !formData.quotationno.trim()) {
      alert('Please fill Quotation No');
      return false;
    }
    if (!formData.quotationdate) {
      alert('Please select Quotation Date');
      return false;
    }
    if (!formData.customerName) {
      alert('Please select Customer Name');
      return false;
    }
    if (!formData.address || !formData.address.trim()) {
      alert('Please fill Address');
      return false;
    }
    if (!formData.templateName || !formData.templateName.trim()) {
      alert('Please fill Template Name');
      return false;
    }
    if (!formData.templateDescription || !formData.templateDescription.trim()) {
      alert('Please fill Template Description');
      return false;
    }
    return true;
  };

    const handleSearch = () => {
      if (!validateRequiredFields()) {
      return;
    }
    let results = [...allInvoiceData];
    let priorityResults = [];
    let otherResults = [];

    // Filter by date range first
    if (fromDate) {
      results = results.filter(item => new Date(item.quotationDate) >= new Date(fromDate));
    }
    

    // Filter by customer name (case insensitive search)
    if (customerName && customerName.trim() !== '') {
      const searchTerm = customerName.toLowerCase().trim();
      priorityResults = results.filter(item => item.customerName.toLowerCase().includes(searchTerm));
      otherResults = results.filter(item => !item.customerName.toLowerCase().includes(searchTerm));
      results = [...priorityResults, ...otherResults];
    }

    setFilteredData(results);
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
    if (!formData.quotationno || !formData.quotationno.trim()) {
      alert('Please fill Quotation No');
      return ;
    }
    if (!formData.quotationdate) {
      alert('Please select Quotation Date');
      return ;
    }
    if (!formData.customerName) {
      alert('Please select Customer Name');
      return ;
    }
    if (!formData.address || !formData.address.trim()) {
      alert('Please fill Address');
      return ;
    }
    if (!formData.templateName || !formData.templateName.trim()) {
      alert('Please fill Template Name');
      return ;
    }
    if (!formData.templateDescription || !formData.templateDescription.trim()) {
      alert('Please fill Template Description');
      return ;
    }

    
    setShowSubmitMessage(true);
    setTimeout(() => setShowSubmitMessage(false), 3000);
  };

  const handlePrint = () => {
    if (!formData.quotationno || !formData.quotationno.trim()) {
      alert('Please fill Quotation No');
      return ;
    }
    if (!formData.quotationdate) {
      alert('Please select Quotation Date');
      return ;
    }
    if (!formData.customerName) {
      alert('Please select Customer Name');
      return ;
    }
    if (!formData.address || !formData.address.trim()) {
      alert('Please fill Address');
      return ;
    }
    if (!formData.templateName || !formData.templateName.trim()) {
      alert('Please fill Template Name');
      return ;
    }
    if (!formData.templateDescription || !formData.templateDescription.trim()) {
      alert('Please fill Template Description');
      return ;
    }
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!formData.quotationno || !formData.quotationno.trim()) {
      alert('Please fill Quotation No');
      return ;
    }
    if (!formData.quotationdate) {
      alert('Please select Quotation Date');
      return ;
    }
    if (!formData.customerName) {
      alert('Please select Customer Name');
      return ;
    }
    if (!formData.address || !formData.address.trim()) {
      alert('Please fill Address');
      return ;
    }
    if (!formData.templateName || !formData.templateName.trim()) {
      alert('Please fill Template Name');
      return ;
    }
    if (!formData.templateDescription || !formData.templateDescription.trim()) {
      alert('Please fill Template Description');
      return ;
    }
    window.print();
  };

  const handleDownloadExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Proforma Invoice\n";
    csvContent += `Quotation No:,${formData.quotationno}\n`;
    csvContent += `Quotation Date:,${formData.quotationdate}\n`;
    csvContent += "Sl No,Description,Dimension,No. of Unit,Amount,Hidden Amount\n";
    rows.forEach(row => {
      csvContent += `${row.slNo},"${row.description}",${row.dimension},${row.noOfUnit},${row.amount},${row.hiddenAmount}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `quotation_${formData.quotationno.replace(/\//g, '_')}.csv`);
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
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {showSubmitMessage && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#10B981', color: 'white', padding: '16px 24px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 50, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}

      <div style={{ display: 'flex', height: '100%' }}>
        <main style={{ flex: 1, backgroundColor: '#F6EAEA', padding: '24px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', maxWidth: '1400px', margin: '0 auto' ,marginBottom:'10px'}}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1F2937' }}>Quotation Form</h2>

            {/* Form Fields - First Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Quotation No</label>
                <input
                  type="text"
                  value={formData.quotationno}
                  onChange={(e) => setFormData({...formData, quotationno: e.target.value})}
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
  <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>
    Quotation Date
  </label>

  <input
    type="date"
    value={formData.quotationdate}
    onChange={(e) =>
      setFormData({ ...formData, quotationdate: e.target.value })
    }
    style={{
      width: '100%',
      padding: '4px 8px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      outline: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box'
    }}
  />
</div>

              <div style={{paddingTop: '25px'}}>
                <label></label>
                  <button 
                                onClick={handleSearch}
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
                                onMouseOver={(e) => e.target.style.backgroundColor = '#A03838'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#8B2E2E'}
                              >
                                 <Search size={18} style={{ marginRight: '4px' }} /> Search
                              </button>
                </div>
              <div></div>
            </div>

            {/* Customer Dropdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
  <div
    id="customer-dropdown-container"
    style={{
      position: 'relative',
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #9CA3AF',
      borderRight: '3px solid #DC2626'
    }}
  >
    <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>
      Customer Name
    </label>

    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowCustomerDropdown(!showCustomerDropdown);
      }}
      style={{
        width: '100%',
        padding: '4px',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
      }}
    >
      <span>{formData.customerName || "Select customer"}</span>
      <ChevronDown size={16} color="#6b7280" />
    </div>

    {showCustomerDropdown && (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          marginTop: '4px',
          zIndex: 10,
          maxHeight: '160px',
          overflowY: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        {customerOptions.map((customer, idx) => (
          <div
            key={idx}
            onClick={() => {
              setFormData({
                ...formData,
                customerName: customer.name,
                address: customer.address   
              });
              setShowCustomerDropdown(false);
            }}
            onMouseEnter={() => setHoveredOption(customer.name)}  // ✅ customer.name save pannanum
            onMouseLeave={() => setHoveredOption(null)}       
            style={{
              padding: '10px 12px',
              cursor: 'pointer',
              fontSize: '14px',
              borderBottom: idx < customerOptions.length - 1 ? '1px solid #F3F4F6' : 'none',  
              backgroundColor: hoveredOption === customer.name ? '#A63128' : (formData.customerName === customer.name ? '#FEE2E2' : 'white'),  // ✅ customer.name compare pannanum
              color: hoveredOption === customer.name ? 'white' : '#374151'  // ✅ customer.name compare pannanum
            }}
          >
            {customer.name}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #9CA3AF',
            borderRight: '3px solid #DC2626'
          }}
        >
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
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{  position: 'relative', backgroundColor: 'white', padding: '10px', borderRadius: '6px',border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
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
              <div style={{  position: 'relative', backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Template Description</label>
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
            
            

            {/* Table 1 */}
         <div style={{ marginBottom: '24px' }}>
      <div style={{ border: '1px solid #9CA3AF', borderRadius: '6px', marginBottom:'8px' }}>
            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1100px' }}>
            <thead>
  <tr style={{ backgroundColor: '#F3E8E8', borderBottom: '2px solid #E5E7EB' }}>
    <th style={{ padding: '10px 2px' }}>Sl No</th>
    <th style={{ padding: '10px 2px' }}>Description</th>
    <th style={{ padding: '10px 2px' }}>Dimension</th>
    <th style={{ padding: '10px 2px' }}>No. of Unit</th>
    <th style={{ padding: '10px 2px' }}>Amount</th>
    <th style={{ padding: '10px 2px' }}>Hidden Amount</th>
    <th style={{ padding: '10px 2px', textAlign: 'center' }}>Actions</th>
  </tr>
</thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #E5E7EB", height: "52px" }}>
                  
                  {/* SL NO */}
                  <td style={{ padding: "12px 8px", textAlign: "left" }}>
                    {editingCell?.rowId === row.id && editingCell?.field === 'slNo' ? (
                      <input
                        value={row.slNo}
                        onChange={e => updateRow(row.id, 'slNo', e.target.value)}
                        onBlur={() => setEditingCell({ rowId: null, field: null })}
                        onKeyDown={e => e.key === 'Enter' && setEditingCell({ rowId: null, field: null })}
                        autoFocus
                        style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none' }}
                      />
                    ) : (
                      <span onClick={() => setEditingCell({ rowId: row.id, field: 'slNo' })} style={{ cursor: 'text' }}>{row.slNo}</span>
                    )}
                  </td>

                  {/* DESCRIPTION */}
                  <td style={{ padding: "12px 8px", textAlign: "left" }}>
                    {editingCell?.rowId === row.id && editingCell?.field === 'description' ? (
                      <input
                        value={row.description}
                        onChange={e => updateRow(row.id, 'description', e.target.value)}
                        onBlur={() => setEditingCell({ rowId: null, field: null })}
                        onKeyDown={e => e.key === 'Enter' && setEditingCell({ rowId: null, field: null })}
                        autoFocus
                        style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none' }}
                      />
                    ) : (
                      <span onClick={() => setEditingCell({ rowId: row.id, field: 'description' })} style={{ cursor: 'text' }}>{row.description}</span>
                    )}
                  </td>

                  {/* DIMENSION */}
                  <td style={{ padding: "12px 8px", textAlign: "left" }}>
                    {editingCell?.rowId === row.id && editingCell?.field === 'dimension' ? (
                      <input
                        value={row.dimension}
                        onChange={e => updateRow(row.id, 'dimension', e.target.value)}
                        onBlur={() => setEditingCell({ rowId: null, field: null })}
                        onKeyDown={e => e.key === 'Enter' && setEditingCell({ rowId: null, field: null })}
                        autoFocus
                        style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none' }}
                      />
                    ) : (
                      <span onClick={() => setEditingCell({ rowId: row.id, field: 'dimension' })} style={{ cursor: 'text' }}>{row.dimension}</span>
                    )}
                  </td>

                  {/* NO OF UNIT */}
                 <td style={{ padding: "12px 8px", textAlign: "center" }}>
                    {editingCell?.rowId === row.id && editingCell?.field === 'noOfUnit' ? (
                      <input
                        value={row.noOfUnit}
                        type="number"
                        onChange={e => updateRow(row.id, 'noOfUnit', e.target.value)}
                        onBlur={() => setEditingCell({ rowId: null, field: null })}
                        onKeyDown={e => e.key === 'Enter' && setEditingCell({ rowId: null, field: null })}
                        autoFocus
                        style={{ width: '80px', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none' }}
                      />
                    ) : (
                      <span onClick={() => setEditingCell({ rowId: row.id, field: 'noOfUnit' })} style={{ cursor: 'text' }}>{row.noOfUnit}</span>
                    )}
                  </td>

                  {/* AMOUNT */}
                 <td style={{ padding: "12px 8px", textAlign: "right" }}>
                    {editingCell?.rowId === row.id && editingCell?.field === 'amount' ? (
                      <input
                        value={row.amount}
                        type="number"
                        onChange={e => updateRow(row.id, 'amount', e.target.value)}
                        onBlur={() => setEditingCell({ rowId: null, field: null })}
                        onKeyDown={e => e.key === 'Enter' && setEditingCell({ rowId: null, field: null })}
                        autoFocus
                        style={{ width: '96px', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none' }}
                      />
                    ) : (
                      <span onClick={() => setEditingCell({ rowId: row.id, field: 'amount' })} style={{ cursor: 'text' }}>₹ {row.amount}</span>
                    )}
                  </td>

                  {/* HIDDEN AMOUNT */}
                  <td style={{ padding: "12px 8px", textAlign: "right" }}>
                    {editingCell?.rowId === row.id && editingCell?.field === 'hiddenAmount' ? (
                      <input
                        value={row.hiddenAmount}
                        type="number"
                        onChange={e => updateRow(row.id, 'hiddenAmount', e.target.value)}
                        onBlur={() => setEditingCell({ rowId: null, field: null })}
                        onKeyDown={e => e.key === 'Enter' && setEditingCell({ rowId: null, field: null })}
                        autoFocus
                        style={{ width: '96px', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none' }}
                      />
                    ) : (
                      <span onClick={() => setEditingCell({ rowId: row.id, field: 'hiddenAmount' })} style={{ cursor: 'text' }}>₹ {row.hiddenAmount}</span>
                    )}
                  </td>

                  {/* ACTIONS */}
             <td style={{ padding: "12px 8px", textAlign: "center" }}>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", position: "relative" }}>
        <button
          onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px" }}
        >
          <Menu size={18} />
        </button>

        {openMenuIndex === index && (
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "6px",
              display: "flex",
              gap: "8px",
              padding: "8px",
              zIndex: 10
            }}
          >
            <Plus
              size={18}
              onClick={() => {
                handleInsertRow(row.id);
                setOpenMenuIndex(null);
              }}
            />
            <Trash2
              size={18}
              onClick={() => {
                handleDelete(index);
                setOpenMenuIndex(null);
              }}
            />
          </div>
        )}
      </div>
    </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    </div>
    

 <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1F2937' }}>Additional Charges</h2>
            {/* Table 2 */}
<div style={{ marginBottom: '24px' }}>
  <div style={{ border: '1px solid #9CA3AF', borderRadius: '6px', marginBottom:'8px' }}>
    <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '600px' }}>
        <thead>
          <tr style={{ backgroundColor: '#F3E8E8', borderBottom: '2px solid #E5E7EB' }}>
            <th style={{ padding: '10px 2px', textAlign: 'left' }}>Sl No</th>
            <th style={{ padding: '10px 2px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px 2px', textAlign: 'center' }}>No. of Unit</th>
            <th style={{ padding: '10px 2px', textAlign: 'right' }}>Amount</th>
            <th style={{ padding: '10px 2px', textAlign: 'right' }}>Hidden Amount</th>
            <th style={{ padding: '10px 2px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} style={{ borderBottom: "1px solid #E5E7EB", height: "52px" }}>
              {/* SL NO */}
              <td style={{ padding: "12px 8px", textAlign: 'left' }}>{row.slNo}</td>

              {/* DESCRIPTION */}
              <td style={{ padding: "12px 8px", textAlign: 'left', position: "relative" }}>
                {editingRow === row.id ? (
                  <div>
                    <div
                      onClick={(e) => { e.stopPropagation(); setShowSpecDropdown(showSpecDropdown === row.id ? null : row.id); }}
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
                      <span>{row.description}</span>
                      <ChevronDown size={16} style={{ color: "#6B7280" }} />
                    </div>
                    {showSpecDropdown === row.id && (
                      <div style={{
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
                      }}>
                        {specMasters.map((option, idx) => (
                          <div
                            key={idx}
                            onClick={() => { updateRow(row.id, "description", option); setShowSpecDropdown(null); stopEditing(); }}
                            tabIndex={0}
                            style={{ padding: "8px 12px", cursor: "pointer", fontSize: "14px" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
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

              {/* NO OF UNIT */}
              <td style={{ padding: "12px 8px", textAlign: 'center' }}>
                {editingRow === row.id ? (
                  <input
                    type="number"
                    value={row.noOfUnit}
                    onChange={(e) => updateRow(row.id, "noOfUnit", parseInt(e.target.value))}
                    onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                    style={{ width: "80px", padding: "6px 8px", border: "1px solid #D1D5DB", borderRadius: "4px", fontSize: "14px" }}
                  />
                ) : (
                  <span>{row.noOfUnit}</span>
                )}
              </td>

              {/* AMOUNT */}
              <td style={{ padding: "12px 8px", textAlign: 'right' }}>
                {editingRow === row.id ? (
                  <input
                    type="number"
                    value={row.amount}
                    onChange={(e) => updateRow(row.id, "amount", parseFloat(e.target.value))}
                    onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                    style={{ width: "96px", padding: "6px 8px", border: "1px solid #D1D5DB", borderRadius: "4px", fontSize: "14px" }}
                  />
                ) : (
                  <span>₹ {row.amount.toFixed(2)}</span>
                )}
              </td>

              {/* HIDDEN AMOUNT */}
              <td style={{ padding: "12px 8px", textAlign: 'right' }}>
                {editingRow === row.id ? (
                  <input
                    type="number"
                    value={row.hiddenAmount}
                    onChange={(e) => updateRow(row.id, "hiddenAmount", parseFloat(e.target.value))}
                    onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                    style={{ width: "96px", padding: "6px 8px", border: "1px solid #D1D5DB", borderRadius: "4px", fontSize: "14px" }}
                  />
                ) : (
                  <span>₹ {row.hiddenAmount.toFixed(2)}</span>
                )}
              </td>

              {/* ACTIONS */}
              <td style={{ padding: "12px 8px", textAlign: 'center' }}>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", position: "relative" }}>
                  <button
                    onClick={() => toggleMenu(index)}
                    style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px" }}
                  >
                    <Menu size={18} style={{ color: "#374151" }} />
                  </button>

                  {openMenuIndex === index && (
                    <div style={{
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
                    }}>
                      <Plus size={18} style={{ color: "#16A34A", cursor: "pointer" }} onClick={() => { handleInsertRow(row.id); setOpenMenuIndex(null); }} />
                      <Edit2 size={18} style={{ color: "#374151", cursor: "pointer" }} onClick={() => { handleEdit(index); setOpenMenuIndex(null); }} />
                      <Trash2 size={18} style={{ color: "#DC2626", cursor: "pointer" }} onClick={() => { handleDelete(index); setOpenMenuIndex(null); }} />
                    </div>
                  )}
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

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
</div>


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

    {/* Description */}
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
          Description
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
        value={newRowData.description}
        onChange={(e) =>
          setNewRowData({
            ...newRowData,
            description: e.target.value
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

            {/* Total Amount */}
            <div style={{ marginBottom: '20px', border: '1px solid #9CA3AF', borderRadius: '8px', padding: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#1F2937' }}>Total Amount</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', paddingBottom: '8px' }}>
                <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Total</div>
                  <div>₹ {calculateTotal().toLocaleString()}</div>
                </div>
                
                <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Discount</div>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                    style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: 'transparent' }}
                  />
                </div>
                
                <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Taxable Value</div>
                  <div>₹ {calculateTaxableValue().toLocaleString()}</div>
                </div>
                
                <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
                  <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>GST 18%</div>
                  <input
                    type="number"
                    value={gstPercentage}
                    onChange={(e) => setGstPercentage(Number(e.target.value) || 0)}
                    style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: 'transparent' }}
                  />
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF', borderRadius: '6px', fontSize: '14px', fontWeight: '500', marginTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Net Amount</div>
                <div style={{ fontSize: '16px', fontWeight: '700' }}>₹ {calculateNetAmount().toLocaleString()}</div>
              </div>
            </div>


             {/* Terms and Conditions */}
            <div
      style={{
        marginBottom: "20px",
        border: "1px solid #9CA3AF",
        borderRadius: "8px",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          backgroundColor: '#F3E8E8',
          padding: "12px 16px",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#1F2937",
            margin: 0
          }}
        >
          Terms And Conditions
        </h3>
      </div>

      <div
        style={{
          padding: "16px",
          fontSize: "12px",
          color: "#6B7280",
          lineHeight: "1.6"
        }}
      >
        {terms.map((term, index) => (
          <p key={index} style={{ marginBottom: "8px" }}>
            {index + 1}.{" "}
            <input
              value={term}
              onChange={(e) => updateTerm(index, e.target.value)}
              style={{
                width: "90%",
                border: "none",
                background: "transparent",
                fontSize: "12px",
                color: "#6B7280",
                outline: "none"
              }}
            />
          </p>
        ))}

        {/* ADD NEW TERM – SAME STYLE */}
        <p style={{ marginTop: "12px" }}>
          {terms.length + 1}.{" "}
          <input
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTerm()}
            placeholder="Add new term..."
            style={{
              width: "90%",
              border: "none",
              borderBottom: "1px dashed #9CA3AF",
              background: "transparent",
              fontSize: "12px",
              color: "#6B7280",
              outline: "none"
            }}
          />
        </p>
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
  );
}

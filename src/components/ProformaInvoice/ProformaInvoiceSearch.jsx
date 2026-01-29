import React, { useState, useRef, useEffect } from 'react';
import { Printer, Edit2, Trash2, Search, Plus, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProformaInvoiceSearch() {
  const navigate = useNavigate();
  const [isSearched, setIsSearched] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  const dropdownRef = useRef(null);


const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 5;

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const paginatedData = filteredData.slice(
  indexOfFirstRow,
  indexOfLastRow
);

const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    formdate: getTodayDate(),
    todate: getTodayDate(),
    customerName: ''
  });

  const allInvoiceData = [
    { slNo: 1, quotationNo: 'Q-1', quotationDate: '2025-12-20', customerName: 'Leyo', salesPerson: 'Raneesh', totalCost: '₹ 10,00,000' },
    { slNo: 2, quotationNo: 'Q-1', quotationDate: '2025-12-22', customerName: 'Kavi', salesPerson: 'Raneesh', totalCost: '₹ 15,00,000' },
    { slNo: 3, quotationNo: 'Q-1', quotationDate: '2025-12-28', customerName: 'Varshini', salesPerson: 'Raneesh', totalCost: '₹ 12,00,000' },
    { slNo: 4, quotationNo: 'Q-1', quotationDate: '2025-12-25', customerName: 'Sasi', salesPerson: 'Raneesh', totalCost: '₹ 10,00,000' },
     { slNo: 5, quotationNo: 'Q-1', quotationDate: '2025-12-20', customerName: 'Leyo', salesPerson: 'Raneesh', totalCost: '₹ 10,00,000' },
    { slNo: 6, quotationNo: 'Q-1', quotationDate: '2025-12-22', customerName: 'Kavi', salesPerson: 'Raneesh', totalCost: '₹ 15,00,000' },
    { slNo: 7, quotationNo: 'Q-1', quotationDate: '2025-12-28', customerName: 'Varshini', salesPerson: 'Raneesh', totalCost: '₹ 12,00,000' },
    { slNo: 8, quotationNo: 'Q-1', quotationDate: '2025-12-25', customerName: 'Sasi', salesPerson: 'Raneesh', totalCost: '₹ 10,00,000' }
  ];

  // Customer names list (sorted alphabetically)
  const customerOptions = ['Leyo', 'Kavi', 'Varshini', 'Sasi'].sort();

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter customer options based on search term - only show names that START with the search term
  const filteredOptions = customerOptions.filter(option =>
    option.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSelectCustomer = (option) => {
    setCustomerName(option);
    setSearchTerm(option);
    setIsDropdownOpen(false);
    
    // Auto-filter immediately when customer is selected
    let results = [...allInvoiceData];
    results = results.filter(
      item => item.customerName.toLowerCase() === option.toLowerCase()
    );
    setFilteredData(results);
    setIsSearched(true);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
    if (e.target.value === '') {
      setCustomerName('');
      setIsSearched(false);
      setFilteredData([]);
    }
  };

  const validateRequiredFields = () => {
    if (!formData.customerName) {
      return true;
    }
    return false;
  };

  const handleSearch = () => {
    if (!validateRequiredFields()) {
      return;
    }
    let results = [...allInvoiceData];
    // Customer Name filter
    if (customerName) {
      results = results.filter(
        item =>
          item.customerName.toLowerCase() === customerName.toLowerCase()
      );
    }

    setFilteredData(results);
    setIsSearched(true);
    setCurrentPage(1);
  };

const handlePrint = (actualIndex) => {
  const row = filteredData[actualIndex];
  alert(`Print Invoice: ${row.quotationNo}`);
};

  const handleDelete = (actualIndex) => {
  if (window.confirm('Are you sure you want to delete this invoice?')) {
    setFilteredData(prev =>
      prev.filter((_, i) => i !== actualIndex)
    );
  }
};




  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '24px', backgroundColor: '#F3E8E8' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>Proforma Invoice</h2>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>From Date</label>
                 <input
                    type="date"
                    value={formData.formdate}
                    onChange={(e) =>
                      setFormData({ ...formData, formdate: e.target.value })
                    }
                    style={{ width: '100%', padding: '1px', border: 'none', outline: 'none' }}
                  />
              </div>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>To Date</label>
                <input
                    type="date"
                    value={formData.todate}
                    onChange={(e) =>
                      setFormData({ ...formData, todate: e.target.value })
                    }
                    style={{ width: '100%', padding: '1px', border: 'none', outline: 'none' }}
                  />
              </div>
              <div ref={dropdownRef} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', borderRight: '3px solid #22C55E', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Customer Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Type or select..."
                    style={{ 
                      width: '100%', 
                      padding: '1px 1px 1px 1px', 
                      border: 'none', 
                      borderRadius: '4px', 
                      fontSize: '14px', 
                      outline: 'none',
                      backgroundColor: 'white',
                      cursor: 'text'
                    }}
                  />
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      position: 'absolute', 
                      right: '4px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: '#000000',
                      pointerEvents: 'none'
                    }} 
                  />
                </div>
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    marginTop: '4px',
                    backgroundColor: 'white',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000
                  }}>
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectCustomer(option)}
                          onMouseEnter={() => setHoveredOption(option)}
                          onMouseLeave={() => setHoveredOption(null)}
                          style={{
                           padding: '8px 12px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              color: hoveredOption === option ? 'white' : '#374151',
                              backgroundColor: hoveredOption === option ? '#A63128' : (customerName === option ? '#FEE2E2' : 'white'),
                              borderBottom: index < filteredOptions.length - 1 ? '1px solid #E5E7EB' : 'none',
                              transition: 'all 0.2s ease'
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>
                        No matches found
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div style={{ paddingRight: '8px' }}>
                <button
                  onClick={handleSearch}
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
                    gap: '8px'
                  }}>
                  <Search size={18} /> Search
                </button>
              </div>
            </div>
            <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
              <div style={{ gridColumn: '4', paddingRight: '8px' }}>
                <button onClick={() => navigate("/layout/proformainvoice/add")}
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
                    gap: '8px'
                  }}>
                  <Plus size={18} /> Proforma Invoice
                </button>
              </div>
            </div>
          </div>

          {isSearched && (
            <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #d1d5db' }}>
              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>SI No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>PI No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>PI Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>PI Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Sales Person</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Total Cost</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#000000', fontSize: '16px', width: '80px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row, index) => (

                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{indexOfFirstRow + index + 1}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{row.quotationNo}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{row.quotationDate}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{row.customerName}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{row.salesPerson}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{row.totalCost}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'center', position: 'relative' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              justifyContent: 'center'
                            }}
                          >
                            <button
                              onClick={() => handlePrint(indexOfFirstRow + index)}

                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                              title="Print"
                            >
                              <Printer size={18} style={{ color: '#374151' }} />
                            </button>
                            
                            <button
                              onClick={() => navigate("/layout/proformainvoice/add")}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                              title="Edit"
                            >
                              <Edit2 size={18} style={{ color: '#374151' }} />
                            </button>
                            
                            <button
                             onClick={() => handleDelete(indexOfFirstRow + index)}

                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                              title="Delete"
                            >
                              <Trash2 size={18} style={{ color: '#dc2626' }} />
                            </button>

                            <button onClick={() => navigate("/layout/proformainvoice/advance")}
                              style={{
                                padding: '5px 10px',
                                borderRadius: '6px',
                                background: '#A63128',
                                color: '#fff',
                                fontSize: '12px',
                                fontWeight: 600,
                                border: '1px solid #9CA3AF',
                                cursor: 'pointer'
                              }}
                            >
                              Advance
                            </button>

                            <button
                              onClick={() => navigate("/layout/proformainvoice/block")}
                              style={{
                                padding: '6px 14px',
                                borderRadius: 6,
                                border: 'none',
                                background: '#A63128',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: 13,
                                cursor: 'pointer'
                              }}
                            >
                              Block
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                        No records found for the selected filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {isSearched && totalPages > 1 && (
  <div style={{
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '12px'
  }}>
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(p => p - 1)}
    >
       <ChevronLeft />
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        style={{
          backgroundColor: currentPage === page ? '#A63128' : '#fff',
          color: currentPage === page ? '#fff' : '#000',
          border: '1px solid #d1d5db',
          padding: '6px 12px',
          borderRadius: '4px'
        }}
      >
        {page}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(p => p + 1)}
    >
      <ChevronRight />
    </button>
  </div>
)}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', maxWidth: '1250px' }}>
          <button
            onClick={() =>  navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
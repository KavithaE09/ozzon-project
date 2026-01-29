import React, { useState, useRef, useEffect } from 'react';
import { Search, Printer, CheckCircle, XCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProformaInvoiceApproval() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const dropdownRef = useRef(null);
  const [isSearched, setIsSearched] = useState(false);

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

  const customerOptions = ['C-1', 'C-2', 'ABC Traders', 'XYZ Corp'];

  const allTableData = [
    { id: 1, qno: 'PI-1', date: '20-12-25', customer: 'C-1', sales: 'Raneesh', amount: '₹ 10,00,000', status: null },
    { id: 2, qno: 'PI-2', date: '20-12-25', customer: 'C-2', sales: 'Bala', amount: '₹ 15,00,000', status: null },
    { id: 3, qno: 'PI-3', date: '20-12-25', customer: 'ABC Traders', sales: 'Naveen', amount: '₹ 20,00,000', status: null },
    { id: 4, qno: 'PI-4', date: '20-12-25', customer: 'XYZ Corp', sales: 'Kumar', amount: '₹ 12,00,000', status: null },
    { id: 5, qno: 'PI-5', date: '20-12-25', customer: 'C-1', sales: 'Raneesh', amount: '₹ 18,00,000', status: null },
    { id: 6, qno: 'PI-6', date: '20-12-25', customer: 'C-2', sales: 'Bala', amount: '₹ 25,00,000', status: null },
    { id: 7, qno: 'PI-7', date: '20-12-25', customer: 'ABC Traders', sales: 'Naveen', amount: '₹ 30,00,000', status: null },
    { id: 8, qno: 'PI-8', date: '20-12-25', customer: 'C-1', sales: 'Raneesh', amount: '₹ 22,00,000', status: null },
  ];

  const [tableData, setTableData] = useState(allTableData);
  const [filteredData, setFilteredData] = useState(allTableData);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredOptions = customerOptions.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

 const handleSelectCustomer = (option) => {
    setCustomerName(option);
    setSearchTerm(option);
    setIsDropdownOpen(false);
  };

 useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    setIsSearched(true);
    
    if (customerName.trim() === '') {
      // Show all data if no customer selected
      setFilteredData(tableData);
    } else {
      // Filter by customer name
      const filtered = tableData.filter(row => 
        row.customer.toLowerCase() === customerName.toLowerCase()
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
    if (e.target.value === '') {
      setCustomerName('');
    }
  };

  const handleApprove = (id) => {
    const updatedData = tableData.map(row =>
      row.id === id ? { ...row, status: 'approved' } : row
    );
    setTableData(updatedData);
    
    // Update filtered data as well
    if (customerName.trim() === '') {
      setFilteredData(updatedData);
    } else {
      const filtered = updatedData.filter(row => 
        row.customer.toLowerCase() === customerName.toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  const handleReject = (id) => {
    const updatedData = tableData.map(row =>
      row.id === id ? { ...row, status: 'rejected' } : row
    );
    setTableData(updatedData);
    
    // Update filtered data as well
    if (customerName.trim() === '') {
      setFilteredData(updatedData);
    } else {
      const filtered = updatedData.filter(row => 
        row.customer.toLowerCase() === customerName.toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  const handlePrint = (row) => {
    alert(`Print Proforma Invoice: ${row.qno}\nCustomer: ${row.customer}\nAmount: ${row.amount}`);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleBack = () => {
    alert('Going back...');
  };

  const icon = { cursor: 'pointer', color: '#374151' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '24px', background: '#f5e6e8' }}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '24px', marginBottom: '10px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Proforma Invoice Approval</h3>

            {/* FILTER ROW */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-end' }}>
              <div style={fieldBox}>
                <label style={label}>From Date</label>
                <input
                  type="date"
                  value={formData.formdate}
                  onChange={(e) =>
                    setFormData({ ...formData, formdate: e.target.value })
                  }
                  style={{ width: '100%', padding: '1px', border: 'none', outline: 'none' }}
                />
              </div>

              <div style={fieldBox}>
                <label style={label}>To Date</label>
                <input
                  type="date"
                  value={formData.todate}
                  onChange={(e) =>
                    setFormData({ ...formData, todate: e.target.value })
                  }
                  style={{ width: '100%', padding: '1px', border: 'none', outline: 'none' }}
                />
              </div>

              {/* CUSTOMER DROPDOWN */}
              <div ref={dropdownRef} style={{ ...fieldBox1, position: 'relative' }}>
                <label style={label}>Customer Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Type or select..."
                    style={input}
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
                  <div style={dropdownMenu}>
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
                            backgroundColor:
                              hoveredOption === option
                                ? '#A63128'
                                : customerName === option
                                  ? '#FEE2E2'
                                  : 'white',
                            borderBottom: index < filteredOptions.length - 1 ? '1px solid #E5E7EB' : 'none'
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

              <button onClick={handleSearch} style={searchBtn}>
                <Search size={18} /> Search
              </button>
            </div>

            {/* TABLE */}
            {isSearched && (
              <div style={{ border: '1px solid #e5e7eb', marginTop: 89, borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#fde2e2' }}>
                    <tr>
                      {['Sl No', 'Proforma Invoice No', 'PI Date', 'Customer Name', 'Sales Person', 'Total Cost', 'Print', 'Approval']
                        .map(h => <th key={h} style={th}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <tr key={row.id}>
                          <td style={td}>{indexOfFirstRow + index + 1}</td>
                          <td style={td}>{row.qno}</td>
                          <td style={td}>{row.date}</td>
                          <td style={td}>{row.customer}</td>
                          <td style={td}>{row.sales}</td>
                          <td style={td}>{row.amount}</td>
                          <td style={td}>
                            <Printer 
                              size={18} 
                              style={icon} 
                              onClick={() => handlePrint(row)}
                            />
                          </td>
                          <td style={td}>
                            {row.status === 'approved' ? (
                              <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px' }}>
                                Approved
                              </span>
                            ) : row.status === 'rejected' ? (
                              <span style={{ color: '#dc2626', fontWeight: '600', fontSize: '14px' }}>
                                Rejected
                              </span>
                            ) : (
                              <div style={{ display: 'flex', gap: '12px' }}>
                                <CheckCircle 
                                  size={18} 
                                  style={{ ...icon, color: '#16a34a' }} 
                                  onClick={() => handleApprove(row.id)}
                                />
                                <XCircle 
                                  size={18} 
                                  style={{ ...icon, color: '#dc2626' }} 
                                  onClick={() => handleReject(row.id)}
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" style={{ ...td, textAlign: 'center', padding: '32px' }}>
                          No records found
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
              marginBottom: '12px'
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
                    backgroundColor: currentPage === page ? '#A63128' : '#fff',
                    color: currentPage === page ? '#fff' : '#000',
                    border: '1px solid #d1d5db',
                    padding: '6px 12px',
                    borderRadius: '4px',
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
          )}

          <button
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const fieldBox = {
  width: 255,
  border: '1px solid #9CA3AF',
  borderRight: '3px solid #DC2626',
  borderRadius: 4.94,
  padding: '10px 12px',
  background: '#ffffff'
};

const fieldBox1 = {
  width: 255,
  border: '1px solid #9CA3AF',
  borderRight: '3px solid #22c55e',
  borderRadius: 4.94,
  padding: '10px 12px',
  background: '#ffffff'
};

const label = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 6,
  color: '#374151',
  display: 'block'
};

const input = {
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: 14,
  background: 'transparent'
};

const dropdownMenu = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: 4,
  backgroundColor: 'white',
  border: '1px solid #D1D5DB',
  borderRadius: 4,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  maxHeight: 200,
  overflowY: 'auto',
  zIndex: 1000
};

const searchBtn = {
  width: '150px',
  height: '50px',
  backgroundColor: '#A63128',
  color: 'white',
  borderRadius: '15px',
  border: 'none',
  cursor: 'pointer',
  marginLeft: 45,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
};

const th = {
  padding: '14px 16px',
  textAlign: 'left',
  fontSize: 16,
  fontWeight: 600,
  background: '#fde2e2',
  color: '#000000'
};

const td = {
  padding: '14px 16px',
  fontSize: 13,
  color: '#111827',
  borderBottom: '1px solid #f3f4f6'
};

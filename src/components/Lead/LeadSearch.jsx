import React, { useState, useRef, useEffect } from 'react';
import { Printer, Edit2, Trash2, Search, Plus, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LeadSearch() {
  const navigate = useNavigate();
  const [isSearched, setIsSearched] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null);
  const dropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

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

  // Customer names list (sorted alphabetically)
  const customerOptions = ['Sasi', 'Varshini'].sort();

  // All invoice data
  const allInvoiceData = [
    { slNo: 1, leadNo: 'L-1', leadDate: '01-01-2026', customerName: 'Sasi', salesPerson: 'Christine Brooks', totalCost: '₹ 10,00,000' },
    { slNo: 2, leadNo: 'L-2', leadDate: '01-01-2026', customerName: 'Varshini', salesPerson: 'Christine Brooks', totalCost: '₹ 15,00,000' },
    { slNo: 3, leadNo: 'L-1', leadDate: '01-01-2026', customerName: 'Sasi', salesPerson: 'Christine Brooks', totalCost: '₹ 10,00,000' },
    { slNo: 4, leadNo: 'L-2', leadDate: '01-01-2026', customerName: 'Varshini', salesPerson: 'Christine Brooks', totalCost: '₹ 15,00,000' },
    { slNo: 5, leadNo: 'L-1', leadDate: '01-01-2026', customerName: 'Sasi', salesPerson: 'Christine Brooks', totalCost: '₹ 10,00,000' },
    { slNo: 7, leadNo: 'L-2', leadDate: '01-01-2026', customerName: 'Varshini', salesPerson: 'Christine Brooks', totalCost: '₹ 15,00,000' },
  ];

  // Show all data on first load
  useEffect(() => {
    setFilteredData(allInvoiceData);
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


  const handleSearch = () => {

    let results = [...allInvoiceData];

    // Customer Name filter
    if (customerName) {
      results = results.filter(
        item => item.customerName.toLowerCase() === customerName.toLowerCase()
      );
    }

    setFilteredData(results);
    setIsSearched(true);
    setCurrentPage(1);
  };

  const handleSelectCustomer = (option) => {
    setCustomerName(option);
    setSearchTerm(option);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
    if (e.target.value === '') {
      setCustomerName('');
    }
  };



  const handlePrint = (index, e) => {
    e.stopPropagation();
    const actualIndex = indexOfFirstRow + index;
    const row = filteredData[actualIndex];
    alert(`Print Lead: ${row.leadNo}`);
  };

  const handleDelete = (index, e) => {
    e.stopPropagation();
    const actualIndex = indexOfFirstRow + index;

    if (window.confirm('Are you sure you want to delete this lead?')) {
      const updatedData = filteredData.filter((_, i) => i !== actualIndex);
      setFilteredData(updatedData);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: '24px', backgroundColor: '#F3E8E8' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>Lead </h2>

            {/* Filter Section */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
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
                <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
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
                <div ref={dropdownRef} style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #22C55E', position: 'relative' }}>
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
                    }} >
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
              <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
                <div style={{ gridColumn: '4', paddingRight: '8px' }}>
                  <button
                    onClick={() => navigate("/layout/lead/lead")}
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
                    <Plus size={18} /> Lead
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            {isSearched && (
              <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#fde2e2' }}>
                      <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>SI No</th>
                      <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Lead No</th>
                      <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Lead Date</th>
                      <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Customer Name</th>
                      <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Sales Person</th>
                      <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Total Cost</th>
                      <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Hold Request</th>
                      <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Quotation</th>
                      <th style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '14px 16px', color: '#374151' }}>{indexOfFirstRow + index + 1}</td>
                          <td style={{ padding: '14px 16px', color: '#374151' }}>{row.leadNo}</td>
                          <td style={{ padding: '14px 16px', color: '#374151' }}>{row.leadDate}</td>
                          <td style={{ padding: '14px 16px', color: '#374151' }}>{row.customerName}</td>
                          <td style={{ padding: '14px 16px', color: '#374151' }}>{row.salesPerson}</td>
                          <td style={{ padding: '14px 16px', color: '#374151' }}>{row.totalCost}</td>
                          <td style={{ padding: '14px 11px', color: '#374151' }}>
                            <button
                              onClick={() => navigate("/layout/lead/hold")}
                              style={{ padding: '8px 12px', backgroundColor: '#e86e17', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}
                            >
                              Hold
                            </button>
                          </td>
                          <td style={{ padding: '14px 11px', color: '#374151' }}>
                            <button
                              onClick={() => navigate("/layout/lead/quotation")}
                              style={{ padding: '8px 12px', backgroundColor: '#5d17e8', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}
                            >
                              Quotation
                            </button>
                          </td>
                          <td style={{ padding: '14px 8px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                              <button
                                onClick={(e) => handlePrint(index, e)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                title="Print"
                              >
                                <Printer size={18} style={{ color: '#374151' }} />
                              </button>

                              <button
                                onClick={() => navigate("/layout/lead/lead")}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                title="Edit"
                              >
                                <Edit2 size={18} style={{ color: '#374151' }} />
                              </button>

                              <button
                                onClick={(e) => handleDelete(index, e)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                title="Delete"
                              >
                                <Trash2 size={18} style={{ color: '#dc2626' }} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                          No records found for the selected filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {isSearched && filteredData.length > rowsPerPage && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              marginTop: '12px'
            }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: currentPage === 1 ? '#e5e7eb' : '#ffffff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'

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
                onClick={() => setCurrentPage(prev => prev + 1)}
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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', maxWidth: '1250px' }}>
            <button
              onClick={() => navigate(-1)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
              <span>←</span>
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
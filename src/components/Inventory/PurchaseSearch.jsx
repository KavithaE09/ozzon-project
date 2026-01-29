import React, { useState, useEffect, useRef } from 'react';
import { Printer, Edit2, Trash2, Search, Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


import { useNavigate } from 'react-router-dom';

export default function PurchaseSearch() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredOption, setHoveredOption] = useState(null);
const [showTable, setShowTable] = useState(false);

  const [formData, setFormData] = useState({
    formdate: getTodayDate(),
    todate: getTodayDate(),
  });

  const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 5;
const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const paginatedData = filteredData.slice(
  indexOfFirstRow,
  indexOfLastRow
);

const totalPages = Math.ceil(filteredData.length / rowsPerPage);


  // All invoice data
  const allInvoiceData = [
    { slNo: 1, purchaseNo: 'Q-1', purchaseDate: '2025-12-20', supplierName: 'Leyo', narration: 'Raneesh', totalCost: '₹ 10,00,000' },
    { slNo: 2, purchaseNo: 'Q-2', purchaseDate: '2025-12-22', supplierName: 'Kavi', narration: 'Raneesh', totalCost: '₹ 15,00,000' },
    { slNo: 3, purchaseNo: 'Q-3', purchaseDate: '2025-12-28', supplierName: 'Varshini', narration: 'Raneesh', totalCost: '₹ 12,00,000' },
    { slNo: 4, purchaseNo: 'Q-4', purchaseDate: '2025-12-25', supplierName: 'Sasi', narration: 'Raneesh', totalCost: '₹ 10,00,000' },
     { slNo: 5, purchaseNo: 'Q-1', purchaseDate: '2025-12-20', supplierName: 'Leyo', narration: 'Raneesh', totalCost: '₹ 10,00,000' },
    { slNo: 6, purchaseNo: 'Q-2', purchaseDate: '2025-12-22', supplierName: 'Kavi', narration: 'Raneesh', totalCost: '₹ 15,00,000' },
    { slNo: 7, purchaseNo: 'Q-3', purchaseDate: '2025-12-28', supplierName: 'Varshini', narration: 'Raneesh', totalCost: '₹ 12,00,000' },
    { slNo: 8, purchaseNo: 'Q-4', purchaseDate: '2025-12-25', supplierName: 'Sasi', narration: 'Raneesh', totalCost: '₹ 10,00,000' }
  ];

  const supplierOptions = ['Leyo', 'Kavi', 'Varshini', 'Sasi'].sort();


  // Show all data on first load
  React.useEffect(() => {
    setFilteredData(allInvoiceData);
    setIsFirstLoad(false);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = supplierOptions.filter(opt =>
    opt.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  const handleSelectSupplier = (name) => {
    setSupplierName(name);
    setSearchTerm(name);
    setIsDropdownOpen(false);
  };

const handleSearch = () => {
  let results = [...allInvoiceData];

  if (searchTerm.trim() !== '') {
    results = results.filter(item =>
      item.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (fromDate) {
    results = results.filter(
      item => new Date(item.purchaseDate) >= new Date(fromDate)
    );
  }

  if (toDate) {
    results = results.filter(
      item => new Date(item.purchaseDate) <= new Date(toDate)
    );
  }

  setFilteredData(results);
  setShowTable(true);   
  setCurrentPage(1);

};
  const handlePrint = (index) => {
    const row = filteredData[index];
    alert(`Print Purchase: ${row.purchaseNo}`);
  };  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const updatedData = filteredData.filter((_, i) => i !== index);
      setFilteredData(updatedData);
    }
  };


  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>

      {/* Main Content Area with Sidebar */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>


        {/* Content Area */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px', backgroundColor: '#F2E6E6' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>Purchase</h2>

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
                <div
                  ref={dropdownRef}
                  style={{
                    padding: '10px',
                    border: '1px solid #9CA3AF',
                    borderRight: '3px solid #22C55E',
                    position: 'relative',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                >

                  <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Supplier Name</label>

                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={searchTerm}
                      placeholder="Type or select..."
                      onFocus={() => setIsDropdownOpen(true)}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSupplierName('');
                        setIsDropdownOpen(true);
                      }}
                      style={{
                        border: 'none',
                        width: '100%',
                        outline: 'none',
                        padding: '2px 2px'
                      }}
                    />


                    <ChevronDown
                      size={20}
                      style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)' }}
                    />
                  </div>

                  {isDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        border: '1px solid #D1D5DB',
                        borderRadius: '4px',
                        marginTop: '4px',
                        zIndex: 1000
                      }}
                    >
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt, i) => (
                          <div
                            key={i}
                            onClick={() => handleSelectSupplier(opt)}
                            onMouseEnter={() => setHoveredOption(opt)}
                            onMouseLeave={() => setHoveredOption(null)}
                            style={{
                              padding: '8px',
                              cursor: 'pointer',
                              backgroundColor: hoveredOption === opt ? '#A63128' : 'white',
                              color: hoveredOption === opt ? 'white' : '#374151'
                            }}
                          >
                            {opt}
                          </div>
                        ))
                      ) : (
                        <div style={{ padding: '8px', color: '#9CA3AF' }}>No matches found</div>
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
                    onClick={() => navigate("/layout/purchase")}
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
                    <Plus size={18} />
                    Purchase
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            
          
              {showTable && (
                  <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #d1d5db' }}>
              <table style={{ width: '100%', fontSize: '16px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2', borderBottom: '1px solid #9CA3AF' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>SI No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Purchase No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Purchase Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Supplier Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Narration</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Total Cost</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#000000', fontSize: '16px', width: '80px' }}> Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { paginatedData.length > 0 ? (
                   paginatedData.map((row, index) => (

                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{indexOfFirstRow + index + 1}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{row.purchaseNo}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{formatDate(row.purchaseDate)}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{row.supplierName}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{row.narration}</td>
                        <td style={{ padding: '14px 16px', color: '#374151' }}>{row.totalCost}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'center', position: 'relative' }}>

                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>

    <button
      onClick={() => handlePrint(indexOfFirstRow + index)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
    >
      <Printer size={18} />
    </button>

    <button
      onClick={() => navigate("/layout/purchase")}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
    >
      <Edit2 size={18} />
    </button>

    <button
      onClick={() => handleDelete(indexOfFirstRow + index)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
    >
      <Trash2 size={18} style={{ color: '#dc2626' }} />
    </button>

  </div>
</td>


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
          {showTable && totalPages > 1 && (
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
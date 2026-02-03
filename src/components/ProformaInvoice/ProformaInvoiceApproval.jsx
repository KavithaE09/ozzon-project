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

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h3 className="page-title">Proforma Invoice Approval</h3>

            {/* FILTER ROW */}
            <div className="filter-grid">
              <div className="filter-grid-red ">
                <label className="filter-label">From Date</label>
                <input
                  type="date"
                  value={formData.formdate}
                  onChange={(e) =>
                    setFormData({ ...formData, formdate: e.target.value })
                  }
                  className="filter-input"
                />
              </div>

              <div className="filter-grid-red ">
                <label className="filter-label">To Date</label>
                <input
                  type="date"
                  value={formData.todate}
                  onChange={(e) =>
                    setFormData({ ...formData, todate: e.target.value })
                  }
                  className="filter-input"
                />
              </div>

              {/* CUSTOMER DROPDOWN */}
              <div ref={dropdownRef} className="filter-grid-green ">
                <label className="filter-label">Customer Name</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectCustomer(option)}
                          onMouseEnter={() => setHoveredOption(option)}
                          onMouseLeave={() => setHoveredOption(null)}
                          className={`dropdown-item-option ${
                            hoveredOption === option
                              ? 'dropdown-item-hovered'
                              : customerName === option
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

          
                <div className="btn-container">
                  <button onClick={handleSearch} className="btn-all">
                <Search size={18} /> Search
              </button>
              </div>
            </div>

            {/* TABLE */}
            {isSearched && (
              <div className="table-container">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      {['Sl No', 'Proforma Invoice No', 'PI Date', 'Customer Name', 'Sales Person', 'Total Cost', 'Print', 'Approval']
                        .map(h => <th key={h} className="table-th">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <tr key={row.id} className="table-row">
                          <td className="table-cell">{indexOfFirstRow + index + 1}</td>
                          <td className="table-cell">{row.qno}</td>
                          <td className="table-cell">{row.date}</td>
                          <td className="table-cell">{row.customer}</td>
                          <td className="table-cell">{row.sales}</td>
                          <td className="table-cell">{row.amount}</td>
                          <td className="table-cell">
                            <Printer 
                              size={18} 
                              className="cursor-pointer text-gray-700 print-primary hover:opacity-70"
                              onClick={() => handlePrint(row)}
                            />
                          </td>
                          <td className="table-cell">
                            {row.status === 'approved' ? (
                              <span className="text-green-600 font-semibold text-sm">
                                Approved
                              </span>
                            ) : row.status === 'rejected' ? (
                              <span className="text-red-600 font-semibold text-sm">
                                Rejected
                              </span>
                            ) : (
                              <div className="flex gap-3">
                                <CheckCircle 
                                  size={18} 
                                  className="cursor-pointer text-green-600 hover:opacity-70"
                                  onClick={() => handleApprove(row.id)}
                                />
                                <XCircle 
                                  size={18} 
                                  className="cursor-pointer text-red-600 hover:opacity-70"
                                  onClick={() => handleReject(row.id)}
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="no-data-cell">
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {isSearched && totalPages > 1 && (
            <div className="pagination-container">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className={`pagination-btn ${
                  currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                }`}
              >
                <ChevronLeft size={16} />
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
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <button onClick={() => navigate(-1)} className="btn-back">
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { Printer, Edit2, Trash2, Search, Plus, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProformaInvoiceSearch() {
  const navigate = useNavigate();
  const [isSearched, setIsSearched] = useState(false);
 
  const [customerName, setCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  
  const dropdownRef = useRef(null);

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

  // Filter customer options based on search term
  const filteredOptions = customerOptions.filter(option =>
    option.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

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

  const handlePrint = (index, e) => {
    e.stopPropagation();
    const actualIndex = indexOfFirstRow + index;
    const row = filteredData[actualIndex];
    alert(`Print Invoice: ${row.quotationNo}`);
  };

  const handleDelete = (index, e) => {
    e.stopPropagation();
    const actualIndex = indexOfFirstRow + index;

    if (window.confirm('Are you sure you want to delete this invoice?')) {
      const updatedData = filteredData.filter((_, i) => i !== actualIndex);
      setFilteredData(updatedData);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Proforma Invoice</h2>

            {/* Filter Section */}
            <div className="filter-section">
              <div className="filter-grid">
                {/* From Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">From Date</label>
                  <input
                    type="date"
                    value={formData.formdate}
                    onChange={(e) => setFormData({ ...formData, formdate: e.target.value })}
                    className="filter-input"
                  />
                </div>

                {/* To Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">To Date</label>
                  <input
                    type="date"
                    value={formData.todate}
                    onChange={(e) => setFormData({ ...formData, todate: e.target.value })}
                    className="filter-input"
                  />
                </div>

                {/* Customer Name Dropdown */}
                <div ref={dropdownRef} className="filter-grid-green">
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
                  {isDropdownOpen && filteredOptions.length > 0 && (
                    <div className="dropdown-menu">
                      {filteredOptions.map((option, index) => (
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
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <div className="btn-container">
                  <button onClick={handleSearch} className="btn-all">
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>

              {/* Proforma Invoice Button Row */}
              <div className="btn-container">
                <button onClick={() => navigate("/layout/proformainvoice/add")} className="btn-all">
                  <Plus size={18} /> Proforma Invoice
                </button>
              </div>
            </div>

            {/* Results Table */}
            {isSearched && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr className="table-header">
                      <th className="table-th">SI No</th>
                      <th className="table-th">PI No</th>
                      <th className="table-th">PI Date</th>
                      <th className="table-th">PI Name</th>
                      <th className="table-th">Sales Person</th>
                      <th className="table-th">Total Cost</th>
                      <th className="table-th-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <tr key={index} className="table-row">
                          <td className="table-cell">{indexOfFirstRow + index + 1}</td>
                          <td className="table-cell">{row.quotationNo}</td>
                          <td className="table-cell">{row.quotationDate}</td>
                          <td className="table-cell">{row.customerName}</td>
                          <td className="table-cell">{row.salesPerson}</td>
                          <td className="table-cell">{row.totalCost}</td>
                          <td className="table-cell-center">
                            <div className="table-actions">
                              <button
                                onClick={(e) => handlePrint(index, e)}
                                className="btn-action"
                                title="Print"
                              >
                                <Printer size={18} className="text-[#374151]" />
                              </button>
                              <button
                                onClick={() => navigate("/layout/proformainvoice/add")}
                                className="btn-action"
                                title="Edit"
                              >
                                <Edit2 size={18} className="text-[#374151]" />
                              </button>
                              <button
                                onClick={(e) => handleDelete(index, e)}
                                className="btn-action"
                                title="Delete"
                              >
                                <Trash2 size={18} className="text-[#dc2626]" />
                              </button>
                              <button
                                onClick={() => navigate("/layout/proformainvoice/advance")}
                                className="btn-hold"
                              >
                                Advance
                              </button>
                              <button
                                onClick={() => navigate("/layout/proformainvoice/block")}
                                className="btn-quotation"
                              >
                                Block
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-data-cell">
                          No records found for the selected filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {isSearched && filteredData.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
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
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className={`pagination-btn ${
                    currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

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
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, ChevronDown, Printer, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function QuotationSearchForm() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [leadNo, setLeadNo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  
  const dropdownRef = useRef(null);

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
    leadNo: '',
    leadDate: getTodayDate(),
  });

  const [quotations, setQuotations] = useState([
    { id: 1, leadNo: 'L-1', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Raneesh', salesPerson: 'Raneesh', cost: 100000 },
    { id: 2, leadNo: 'L-2', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Vinoth', salesPerson: 'Raneesh', cost: 100000 },
    { id: 3, leadNo: 'L-3', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Raneesh', salesPerson: 'Raneesh', cost: 100000 },
    { id: 4, leadNo: 'L-4', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Vinoth', salesPerson: 'Raneesh', cost: 100000 },
    { id: 5, leadNo: 'L-5', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Raneesh', salesPerson: 'Raneesh', cost: 100000 },
    { id: 6, leadNo: 'L-6', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Vinoth', salesPerson: 'Raneesh', cost: 100000 }
  ]);

  const [filteredQuotations, setFilteredQuotations] = useState(quotations);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedQuotations = filteredQuotations.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredQuotations.length / rowsPerPage);

  useEffect(() => {
    setFilteredQuotations(quotations);
  }, [quotations]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatCurrency = (amount) => {
    return '₹ ' + amount.toLocaleString('en-IN');
  };

  const getUniqueCustomers = () => {
    const customers = [...new Set(quotations.map(q => q.customer))];
    return customers.sort();
  };

  const filteredOptions = getUniqueCustomers().filter(option =>
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
    let filtered = quotations;
    if (customerName) {
      filtered = filtered.filter(q => q.customer === customerName);
    }
    setFilteredQuotations(filtered);
    setIsSearched(true);
    setCurrentPage(1);
  };

  const handlePrint = (index, e) => {
    e.stopPropagation();
    const actualIndex = indexOfFirstRow + index;
    const row = filteredQuotations[actualIndex];
    alert(`Print Quotation: ${row.quotationNo}`);
  };

  const handleDelete = (index, e) => {
    e.stopPropagation();
    const actualIndex = indexOfFirstRow + index;

    if (window.confirm('Are you sure you want to delete this quotation?')) {
      const updatedData = filteredQuotations.filter((_, i) => i !== actualIndex);
      setFilteredQuotations(updatedData);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Quotation</h2>

            {/* Filter Section */}
            <div className="filter-section">
              {/* First Row */}
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
                        <div className="dropdown-no-matches">
                          No matches found
                        </div>
                      )}
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

              {/* Second Row */}
              <div className="filter-grid" style={{ marginTop: '16px' }}>
                {/* Lead No */}
                <div className="filter-grid-red">
                  <label className="filter-label">Lead No</label>
                  <input
                    type="text"
                    value={leadNo}
                    onChange={(e) => setLeadNo(e.target.value)}
                    placeholder="12456"
                    className="filter-input"
                  />
                </div>

                {/* Lead Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">Lead Date</label>
                  <input
                    type="date"
                    value={formData.leadDate}
                    onChange={(e) => setFormData({ ...formData, leadDate: e.target.value })}
                    className="filter-input"
                  />
                </div>

                <div></div>

                {/* Quotation Button */}
                <div className="btn-container">
                  <button onClick={() => navigate("/layout/Quotation/Quotation")} className="btn-all">
                    <Plus size={18} /> Quotation
                  </button>
                </div>
              </div>
            </div>

            {/* Results Table */}
            {isSearched && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr className="table-header">
                      <th className="table-th">S/No</th>
                      <th className="table-th">Lead No</th>
                      <th className="table-th">Lead Date</th>
                      <th className="table-th">Quotation No</th>
                      <th className="table-th">Quotation Date</th>
                      <th className="table-th">Customer Name</th>
                      <th className="table-th">Sales Person</th>
                      <th className="table-th">Total Cost</th>
                      <th className="table-th-center">Proforma Invoice</th>
                      <th className="table-th-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuotations.length > 0 ? (
                      paginatedQuotations.map((row, index) => (
                        <tr key={row.id} className="table-row">
                          <td className="table-cell">{indexOfFirstRow + index + 1}</td>
                          <td className="table-cell">{row.leadNo}</td>
                          <td className="table-cell">{formatDate(row.leadDate)}</td>
                          <td className="table-cell">{row.quotationNo}</td>
                          <td className="table-cell">{formatDate(row.date)}</td>
                          <td className="table-cell">{row.customer}</td>
                          <td className="table-cell">{row.salesPerson}</td>
                          <td className="table-cell">{formatCurrency(row.cost)}</td>
                          <td className="table-cell-center">
                            <button
                              onClick={() => navigate("/layout/quotation/proformainvoice")}
                              className="btn-quotation"
                            >
                              Proforma Invoice
                            </button>
                          </td>
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
                                onClick={() => navigate("/layout/Quotation/Quotation")}
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
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="no-data-cell">
                          No records found for the selected filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {isSearched && filteredQuotations.length > rowsPerPage && (
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
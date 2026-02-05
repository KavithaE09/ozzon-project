import React, { useState, useRef, useEffect } from 'react';
import { Printer, Edit2, Trash2, Search, Plus, ChevronDown, ChevronRight, ChevronLeft, ArrowLeft,Undo2 } from 'lucide-react';
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
  const customerOptions = ['Sasi', 'Varshini','Raneesh','Leyo','Kavitha','kumar'].sort();

  // All invoice data
  const allInvoiceData = [
    { slNo: 1, leadNo: 'L-1', leadDate: '01-01-2026', customerName: 'Sasi', salesPerson: 'Christine Brooks', totalCost: '₹ 10,00,000' },
    { slNo: 2, leadNo: 'L-2', leadDate: '01-01-2026', customerName: 'Varshini', salesPerson: 'Christine Brooks', totalCost: '₹ 15,00,000' },
    { slNo: 3, leadNo: 'L-1', leadDate: '01-01-2026', customerName: 'Raneesh', salesPerson: 'Christine Brooks', totalCost: '₹ 10,00,000' },
    { slNo: 4, leadNo: 'L-2', leadDate: '01-01-2026', customerName: 'leyo', salesPerson: 'Christine Brooks', totalCost: '₹ 15,00,000' },
    { slNo: 5, leadNo: 'L-1', leadDate: '01-01-2026', customerName: 'kavitha', salesPerson: 'Christine Brooks', totalCost: '₹ 10,00,000' },
    { slNo: 7, leadNo: 'L-2', leadDate: '01-01-2026', customerName: 'kumar', salesPerson: 'Christine Brooks', totalCost: '₹ 15,00,000' },
  ];

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
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card bg-white dark:bg-[#353C44]">
<div className="page-header">
              <h1 className="page-title">Lead</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2   className="page-back-icon" />
              </button>
            </div>


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

              {/* Lead Button Row */}
              <div className="btn-container">
                <button onClick={() => navigate("/layout/lead/lead")} className="btn-all">
                  <Plus size={18} /> Lead
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
                      <th className="table-th">Lead No</th>
                      <th className="table-th">Lead Date</th>
                      <th className="table-th">Customer Name</th>
                      <th className="table-th">Sales Person</th>
                      <th className="table-th">Total Cost</th>
                      <th className="table-th">Hold Request</th>
                      <th className="table-th">Quotation</th>
                      <th className="table-th-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <tr key={index} className="table-row">
                          <td className="table-cell">{indexOfFirstRow + index + 1}</td>
                          <td className="table-cell">{row.leadNo}</td>
                          <td className="table-cell">{row.leadDate}</td>
                          <td className="table-cell">{row.customerName}</td>
                          <td className="table-cell">{row.salesPerson}</td>
                          <td className="table-cell">{row.totalCost}</td>
                          <td className="table-cell">
                            <button
                              onClick={() => navigate("/layout/lead/hold")}
                              className="btn-hold"
                            >
                              Hold
                            </button>
                          </td>
                          <td className="table-cell">
                            <button
                              onClick={() => navigate("/layout/lead/quotation")}
                              className="btn-quotation"
                            >
                              Quotation
                            </button>
                          </td>
                          <td className="table-cell-center">
                            <div className="table-actions">
                              <button
                                onClick={(e) => handlePrint(index, e)}
                                className="btn-action"
                                title="Print"
                              >
                                <Printer size={18}className="print-primary"/>
                              </button>
                            <button
                                onClick={() => navigate("/layout/lead/lead")}
                                className="btn-action"
                                title="Edit"
                              >
                                 <Edit2 size={18} />
                              </button>
                              <button
                                onClick={(e) => handleDelete(index, e)}
                                className="btn-action"
                                title="Delete"
                              >
                                 <Trash2 size={18} className="text-primary" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="no-data-cell">
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
        </div>
      </div>
    </div>
  );
}
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

  // Check dark mode
  const isDark = document.documentElement.classList.contains("dark");

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
          <div className="content-card">

            <h2 className="page-title">Lead</h2>

            {/* Filter Section */}
            <div className="filter-section">
              <div className="filter-grid">
                {/* From Date */}
                <div className="filter-grid-red dark:bg-[#1E293B] dark:border-[#374151]">
                  <label className="filter-label dark:text-[#E5E7EB]">From Date</label>
                  <input
                    type="date"
                    value={formData.formdate}
                    onChange={(e) => setFormData({ ...formData, formdate: e.target.value })}
                    className="filter-input dark:bg-[#1E293B] dark:text-[#E5E7EB] dark:[color-scheme:dark]"
                  />
                 </div>

                {/* To Date */}
                <div className="filter-grid-red dark:bg-[#1E293B] dark:border-[#374151]">
                  <label className="filter-label dark:text-[#E5E7EB]">To Date</label>
                  <input
                    type="date"
                    value={formData.todate}
                    onChange={(e) => setFormData({ ...formData, todate: e.target.value })}
                    className="filter-input dark:bg-[#1E293B] dark:text-[#E5E7EB] dark:[color-scheme:dark]"
                  />
                 </div>

                {/* Customer Name Dropdown */}
                <div ref={dropdownRef} className="filter-grid-green dark:bg-[#1E293B] dark:border-[#374151]">
                  <label className="filter-label dark:text-[#E5E7EB]">Customer Name</label>
                  <div className="dropdown-wrapper">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleInputChange}
                      onFocus={() => setIsDropdownOpen(true)}
                      placeholder="Type or select..."
                      className="dropdown-input dark:bg-[#1E293B] dark:text-[#E5E7EB]"
                    />
                    <ChevronDown 
                      size={20} 
                      className="dropdown-icon"
                      style={{ color: isDark ? "#9CA3AF" : "black" }}
                    />
                  </div>
                  {isDropdownOpen && (
                        <div className="dropdown-menu dark:bg-[#1E293B] dark:border-[#374151]">
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
                               ? 'dropdown-item-selected dark:bg-[#1E3A5F]' 
                               : 'dropdown-item-default dark:text-[#E5E7EB] dark:bg-[#1E293B]'
                           }`}
                           style={{
                             borderBottom: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`
                           }}
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
              <div className="table-container dark:border-[#374151]">
                <table className="data-table">
                  <thead>
                    <tr className="table-header dark:bg-[#1E293B]">
                      <th className="table-th dark:text-[#E5E7EB] dark:border-[#374151]">SI No</th>
                      <th className="table-th dark:text-[#E5E7EB] dark:border-[#374151]">Lead No</th>
                      <th className="table-th dark:text-[#E5E7EB] dark:border-[#374151]">Lead Date</th>
                      <th className="table-th dark:text-[#E5E7EB] dark:border-[#374151]">Customer Name</th>
                      <th className="table-th dark:text-[#E5E7EB] dark:border-[#374151]">Sales Person</th>
                      <th className="table-th dark:text-[#E5E7EB] dark:border-[#374151]">Total Cost</th>
                      <th className="table-th dark:text-[#E5E7EB] dark:border-[#374151]">Hold Request</th>
                      <th className="table-th dark:text-[#E5E7EB] dark:border-[#374151]">Quotation</th>
                      <th className="table-th-center dark:text-[#E5E7EB] dark:border-[#374151]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <tr key={index} className="table-row dark:border-[#374151] dark:hover:bg-[#0F172A]">
                          <td className="table-cell dark:text-[#E5E7EB]">{indexOfFirstRow + index + 1}</td>
                          <td className="table-cell dark:text-[#E5E7EB]">{row.leadNo}</td>
                          <td className="table-cell dark:text-[#E5E7EB]">{row.leadDate}</td>
                          <td className="table-cell dark:text-[#E5E7EB]">{row.customerName}</td>
                          <td className="table-cell dark:text-[#E5E7EB]">{row.salesPerson}</td>
                          <td className="table-cell dark:text-[#E5E7EB]">{row.totalCost}</td>
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
                          <td className="table-cell-center dark:text-[#E5E7EB]">
                            <div className="table-actions">
                              <button
                                onClick={(e) => handlePrint(index, e)}
                                className="btn-action dark:hover:bg-[#374151]"
                                title="Print"
                              >
                                <Printer size={18} className="print-primary"/>
                              </button>
                            <button
                                onClick={() => navigate("/layout/lead/lead")}
                                className="btn-action dark:hover:bg-[#374151]"
                                title="Edit"
                              >
                                 <Edit2 size={18} style={{ color: isDark ? "#9CA3AF" : "#374151" }} />
                              </button>
                              <button
                                onClick={(e) => handleDelete(index, e)}
                                className="btn-action dark:hover:bg-[#374151]"
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
                        <td colSpan="9" className="no-data-cell dark:text-[#9CA3AF]">
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
                  className={`pagination-btn dark:border-[#374151] ${
                    currentPage === 1 
                      ? 'pagination-btn-disabled dark:bg-[#1E293B] dark:text-[#9CA3AF]' 
                      : 'pagination-btn-active dark:bg-[#1E293B] dark:text-[#E5E7EB] dark:hover:bg-[#0F172A]'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-page-btn dark:border-[#374151] ${
                      currentPage === page 
                        ? 'pagination-page-active' 
                        : 'pagination-page-inactive dark:bg-[#1E293B] dark:text-[#E5E7EB] dark:hover:bg-[#0F172A]'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className={`pagination-btn dark:border-[#374151] ${
                    currentPage === totalPages 
                      ? 'pagination-btn-disabled dark:bg-[#1E293B] dark:text-[#9CA3AF]' 
                      : 'pagination-btn-active dark:bg-[#1E293B] dark:text-[#E5E7EB] dark:hover:bg-[#0F172A]'
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
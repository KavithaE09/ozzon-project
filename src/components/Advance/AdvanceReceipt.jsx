import React, { useState, useRef, useEffect } from 'react';
import { Search, Printer, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdvanceReceipt() {
  const navigate = useNavigate();
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    fromDate: getTodayDate(),
    toDate: getTodayDate()
  });

  const [customerName, setCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [filteredData, setFilteredData] = useState([]); 
  const [isSearched, setIsSearched] = useState(false);
  
  const dropdownRef = useRef(null);

  const tableData = [
    { id: 1, qno: 'Q-1', date: '20-12-25', customer: 'Leyo', sales: 'Raneesh', amount: '₹ 10,00,000' },
    { id: 2, qno: 'Q-1', date: '20-12-25', customer: 'Whiteson', sales: 'Raneesh', amount: '₹ 10,00,000' },
    { id: 3, qno: 'Q-1', date: '20-12-25', customer: 'Kavi', sales: 'Raneesh', amount: '₹ 10,00,000' },
    { id: 4, qno: 'Q-1', date: '20-12-25', customer: 'Kavitha', sales: 'Raneesh', amount: '₹ 10,00,000' },
  ];

  // Get unique customers from table data
  const getUniqueCustomers = () => {
    const customers = [...new Set(tableData.map(item => item.customer))];
    return customers.sort();
  };

  // Filter customer options based on search term
  const filteredOptions = getUniqueCustomers().filter(option =>
    option.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

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
    setIsSearched(true);
    
    let results = [...tableData];
    
    // Filter by customer name if selected
    if (customerName) {
      results = results.filter(
        row => row.customer.toLowerCase() === customerName.toLowerCase()
      );
    }

    setFilteredData(results);
  };

  const handlePrint = (row) => {
    alert(`Print Quotation: ${row.qno}`);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Advance Receipt</h2>
            
            {/* Filter Section */}
            <div className="filter-section">
              <div className="filter-grid">
                {/* From Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">From Date</label>
                  <input 
                    type="date" 
                    value={formData.fromDate}
                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                    className="filter-input"
                  />
                </div>

                {/* To Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">To Date</label>
                  <input 
                    type="date" 
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
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
            </div>

            {/* Results Table */}
            {isSearched && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr className="table-header">
                      <th className="table-th">Sl No</th>
                      <th className="table-th">Quotation No</th>
                      <th className="table-th">Quotation Date</th>
                      <th className="table-th">Customer Name</th>
                      <th className="table-th">Sales Person</th>
                      <th className="table-th">Total Cost</th>
                      <th className="table-th-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((row) => (
                        <tr key={row.id} className="table-row">
                          <td className="table-cell">{row.id}</td>
                          <td className="table-cell">{row.qno}</td>
                          <td className="table-cell">{row.date}</td>
                          <td className="table-cell">{row.customer}</td>
                          <td className="table-cell">{row.sales}</td>
                          <td className="table-cell">{row.amount}</td>
                          <td className="table-cell-center">
                            <div className="table-actions">
                              <button
                                onClick={() => handlePrint(row)}
                                className="btn-action"
                                title="Print"
                              >
                                <Printer size={18} className="text-[#374151]" />
                              </button>
                              <button 
                                onClick={() => navigate("/layout/proformainvoice/advance")}
                                className="btn-smallbtn"
                              >
                                Advance
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


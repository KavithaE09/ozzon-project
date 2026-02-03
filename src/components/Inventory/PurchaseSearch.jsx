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
  };

  const handleDelete = (index) => {
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
    <div className="page-container">
      <div className="content-wrapper">
        <main className="main-section">
          <div className="content-card">
            <h1 className="page-title">Purchase</h1>

            {/* Filter Section */}
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-red">
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

                <div className="filter-grid-red">
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

                <div ref={dropdownRef} className="filter-grid-green">
                  <label className="filter-label">Supplier Name</label>
                  <div className="relative">
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
                      className="filter-input"
                    />
                    <ChevronDown size={20} className="dropdown-icon" />
                  </div>

                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt, i) => (
                          <div
                            key={i}
                            onClick={() => handleSelectSupplier(opt)}
                            onMouseEnter={() => setHoveredOption(opt)}
                            onMouseLeave={() => setHoveredOption(null)}
                            className={`dropdown-item-option ${
                              hoveredOption === opt
                                ? 'dropdown-item-hovered'
                                : 'dropdown-item-default'
                            }`}
                          >
                            {opt}
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-no-matches">No matches found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* ✅ FIX: "pr-2" → "btn-container" 
                    filter-grid direct child ஆ btn-container ஆ இருக்குதா → 
                    CSS: grid-column: 1/-1 + justify-content: flex-end → RIGHT align */}
                <div className="btn-container">
                  <button
                    onClick={handleSearch}
                    className="btn-search"
                  >
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>

              {/* ✅ FIX: Tailwind "grid grid-cols-4" + "col-start-4" → "btn-container"
                  Mobile-ஐ Tailwind grid-cols-4 respond பண்ணாது → layout broken.
                  btn-container use பண்ணா CSS media queries handle பண்ணும் → RIGHT align */}
              <div className="btn-container">
                <button
                  onClick={() => navigate("/layout/purchase")}
                  className="btn-search"
                >
                  <Plus size={18} />
                  Purchase
                </button>
              </div>
            </div>

            {/* Table */}
            {showTable && (
              <div className="table-container">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-th">SI No</th>
                      <th className="table-th">Purchase No</th>
                      <th className="table-th">Purchase Date</th>
                      <th className="table-th">Supplier Name</th>
                      <th className="table-th">Narration</th>
                      <th className="table-th">Total Cost</th>
                      <th className="table-th-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <tr key={index} className="table-row">
                          <td className="table-cell">{indexOfFirstRow + index + 1}</td>
                          <td className="table-cell">{row.purchaseNo}</td>
                          <td className="table-cell">{formatDate(row.purchaseDate)}</td>
                          <td className="table-cell">{row.supplierName}</td>
                          <td className="table-cell">{row.narration}</td>
                          <td className="table-cell">{row.totalCost}</td>
                          <td className="table-cell-center">
                            <div className="table-actions">
                              <button
                                onClick={() => handlePrint(indexOfFirstRow + index)}
                                className="btn-action"
                                title="Print"
                              >
                                <Printer size={18} className="print-primary" />
                              </button>

                              <button
                                onClick={() => navigate("/layout/purchase")}
                                className="btn-action"
                                title="Edit"
                              >
                                <Edit2 size={18}  />
                              </button>

                              <button
                                onClick={() => handleDelete(indexOfFirstRow + index)}
                                className="btn-action"
                                title="Delete"
                              >
                                <Trash2 size={18} className="text-red-600" />
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
          </div>

          {/* Pagination */}
          {showTable && totalPages > 1 && (
            <div className="pagination-container">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
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
                onClick={() => setCurrentPage(p => p + 1)}
                className={`pagination-btn ${
                  currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          <button
            onClick={() => navigate(-1)}
            className="btn-back"
          >
            ← Back
          </button>
        </main>
      </div>
    </div>
  );
}
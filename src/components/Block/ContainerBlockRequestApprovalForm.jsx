import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, Search, ChevronDown, ChevronLeft, ChevronRight,Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContainerBlockRequestApprovalForm = () => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    fromdate: getTodayDate(),
    todate: getTodayDate(),
    customer: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCustomer, setHoveredCustomer] = useState(null);
  const dropdownRef = useRef(null);

  const customerOptions = [
    'Christine',
    'Rosie Pearson',
    'ABC Traders',
    'XYZ Corporation'
  ];

  const filteredCustomers = customerOptions.filter(c =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSelectCustomer = (name) => {
    setFormData({ ...formData, customer: name });
    setSearchTerm(name);
    setDropdownOpen(false);
  };

  const allApprovalData = [
    {
      sNo: 1, piNo: '662', piDate: '04-09-2019', receiptNo: '52', receiptDate: '04-09-2019',
      amount: '₹ 1,00,000', requestDate: '04-09-2019', customer: 'Christine',
      salesPerson: 'Brooks', status: 'Hold', approvalStatus: null
    },
    {
      sNo: 2, piNo: '663', piDate: '05-09-2019', receiptNo: '53', receiptDate: '05-09-2019',
      amount: '₹ 2,00,000', requestDate: '05-09-2019', customer: 'Rosie Pearson',
      salesPerson: 'Smith', status: 'Available', approvalStatus: null
    },
    {
      sNo: 3, piNo: '664', piDate: '06-09-2019', receiptNo: '54', receiptDate: '06-09-2019',
      amount: '₹ 1,50,000', requestDate: '06-09-2019', customer: 'ABC Traders',
      salesPerson: 'Johnson', status: 'Hold', approvalStatus: null
    },
    {
      sNo: 4, piNo: '665', piDate: '07-09-2019', receiptNo: '55', receiptDate: '07-09-2019',
      amount: '₹ 3,00,000', requestDate: '07-09-2019', customer: 'Christine',
      salesPerson: 'Brooks', status: 'Available', approvalStatus: null
    },
    {
      sNo: 5, piNo: '666', piDate: '08-09-2019', receiptNo: '56', receiptDate: '08-09-2019',
      amount: '₹ 1,80,000', requestDate: '08-09-2019', customer: 'XYZ Corporation',
      salesPerson: 'Davis', status: 'Hold', approvalStatus: null
    },
    {
      sNo: 6, piNo: '667', piDate: '09-09-2019', receiptNo: '57', receiptDate: '09-09-2019',
      amount: '₹ 2,50,000', requestDate: '09-09-2019', customer: 'Rosie Pearson',
      salesPerson: 'Smith', status: 'Available', approvalStatus: null
    },
  ];

  const [approvalData, setApprovalData] = useState(allApprovalData);
  const [filteredApprovalData, setFilteredApprovalData] = useState(allApprovalData);

  const handleSearch = () => {
    setIsSearched(true);
    
    if (formData.customer.trim() === '') {
      setFilteredApprovalData(approvalData);
    } else {
      const filtered = approvalData.filter(row => 
        row.customer.toLowerCase() === formData.customer.toLowerCase()
      );
      setFilteredApprovalData(filtered);
    }
    setApprovalPage(1);
  };

  const handleApprove = (sNo) => {
    const updatedData = approvalData.map(row =>
      row.sNo === sNo ? { ...row, approvalStatus: 'approved' } : row
    );
    setApprovalData(updatedData);
    
    if (formData.customer.trim() === '') {
      setFilteredApprovalData(updatedData);
    } else {
      const filtered = updatedData.filter(row => 
        row.customer.toLowerCase() === formData.customer.toLowerCase()
      );
      setFilteredApprovalData(filtered);
    }
  };

  const handleReject = (sNo) => {
    const updatedData = approvalData.map(row =>
      row.sNo === sNo ? { ...row, approvalStatus: 'rejected' } : row
    );
    setApprovalData(updatedData);
    
    if (formData.customer.trim() === '') {
      setFilteredApprovalData(updatedData);
    } else {
      const filtered = updatedData.filter(row => 
        row.customer.toLowerCase() === formData.customer.toLowerCase()
      );
      setFilteredApprovalData(filtered);
    }
  };

  // ===== APPROVAL TABLE PAGINATION =====
  const [approvalPage, setApprovalPage] = useState(1);
  const approvalRows = 5;

  const approvalLast = approvalPage * approvalRows;
  const approvalFirst = approvalLast - approvalRows;

  const approvalPaginated = filteredApprovalData.slice(
    approvalFirst,
    approvalLast
  );

  const approvalTotalPages = Math.ceil(filteredApprovalData.length / approvalRows);

  const containerData = [
    {
      sNo: 1, containerNo: 'TCKU 1524662', partyName: 'Christine Brooks', szType: '20"',
      liner: 'Global', mfgDate: '04-09-2019', inDate: '04-09-2019',
      deliveryDate: '04-09-2019', photo: 'Image', status: 'Hold',
    },
    {
      sNo: 2, containerNo: 'TCKU 1524663', partyName: 'Rosie Pearson', szType: '20"',
      liner: 'Global', mfgDate: '04 Sep 2019', inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019', photo: 'Image', status: 'Available',
    },
    {
      sNo: 3, containerNo: 'TCKU 1524664', partyName: 'Christine Brooks', szType: '20"',
      liner: 'Global', mfgDate: '04-09-2019', inDate: '04-09-2019',
      deliveryDate: '04-09-2019', photo: 'Image', status: 'Hold',
    },
    {
      sNo: 4, containerNo: 'TCKU 1524665', partyName: 'Rosie Pearson', szType: '20"',
      liner: 'Global', mfgDate: '04 Sep 2019', inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019', photo: 'Image', status: 'Available',
    },
    {
      sNo: 5, containerNo: 'TCKU 1524666', partyName: 'Christine Brooks', szType: '20"',
      liner: 'Global', mfgDate: '04-09-2019', inDate: '04-09-2019',
      deliveryDate: '04-09-2019', photo: 'Image', status: 'Hold',
    },
    {
      sNo: 6, containerNo: 'TCKU 1524667', partyName: 'Rosie Pearson', szType: '20"',
      liner: 'Global', mfgDate: '04 Sep 2019', inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019', photo: 'Image', status: 'Available',
    },
  ];

  // ===== CONTAINER TABLE PAGINATION =====
  const containerFiltered = containerData;

  const [containerPage, setContainerPage] = useState(1);
  const containerRows = 5;

  const containerLast = containerPage * containerRows;
  const containerFirst = containerLast - containerRows;

  const containerPaginated = containerFiltered.slice(
    containerFirst,
    containerLast
  );

  const containerTotalPages = Math.ceil(containerFiltered.length / containerRows);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <div className="page-header">
              <h1 className="page-title">Container Block Request Approval</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2   className="page-back-icon" />
              </button>
            </div>

            {/* SEARCH */}
            <div className="filter-grid">
              {/* FROM DATE */}
              <div className="filter-grid-red">
                <label className="filter-label">From Date</label>
                <input
                  type="date"
                  value={formData.fromdate}
                  onChange={(e) =>
                    setFormData({ ...formData, fromdate: e.target.value })
                  }
                  className="filter-input"
                />
              </div>

              {/* TO DATE */}
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

              {/* CUSTOMER DROPDOWN */}
              <div ref={dropdownRef} className="filter-grid-green">
                <label className="filter-label">Customer Name</label>

                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={searchTerm}
                    placeholder="Type or select..."
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setDropdownOpen(true);
                      if (e.target.value === '') {
                        setFormData({ ...formData, customer: '' });
                      }
                    }}
                    onFocus={() => setDropdownOpen(true)}
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    {filteredCustomers.length ? filteredCustomers.map((c, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectCustomer(c)}
                        onMouseEnter={() => setHoveredCustomer(c)}
                        onMouseLeave={() => setHoveredCustomer(null)}
                        className={`dropdown-item-option ${
                          hoveredCustomer === c
                            ? 'dropdown-item-hovered'
                            : formData.customer === c
                            ? 'dropdown-item-selected'
                            : 'dropdown-item-default'
                        }`}
                      >
                        {c}
                      </div>
                    )) : (
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

            {/* APPROVAL TABLE */}
            {isSearched && (
              <>
                <div className="table-container">
                  <table className="data-table">
                    <thead className="table-header">
                      <tr>
                        {[
                          'Select', 'S/No', 'PI No', 'PI Date', 'Advance Receipt No',
                          'Advance Receipt Date', 'Advance Amount', 'Request Date',
                          'Customer Name', 'Sales Person', 'Status', 'Approval'
                        ].map(h => (
                          <th key={h} className="table-th">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {approvalPaginated.length > 0 ? (
                        approvalPaginated.map((row, i) => (
                          <tr key={i} className="table-row">
                            <td className="table-cell">
                              <input
                                type="radio"
                                name="containerSelect"
                                checked={selectedRow === row.sNo}
                                onChange={() => setSelectedRow(row.sNo)}
                                className="accent-primary"
                              />
                            </td>
                            <td className="table-cell">{approvalFirst + i + 1}</td>
                            <td className="table-cell">{row.piNo}</td>
                            <td className="table-cell">{row.piDate}</td>
                            <td className="table-cell">{row.receiptNo}</td>
                            <td className="table-cell">{row.receiptDate}</td>
                            <td className="table-cell">{row.amount}</td>
                            <td className="table-cell">{row.requestDate}</td>
                            <td className="table-cell">{row.customer}</td>
                            <td className="table-cell">{row.salesPerson}</td>
                            <td className="table-cell">
                              <span className={`font-semibold ${row.status === 'Hold' ? 'text-orange-500' : 'text-green-500'}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="table-cell">
                              {row.approvalStatus === 'approved' ? (
                                <span className="text-green-600 font-semibold text-sm">
                                  Approved
                                </span>
                              ) : row.approvalStatus === 'rejected' ? (
                                <span className="text-red-600 font-semibold text-sm">
                                  Rejected
                                </span>
                              ) : (
                                <div className="flex gap-2">
                                  <CheckCircle 
                                    size={16} 
                                    className="cursor-pointer text-green-600 hover:opacity-70"
                                    onClick={() => handleApprove(row.sNo)}
                                  />
                                  <XCircle 
                                    size={16} 
                                    className="cursor-pointer text-red-600 hover:opacity-70"
                                    onClick={() => handleReject(row.sNo)}
                                  />
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="12" className="no-data-cell">
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {approvalTotalPages > 1 && (
                  <div className="pagination-container">
                    <button
                      disabled={approvalPage === 1}
                      onClick={() => setApprovalPage(p => p - 1)}
                      className={`pagination-btn ${
                        approvalPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                      }`}
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: approvalTotalPages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setApprovalPage(p)}
                        className={`pagination-page-btn ${
                          approvalPage === p ? 'pagination-page-active' : 'pagination-page-inactive'
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      disabled={approvalPage === approvalTotalPages}
                      onClick={() => setApprovalPage(p => p + 1)}
                      className={`pagination-btn ${
                        approvalPage === approvalTotalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                      }`}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* CONTAINER LIST */}
            <h4 className="section-title">Container List</h4>

            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    {[
                      'S/No', 'Container No', 'Party Name', 'Sz/Type',
                      'Liner', 'MFG Date', 'In Date', 'Delivery Date', 'Photo', 'Status'
                    ].map(h => (
                      <th key={h} className="table-th">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {containerPaginated.map((row, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-cell">{row.sNo}</td>
                      <td className="table-cell">{row.containerNo}</td>
                      <td className="table-cell">{row.partyName}</td>
                      <td className="table-cell">{row.szType}</td>
                      <td className="table-cell">{row.liner}</td>
                      <td className="table-cell">{row.mfgDate}</td>
                      <td className="table-cell">{row.inDate}</td>
                      <td className="table-cell">{row.deliveryDate}</td>
                      <td className="table-cell">{row.photo}</td>
                      <td className="table-cell">
                        <span className={`font-semibold ${row.status === 'Hold' ? 'text-orange-500' : 'text-green-500'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {containerTotalPages > 1 && (
              <div className="pagination-container">
                <button
                  disabled={containerPage === 1}
                  onClick={() => setContainerPage(p => p - 1)}
                  className={`pagination-btn ${
                    containerPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: containerTotalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setContainerPage(p)}
                    className={`pagination-page-btn ${
                      containerPage === p ? 'pagination-page-active' : 'pagination-page-inactive'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={containerPage === containerTotalPages}
                  onClick={() => setContainerPage(p => p + 1)}
                  className={`pagination-btn ${
                    containerPage === containerTotalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerBlockRequestApprovalForm;
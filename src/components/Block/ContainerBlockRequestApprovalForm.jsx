import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const icon = { cursor: 'pointer', color: '#374151' };

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
      // Show all data if no customer selected
      setFilteredApprovalData(approvalData);
    } else {
      // Filter by customer name
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
    
    // Update filtered data as well
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
    
    // Update filtered data as well
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
    <div style={page}>
      <div style={card}>
        <h3 style={title}>Container Block Request Approval</h3>

        {/* SEARCH */}
        <div style={rowWrap}>
          {/* FROM DATE - Editable */}
          <div style={fieldBox}>
            <label style={fieldLabel}>From Date</label>
            <input 
              type="date" 
              value={formData.fromdate}
              onChange={(e) => setFormData({ ...formData, fromdate: e.target.value })}
              style={fieldInput}
            />
          </div>

          {/* TO DATE - Editable */}
          <div style={fieldBox}>
            <label style={fieldLabel}>To Date</label>
            <input 
              type="date" 
              value={formData.todate}
              onChange={(e) => setFormData({ ...formData, todate: e.target.value })}
              style={fieldInput}
            />
          </div>

          {/* CUSTOMER DROPDOWN */}
          <div
            ref={dropdownRef}
            style={{ ...fieldBox, borderRight: '3px solid #22C55E', position: 'relative' }}
          >
            <label style={fieldLabel}>Customer Name</label>

            <div style={{ position: 'relative' }}>
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
                style={fieldInput}
              />
              <ChevronDown
                size={20}
                style={{
                  position: 'absolute',
                  right: 4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#000000',
                  pointerEvents: 'none'
                }}
              />
            </div>

            {dropdownOpen && (
              <div style={dropdownMenu}>
                {filteredCustomers.length ? filteredCustomers.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectCustomer(c)}
                    onMouseEnter={() => setHoveredCustomer(c)}
                    onMouseLeave={() => setHoveredCustomer(null)}
                    style={{
                      ...dropdownItem,
                      color: hoveredCustomer === c ? 'white' : '#374151',
                      backgroundColor:
                        hoveredCustomer === c
                          ? '#A63128'
                          : formData.customer === c
                            ? '#FEE2E2'
                            : 'white'
                    }}
                  >
                    {c}
                  </div>
                )) : (
                  <div style={{ padding: 8, color: '#9CA3AF' }}>No matches found</div>
                )}
              </div>
            )}
          </div>

          <button onClick={handleSearch} style={searchBtn}>
            <Search size={18} style={{ marginRight: 6 }} /> Search
          </button>
        </div>

        {/* APPROVAL TABLE */}
        {isSearched && (
          <>
            <div style={approvalWrap}>
              <table style={table}>
                <thead>
                  <tr style={approvalHead}>
                    {[
                      'Select', 'S/No', 'PI No', 'PI Date', 'Advance Receipt No',
                      'Advance Receipt Date', 'Advance Amount', 'Request Date',
                      'Customer Name', 'Sales Person', 'Status', 'Approval'
                    ].map(h => (
                      <th key={h} style={th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {approvalPaginated.length > 0 ? (
                    approvalPaginated.map((row, i) => (
                      <tr key={i} style={tr}>
                        <td style={td}>
                          <input
                            type="radio"
                            name="containerSelect"
                            checked={selectedRow === row.sNo}
                            onChange={() => setSelectedRow(row.sNo)}
                          />
                        </td>
                        <td style={td}>{approvalFirst + i + 1}</td>
                        <td style={td}>{row.piNo}</td>
                        <td style={td}>{row.piDate}</td>
                        <td style={td}>{row.receiptNo}</td>
                        <td style={td}>{row.receiptDate}</td>
                        <td style={td}>{row.amount}</td>
                        <td style={td}>{row.requestDate}</td>
                        <td style={td}>{row.customer}</td>
                        <td style={td}>{row.salesPerson}</td>
                        <td style={{ ...td, fontWeight: 600, color: row.status === 'Hold' ? '#f97316' : '#22c55e' }}>
                          {row.status}
                        </td>
                        <td style={td}>
                          {row.approvalStatus === 'approved' ? (
                            <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px' }}>
                              Approved
                            </span>
                          ) : row.approvalStatus === 'rejected' ? (
                            <span style={{ color: '#dc2626', fontWeight: '600', fontSize: '14px' }}>
                              Rejected
                            </span>
                          ) : (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <CheckCircle 
                                size={16} 
                                style={{ ...icon, color: '#16a34a' }} 
                                onClick={() => handleApprove(row.sNo)}
                              />
                              <XCircle 
                                size={16} 
                                style={{ ...icon, color: '#dc2626' }} 
                                onClick={() => handleReject(row.sNo)}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" style={{ ...td, textAlign: 'center', padding: '32px' }}>
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {approvalTotalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
                <button
                  disabled={approvalPage === 1}
                  onClick={() => setApprovalPage(p => p - 1)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    backgroundColor: approvalPage === 1 ? '#e5e7eb' : '#ffffff',
                    cursor: approvalPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft />
                </button>

                {Array.from({ length: approvalTotalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setApprovalPage(p)}
                    style={{
                      background: approvalPage === p ? '#A63128' : '#fff',
                      color: approvalPage === p ? '#fff' : '#000',
                      border: '1px solid #D1D5DB',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={approvalPage === approvalTotalPages}
                  onClick={() => setApprovalPage(p => p + 1)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    backgroundColor: approvalPage === approvalTotalPages ? '#e5e7eb' : '#ffffff',
                    cursor: approvalPage === approvalTotalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </>
        )}

        {/* CONTAINER LIST */}
        <h4 style={subTitle}>Container List</h4>

        <div style={tableWrap}>
          <table style={table}>
            <thead style={thead}>
              <tr>
                {[
                  'S/No', 'Container No', 'Party Name', 'Sz/Type',
                  'Liner', 'MFG Date', 'In Date', 'Delivery Date', 'Photo', 'Status'
                ].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {containerPaginated.map((row, i) => (
                <tr key={i} style={tr}>
                  <td style={td}>{row.sNo}</td>
                  <td style={td}>{row.containerNo}</td>
                  <td style={td}>{row.partyName}</td>
                  <td style={td}>{row.szType}</td>
                  <td style={td}>{row.liner}</td>
                  <td style={td}>{row.mfgDate}</td>
                  <td style={td}>{row.inDate}</td>
                  <td style={td}>{row.deliveryDate}</td>
                  <td style={td}>{row.photo}</td>
                  <td style={{ ...td, fontWeight: 600, color: row.status === 'Hold' ? '#f97316' : '#22c55e' }}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     </div>

      {containerTotalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
          <button
            disabled={containerPage === 1}
            onClick={() => setContainerPage(p => p - 1)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: containerPage === 1 ? '#e5e7eb' : '#ffffff',
              cursor: containerPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronLeft />
          </button>

          {Array.from({ length: containerTotalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setContainerPage(p)}
              style={{
                background: containerPage === p ? '#A63128' : '#fff',
                color: containerPage === p ? '#fff' : '#000',
                border: '1px solid #D1D5DB',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}

          <button
            disabled={containerPage === containerTotalPages}
            onClick={() => setContainerPage(p => p + 1)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: containerPage === containerTotalPages ? '#e5e7eb' : '#ffffff',
              cursor: containerPage === containerTotalPages ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronRight />
          </button>
        </div>
      )}

      <button
        onClick={handleBack}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer', marginTop: '12px' }}>
        <span>←</span>
        <span>Back</span>
      </button>
    </div>
  );
};

/* ===== STYLES ===== */

const page = { background: '#f6eaea', padding: 24 };
const card = { background: '#fff', padding: 20, borderRadius: 8, marginBottom: '10px' };
const title = { fontSize: 20, fontWeight: 600 };
const rowWrap = { display: 'flex', gap: 20, marginTop: 14, flexWrap: 'wrap' };

const fieldBox = {
  width: 255,
  height: 59,
  border: '1px solid #9CA3AF',
  borderRight: '3px solid #DC2626',
  borderRadius: 6,
  padding: '8px 12px',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const fieldLabel = { fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 4 };
const fieldInput = { border: 'none', outline: 'none', fontSize: 14 };

const dropdownMenu = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: 4,
  background: '#fff',
  border: '1px solid #d1d5db',
  borderRadius: 4,
  maxHeight: 200,
  overflowY: 'auto',
  zIndex: 1000
};

const dropdownItem = {
  padding: 8,
  cursor: 'pointer',
  fontSize: 14,
  borderBottom: '1px solid #e5e7eb'
};

const searchBtn = {
  background: '#a63128',
  color: '#fff',
  border: 'none',
  height: 50,
  width: 150,
  fontSize: 16,
  borderRadius: '15px',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 12,
  marginLeft: 30
};

const approvalWrap = { marginTop: 20, borderRadius: 8, overflow: 'hidden' };
const approvalHead = { background: '#fde2e2', fontSize: 14 };

const tableWrap = { border: '1px solid #9CA3AF', borderRadius: 6, marginTop: 10 };
const table = { width: '100%', borderCollapse: 'collapse', fontSize: 13 };
const thead = { background: '#fde2e2', fontSize: 16 };
const th = { padding: 10, textAlign: 'left', whiteSpace: 'nowrap' };
const tr = { borderBottom: '1px solid #e5e7eb' };
const td = { padding: 10 };
const subTitle = { marginTop: 24, fontWeight: 600, fontSize: 20 };

export default ContainerBlockRequestApprovalForm;
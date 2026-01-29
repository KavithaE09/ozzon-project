import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, ChevronDown, Printer, Edit2, Trash2, ChevronLeft,ChevronRight} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function QuotationSearchForm() {
  const navigate = useNavigate();
   const [customerName, setCustomerName] = useState('');
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [isSearched, setIsSearched] = useState(false);
  const [quotations, setQuotations] = useState([
    { id: 1, leadNo: 'L-1', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Raneesh', salesPerson: 'Raneesh', cost: 100000 },
    { id: 2, leadNo: 'L-2', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Vinoth', salesPerson: 'Raneesh', cost: 100000 },
    { id: 3, leadNo: 'L-3', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Raneesh', salesPerson: 'Raneesh', cost: 100000 },
    { id: 4, leadNo: 'L-4', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Vinoth', salesPerson: 'Raneesh', cost: 100000 },
    { id: 5, leadNo: 'L-5', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Raneesh', salesPerson: 'Raneesh', cost: 100000 },
    { id: 6, leadNo: 'L-6', leadDate: '2026-01-01', quotationNo: 'Q-1', date: '2026-01-01', customer: 'Vinoth', salesPerson: 'Raneesh', cost: 100000 }
  ]);

  const [filteredQuotations, setFilteredQuotations] = useState(quotations);
  const [editingId, setEditingId] = useState(null);
  
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [leadNo, setLeadNo] = useState('');
  const [leadDate, setLeadDate] = useState('');
  const [hoveredOption, setHoveredOption] = useState(null);
  
  const dropdownRef = useRef(null);

const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 5;

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const paginatedQuotations = filteredQuotations.slice(
  indexOfFirstRow,
  indexOfLastRow
);

const totalPages = Math.ceil(filteredQuotations.length / rowsPerPage);

  
  const [formData, setFormData] = useState({
    leadNo: '',
    leadDate: getTodayDate(),
    quotationNo: '',
    date: getTodayDate(),
    customer: '',
    salesPerson: '',
    cost: ''
  });

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

  // Filter customer options based on search term - only show names that START with the search term
  const filteredOptions = getUniqueCustomers().filter(option =>
    option.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSelectCustomer = (option) => {
    setCustomerFilter(option);
    setSearchTerm(option);
    setIsDropdownOpen(false);
    

  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
    if (e.target.value === '') {
      setCustomerFilter('');
    }
  };

  const searchQuotations = () => {
    let filtered = quotations;
    if (customerFilter) {
      filtered = filtered.filter(q => q.customer === customerFilter);
    }

    setFilteredQuotations(filtered);
    setIsSearched(true); 
      setCurrentPage(1); 
  };

  const handlePrint = (row) => {
  console.log("Printing:", row);
};

 const handleDelete = (id, e) => {
  e.stopPropagation();
  if (window.confirm("Delete this record?")) {
    setFilteredQuotations(prev =>
      prev.filter(item => item.id !== id)
    );
  }
};



  return (
   <div style={{ minHeight: '100vh', backgroundColor: '#F3E8E8', padding: '20px' }}>
      {/* Main Content */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#1F2937' }}>Quotation </h2>

        {/* Search Form - First Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
          <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626'}}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>From Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="01-01-2026"
              style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626'}}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>To Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="01-01-2026"
              style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div ref={dropdownRef} style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #22C55E', position: 'relative'}}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Customer Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Type or select..."
                style={{ 
                  width: '100%', 
                  padding: '1px 1px 1px 1px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontSize: '14px', 
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'text'
                }}
              />
              <ChevronDown 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  right: '4px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#000000',
                  pointerEvents: 'none'
                }} 
              />
            </div>
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                right: '0',
                marginTop: '4px',
                backgroundColor: 'white',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000
              }}>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectCustomer(option)}
                      onMouseEnter={() => setHoveredOption(option)}
                      onMouseLeave={() => setHoveredOption(null)}
                      style={{
                        padding: '8px 12px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              color: hoveredOption === option ? 'white' : '#374151',
                              backgroundColor: hoveredOption === option ? '#A63128' : (customerName === option ? '#FEE2E2' : 'white'),
                              borderBottom: index < filteredOptions.length - 1 ? '1px solid #E5E7EB' : 'none',
                              transition: 'all 0.2s ease'
                      }}
                    >
                      {option}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>
                    No matches found
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button 
              onClick={searchQuotations}
              style={{ 
                width: '150px',
                height:'50px',
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
              }}
            >
              <Search size={18} /> Search
            </button>
          </div>
        </div>

        {/* Search Form - Second Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626'}}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Lead No</label>
            <input
              type="text"
              value={leadNo}
              onChange={(e) => setLeadNo(e.target.value)}
              placeholder="12456"
              style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          
          <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626'}}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Lead Date</label>
            <input
              type="date"
              value={formData.leadDate}
              onChange={(e) => setLeadDate(e.target.value)}
              placeholder="01-01-2026"
              style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div></div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button  onClick={() => navigate(`/layout/Quotation/Quotation`)}


              style={{ 
                width: '150px',
                height:'50px',
                padding: '10px 24px', 
                backgroundColor: '#A63128', 
                color: 'white', 
                borderRadius: '15px', 
                fontSize: '15px', 
                fontWeight: '500', 
                border: 'none', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Plus size={18} /> Quotation
            </button>
          </div>
        </div>

        {isSearched && filteredQuotations.length > 0 && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1F2937' }}>Quotation List</h3>
            
            <div style={{ overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px' }}>
              <table style={{ 
                width: '100%',
                borderCollapse: 'collapse', 
                fontSize: '13px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>S/No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>Lead No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>Lead Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>Quotation No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>Quotation Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>Customer Name</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>Sales Person</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>Total Cost</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>Proforma Invoice</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', fontSize: '16px', fontWeight: '600', color: '#000000', borderBottom: '2px solid #E5E7EB' }}>Edit</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedQuotations.map((q, index) => (

                    <tr key={q.id} style={{ backgroundColor: 'white' }}>
                      <td style={{ padding: '12px 8px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{indexOfFirstRow + index + 1}.</td>
                      <td style={{ padding: '12px 8px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{q.leadNo}</td>
                      <td style={{ padding: '12px 8px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{formatDate(q.leadDate)}</td>
                      <td style={{ padding: '12px 8px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{q.quotationNo}</td>
                      <td style={{ padding: '12px 8px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{formatDate(q.date)}</td>
                      <td style={{ padding: '12px 8px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{q.customer}</td>
                      <td style={{ padding: '12px 8px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{q.salesPerson}</td>
                      <td style={{ padding: '12px 8px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{formatCurrency(q.cost)}</td>
                      <td style={{ padding: '12px 8px', borderBottom: '1px solid #E5E7EB', textAlign: 'center' }}>
                        <button 
                          onClick={() => navigate("/layout/quotation/proformainvoice")}
                          style={{ 
                            padding: '6px 16px', 
                            backgroundColor: '#00BCD4', 
                            color: 'white', 
                            borderRadius: '4px', 
                            fontSize: '12px', 
                            fontWeight: '500', 
                            border: 'none', 
                            cursor: 'pointer'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#00ACC1'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#00BCD4'}
                        >
                          Proforma Invoice
                        </button>
                      </td>
                     <td style={{ padding: '14px 8px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                              <button
                               onClick={() => handlePrint(q)}

                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                title="Print"
                              >
                                <Printer size={18} style={{ color: '#374151' }} />
                              </button>
                              
                              <button
                                onClick={() => navigate("/layout/Quotation/Quotation")}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                title="Edit"
                              >
                                <Edit2 size={18} style={{ color: '#374151' }} />
                              </button>
                              
                              <button
                                onClick={(e) => handleDelete(q.id, e)}

                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                title="Delete"
                              >
                                <Trash2 size={18} style={{ color: '#dc2626' }} />
                              </button>
                            </div>
                          </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {isSearched && totalPages > 1 && (
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

      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', maxWidth: '1250px' }}>
        <button 
          onClick={() =>  navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PartyAdvanceForm = () => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    date: getTodayDate(),
    voucherNo: '01',
    amount: '27436',
    creditAC: '',
    debitAC: '',
    remarks: 'Nathan',
    quotationDate: getTodayDate(),
    piDate: getTodayDate(),
    jobOrderNo: ''
  });

  const navigate = useNavigate();

  // Dropdown states for Credit A/C
  const [creditSearchTerm, setCreditSearchTerm] = useState('');
  const [isCreditDropdownOpen, setIsCreditDropdownOpen] = useState(false);
  const [hoveredCredit, setHoveredCredit] = useState(null);
  const creditDropdownRef = useRef(null);

  // Dropdown states for Debit A/C
  const [debitSearchTerm, setDebitSearchTerm] = useState('');
  const [isDebitDropdownOpen, setIsDebitDropdownOpen] = useState(false);
  const [hoveredDebit, setHoveredDebit] = useState(null);
  const debitDropdownRef = useRef(null);

  const quotationNo = '887755';
  const piNo = '8844775';

  // Account options (sorted alphabetically)
  const accountOptions = [
    '88447755127436',
    '88447755127437',
    '88447755127438',
    '88447755127439',
    '88447755127440',
    'AC001234567',
    'AC009876543',
    'AC005555555'
  ].sort();

  const containerData = [
    {
      sNo: 1,
      containerNo: 'TCKU 1524662',
      partyName: 'Christine Brooks',
      szType: '20"',
      liner: 'Global',
      mfgDate: '04-09-2019',
      inDate: '04-09-2019',
      deliveryDate: '04-09-2019',
      status: 'Hold'
    },
    {
      sNo: 2,
      containerNo: 'TCKU 1524662',
      partyName: 'Rosie Pearson',
      szType: '20"',
      liner: 'Global',
      mfgDate: '04 Sep 2019',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      status: 'Available'
    }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (creditDropdownRef.current && !creditDropdownRef.current.contains(event.target)) {
        setIsCreditDropdownOpen(false);
      }
      if (debitDropdownRef.current && !debitDropdownRef.current.contains(event.target)) {
        setIsDebitDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options for Credit A/C
  const filteredCreditOptions = accountOptions.filter(option =>
    option.toLowerCase().startsWith(creditSearchTerm.toLowerCase())
  );

  // Filter options for Debit A/C
  const filteredDebitOptions = accountOptions.filter(option =>
    option.toLowerCase().startsWith(debitSearchTerm.toLowerCase())
  );

  const handleCreditSelect = (option) => {
    setFormData({ ...formData, creditAC: option });
    setCreditSearchTerm(option);
    setIsCreditDropdownOpen(false);
  };

  const handleCreditInputChange = (e) => {
    setCreditSearchTerm(e.target.value);
    setIsCreditDropdownOpen(true);
    if (e.target.value === '') {
      setFormData({ ...formData, creditAC: '' });
    }
  };

  const handleDebitSelect = (option) => {
    setFormData({ ...formData, debitAC: option });
    setDebitSearchTerm(option);
    setIsDebitDropdownOpen(false);
  };

  const handleDebitInputChange = (e) => {
    setDebitSearchTerm(e.target.value);
    setIsDebitDropdownOpen(true);
    if (e.target.value === '') {
      setFormData({ ...formData, debitAC: '' });
    }
  };

  const handleChange = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

  const handleNavigate = (path) => {
    alert(`Navigate to: ${path}`);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Party Advance</h2>

            {/* MAIN INPUTS - First Row: 4 fields - Responsive */}
            <div className="flex flex-col md:flex-row gap-5 mt-6">
              <FloatingInput
                label="Date"
                type="date"
                value={formData.date}
                onChange={handleChange('date')}
              />
              
              <FloatingInput
                label="Voucher No"
                value={formData.voucherNo}
                onChange={handleChange('voucherNo')}
                borderColor="blue"
              />

              <FloatingInput
                label="Amount"
                value={formData.amount}
                onChange={handleChange('amount')}
              />

              {/* Credit A/C Dropdown */}
              <DropdownField
                ref={creditDropdownRef}
                label="Credit A/C"
                searchTerm={creditSearchTerm}
                onInputChange={handleCreditInputChange}
                isOpen={isCreditDropdownOpen}
                onFocus={() => setIsCreditDropdownOpen(true)}
                filteredOptions={filteredCreditOptions}
                selectedValue={formData.creditAC}
                onSelect={handleCreditSelect}
                hoveredValue={hoveredCredit}
                setHoveredValue={setHoveredCredit}
              />
            </div>

            {/* Second Row: 2 fields - Responsive */}
            <div className="flex flex-col md:flex-row gap-5 mt-5">
              {/* Debit A/C Dropdown */}
              <DropdownField
                ref={debitDropdownRef}
                label="Debit A/C"
                searchTerm={debitSearchTerm}
                onInputChange={handleDebitInputChange}
                isOpen={isDebitDropdownOpen}
                onFocus={() => setIsDebitDropdownOpen(true)}
                filteredOptions={filteredDebitOptions}
                selectedValue={formData.debitAC}
                onSelect={handleDebitSelect}
                hoveredValue={hoveredDebit}
                setHoveredValue={setHoveredDebit}
              />

              <FloatingInput
                label="Remarks"
                value={formData.remarks}
                onChange={handleChange('remarks')}
                multiline
                width={535}
              />
            </div>

            {/* QUOTATION + PI SECTION - Both on Left, Stacked on Mobile */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8">
              {/* LEFT – QUOTATION */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <DisplayBox label="Quotation No" value={quotationNo} />
                  <FloatingInput
                    label="Quotation Date"
                    type="date"
                    value={formData.quotationDate}
                    onChange={handleChange('quotationDate')}
                  />
                </div>
                <button className="btn-smallbtn w-full sm:w-[100px] h-[50px]">Open</button>
              </div>

              {/* LEFT – PI */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <DisplayBox label="PI No" value={piNo} />
                  <FloatingInput
                    label="PI Date"
                    type="date"
                    value={formData.piDate}
                    onChange={handleChange('piDate')}
                  />
                </div>
                <button className="btn-smallbtn w-full sm:w-[100px] h-[50px]">Open</button>
              </div>
            </div>

            {/* CONTAINER LIST */}
            <h3 className="section-title mt-8">Container List</h3>

            <div className="table-container overflow-x-auto">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    {[
                      'Select', 'S/No', 'Container No', 'Party Name', 'Sz/Type',
                      'Liner', 'MFG Date', 'In Date', 'Delivery Date', 'Status'
                    ].map(h => (
                      <th key={h} className="table-th">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {containerData.map((row, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-cell">
                        <input type="checkbox" className="accent-primary" />
                      </td>
                      <td className="table-cell">{row.sNo}</td>
                      <td className="table-cell">{row.containerNo}</td>
                      <td className="table-cell">{row.partyName}</td>
                      <td className="table-cell">{row.szType}</td>
                      <td className="table-cell">{row.liner}</td>
                      <td className="table-cell">{row.mfgDate}</td>
                      <td className="table-cell">{row.inDate}</td>
                      <td className="table-cell">{row.deliveryDate}</td>
                      <td className="table-cell">
                        <span className={row.status === 'Hold' ? 'text-orange-500 font-semibold' : 'text-green-500 font-semibold'}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-end gap-4 mt-8">
              <FloatingInput
                label="Job Order No"
                value={formData.jobOrderNo}
                onChange={handleChange('jobOrderNo')}
                width={320}
              />

              <button
                onClick={() => handleNavigate("/proformainvoice/advance/submit")}
                className="btn-search w-full sm:w-auto"
              >
                <span>✓</span> Submit
              </button>
            </div>

            <button onClick={() => navigate(-1)} className="btn-back">
              <span>←</span>
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingInput = ({
  label,
  value,
  onChange,
  type = 'text',
  width = 255,
  multiline = false,
  borderColor = 'red'
}) => {
  const borderClass = borderColor === 'blue' ? 'filter-grid-blue' : 'filter-grid-red';
  const widthClass = width === 255 
    ? 'w-full md:w-[255px]' 
    : width === 320 
    ? 'w-full sm:w-[320px]' 
    : width === 535 
    ? 'w-full md:w-[535px]' 
    : '';
  
  return (
    <div className={`${borderClass} ${widthClass}`}>
      <label className="filter-label text-sm mb-1.5">
        {label}
      </label>

      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={1}
          className="multiline-field"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="filter-input pt-[22px] text-sm"
        />
      )}
    </div>
  );
};

const DropdownField = React.forwardRef(({
  label,
  searchTerm,
  onInputChange,
  isOpen,
  onFocus,
  filteredOptions,
  selectedValue,
  onSelect,
  hoveredValue,
  setHoveredValue
}, ref) => (
  <div 
    ref={ref} 
    className="filter-grid-red dropdown-wrapper w-full md:w-[255px]" 
    style={{ zIndex: isOpen ? 1001 : 1 }}
  >
    <label className="filter-label text-sm mb-1.5">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={onInputChange}
        onFocus={onFocus}
        placeholder="Type or select..."
        className="dropdown-input filter-input cursor-text pr-[30px]"
      />
      <ChevronDown size={16} className="dropdown-icon" />
    </div>
    {isOpen && (
      <div className="dropdown-menu">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => onSelect(option)}
              onMouseEnter={() => setHoveredValue(option)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`dropdown-item-option ${
                hoveredValue === option 
                  ? 'dropdown-item-hovered' 
                  : selectedValue === option 
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
));

DropdownField.displayName = 'DropdownField';

const DisplayBox = ({ label, value }) => (
  <div className="filter-grid-red w-full md:w-[255px]">
    <label className="filter-label text-sm mb-1.5">{label}</label>
    <div className="text-sm font-semibold pt-[3px]">{value}</div>
  </div>
);

export default PartyAdvanceForm;
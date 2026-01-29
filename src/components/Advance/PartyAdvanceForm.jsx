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
    narration: 'Nathan',
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

  const handleBack = () => {
    alert('Going back...');
  };

  return (
    <div style={page}>
      <div style={card}>
        <h3 style={title}>Party Advance</h3>

        {/* 🔴 MAIN INPUTS */}
        <div style={grid3}>
          <Field label="Date" type="date" value={formData.date} onChange={handleChange('date')} />
          <Field
            label="Voucher No"
            value={formData.voucherNo}
            onChange={handleChange('voucherNo')}
            borderRightColor="#2c1eed"
          />

          <Field label="Amount" value={formData.amount} onChange={handleChange('amount')} />

          {/* Credit A/C Dropdown */}
          <DropdownField
            label="Credit A/C"
            searchTerm={creditSearchTerm}
            onInputChange={handleCreditInputChange}
            isOpen={isCreditDropdownOpen}
            onFocus={() => setIsCreditDropdownOpen(true)}
            filteredOptions={filteredCreditOptions}
            selectedValue={formData.creditAC}
            onSelect={handleCreditSelect}
            dropdownRef={creditDropdownRef}
            hoveredValue={hoveredCredit}
            setHoveredValue={setHoveredCredit}
          />

          {/* Debit A/C Dropdown */}
          <DropdownField
            label="Debit A/C"
            searchTerm={debitSearchTerm}
            onInputChange={handleDebitInputChange}
            isOpen={isDebitDropdownOpen}
            onFocus={() => setIsDebitDropdownOpen(true)}
            filteredOptions={filteredDebitOptions}
            selectedValue={formData.debitAC}
            onSelect={handleDebitSelect}
            dropdownRef={debitDropdownRef}
            hoveredValue={hoveredDebit}
            setHoveredValue={setHoveredDebit}
          />

          <TextAreaField label="Narration" value={formData.narration} onChange={handleChange('narration')} />
        </div>

        {/* 🔵 QUOTATION + PI SECTION (FIGMA STYLE) */}
        <div style={qpRow}>
          {/* LEFT – QUOTATION */}
          <div style={qpCol}>
            <DisplayBox label="Quotation No" value={quotationNo} />
            <Field
              label="Quotation Date"
              type="date"
              value={formData.quotationDate}
              onChange={handleChange('quotationDate')}
            />
          </div>

          <button style={openBtn}>Open</button>

          {/* RIGHT – PI */}
          <div style={qpCol}>
            <DisplayBox label="PI No" value={piNo} />
            <Field
              label="PI Date"
              type="date"
              value={formData.piDate}
              onChange={handleChange('piDate')}
            />
          </div>

          <button style={openBtn}>Open</button>
        </div>

        {/* CONTAINER LIST */}
        <h4 style={subTitle}>Container List</h4>

        <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #d1d5db' }}>
          <table style={table}>
            <thead>
              <tr style={{ ...thead, backgroundColor: '#fde2e2' }}>
                {[
                  'Select', 'S/No', 'Container No', 'Party Name', 'Sz/Type',
                  'Liner', 'MFG Date', 'In Date', 'Delivery Date', 'Status'
                ].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {containerData.map((row, i) => (
                <tr key={i} style={tr}>
                  <td style={td}><input type="checkbox" /></td>
                  <td style={td}>{row.sNo}</td>
                  <td style={td}>{row.containerNo}</td>
                  <td style={td}>{row.partyName}</td>
                  <td style={td}>{row.szType}</td>
                  <td style={td}>{row.liner}</td>
                  <td style={td}>{row.mfgDate}</td>
                  <td style={td}>{row.inDate}</td>
                  <td style={td}>{row.deliveryDate}</td>
                  <td style={{
                    ...td,
                    fontWeight: 600,
                    color: row.status === 'Hold' ? '#f97316' : '#22c55e'
                  }}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: 16,
            marginTop: 32
          }}
        >
          <div style={{ width: 320 }}>
            <div
              style={{
                position: "relative",
                border: "1px solid #9CA3AF",
                borderRight: "3px solid #2c1eed",
                borderRadius: 6,
                height: 50,
                width: 255,
                padding: "18px 14px 8px"
              }}
            >
              {/* Inside Label */}
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  left: 14,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1f2937"
                }}
              >
                Job Order No
              </span>

              {/* Input */}
              <input
                type="text"
                value={formData.jobOrderNo}
                onChange={(e) =>
                  setFormData({ ...formData, jobOrderNo: e.target.value })
                }
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  fontSize: 16,
                  marginTop: 12,
                  background: "transparent"
                }}
              />
            </div>
          </div>


          {/* Submit Button */}
          <button
            onClick={() => handleNavigate("/proformainvoice/advance/submit")}
            style={{
              ...submitBtn,
              height: 52,                  // 🔥 input height match
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <span>✓</span> Submit
          </button>
        </div>

      </div>
      <button
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
        <span>←</span>
        <span>Back</span>
      </button>
    </div>
  );
};

const Field = ({ label, value, onChange, type = 'text', borderRightColor }) => (
  <div
    style={{
      ...fieldBox,
      borderRight: `3px solid ${borderRightColor || '#DC2626'}`
    }}
  >
    <label style={fieldLabel}>{label}</label>
    <input type={type} value={value} onChange={onChange} style={fieldInput} />
  </div>
);

/* 🔹 TEXTAREA FIELD */
const TextAreaField = ({ label, value, onChange }) => (
  <div style={fieldBox}>
    <label style={fieldLabel}>{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      rows="1"
      style={{
        ...fieldInput,
        fontFamily: 'inherit',
        resize: 'none',
        overflow: 'hidden',
        minHeight: '20px'
      }}
    />
  </div>
);

/* 🔹 DROPDOWN FIELD */
const DropdownField = ({
  label,
  searchTerm,
  onInputChange,
  isOpen,
  onFocus,
  filteredOptions,
  selectedValue,
  onSelect,
  dropdownRef,
  hoveredValue,
  setHoveredValue
}) => (
  <div ref={dropdownRef} style={{ ...fieldBox, position: 'relative' }}>
    <label style={fieldLabel}>{label}</label>
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={onInputChange}
        onFocus={onFocus}
        placeholder="Type or select..."
        style={{ ...fieldInput, paddingRight: 24 }}
      />
      <ChevronDown
        size={16}
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
    {isOpen && (
      <div style={dropdownMenu}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => onSelect(option)}
              onMouseEnter={() => setHoveredValue(option)}
              onMouseLeave={() => setHoveredValue(null)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '14px',
                color: hoveredValue === option ? 'white' : '#374151',
                backgroundColor: hoveredValue === option ? '#A63128' : selectedValue === option ? '#FEE2E2' : 'white',
                borderBottom: index < filteredOptions.length - 1 ? '1px solid #E5E7EB' : 'none'
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
);

const DisplayBox = ({ label, value }) => (
  <div style={fieldBox}>
    <label style={fieldLabel}>{label}</label>
    <div style={displayValue}>{value}</div>
  </div>
);

/* 🔹 STYLES */
const page = { background: '#f6eaea', padding: 24, minHeight: '100vh' };
const card = { background: '#fff', padding: 20, borderRadius: 8, marginBottom: 10 };
const title = { fontSize: 20, fontWeight: 600 };
const grid3 = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 62, marginBottom: 4 };
const qpRow = { display: 'grid', gridTemplateColumns: '1fr auto 1fr auto', gap: 16, marginTop: 30, alignItems: 'end' };
const qpCol = { display: 'flex', flexDirection: 'column', gap: 11 };
const fieldBox = { backgroundColor: '#fff', padding: '12px', borderRadius: 4, border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' };
const fieldLabel = { fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' };

const fieldInput = {
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: 14,
  background: 'transparent'
};

const displayValue = {
  fontSize: 14,
  fontWeight: 600,
  color: '#111827'
};

const dropdownMenu = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  backgroundColor: 'white',
  border: '1px solid #D1D5DB',
  borderRadius: '4px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: 1000
};

const openBtn = {
  height: '42px',
  marginBottom: '2px',
  background: '#a63128',
  color: '#fff',
  padding: '0 20px',
  borderRadius: 4.94,
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  border: 'none'
};

const subTitle = { marginTop: 22, fontWeight: 600 };

const tableWrap = { border: '1px solid #9CA3AF', borderRadius: 6, marginTop: 10, overflowX: 'auto' };
const table = { width: '100%', borderCollapse: 'collapse', fontSize: 13 };
const thead = { background: '#f3f4f6' };
const th = { padding: 12, textAlign: 'left' };
const tr = { borderBottom: '1px solid #e5e7eb' };
const td = { padding: 12 };

const submitBtn = {
  width: '150px',
  height: '50px',
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
};

export default PartyAdvanceForm;
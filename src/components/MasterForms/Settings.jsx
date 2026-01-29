import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Settings() {
  const navigate = useNavigate();

  /* ===== BANK DETAILS ===== */
  const [bankDetails, setBankDetails] = useState([
    { label: 'BANK NAME', value: 'ICICI BANK' },
    { label: 'BRANCH', value: 'KURINJI NAGAR' },
    { label: 'A/C NO', value: '254005005364' },
    { label: 'IFSC', value: 'ICIC0002540' },
    { label: 'GSTIN No.', value: '33AFLPV1525R1ZT' },
    { label: 'PAN No.', value: 'AFLPV1525R' }
  ]);

  /* ===== PREFIX DETAILS ===== */
  const [financialYear, setFinancialYear] = useState('25-26');
  const [quotationPrefix, setQuotationPrefix] = useState('OQ');
  const [proformaPrefix, setProformaPrefix] = useState('Raneesh');
  const [invoicePrefix, setInvoicePrefix] = useState('Raneesh');

  const [container, setContainer] = useState('1');
  const [containerblock, setContainerblock] = useState('1');
  const [containerfabric, setContainerfabric] = useState('1');

  const terms = `1. This rate is valid for 2 weeks from the quotation date.
2. Delivery: Fabrication will take a minimum of 21 days to complete.
3. Payment Mode: 60% in advance & balance 40% on completion and before loading.
4. Transportation & Unloading: To be arranged by the customer at site.
5. Buy Back: Seller has a buy-back policy once the container is used.
6. Warranty: Six months from the date of delivery.
7. Transit Insurance: Transit insurance can be arranged on request and will be billed separately.`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={contentWrapper}>
        <div style={cardStyle}>

          <h3 style={{ fontSize: 20, marginBottom: 12 }}>Settings</h3>

          {/* ===== TOP SECTION ===== */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>

            {/* ===== BANK DETAILS ===== */}
            <div style={{ ...boxStyle, flex: 1.4 }}>
              <Label>Bank Details</Label>

              <div style={bankTextWrapper}>
                {bankDetails.map((item, i) => (
                  <div key={i} style={bankTextRow}>
                    <span style={bankTextLabel}>{item.label}</span>
                    <span style={bankTextColon}>:</span>
                    <input
                      value={item.value}
                      onChange={(e) => {
                        const updated = [...bankDetails];
                        updated[i].value = e.target.value;
                        setBankDetails(updated);
                      }}
                      style={bankInlineInput}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ===== RIGHT SIDE INPUTS ===== */}
            <div style={rightGrid}>
              <FloatingInput label="Financial Year" value={financialYear} setValue={setFinancialYear} />
              <FloatingInput label="Quotation Prefix" value={quotationPrefix} setValue={setQuotationPrefix} />
              <FloatingInput label="Proforma Invoice Prefix" value={proformaPrefix} setValue={setProformaPrefix} />
              <FloatingInput label="Invoice Prefix" value={invoicePrefix} setValue={setInvoicePrefix} />
            </div>
          </div>

          {/* ===== TERMS ===== */}
          <div style={{ ...boxStyle, marginBottom: 20 }}>
            <Label>Terms And Conditions</Label>
            <div style={termsBox}>{terms}</div>
          </div>

          {/* ===== IMAGE UPLOAD + CONTAINER FIELDS ===== */}
          <div style={boxStyle}>
            <Label>Logo Upload</Label>

            <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
              <UploadField label="Company Logo" />
              <UploadField label="Authorized Sign" />
            </div>

            {/* 🔥 ONLY CHANGE HERE */}
            <div style={containerRowGrid}>
              <FloatingInput label="Container Hold Hours" value={container} setValue={setContainer} />
              <FloatingInput label="Container Block Days for Empty" value={containerblock} setValue={setContainerblock} />
              <FloatingInput label="Container Block Days for Fabric" value={containerfabric} setValue={setContainerfabric} />
            </div>
          </div>

          {/* ===== SAVE BUTTON ===== */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <button style={saveButton}>Save</button>
          </div>

        </div>
        <button 
            onClick={() => navigate(-1)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 20px', 
              fontSize: '13px', 
              fontWeight: '500', 
              color: '#B91C1C', 
              border: '2px solid #B91C1C', 
              borderRadius: '4px', 
              backgroundColor: 'white', 
              cursor: 'pointer' 
            }}
          >
            <span>←</span>
            <span>Back</span>
          </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const FloatingInput = ({ label, value, setValue }) => (
  <div style={floatingWrapper}>
    <span style={floatingLabel}>{label}</span>
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      style={floatingInput}
    />
  </div>
);

const Label = ({ children }) => (
  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
    {children}
  </div>
);

const UploadField = ({ label }) => (
  <div style={{ flex: 1 }}>
    <Label>{label}</Label>
    <input type="file" style={fileInput} />
  </div>
);

/* ================= STYLES ================= */

const contentWrapper = {
  flex: 1,
  marginBottom:10,
  background: '#f5e6e8',
  padding: 20,
  overflowY: 'auto'
};

const cardStyle = {
  background: '#fff',
  borderRadius: 8,
  padding: 18,
  marginBottom:10
};

const boxStyle = {
  border: '1px solid #e5e7eb',
  fontSize:16,
  borderRadius: 6,
  padding: 14
};

/* BANK */
const bankTextWrapper = { display: 'grid', gap: 6 };
const bankTextRow = { display: 'flex', alignItems: 'center', fontSize: 14 };
const bankTextLabel = { width: 120, fontWeight: 500 };
const bankTextColon = { width: 10 };

const bankInlineInput = {
  border: 'none',
  outline: 'none',
  fontSize: 14,
  width: '100%',
  background: 'transparent'
};

/* RIGHT GRID */
const rightGrid = {
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16
};

/* 🔥 CONTAINER ROW GRID (NEW) */
const containerRowGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 255px)',
  gap: 70
};

/* FLOATING INPUT */
const floatingWrapper = {
  width: 255,
  height: 59,
  border: '1px solid #d1d5db',
  borderRadius: 6,
  padding: '8px 10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const floatingLabel = {
  fontSize: 16,
  fontWeight:'700',
  color: '#374151',

  marginBottom: 4
};

const floatingInput = {
  border: 'none',
  outline: 'none',
  fontSize: 14
};

const termsBox = {
  border: '1px solid #d1d5db',
  borderRadius: 6,
  padding: 12,
  fontSize: 14,
  whiteSpace: 'pre-line',
  background: '#f9fafb'
};

const fileInput = {
  width: '100%',
  border: '1px solid #d1d5db',
  borderRadius: 6,
  padding: 8
};

const saveButton = {
  background: '#7f1d1d',
  color: '#fff',
  border: 'none',
  padding: '10px 32px',
  borderRadius: 6,
  cursor: 'pointer'
};
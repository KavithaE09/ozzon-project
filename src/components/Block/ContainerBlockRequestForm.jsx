import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContainerBlockRequestForm = () => {
  const navigate = useNavigate();
   const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [formData, setFormData] = useState({
    requestNo: 'R-1',
    requestDate: getTodayDate(),
    proformaInvoiceNo: 'PI-1',
    proformaInvoiceDate: getTodayDate(),
    customerName: 'Kavitha',
    proformaInvoiceCost: '25000',
    containerNo: ''
  });

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
    },
     {
      sNo: 3,
      containerNo: 'ABCD',
      partyName: 'Rosie Pearson',
      szType: '20"',
      liner: 'Global',
      mfgDate: '04 Sep 2019',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      status: 'Available'
    },
  ];
    const [filteredContainers, setFilteredContainers] = useState(containerData);
    const handleSearch = () => {
    if (formData.containerNo.trim() === '') {
      setFilteredContainers(containerData);
    } else {
      const searchTerm = formData.containerNo.toLowerCase();
      const filtered = containerData.filter(container =>
        container.containerNo.toLowerCase().includes(searchTerm)
      );
      setFilteredContainers(filtered);
    }
  };

  const handleChange = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={page}>
      <div style={card}>
        <h3 style={title}>Container Block Request</h3>

        {/* 🔹 ROW 1 – 2 BOXES */}
        <div style={row2}>
          <Field
            label="Request No"
            value={formData.requestNo}
            onChange={handleChange('requestNo')}
          />
          <Field
            label="Request Date"
            type="date"
            value={formData.requestDate}
            onChange={handleChange('requestDate')}
          />
        </div>

        {/* 🔹 ROW 2 – 4 BOXES */}
        <div style={row4}>
          <Field
            label="Proforma Invoice No"
            value={formData.proformaInvoiceNo}
            onChange={handleChange('proformaInvoiceNo')}
          />
          <Field
            label="Proforma Invoice Date"
            type="date"
            value={formData.proformaInvoiceDate}
            onChange={handleChange('proformaInvoiceDate')}
          />
          <Field
            label="Customer Name"
            value={formData.customerName}
            onChange={handleChange('customerName')}
          />
          <Field
            label="Proforma Invoice Cost"
            value={formData.proformaInvoiceCost}
            onChange={handleChange('proformaInvoiceCost')}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {/* Container No */}
              <div style={{ width: 255,
  height: 59,backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #22C55E' }}>
                <label htmlFor="containerNo" style={{ display: 'block', fontSize: '16px',  color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Container No</label>
                <input
                  type="text"
                  id="containerNo"
                  name="containerNo"
                  value={formData.containerNo}
                  onChange={handleInputChange}
                  placeholder="Enter container number..."
                  title="Container Number"
                  aria-label="Container Number"
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div></div>
              <div></div>

              {/* Search Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'28px' }}>
                <button
                  onClick={handleSearch}
                  type="button"
                  aria-label="Search containers"
                  style={{
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
                  }}
                >
                  <Search size={18} /> Search
                </button>
              </div>
            </div>


        {/* 🔹 CONTAINER LIST */}
        <h4 style={subTitle}>Container List</h4>

        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr style={thead}>
                {[
                  'Select','S/No','Container No','Party Name','Sz/Type',
                  'Liner','MFG Date','In Date','Delivery Date','Status'
                ].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredContainers.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{...td, textAlign: 'center', color: '#6b7280', padding: '40px'}}>
                    No containers found
                  </td>
                </tr>
              ) : (
                filteredContainers.map((row, i) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>

        <div  style={{ display: "flex", justifyContent: "flex-end", marginTop: 28}}>
          <button onClick={() => navigate("/proformainvoice/block/submit")}
          
          style={submitBtn}>
             <span>   ✓ </span>
            Submit</button>
        </div>
      </div>
       <button 
              onClick={() => navigate(-1)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}
            >
              <span>←</span>
              <span>Back</span>
            </button>
    </div>
  );
};

/* 🔹 INPUT FIELD – 255 × 59 */
const Field = ({ label, value, onChange, type = 'text' }) => (
  <div style={fieldBox}>
    <label style={fieldLabel}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={fieldInput}
    />
  </div>
);

/* 🔹 STYLES */
const page = { background: '#f6eaea', padding: 24 };
const card = { background: '#fff', padding: 20, borderRadius: 8,marginBottom:10 };
const title = { fontSize: 20, fontWeight: 600 };

const row2 = {
  display: 'flex',
  gap: 20,
  marginTop: 14,
};

const row4 = {
  display: 'flex',
  gap: 20,
  marginTop: 14,
  flexWrap: 'wrap',
  marginBottom:10
};

const fieldBox = {
  width: 255,
  height: 59,
  border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626',
  borderRadius: 4.94,
  padding: '8px 10px',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const fieldLabel = {
  fontSize: 16,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 4
};

const fieldInput = {
  border: 'none',
  outline: 'none',
  fontSize: 14,
  background: 'transparent'
};

const subTitle = { marginTop: 24, fontWeight: 600,fontSize: 20 };

const tableWrap = { border: '1px solid #9CA3AF', borderRadius: 6, marginTop: 10 };
const table = { width: '100%', borderCollapse: 'collapse', fontSize: 16 };
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

export default ContainerBlockRequestForm;

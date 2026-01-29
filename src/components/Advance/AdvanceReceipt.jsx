import React, { useState } from 'react';
import { Search, Printer } from 'lucide-react';
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

  const [fromDate, setFromDate] = useState(getTodayDate());
  const [toDate, setToDate] = useState(getTodayDate());
  const [customer, setCustomer] = useState('');
  const [filteredData, setFilteredData] = useState([]); 
  const [isSearched, setIsSearched] = useState(false);

  const tableData = [
    { id: 1, qno: 'Q-1', date: '20-12-25', customer: 'Leyo', sales: 'Raneesh', amount: '₹ 10,00,000' },
    { id: 2, qno: 'Q-1', date: '20-12-25', customer: 'Whiteson', sales: 'Raneesh', amount: '₹ 10,00,000' },
    { id: 3, qno: 'Q-1', date: '20-12-25', customer: 'Kavi', sales: 'Raneesh', amount: '₹ 10,00,000' },
    { id: 4, qno: 'Q-1', date: '20-12-25', customer: 'Kavitha', sales: 'Raneesh', amount: '₹ 10,00,000' },
  ];

  const handleSearch = () => {
    setIsSearched(true);
    
    let results = [...tableData];
    
    // Filter by customer name if selected
    if (customer) {
      results = results.filter(
        row => row.customer.toLowerCase() === customer.toLowerCase()
      );
    }

    setFilteredData(results);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '24px', background: '#f5e6e8' }}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '24px',marginBottom:'10px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Advance Receipt</h3>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-end' }}>
              <div style={fieldBox}>
                <label style={label}>From Date</label>
                <input 
                  type="date" 
                  value={fromDate} 
                  onChange={e => setFromDate(e.target.value)} 
                  style={input}
                />
              </div>

              <div style={fieldBox}>
                <label style={label}>To Date</label>
                <input 
                  type="date" 
                  value={toDate} 
                  onChange={e => setToDate(e.target.value)} 
                  style={input}
                />
              </div>

              <div style={customBox}>
                <label style={label}>Customer Name</label>
                <select
                  style={input}
                  value={customer}
                  onChange={e => setCustomer(e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Kavi</option>
                  <option>Kavitha</option>
                  <option>Leyo</option>
                  <option>Whiteson</option>
                  <option>Sasikala</option>
                  <option>Varshini</option>
                </select>
              </div>

              <button style={searchBtn} onClick={handleSearch}>
                <Search size={18} style={{ marginRight: '6px' }}/> Search
              </button>
            </div>

            {/* Table - Only show after search */}
            {isSearched && (
              <div style={{ border: '1px solid #9ca3af', borderRadius: '8px', marginTop: '100px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f9fafb' }}>
                    <tr>
                      {['Sl No', 'Quotation No', 'Quotation Date', 'Customer Name', 'Sales Person', 'Total Cost', 'Action']
                        .map(h => <th key={h} style={th}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map(row => (
                        <tr key={row.id}>
                          <td style={td}>{row.id}</td>
                          <td style={td}>{row.qno}</td>
                          <td style={td}>{row.date}</td>
                          <td style={td}>{row.customer}</td>
                          <td style={td}>{row.sales}</td>
                          <td style={td}>{row.amount}</td>
                          <td style={td}>
                            <div style={{ display: 'flex', gap: 10 }}>
                              <Printer size={18} style={{ color: '#4b5563', cursor: 'pointer' }} />
                              <button 
                                onClick={() => navigate("/layout/proformainvoice/advance")}
                                style={advanceBtn}>
                                Advance
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                          No records found for the selected filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
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
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <span>←</span>
        <span>Back</span>
      </button>
        </div>
      </div>
    </div>
  );
}

export const card = {
  background: '#ffffff',
  borderRadius: 10,
  padding: 28,
  border: '1px solid #e5e7eb'
};

export const filterRow = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: 24,
  marginBottom: 36
};

export const customBox = {
  width: 255,
  height: '59px',                
  border: '1px solid #9ca3af',
  borderRight:'3px solid #22C55E',
  borderRadius: 4.94,
  padding: '10px 12px',
  background: '#ffffff'
};


export const fieldBox = {
  width: 255,
  height: '59px',                
  border: '1px solid #9ca3af',
  borderRight:'3px solid #A63128',
  borderRadius: 4.94,
  padding: '10px 12px',
  background: '#ffffff'
};

export const label = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 6,
  color: '#374151',
  display: 'block'
};

export const input = {
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: 14,
  color: '#111827',
  background: 'transparent'
};

export const searchBtn = {
  background: '#A63128',
  color: '#ffffff',
  border: 'none',
  width: 160,
  height: 50,
  borderRadius: 4.94,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  marginLeft: 75,
  alignSelf: 'center',   
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const tableWrap = {
  border: '1px solid #e5e7eb',
  borderRadius: 10,
  overflow: 'hidden',
  background: '#ffffff'
};

export const th = {
  padding: '14px 16px',
  textAlign: 'left',
  fontSize: 16,
  fontWeight: 600,
  background: '#f9fafb',
  color: '#374151'
};

export const td = {
  padding: '14px 16px',
  fontSize: 13,
  color: '#111827',
  borderBottom: '1px solid #f3f4f6'
};

const advanceBtn = {
  padding: '6px 14px',
  borderRadius: 4.94,
  border: 'none',
  background: '#A63128',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  marginLeft: '10px',
  position: 'relative',
  top: '-4px',        
};
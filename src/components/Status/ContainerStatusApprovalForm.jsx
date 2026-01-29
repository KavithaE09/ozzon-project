import React, { useState } from 'react';

export default function ContainerStatusApprovalForm() {
  const [formData, setFormData] = useState({
    leadNo: 'L-1',
    containerNo: 'Q-1'
  });

  const [openRow, setOpenRow] = useState(null);

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  const tableData = [
    {
      sNo: 1,
      leadNo: 101,
      leadDate: '04-09-2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Christine Brooks',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04-09-2019',
      statusDate: '04-09-2019',
      status: 'Sold Out',
      narration: 'Sold Out Remark',
      approval: 'Approved'
    },
    {
      sNo: 2,
      leadNo: 101,
      leadDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Rosie Pearson',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04 Sep 2019',
      statusDate: '04 Sep 2019',
      status: 'Sold Out',
      narration: 'Sold Out Remark',
      approval: 'Approved'
    }
  ];

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <main style={{ flex: 1, backgroundColor: '#F6EAEA', padding: '24px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#1F2937' }}>Container Status Update</h2>

            {/* Form Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {/* Lead No */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={formData.leadNo}
                  onChange={(e) => setFormData({ ...formData, leadNo: e.target.value })}
                  placeholder=" "
                  style={{
                    width: '100%',
                    padding: '16px 10px 6px 14px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7F1D1D'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                />
                <label
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: formData.leadNo ? '4px' : '16px',
                    fontSize: formData.leadNo ? '12px' : '14px',
                    color: '#6B7280',
                    backgroundColor: 'white',
                    padding: '0 4px',
                    transition: 'all 0.2s ease',
                    pointerEvents: 'none'
                  }}
                >
                  Lead No
                </label>
              </div>

              {/* Container No */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={formData.containerNo}
                  onChange={(e) => setFormData({ ...formData, containerNo: e.target.value })}
                  placeholder=" "
                  style={{
                    width: '100%',
                    padding: '16px 10px 6px 14px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7F1D1D'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                />
                <label
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: formData.containerNo ? '4px' : '16px',
                    fontSize: formData.containerNo ? '12px' : '14px',
                    color: '#6B7280',
                    backgroundColor: 'white',
                    padding: '0 4px',
                    transition: 'all 0.2s ease',
                    pointerEvents: 'none'
                  }}
                >
                  Container No
                </label>
              </div>

              {/* Search Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button
                  style={{
                    backgroundColor: '#7F1D1D',
                    color: 'white',
                    padding: '10px 39px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#991B1B'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#7F1D1D'}
                >
                  Search
                </button>
              </div>
            </div>

            <div style={{ height: '24px' }}></div>

            {/* Table */}
            <div style={{ 
              borderRadius: '8px', 
              border: '1px solid #D1D5DB', 
              boxShadow: '0 3px 8px rgba(0,0,0,0.08)', 
              overflow: 'hidden',
              overflowX: 'auto'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '1200px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F3E8E8' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>S/No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Lead No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Lead Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Sales Person</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Container No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Party Name</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Sz/Type</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Grade</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Liner</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>In Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Status Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Status</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Narration</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#1F2937', borderBottom: '2px solid #D1D5DB' }}>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr 
                      key={row.sNo} 
                      style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: 'white' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.sNo}.</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.leadNo}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.leadDate}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.salesPerson}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.containerNo}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.partyName}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.szType}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.grade}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.liner}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.inDate}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.statusDate}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.status}</td>
                      <td style={{ padding: '12px 8px', color: '#4B5563' }}>{row.narration}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <button 
                          style={{ 
                            backgroundColor: '#10B981', 
                            color: 'white', 
                            padding: '6px 16px', 
                            borderRadius: '4px', 
                            fontSize: '12px', 
                            fontWeight: '500', 
                            border: 'none', 
                            cursor: 'pointer' 
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#10B981'}
                        >
                          {row.approval}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
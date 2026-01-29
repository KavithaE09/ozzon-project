import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function ContainerStatusUpdateForm() {
    const navigate=useNavigate();
     const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [formData, setFormData] = useState({
    leadNo: 'L-1',
    piNo: 'P-1',
    containerNo: 'Q-1',
    customerName: 'Raneesh',
    fromDate: getTodayDate(),
    toDate: getTodayDate(),
    statusUpdateDate: getTodayDate(),
    remark: 'Q-1'
  });

  const [openRow, setOpenRow] = useState(null);
  const [tableData, setTableData] = useState([
    {
      sNo: 1,
      leadNo: 101,
      leadDate: '04-09-2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      piNo: '',
      piDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Christine Brooks',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04-09-2019',
      deliveryDate: '04-09-2019',
      photo: '',
      status: 'Sold Out'
    },
    {
      sNo: 2,
      leadNo: 101,
      leadDate: '04 Sep 2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      piNo: '',
      piDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Rosie Pearson',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      photo: '',
      status: 'Sold Out'
    }
  ]);

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  const handleStatusChange = (sNo, newStatus) => {
    setTableData(prevData => 
      prevData.map(row => 
        row.sNo === sNo ? { ...row, status: newStatus } : row
      )
    );
    setOpenRow(null);
  };
  
  const handleSearch = () => {
     let results = [...allInvoiceData];


  setFilteredData(results);
  setIsSearched(true);
};

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <main style={{ flex: 1, backgroundColor: '#F6EAEA', padding: '24px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#1F2937' }}>Container Status Update</h2>

            {/* Form Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              
              {/* Lead No */}
              <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626'}}>
                <label  style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                  Lead No
                </label>
                 <input
                  type="text"
                  value={formData.leadNo}
                  onChange={(e) => setFormData({ ...formData, leadNo: e.target.value })}
                  placeholder=" "
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}/>
              </div>

              {/* PI No */}
              <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626'}}>
                <label  style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                  PI No
                </label>
                <input
                  type="text"
                  value={formData.piNo}
                  onChange={(e) => setFormData({ ...formData, piNo: e.target.value })}
                  placeholder=" "
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }} />
              </div>

              {/* Container No */}
              <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626'}}>
                <label  style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                  Container No
                </label>
                <input
                  type="text"
                  value={formData.containerNo}
                  onChange={(e) => setFormData({ ...formData, containerNo: e.target.value })}
                  placeholder=" "
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}/>
              </div>

              {/* Customer Name */}
              <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #22C55E'}} >
                <label  style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                  Customer Name
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder=" "
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}/>
              </div>

              {/* From Date */}
              <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626'}}>
                <label  style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                  From Date
                </label>
                <input
                  type="date"
                  value={formData.fromDate}
                  onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                  placeholder=" "
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}/>
              </div>

              {/* To Date */}
              <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626'}}>
                <label  style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                  To Date
                </label>
                <input
                  type="date"
                  value={formData.toDate}
                  onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                  placeholder=" "
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}/>
              </div>

              {/* Search Button */}
              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <button 
                              onclick={handleSearch }
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
                               <Search size={18} style={{ marginRight: '4px' }} /> Search
                            </button>
              </div>

              {/* Status Update Date */}
              <div style={{backgroundColor: 'white',padding:'10px', borderRadius:'4px',border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626'}}>
                <label  style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
                  Status Update Date
                </label>
                <input
                  type="date"
                  value={formData.statusUpdateDate}
                  onChange={(e) => setFormData({ ...formData, statusUpdateDate: e.target.value })}
                  placeholder=" "
                  style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}/>
              </div>

              {/* Remark - Full width */}
             <div style={{ 
  gridColumn: 'span 3',
  backgroundColor: 'white',
  padding:'10px',
  borderRadius:'4px',
  border: '1px solid #9CA3AF',
  borderRight: '3px solid #DC2626'
}}>
  <label style={{ 
    display: 'block',
    fontSize: '16px',
    color: '#374151',
    marginBottom: '8px',
    fontWeight: '600'
  }}>
    Remark
  </label>

  <textarea
    value={formData.remark}
    onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
    placeholder=" "
    rows={3}
    style={{
      width: '100%',
      padding: '1px 1px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      outline: 'none',
      resize: 'none',      
      height: '22px',      
      lineHeight: '18px',  
      overflowY: 'auto',   
      fontFamily: 'inherit'
    }}
  />
</div>

            </div>

            {/* Table */}
            <div style={{ 
              borderRadius: '8px', 
              border: '1px solid #D1D5DB', 
              boxShadow: '0 3px 8px rgba(0,0,0,0.08)', 
              width: '100%',
              overflowX: 'auto',
              marginBottom: '24px'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>S/No</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Lead No</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Lead Date</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Q.No</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Q.Date</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>PI.No</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>PI.Date</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Sales Person</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Container No</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Party Name</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Sz/Type</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Grade</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Liner</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>In Date</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Delivery Date</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Photo</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#000000', borderBottom: '2px solid #D1D5DB' }}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((row) => (
                    <tr 
                      key={row.sNo} 
                      style={{ borderBottom: '1px solid #F3F4F6', backgroundColor: 'white' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.sNo}.</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.leadNo}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.leadDate}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.qNo}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.qDate}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.piNo}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.piDate}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.salesPerson}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.containerNo}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.partyName}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.szType}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.grade}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.liner}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.inDate}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.deliveryDate}</td>
                      <td style={{ padding: '8px 12px', color: '#4B5563' }}>{row.photo}</td>

                      <td style={{ padding: '8px 12px', position: 'relative' }}>
                        <button
                          onClick={() => toggleRow(row.sNo)}
                          style={{ 
                            backgroundColor: 'white', 
                            color: 'black', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #D1D5DB',
                            cursor: 'pointer'
                          }}
                        >
                          {row.status}
                          <span style={{ marginLeft: '4px' }}>▼</span>
                        </button>

                        {openRow === row.sNo && (
                          <div style={{ 
                            position: 'absolute', 
                            left: '0', 
                            marginTop: '4px', 
                            width: '112px', 
                            backgroundColor: 'white', 
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            fontSize: '12px',
                            zIndex: 10
                          }}>
                            <div 
                              onClick={() => handleStatusChange(row.sNo, 'Approved')}
                              style={{ padding: '8px 12px', cursor: 'pointer' }}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                            >
                              Approved
                            </div>
                            <div 
                              onClick={() => handleStatusChange(row.sNo, 'Rejected')}
                              style={{ padding: '8px 12px', cursor: 'pointer' }}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                            >
                              Rejected
                            </div>
                            <div 
                              onClick={() => handleStatusChange(row.sNo, 'Pending')}
                              style={{ padding: '8px 12px', cursor: 'pointer' }}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                            >
                              Pending
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
            
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
                              }}>
                <span>  ✓  </span>
                Submit
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', maxWidth: '1250px' }}>
            <button 
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
              <span>←</span>
              <span>Back</span>
            </button>
            </div>
        </main>
      </div>
    </div>
  );
}
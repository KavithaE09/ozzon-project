import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function ContainerStatusUpdateForm() {
  const navigate = useNavigate();
  
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
  const [isSearched, setIsSearched] = useState(false);
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
  
  const handleRemarkChange = (e) => {
    setFormData({
      ...formData,
      remark: e.target.value
    });
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };
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
    setIsSearched(true);
  };

  const handleSubmit = () => {
    alert('Form submitted successfully!');
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Container Status Update</h2>

            {/* Filter Section */}
            <div className="filter-section">
              {/* First Row */}
              <div className="filter-grid">
                {/* Lead No */}
                <div className="filter-grid-red">
                  <label className="filter-label">Lead No</label>
                  <input
                    type="text"
                    value={formData.leadNo}
                    onChange={(e) => setFormData({ ...formData, leadNo: e.target.value })}
                    className="filter-input"
                  />
                </div>

                {/* PI No */}
                <div className="filter-grid-red">
                  <label className="filter-label">PI No</label>
                  <input
                    type="text"
                    value={formData.piNo}
                    onChange={(e) => setFormData({ ...formData, piNo: e.target.value })}
                    className="filter-input"
                  />
                </div>

                {/* Container No */}
                <div className="filter-grid-red">
                  <label className="filter-label">Container No</label>
                  <input
                    type="text"
                    value={formData.containerNo}
                    onChange={(e) => setFormData({ ...formData, containerNo: e.target.value })}
                    className="filter-input"
                  />
                </div>

                {/* Customer Name */}
                <div className="filter-grid-green">
                  <label className="filter-label">Customer Name</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="filter-input"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="filter-grid" style={{ marginTop: '16px' }}>
                {/* From Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">From Date</label>
                  <input
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                    className="filter-input"
                  />
                </div>

                {/* To Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">To Date</label>
                  <input
                    type="date"
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                    className="filter-input"
                  />
                </div>

                {/* Status Update Date */}
                <div className="filter-grid-red">
                  <label className="filter-label">Status Update Date</label>
                  <input
                    type="date"
                    value={formData.statusUpdateDate}
                    onChange={(e) => setFormData({ ...formData, statusUpdateDate: e.target.value })}
                    className="filter-input"
                  />
                </div>

                {/* Search Button */}
                <div className="btn-container">
                  <button onClick={handleSearch} className="btn-all">
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>

              {/* Third Row */}
              <div className="filter-grid" style={{ marginTop: '16px' }}>
                {/* Remark - Spans 4 columns */}
                <div className="filter-grid-red" style={{ gridColumn: 'span 4' }}>
                  <label className="filter-label">Remark</label>
                  <textarea
                    value={formData.remark}
                    onChange={handleRemarkChange} 
                    rows="1"
                    className='multiline-field'
                  />
                </div>
              </div>
            </div>

            {/* Results Table */}
            {isSearched && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr className="table-header">
                      <th className="table-th">S/No</th>
                      <th className="table-th">Lead No</th>
                      <th className="table-th">Lead Date</th>
                      <th className="table-th">Q.No</th>
                      <th className="table-th">Q.Date</th>
                      <th className="table-th">PI.No</th>
                      <th className="table-th">PI.Date</th>
                      <th className="table-th">Sales Person</th>
                      <th className="table-th">Container No</th>
                      <th className="table-th">Party Name</th>
                      <th className="table-th">Sz/Type</th>
                      <th className="table-th">Grade</th>
                      <th className="table-th">Liner</th>
                      <th className="table-th">In Date</th>
                      <th className="table-th">Delivery Date</th>
                      <th className="table-th">Photo</th>
                      <th className="table-th">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row) => (
                      <tr key={row.sNo} className="table-row">
                        <td className="table-cell">{row.sNo}.</td>
                        <td className="table-cell">{row.leadNo}</td>
                        <td className="table-cell">{row.leadDate}</td>
                        <td className="table-cell">{row.qNo}</td>
                        <td className="table-cell">{row.qDate}</td>
                        <td className="table-cell">{row.piNo}</td>
                        <td className="table-cell">{row.piDate}</td>
                        <td className="table-cell">{row.salesPerson}</td>
                        <td className="table-cell">{row.containerNo}</td>
                        <td className="table-cell">{row.partyName}</td>
                        <td className="table-cell">{row.szType}</td>
                        <td className="table-cell">{row.grade}</td>
                        <td className="table-cell">{row.liner}</td>
                        <td className="table-cell">{row.inDate}</td>
                        <td className="table-cell">{row.deliveryDate}</td>
                        <td className="table-cell">{row.photo}</td>
                        <td className="table-cell" style={{ position: 'relative' }}>
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
            )}

            {/* Submit Button */}
            {isSearched && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <button onClick={handleSubmit} className="btn-all">
                  <span>✓</span> Submit
                </button>
              </div>
            )}

                     {/* Back Button */}
            <div className="footer-container">
              <button onClick={() => navigate(-1)} className="btn-back">
                <span>←</span>
                <span>Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}